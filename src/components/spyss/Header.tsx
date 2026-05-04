import React, { useState } from 'react'
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

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const menuItems = [
    { text: 'Home', id: 'home' },
    { text: 'About', id: 'about' },
    { text: 'Activities', id: 'activities' },
    { text: 'Programs', id: 'programs' },
    { text: 'Branches', id: 'branches' },
  ]

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
      <>
        <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
              SPYSS
            </Typography>

            {!isMobile ? (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {menuItems.map((item) => (
                      <Button key={item.text} onClick={() => scrollToSection(item.id)}>
                        {item.text}
                      </Button>
                  ))}

                  <Button
                      variant="contained"
                      startIcon={<PersonIcon />}
                      onClick={() => setLoginModalOpen(true)}
                      sx={{ bgcolor: '#2e7d32' }}
                  >
                    Login
                  </Button>
                </Box>
            ) : (
                <IconButton onClick={() => setMobileMenuOpen(true)}>
                  <MenuIcon />
                </IconButton>
            )}
          </Toolbar>
        </AppBar>

        {/* MOBILE */}
        <Drawer anchor="right" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
          <Box sx={{ width: 250 }}>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <CloseIcon />
            </IconButton>

            <List>
              {menuItems.map((item) => (
                  <ListItem
                      key={item.text}
                      onClick={() => {
                        scrollToSection(item.id)
                        setMobileMenuOpen(false)
                      }}
                  >
                    <ListItemText primary={item.text} />
                  </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <SupabaseLoginModal
            open={loginModalOpen}
            onClose={() => setLoginModalOpen(false)}
        />
      </>
  )
}

export default Header
