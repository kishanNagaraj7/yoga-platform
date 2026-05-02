import React from 'react'
import { Box, Container, Typography, Paper, Avatar } from '@mui/material'
import { School as SchoolIcon } from '@mui/icons-material'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #2e7d32 0%, #81c784 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 3,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 64,
                height: 64,
                mx: 'auto',
                mb: 2,
              }}
            >
              <SchoolIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom>
              Yoga Platform
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your journey to wellness starts here
            </Typography>
          </Box>
          {children}
        </Paper>
      </Container>
    </Box>
  )
}

export default AuthLayout
