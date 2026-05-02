import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Tabs,
  Tab,
  Paper,
} from '@mui/material'
import {
  Email,
  Lock,
  Person,
  Phone,
} from '@mui/icons-material'
import { authService } from '../../services/authService'
import { RegisterData, UserRole } from '../../types'
import toast from 'react-hot-toast'

const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [registrationType, setRegistrationType] = useState<'guest' | 'student' | 'teacher'>('guest')
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
    name: '',
    phone: '',
    role: UserRole.GUEST,
  })

  const handleChange = (field: keyof RegisterData) => (
    e: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const handleRegistrationTypeChange = (_event: React.SyntheticEvent, newValue: 'guest' | 'student' | 'teacher') => {
    setRegistrationType(newValue)
    // Update role based on registration type
    switch (newValue) {
      case 'guest':
        setFormData({ ...formData, role: UserRole.GUEST })
        break
      case 'student':
        setFormData({ ...formData, role: UserRole.STUDENT })
        break
      case 'teacher':
        setFormData({ ...formData, role: UserRole.TEACHER })
        break
    }
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password || !formData.name) {
      setError('Please fill in all required fields')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    setError('')

    try {
      console.log('🔍 FRONTEND: Attempting registration for:', formData.email)
      
      const response = await authService.register(formData)
      console.log('✅ FRONTEND: Registration response:', response)
      
      if (response.success) {
        toast.success('Registration successful! Please sign in to your account.')
        navigate('/login')
      } else {
        setError(response.message || 'Registration failed')
      }
    } catch (err: any) {
      console.error('❌ FRONTEND: Registration error:', err)
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: '100%',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom color="primary">
              Guest Registration
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create a basic account to explore yoga classes
            </Typography>
          </Box>

          {false && (
          <Tabs
            value={registrationType}
            onChange={handleRegistrationTypeChange}
            variant="fullWidth"
            sx={{ mb: 3 }}
          >
            <Tab label="Guest Access" value="guest" />
            <Tab label="Student" value="student" />
            <Tab label="Teacher" value="teacher" />
          </Tabs>
        )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Person sx={{ fontSize: 60, color: '#1976d2', mb: 3 }} />
              <Typography variant="h5" gutterBottom color="primary">
                Create Your Guest Account
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Join us and start exploring yoga classes today
              </Typography>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={handleChange('name')}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                      <Person color="action" />
                    </Box>
                  ),
                }}
                required
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                      <Email color="action" />
                    </Box>
                  ),
                }}
                required
              />
              <TextField
                fullWidth
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={handleChange('phone')}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                      <Phone color="action" />
                    </Box>
                  ),
                }}
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange('password')}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                      <Lock color="action" />
                    </Box>
                  ),
                }}
                required
                helperText="Minimum 6 characters"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Guest Account'}
              </Button>
            </Box>
          </form>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#2e7d32' }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default RegisterPage
