import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material'
import {
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
} from '@mui/icons-material'
import { useAuth } from '@/contexts/AuthContext'

interface LoginModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  )
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onSuccess }) => {
  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    otp: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  const { login, loginWithOTP } = useAuth()

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateEmailForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateOTPForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }
    
    if (!formData.otp) {
      newErrors.otp = 'OTP is required'
    } else if (!/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = 'Please enter a valid 6-digit OTP'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateEmailForm()) return
    
    setIsLoading(true)
    setLoginError('')
    
    try {
      await login({
        email: formData.email,
        password: formData.password,
      })
      
      onSuccess?.()
      onClose()
    } catch (error: any) {
      setLoginError(error.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateOTPForm()) return
    
    setIsLoading(true)
    setLoginError('')
    
    try {
      await loginWithOTP({
        phone: formData.phone,
        otp: formData.otp,
      })
      
      onSuccess?.()
      onClose()
    } catch (error: any) {
      setLoginError(error.message || 'OTP login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({ email: '', password: '', phone: '', otp: '' })
    setErrors({})
    setLoginError('')
    setIsLoading(false)
    onClose()
  }

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 2,
      }}>
        <Typography variant="h5" component="div" sx={{ color: '#2e7d32' }}>
          Login to SPYSS Yoga
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 0 }}>
        {loginError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {loginError}
          </Alert>
        )}
        
        <Box sx={{ textAlign: 'center', py: 4 }}>
            <PersonIcon sx={{ fontSize: 60, color: '#1976d2', mb: 3 }} />
            <Typography variant="h5" gutterBottom color="primary">
              Welcome to SPYSS Yoga
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => { navigate('/register'); onClose(); }}
                sx={{ minWidth: 120 }}
              >
                Create account
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => { navigate('/login'); onClose(); }}
                sx={{ minWidth: 120 }}
              >
                Sign in
              </Button>
            </Box>
          </Box>
        
        <TabPanel value={tabValue} index={1}>
          <form onSubmit={handleEmailLogin}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange('password')}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: '#2e7d32',
                py: 1.5,
                '&:hover': {
                  bgcolor: '#1b5e20',
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <form onSubmit={handleOTPLogin}>
            <TextField
              fullWidth
              label="Phone Number"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              error={!!errors.phone}
              helperText={errors.phone}
              margin="normal"
              placeholder="Enter 10-digit number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              fullWidth
              label="OTP"
              value={formData.otp}
              onChange={handleInputChange('otp')}
              error={!!errors.otp}
              helperText={errors.otp}
              margin="normal"
              placeholder="Enter 6-digit OTP"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: '#2e7d32',
                py: 1.5,
                '&:hover': {
                  bgcolor: '#1b5e20',
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Login with OTP'
              )}
            </Button>
          </form>
        </TabPanel>
        
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Demo Credentials:</strong><br />
            Email: admin@example.com<br />
            Password: password123<br />
            OTP: 123456 (with any phone)
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal
