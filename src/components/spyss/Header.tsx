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
        {/* 🍏 APP BAR */}
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
              bgcolor: 'rgba(255,255,255,0.85)',
              color: 'black',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
              zIndex: 1200,
            }}
        >
          <Toolbar
              sx={{
                justifyContent: 'space-between',
                px: { xs: 2, md: 6 },
                minHeight: 70,
              }}
          >

            {/* LOGO */}
            <Typography
                sx={{
                  fontWeight: 800,
                  letterSpacing: '1px',
                  fontSize: '1.2rem',
                  color: '#0f172a',
                }}
            >
              SPYSS
            </Typography>

            {/* DESKTOP MENU */}
            {!isMobile ? (
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>

                  {menuItems.map((item) => (
                      <Button
                          key={item.text}
                          onClick={() => scrollToSection(item.id)}
                          sx={{
                            color: '#334155',
                            fontWeight: 500,
                            textTransform: 'none',
                            fontSize: '0.95rem',
                            '&:hover': {
                              color: '#0f172a',
                              background: 'transparent',
                            },
                          }}
                      >
                        {item.text}
                      </Button>
                  ))}

                  {/* LOGIN BUTTON */}
                  <Button
                      variant="contained"
                      startIcon={<PersonIcon />}
                      onClick={() => setLoginModalOpen(true)}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: '999px',
                        px: 3,
                        py: 1,
                        background: 'linear-gradient(90deg, #50B1AC, #0FA2E9)',
                        boxShadow: '0 8px 20px rgba(15,162,233,0.2)',
                        '&:hover': {
                          transform: 'translateY(-1px)',
                          boxShadow: '0 12px 28px rgba(15,162,233,0.25)',
                        },
                        transition: 'all 0.2s ease',
                      }}
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

        {/* 📱 MOBILE DRAWER */}
        <Drawer
            anchor="right"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
        >
          <Box sx={{ width: 280, pt: 2 }}>

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
                      sx={{
                        cursor: 'pointer',
                        py: 1.5,
                      }}
                  >
                    <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          fontWeight: 500,
                          color: '#334155',
                        }}
                    />
                  </ListItem>
              ))}
            </List>

          </Box>
        </Drawer>

        {/* LOGIN MODAL */}
        <SupabaseLoginModal
            open={loginModalOpen}
            onClose={() => setLoginModalOpen(false)}
        />
      </>
  )
}

export default Header
