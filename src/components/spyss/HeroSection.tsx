import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  useTheme,
} from '@mui/material'
import {
  PlayArrow as PlayArrowIcon,
  ArrowForward as ArrowForwardIcon,
  SelfImprovement as SelfImprovementIcon,
  People as PeopleIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const HeroSection: React.FC = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/programs')
  }

  const handleWatchVideo = () => {
    // Placeholder for video functionality
    console.log('Play video')
  }

  const values = [
    {
      icon: <SelfImprovementIcon />,
      title: 'Right Attitude',
      description: 'Cultivating the right mindset for yoga practice and daily life',
    },
    {
      icon: <PeopleIcon />,
      title: 'Team Spirit',
      description: 'Building community through shared yoga experiences',
    },
    {
      icon: <FavoriteIcon />,
      title: 'Selfless Service',
      description: 'Serving humanity through the transformative power of yoga',
    },
  ]

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.9) 0%, rgba(25, 118, 210, 0.8) 100%)',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.3,
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section - Three Values on Same Line */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              display: 'flex',
              justifyContent: 'center',
              gap: { xs: 2, md: 4 },
              flexWrap: 'wrap',
            }}
          >
            <Box component="span">Right Attitude</Box>
            <Box component="span">Team Spirit</Box>
            <Box component="span">Selfless Service</Box>
          </Typography>
        </Box>

        {/* Organization Name - All on Single Line */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 1,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              lineHeight: 1.2,
              fontFamily: '"Playfair Display", serif',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              flexWrap: 'wrap',
            }}
          >
            <Box component="span">Shri Pathanjali Yoga</Box>
            <Box component="span" sx={{ color: '#fff9c4' }}>
              Shikshana Samiti
            </Box>
            <Box component="span">(R) Karnataka</Box>
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="center">
          {/* Left Column - Main Content */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.6,
                  maxWidth: '500px',
                  opacity: 0.95,
                }}
              >
                Transforming millions of lives through daily yoga practice since 1980. 
                Join 700+ branches worldwide with 40,000+ voluntary teachers dedicated 
                to bringing wellness to humanity.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGetStarted}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: '#fff',
                    color: '#2e7d32',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#f5f5f5',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Get Started
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleWatchVideo}
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    borderColor: '#fff',
                    color: '#fff',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#fff',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Watch Video
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right Column - Values Cards */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ maxWidth: '500px', width: '100%' }}>
                {values.map((value, index) => (
                  <Card
                    key={index}
                    sx={{
                      mb: 3,
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        bgcolor: 'rgba(255, 255, 255, 0.15)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            color: '#fff',
                            width: 48,
                            height: 48,
                          }}
                        >
                          {value.icon}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 'bold',
                              mb: 1,
                              color: '#fff',
                            }}
                          >
                            {value.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              opacity: 0.9,
                              lineHeight: 1.5,
                            }}
                          >
                            {value.description}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Stats Section */}
        <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    color: '#fff9c4',
                  }}
                >
                  700+
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Branches Worldwide
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    color: '#fff9c4',
                  }}
                >
                  40,000+
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Voluntary Teachers
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    color: '#fff9c4',
                  }}
                >
                  Millions
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Yoga Practitioners
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    color: '#fff9c4',
                  }}
                >
                  1980
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Founded
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection
