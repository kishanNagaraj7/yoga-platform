import React, { useState } from 'react'
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
  Tabs,
  Tab,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import {
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
} from '@mui/icons-material'
import { supabaseAuthService, LoginCredentials, SignUpCredentials } from '@/services/supabaseAuthService'

interface SupabaseLoginModalProps {
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

const SupabaseLoginModal: React.FC<SupabaseLoginModalProps> = ({ open, onClose, onSuccess }) => {
  const [tabValue, setTabValue] = useState(0)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    title: '',
    firstName: '',
    lastName: '',
    phone: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    setAuthError('')
  }

  const handleInputChange = (field: string) => (event: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const validateLoginForm = () => {
    const newErrors: any = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setAuthError(Object.values(newErrors).join(', '))
      return false
    }
    
    return true
  }

  const validateSignupForm = () => {
    const newErrors: any = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.title) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setAuthError(Object.values(newErrors).join(', '))
      return false
    }
    
    return true
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateLoginForm()) return
    
    setIsLoading(true)
    setAuthError('')
    
    try {
      const credentials: LoginCredentials = {
        email: formData.email,
        password: formData.password,
      }
      
      const result = await supabaseAuthService.signInWithEmail(credentials)
      
      // Check if login was successful
      if (result.user && result.session) {
        console.log('Login successful, user:', result.user)
        // Give a small delay for auth state to update
        setTimeout(() => {
          onSuccess?.()
          onClose()
        }, 500)
      } else {
        throw new Error('Login failed - no user session returned')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      setAuthError(error.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateSignupForm()) return
    
    setIsLoading(true)
    setAuthError('')
    
    try {
      const fullName = `${formData.title} ${formData.firstName} ${formData.lastName}`.trim()
      
      const credentials: SignUpCredentials = {
        email: formData.email,
        password: formData.password,
        fullName: fullName,
      }
      
      const result = await supabaseAuthService.signUpWithEmail(credentials)
      
      if (result.user) {
        console.log('Signup successful, user:', result.user)
        
        // Create profile and role immediately after signup with proper fields
        await createProfileAndRole(result.user.id, result.user.email || credentials.email, formData.title, formData.firstName, formData.lastName)
        
        if (result.session) {
          // Auto-login if email confirmation is disabled
          setTimeout(() => {
            onSuccess?.()
            onClose()
          }, 500)
        } else {
          // Email confirmation required
          setAuthError('Signup successful! Please check your email to confirm your account.')
        }
      } else {
        throw new Error('Signup failed - no user created')
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      setAuthError(error.message || 'Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to create profile and role with proper field mapping
  const createProfileAndRole = async (userId: string, email: string, title: string, firstName: string, lastName: string) => {
    try {
      const { supabase } = await import('@/services/supabaseClient')
      
      // Create profile with proper field mapping
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          email: email,
          title: title,
          first_name: firstName,
          last_name: lastName,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
      
      if (profileError) {
        console.error('Profile creation error:', profileError)
        throw profileError
      }
      
      // Create user role
      const { error: roleError } = await supabase
        .from('user_roles')
        .upsert({
          user_id: userId,
          role: 'guest',
          assigned_at: new Date().toISOString(),
        })
      
      if (roleError) {
        console.error('Role creation error:', roleError)
        throw roleError
      }
      
      console.log('Profile and role created successfully for user:', userId)
    } catch (error) {
      console.error('Error creating profile and role:', error)
      throw error
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Welcome to Yoga Platform</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          <form onSubmit={handleLogin}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                }}
              />
              
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange('password')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} size="small">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              {authError && (
                <Alert severity="error">{authError}</Alert>
              )}
              
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </Box>
          </form>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <form onSubmit={handleSignup}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                }}
              />
              
              <FormControl fullWidth>
                <InputLabel>Title</InputLabel>
                <Select
                  value={formData.title}
                  onChange={handleInputChange('title')}
                  label="Title"
                >
                  <MenuItem value="Mr">Mr</MenuItem>
                  <MenuItem value="Mrs">Mrs</MenuItem>
                  <MenuItem value="Miss">Miss</MenuItem>
                  <MenuItem value="Dr">Dr</MenuItem>
                  <MenuItem value="Prof">Prof</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange('firstName')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                }}
              />
              
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                }}
              />
              
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange('password')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} size="small">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              {authError && (
                <Alert severity="error">{authError}</Alert>
              )}
              
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </Box>
          </form>
        </TabPanel>
      </DialogContent>
    </Dialog>
  )
}

export default SupabaseLoginModal
