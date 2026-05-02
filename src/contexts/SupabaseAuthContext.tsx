import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { supabaseAuthService } from '../services/supabaseAuthService'
import { supabase } from '../services/supabaseClient'

// ─── Types ───────────────────────────────────────────────────────────────────

interface SupabaseUser {
  id: string
  email: string
  role?: string
  user_metadata?: {
    role?: string
    [key: string]: any
  }
  [key: string]: any
}

interface SupabaseAuthState {
  user: SupabaseUser | null
  session: any
  isAuthenticated: boolean
  isLoading: boolean
}

interface SupabaseAuthContextType extends SupabaseAuthState {
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, fullName?: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  requestRoleUpgrade: (role: string) => Promise<void> // ✅ SAFE
}

// ─── Context ─────────────────────────────────────────────────────────────────

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(undefined)

export const useSupabaseAuth = () => {
  const ctx = useContext(SupabaseAuthContext)
  if (!ctx) throw new Error('useSupabaseAuth must be used within provider')
  return ctx
}

// ─── Provider ────────────────────────────────────────────────────────────────

export const SupabaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<SupabaseAuthState>({
    user: null,
    session: null,
    isAuthenticated: false,
    isLoading: true,
  })

  // Prevent stale role issues
  const roleRef = useRef<string | undefined>()

  useEffect(() => {
    roleRef.current = authState.user?.role
  }, [authState.user?.role])

  // ─── Role Resolution ──────────────────────────────────────────────────────

  const resolveUserWithRole = async (user: any, existingRole?: string): Promise<SupabaseUser> => {
    let role = user?.user_metadata?.role

    const isValidRole = role && role !== 'authenticated'

    if (!isValidRole) {
      try {
        const result = await Promise.race([
          supabase.from('user_roles').select('role').eq('user_id', user.id).single(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000)),
        ]) as any

        role = result?.data?.role
      } catch {
        // ignore and fallback
      }
    }

    if (!role) role = existingRole || 'guest'

    return {
      ...user,
      role,
      user_metadata: {
        ...user.user_metadata,
        role,
      },
    }
  }

  // ─── Auth Methods ─────────────────────────────────────────────────────────

  const login = async (email: string, password: string) => {
    await supabaseAuthService.signInWithEmail({ email, password })
  }

  const signup = async (email: string, password: string, fullName?: string) => {
    await supabaseAuthService.signUpWithEmail({ email, password, fullName })
  }

  const logout = async () => {
    await supabaseAuthService.signOut()
    setAuthState({ user: null, session: null, isAuthenticated: false, isLoading: false })
  }

  // ✅ SAFE: Request role upgrade via backend
  const requestRoleUpgrade = async (role: string) => {
    await supabaseAuthService.requestRoleUpgrade(role)
  }

  // ─── Refresh User ─────────────────────────────────────────────────────────

  const refreshUser = async () => {
    try {
      const user = await supabaseAuthService.getCurrentUser()
      const session = await supabaseAuthService.getCurrentSession()

      if (!user) {
        setAuthState({ user: null, session: null, isAuthenticated: false, isLoading: false })
        return
      }

      const userWithRole = await resolveUserWithRole(user, roleRef.current)

      setAuthState({
        user: userWithRole,
        session,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch {
      setAuthState(prev => ({ ...prev, isLoading: false }))
    }
  }

  // ─── Auth Listener ────────────────────────────────────────────────────────

  useEffect(() => {
    refreshUser()

    const { data: { subscription } } =
      supabaseAuthService.onAuthStateChange(async (event, session) => {

        if (event === 'SIGNED_OUT') {
          setAuthState({ user: null, session: null, isAuthenticated: false, isLoading: false })
          return
        }

        if (!session?.user) return

        const userWithRole = await resolveUserWithRole(session.user, roleRef.current)

        setAuthState({
          user: userWithRole,
          session,
          isAuthenticated: true,
          isLoading: false,
        })
      })

    return () => subscription.unsubscribe()
  }, [])

  // ─── Provider ─────────────────────────────────────────────────────────────

  return (
    <SupabaseAuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        refreshUser,
        requestRoleUpgrade, // ✅ exposed safely
      }}
    >
      {children}
    </SupabaseAuthContext.Provider>
  )
}
