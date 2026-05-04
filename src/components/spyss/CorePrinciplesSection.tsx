import React, { useEffect, useRef } from 'react'
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    Avatar,
} from '@mui/material'
// import {
//     SelfImprovement,
//     People,
//     Favorite,
// } from '@mui/icons-material'

const CorePrinciplesSection: React.FC = () => {
    const refs = useRef<(HTMLDivElement | null)[]>([])

    // 🔥 Scroll Reveal Animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show')
                    }
                })
            },
            { threshold: 0.2 }
        )

        refs.current.forEach((el) => el && observer.observe(el))

        return () => observer.disconnect()
    }, [])

    const principles = [
        {
            title: 'Sanskara',
            subtitle: 'Value-based living',
            // icon: <SelfImprovement />,
            color: '#ff7043', // orange
        },
        {
            title: 'Sanghatane',
            subtitle: 'Collective identity',
            // icon: <People />,
            color: '#42a5f5', // blue
        },
        {
            title: 'Seve',
            subtitle: 'Service to humanity',
            // icon: <Favorite />,
            color: '#ef5350', // red
        },
    ]

    return (
        <Box
            sx={{
                py: 12,
                background: 'linear-gradient(180deg, #f9fdfb 0%, #eef7f2 100%)',
            }}
        >
            <Container maxWidth="lg">
                {/* TITLE */}
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        fontWeight: 'bold',
                        mb: 8,
                        color: '#1b5e20',
                        letterSpacing: 1,
                    }}
                >
                    Our Core Principles
                </Typography>

                {/* GRID */}
                <Grid container spacing={5}>
                    {principles.map((item, i) => (
                        <Grid item xs={12} md={4} key={i}>
                            <Box
                                ref={(el) => {
                                    return refs.current[i] = el;
                                }}
                                className="fade-item"
                            >
                                <Card
                                    sx={{
                                        textAlign: 'center',
                                        p: 5,
                                        borderRadius: 5,

                                        // 💎 Glass effect
                                        background:
                                            'rgba(255, 255, 255, 0.6)',
                                        backdropFilter: 'blur(14px)',
                                        border:
                                            '1px solid rgba(255,255,255,0.3)',

                                        transition: 'all 0.4s ease',

                                        // 🌊 Floating
                                        animation:
                                            'float 6s ease-in-out infinite',
                                        animationDelay: `${i * 0.4}s`,

                                        '&:hover': {
                                            transform:
                                                'translateY(-12px) scale(1.04)',
                                            boxShadow:
                                                '0 20px 40px rgba(0,0,0,0.15)',
                                        },

                                        '@keyframes float': {
                                            '0%': {
                                                transform: 'translateY(0px)',
                                            },
                                            '50%': {
                                                transform: 'translateY(-10px)',
                                            },
                                            '100%': {
                                                transform: 'translateY(0px)',
                                            },
                                        },
                                    }}
                                >
                                    {/* ICON */}
                                    {/*<Avatar*/}
                                    {/*    sx={{*/}
                                    {/*        bgcolor: item.color,*/}
                                    {/*        width: 70,*/}
                                    {/*        height: 70,*/}
                                    {/*        m: 'auto',*/}
                                    {/*        mb: 3,*/}

                                    {/*        transition: '0.3s',*/}

                                    {/*        '&:hover': {*/}
                                    {/*            boxShadow: `0 0 25px ${item.color}`,*/}
                                    {/*            transform: 'scale(1.15)',*/}
                                    {/*        },*/}
                                    {/*    }}*/}
                                    {/*>*/}
                                    {/*    /!*{item.icon}*!/*/}
                                    {/*</Avatar>*/}

                                    {/* TITLE */}
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 'bold',
                                            mb: 1,
                                            color: '#263238',
                                        }}
                                    >
                                        {item.title}
                                    </Typography>

                                    {/* DIVIDER */}
                                    <Box
                                        sx={{
                                            width: 50,
                                            height: 3,
                                            bgcolor: item.color,
                                            mx: 'auto',
                                            my: 2,
                                            borderRadius: 2,
                                        }}
                                    />

                                    {/* SUBTITLE */}
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#555',
                                            fontSize: '1rem',
                                        }}
                                    >
                                        {item.subtitle}
                                    </Typography>
                                </Card>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* 🔥 Scroll Animation CSS */}
            <style>
                {`
                .fade-item {
                    opacity: 0;
                    transform: translateY(40px);
                    transition: all 0.8s ease;
                }

                .fade-item.show {
                    opacity: 1;
                    transform: translateY(0);
                }
                `}
            </style>
        </Box>
    )
}

export default CorePrinciplesSection
