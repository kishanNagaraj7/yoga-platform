import { supabase } from './supabaseClient'

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignUpCredentials {
  email: string
  password: string
  fullName?: string
}

export interface AuthResponse {
  user: any
  session: any
}

export class SupabaseAuthService {
  // =========================
  // AUTH
  // =========================

  async signInWithEmail(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) throw new Error(error.message)

    return { user: data.user, session: data.session }
  }

  async signUpWithEmail(credentials: SignUpCredentials): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          full_name: credentials.fullName || credentials.email,
          role: 'guest', // ✅ default role in JWT
        },
      },
    })

    if (error) throw new Error(error.message)

    return { user: data.user, session: data.session }
  }

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
  }

  // =========================
  // SESSION
  // =========================

  async getCurrentUser(): Promise<any> {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw new Error(error.message)
    return user
  }

  async getCurrentSession(): Promise<any> {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw new Error(error.message)
    return session
  }

  // =========================
  // PROFILE
  // =========================

  async updateUserProfile(updates: {
    full_name?: string
    phone?: string
  }): Promise<any> {
    const { data, error } = await supabase.auth.updateUser({
      data: updates,
    })

    if (error) throw new Error(error.message)

    return data.user
  }

  // =========================
  // 🔐 ROLE MANAGEMENT (SAFE)
  // =========================

  /**
   * 🚫 DO NOT directly update role from frontend
   * This only REQUESTS a role upgrade
   */
  async requestRoleUpgrade(role: string): Promise<void> {
    const { error } = await supabase.functions.invoke('request-role-upgrade', {
      body: { role },
    })

    if (error) {
      throw new Error(error.message)
    }
  }

  /**
   * Optional: refresh JWT after backend updates role
   */
  async refreshSession(): Promise<void> {
    await supabase.auth.refreshSession()
  }

  // =========================
  // LISTENER
  // =========================

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

export const supabaseAuthService = new SupabaseAuthService()
