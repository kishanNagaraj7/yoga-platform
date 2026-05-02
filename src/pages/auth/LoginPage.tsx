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
  InputAdornment,
  IconButton,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Phone,
} from '@mui/icons-material'
import { useSupabaseAuth } from '../../contexts/SupabaseAuthContext'
import { LoginCredentials, OTPCredentials } from '../../types'
import toast from 'react-hot-toast'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useSupabaseAuth()
  const [tabValue, setTabValue] = useState(0) // 0 = Email, 1 = Phone OTP
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Email/Password form state
  const [emailForm, setEmailForm] = useState<LoginCredentials>({
    email: '',
    password: '',
  })

  // OTP form state
  const [otpForm, setOtpForm] = useState<OTPCredentials>({
    phone: '',
    otp: '',
  })

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    setError('')
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailForm.email || !emailForm.password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      await login(emailForm.email, emailForm.password)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleOTPLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('OTP login is not currently supported')
  }

  const handleSendOTP = async () => {
    setError('OTP login is not currently supported')
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
          maxWidth: 400,
          width: '100%',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom color="primary">
              SPYSS Platform
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ mb: 2 }}
          >
            <Tab label="Email" />
            <Tab label="Phone OTP" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <form onSubmit={handleEmailLogin}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={emailForm.email}
                onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                required
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={emailForm.password}
                onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <form onSubmit={handleOTPLogin}>
              <TextField
                fullWidth
                label="Phone Number"
                type="tel"
                value={otpForm.phone}
                onChange={(e) => setOtpForm({ ...otpForm, phone: e.target.value })}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
                required
              />
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <TextField
                  fullWidth
                  label="OTP"
                  type="text"
                  value={otpForm.otp}
                  onChange={(e) => setOtpForm({ ...otpForm, otp: e.target.value })}
                  margin="normal"
                  required
                />
                <Button
                  variant="outlined"
                  onClick={handleSendOTP}
                  sx={{ mt: 1, minWidth: 100 }}
                >
                  Send OTP
                </Button>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify & Sign In'}
              </Button>
            </form>
          </TabPanel>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#2e7d32' }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default LoginPage
