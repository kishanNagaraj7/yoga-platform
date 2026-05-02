import axios from 'axios'
import { 
  User, 
  LoginCredentials, 
  OTPCredentials, 
  RegisterData, 
  ApiResponse 
} from '@/types'

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:8080'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        const response = await axios.post(`${API_URL}/auth/refresh`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (response.data.success) {
          const { token } = response.data.data
          localStorage.setItem('token', token)
          originalRequest.headers.Authorization = `Bearer ${token}`
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        localStorage.removeItem('token')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export const authService = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    console.log('🔍 FRONTEND: Login attempt for email:', credentials.email)
    console.log('🔍 FRONTEND: Request URL:', `${API_URL}/auth/login`)
    console.log('🔍 FRONTEND: Request data:', JSON.stringify(credentials))
    
    try {
      console.log('🌐 FRONTEND: Making POST request to backend...')
      const response = await apiClient.post('/auth/login', credentials)
      console.log('✅ FRONTEND: Login response received:', response.status)
      console.log('✅ FRONTEND: Response data:', response.data)
      return response.data
    } catch (error: any) {
      console.error('❌ FRONTEND: Login failed for email:', credentials.email)
      console.error('❌ FRONTEND: Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        code: error.code
      })
      let message = 'Login failed'
      const errors = error.response?.data?.errors || []
      
      if (error.response?.status === 401) {
        message = 'Invalid email or password'
      } else if (error.response?.status === 403) {
        message = 'Access denied. Please check your credentials.'
      } else if (error.response?.status === 404) {
        message = 'User not found. Please check your email.'
      } else if (error.response?.data?.message) {
        message = error.response.data.message
      } else if (error.code === 'NETWORK_ERROR') {
        message = 'Network error. Please check your connection.'
      }
      
      return {
        success: false,
        message,
        errors
      }
    }
  },

  async loginWithOTP(credentials: OTPCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await apiClient.post('/auth/login-otp', credentials)
      return response.data
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'OTP login failed',
        errors: error.response?.data?.errors || []
      }
    }
  },

  async register(data: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await apiClient.post('/auth/register', data)
      return response.data
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
        errors: error.response?.data?.errors || []
      }
    }
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get('/auth/me')
    return response.data.data
  },

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    try {
      const response = await apiClient.post('/auth/refresh')
      return response.data
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Token refresh failed',
        errors: error.response?.data?.errors || []
      }
    }
  },

  async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post('/auth/logout')
      return response.data
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Logout failed',
        errors: error.response?.data?.errors || []
      }
    }
  },

  async sendOTP(phone: string): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post('/auth/send-otp', { phone })
      return response.data
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send OTP',
        errors: error.response?.data?.errors || []
      }
    }
  },

  async verifyOTP(phone: string, otp: string): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post('/auth/verify-otp', { phone, otp })
      return response.data
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'OTP verification failed',
        errors: error.response?.data?.errors || []
      }
    }
  }
}

export default apiClient
