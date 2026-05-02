import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { User, LoginCredentials, OTPCredentials, AuthState } from '@/types'
import toast from 'react-hot-toast'
import { authService } from '@/services/authService'

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  loginWithOTP: (credentials: OTPCredentials) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'SET_USER'; payload: User }

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      }
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      }
    default:
      return state
  }
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true,
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          // Use real authService to get current user
          const user = await authService.getCurrentUser()
          dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } })
        } catch (error) {
          localStorage.removeItem('token')
          dispatch({ type: 'AUTH_FAILURE' })
        }
      } else {
        dispatch({ type: 'AUTH_FAILURE' })
      }
    }

    initAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'AUTH_START' })
      
      const response = await authService.login(credentials)
      
      if (response.success && response.data) {
        const { user, token } = response.data
        localStorage.setItem('token', token)
        dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } })
        toast.success('Login successful!')
      } else {
        dispatch({ type: 'AUTH_FAILURE' })
        toast.error(response.message || 'Login failed')
      }
    } catch (error: any) {
      dispatch({ type: 'AUTH_FAILURE' })
      toast.error(error.message || 'Login failed')
    }
  }

  const loginWithOTP = async (credentials: OTPCredentials) => {
    try {
      dispatch({ type: 'AUTH_START' })
      
      const response = await authService.loginWithOTP(credentials)
      
      if (response.success && response.data) {
        const { user, token } = response.data
        localStorage.setItem('token', token)
        dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } })
        toast.success('Login successful!')
      } else {
        dispatch({ type: 'AUTH_FAILURE' })
        toast.error(response.message || 'Login failed')
      }
    } catch (error: any) {
      dispatch({ type: 'AUTH_FAILURE' })
      toast.error(error.message || 'Login failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
    toast.success('Logged out successfully')
  }

  const refreshToken = async () => {
    // Mock refresh token - just keep user logged in
    return Promise.resolve()
  }

  const value: AuthContextType = {
    ...state,
    login,
    loginWithOTP,
    logout,
    refreshToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
