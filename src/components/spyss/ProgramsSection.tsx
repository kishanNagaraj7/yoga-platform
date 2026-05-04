import React, { useEffect, useRef } from 'react'
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
} from '@mui/material'
import {
    SelfImprovement,
    Favorite,
    Public,
    WbSunny,
    LocalHospital,
    ChildCare,
    Female,
} from '@mui/icons-material'

const ProgramsSection: React.FC = () => {
    const refs = useRef<(HTMLDivElement | null)[]>([])

    // 🔥 Scroll reveal per card
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

    const programs = [
        {
            title: 'International Yoga Camp',
            icon: <Public />,
            color: '#42a5f5',
            media: '', // 🔗 add image/video later
        },
        {
            title: 'Raksha Bandhan',
            icon: <Favorite />,
            color: '#ef5350',
            media: '',
        },
        {
            title: 'International Yoga Day',
            icon: <SelfImprovement />,
            color: '#ab47bc',
            media: '',
        },
        {
            title: 'Mass Surya Namaskar',
            icon: <WbSunny />,
            color: '#ffa726',
            media: '',
        },
        {
            title: 'Doctors Yoga Workshop',
            icon: <LocalHospital />,
            color: '#26a69a',
            media: '',
        },
        {
            title: 'Children Yoga Camp',
            icon: <ChildCare />,
            color: '#5c6bc0',
            media: '',
        },
        {
            title: 'Women Yoga Camp',
            icon: <Female />,
            color: '#ec407a',
            media: '',
        },
    ]

    return (
        <Box
            id="programs"
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
                    Our Programs
                </Typography>

                {/* GRID */}
                <Grid container spacing={5}>
                    {programs.map((p, i) => (
                        <Grid item xs={12} sm={6} md={4} key={p.title}>
                            <Box
                                ref={(el) => (refs.current[i] = el)}
                                className="fade-item"
                            >
                                <Card
                                    sx={{
                                        borderRadius: 5,
                                        overflow: 'hidden',
                                        position: 'relative',

                                        // 💎 Premium Glass
                                        background:
                                            'rgba(255,255,255,0.65)',
                                        backdropFilter: 'blur(16px)',
                                        border:
                                            '1px solid rgba(255,255,255,0.3)',

                                        transition: 'all 0.4s ease',

                                        '&:hover': {
                                            transform:
                                                'translateY(-12px) scale(1.03)',
                                            boxShadow:
                                                '0 20px 45px rgba(0,0,0,0.18)',
                                        },
                                    }}
                                >
                                    {/* 🎥 MEDIA (Image / Video placeholder) */}
                                    <Box
                                        sx={{
                                            height: 160,
                                            background:
                                                p.media
                                                    ? `url(${p.media}) center/cover`
                                                    : 'linear-gradient(135deg, #e0f2f1, #e3f2fd)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.8rem',
                                            color: '#777',
                                            transition: '0.4s',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                            },
                                        }}
                                    >
                                        {!p.media && 'Add Image / Video'}
                                    </Box>

                                    <CardContent sx={{ textAlign: 'center', p: 4 }}>
                                        {/* ICON */}
                                        <Avatar
                                            sx={{
                                                bgcolor: p.color,
                                                width: 60,
                                                height: 60,
                                                m: 'auto',
                                                mb: 2,

                                                transition: '0.3s',
                                                '&:hover': {
                                                    boxShadow: `0 0 25px ${p.color}`,
                                                    transform: 'scale(1.15)',
                                                },
                                            }}
                                        >
                                            {p.icon}
                                        </Avatar>

                                        {/* TITLE */}
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 'bold',
                                                color: '#263238',
                                            }}
                                        >
                                            {p.title}
                                        </Typography>

                                        {/* SUBTLE TAG */}
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: '#777',
                                            }}
                                        >
                                            SPYSS Activity
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* 🔥 Scroll Animation */}
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

export default ProgramsSection
