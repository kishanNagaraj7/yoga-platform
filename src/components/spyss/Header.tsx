import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Person as PersonIcon,
} from '@mui/icons-material'
import SupabaseLoginModal from './SupabaseLoginModal'

interface HeaderProps {
  onLogin?: () => void
}

const Header: React.FC<HeaderProps> = ({ onLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleLoginClick = () => {
    setLoginModalOpen(true)
    if (onLogin) onLogin()
  }

  const handleLoginSuccess = () => {
    setLoginModalOpen(false)
    navigate('/dashboard')
  }

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'Programs', path: '/programs' },
    { text: 'Contact', path: '/contact' },
  ]

  return (
    <>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          bgcolor: 'white',
          color: 'text.primary',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography 
                variant="h5" 
                component="div"
                sx={{ 
                  fontWeight: 'bold',
                  color: '#2e7d32',
                  fontFamily: '"Playfair Display", serif',
                  letterSpacing: 0.5,
                }}
              >
                SPYSS
              </Typography>
            </Link>
            <Typography 
              variant="caption" 
              sx={{ 
                ml: 1,
                color: 'text.secondary',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Yoga Platform
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 500,
                    textTransform: 'none',
                    '&:hover': {
                      color: '#2e7d32',
                      bgcolor: 'rgba(46, 125, 50, 0.04)',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
              <Button
                variant="contained"
                startIcon={<PersonIcon />}
                onClick={handleLoginClick}
                sx={{
                  bgcolor: '#2e7d32',
                  color: 'white',
                  fontWeight: 500,
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  '&:hover': {
                    bgcolor: '#1b5e20',
                  },
                }}
              >
                Login
              </Button>
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#2e7d32' }}>
              SPYSS Yoga
            </Typography>
            <IconButton onClick={handleMobileMenuToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                component={Link}
                to={item.path}
                onClick={handleMobileMenuToggle}
                sx={{ 
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': {
                    bgcolor: 'rgba(46, 125, 50, 0.04)',
                  },
                }}
              >
                <ListItemText 
                  primary={item.text}
                  sx={{ 
                    '& .MuiListItemText-primary': {
                      fontWeight: 500,
                    }
                  }}
                />
              </ListItem>
            ))}
            <ListItem sx={{ mt: 2 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<PersonIcon />}
                onClick={() => {
                  handleLoginClick()
                  handleMobileMenuToggle()
                }}
                sx={{
                  bgcolor: '#2e7d32',
                  color: 'white',
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: '#1b5e20',
                  },
                }}
              >
                Login
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Login Modal */}
      <SupabaseLoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  )
}

export default Header
