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
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    title: '',
    firstName: '',
    lastName: '',
    phone: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    setErrors({})
    setAuthError('')
  }

  const handleInputChange = (field: string) => (event: any) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateLoginForm = () => {
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

  const validateSignupForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
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
        
        try {
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
        } catch (profileError: any) {
          console.error('Profile/Role creation failed:', profileError)
          setAuthError(`Account created but profile setup failed: ${profileError.message}. Please contact support.`)
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
      console.log('Creating profile and role for user:', userId)
      const { supabase } = await import('@/services/supabaseClient')
      
      // Create profile with proper field mapping
      const { error: profileError, data: profileData } = await supabase
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
        .select()
        .single()
      
      if (profileError) {
        console.error('Profile creation error:', profileError)
        throw new Error(`Profile creation failed: ${profileError.message}`)
      }
      
      console.log('Profile created successfully:', profileData)
      
      // Create user role as guest
      const { error: roleError, data: roleData } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: 'guest',
          assigned_at: new Date().toISOString()
        })
        .select()
        .single()
      
      if (roleError) {
        console.error('Role creation error:', roleError)
        throw new Error(`Role creation failed: ${roleError.message}`)
      }
      
      console.log('Role created successfully:', roleData)
      console.log('Profile and role created successfully for user:', userId)
    } catch (error) {
      console.error('Error creating profile and role:', error)
      throw error // Re-throw to handle in signup flow
    }
  }

  const handleClose = () => {
    setFormData({ email: '', password: '', title: '', firstName: '', lastName: '', phone: '' })
    setErrors({})
    setAuthError('')
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
        {authError && (
          <Alert severity={authError.includes('successful') ? 'success' : 'error'} sx={{ mb: 2 }}>
            {authError}
          </Alert>
        )}
        
        <Box>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            sx={{ mb: 3 }}
            centered
          >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
          
          <TabPanel value={tabValue} index={0}>
            <form onSubmit={handleLogin}>
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
                  'Sign In'
                )}
              </Button>
            </form>
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <form onSubmit={handleSignup}>
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
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Title</InputLabel>
                <Select
                  value={formData.title}
                  onChange={handleInputChange('title')}
                  label="Title"
                  error={!!errors.title}
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
                error={!!errors.firstName}
                helperText={errors.firstName}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
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
                      <IconButton onClick={() => setShowPassword(!showPassword)} size="small">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              {authError && (
                <Alert severity={authError.includes('successful') ? 'success' : 'error'} sx={{ mt: 2 }}>
                  {authError}
                </Alert>
              )}
              
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
                  'Sign Up'
                )}
              </Button>
            </form>
          </TabPanel>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default SupabaseLoginModal
