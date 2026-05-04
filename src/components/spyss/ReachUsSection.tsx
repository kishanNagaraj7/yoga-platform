import React from 'react'
import {
    Box,
    Container,
    Typography,
    Grid,
    Stack,
    Link,
    IconButton,
} from '@mui/material'
import {
    LocationOn,
    Phone,
    Email,
    Facebook,
    Instagram,
    YouTube,
    Twitter,
    LinkedIn,
} from '@mui/icons-material'

const ReachUsSection: React.FC = () => {
    return (
        <Box
            sx={{
                py: 10,
                bgcolor: '#1f4f4a',
                color: '#fff',
            }}
        >
            <Container maxWidth="lg">

                {/* TITLE */}
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 600,
                        mb: 6,
                        textAlign: 'center',
                    }}
                >
                    Reach Us
                </Typography>

                {/* 🔥 3 COLUMN GRID */}
                <Grid container spacing={6}>

                    {/* ADDRESS */}
                    <Grid item xs={12} md={4}>
                        <Stack direction="row" spacing={2}>
                            <LocationOn sx={{ mt: '4px', opacity: 0.9 }} />
                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: 500,
                                        textDecoration: 'underline',
                                        mb: 1,
                                    }}
                                >
                                    Address:
                                </Typography>

                                <Typography sx={{ lineHeight: 1.7, opacity: 0.9 }}>
                                    Shri Pathanjali Yoga Mandira <br />
                                    Near Bailanjaneya Temple <br />
                                    Hanumantpura, Tumkur <br />
                                    Karnataka, India
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>

                    {/* CONTACT */}
                    <Grid item xs={12} md={4}>
                        <Stack spacing={3}>

                            {/* PHONE */}
                            <Stack direction="row" spacing={2}>
                                <Phone sx={{ mt: '4px', opacity: 0.9 }} />
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            textDecoration: 'underline',
                                            mb: 0.5,
                                        }}
                                    >
                                        Phone:
                                    </Typography>

                                    <Link
                                        href="tel:+919999999999"
                                        sx={{
                                            color: '#fff',
                                            opacity: 0.9,
                                            '&:hover': { opacity: 1 },
                                        }}
                                    >
                                        +91 99999 99999
                                    </Link>
                                </Box>
                            </Stack>

                            {/* EMAIL */}
                            <Stack direction="row" spacing={2}>
                                <Email sx={{ mt: '4px', opacity: 0.9 }} />
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            textDecoration: 'underline',
                                            mb: 0.5,
                                        }}
                                    >
                                        Email:
                                    </Typography>

                                    <Link
                                        href="mailto:info@spyss.org"
                                        sx={{
                                            color: '#fff',
                                            opacity: 0.9,
                                            '&:hover': { opacity: 1 },
                                        }}
                                    >
                                        info@spyss.org
                                    </Link>
                                </Box>
                            </Stack>

                        </Stack>
                    </Grid>

                    {/* SOCIAL */}
                    <Grid item xs={12} md={4}>
                        <Typography
                            sx={{
                                fontWeight: 500,
                                textDecoration: 'underline',
                                mb: 2,
                                textAlign: { xs: 'left', md: 'left' },
                            }}
                        >
                            Social:
                        </Typography>

                        <Stack direction="row" spacing={2} flexWrap="wrap">
                            {[
                                {
                                    icon: <Facebook />,
                                    link: 'https://www.facebook.com/SPYSSYOGA/',
                                },
                                {
                                    icon: <Instagram />,
                                    link: 'https://www.instagram.com/spyssyoga/',
                                },
                                {
                                    icon: <YouTube />,
                                    link: 'https://www.youtube.com/channel/UCHQE6h6wt3UZTBG8qk7wJlA',
                                },
                                {
                                    icon: <Twitter />,
                                    link: 'https://x.com/SPYSSYOGA?s=09',
                                },
                                {
                                    icon: <LinkedIn />,
                                    link: 'https://www.linkedin.com/company/spyssyoga',
                                },
                            ].map((item, i) => (
                                <IconButton
                                    key={i}
                                    href={item.link}
                                    target="_blank"
                                    sx={{
                                        color: '#fff',
                                        opacity: 0.85,
                                        transition: '0.3s',

                                        '&:hover': {
                                            opacity: 1,
                                            transform: 'translateY(-3px)',
                                        },
                                    }}
                                >
                                    {item.icon}
                                </IconButton>
                            ))}
                        </Stack>
                    </Grid>

                </Grid>

            </Container>
        </Box>
    )
}

export default ReachUsSection
