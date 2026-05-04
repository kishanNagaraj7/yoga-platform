import React, { useEffect, useRef, useState } from 'react'
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
    Public,
    Groups,
    Favorite,
    EmojiEvents,
} from '@mui/icons-material'

const stats = [
    { icon: <Public />, value: 700, label: 'Branches' },
    { icon: <Groups />, value: 40000, label: 'Teachers' },
    { icon: <Favorite />, value: 1000000, label: 'Lives Impacted' },
    { icon: <EmojiEvents />, value: 1980, label: 'Founded' },
]

const AboutSection: React.FC = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    const [visible, setVisible] = useState(false)
    const [count, setCount] = useState([0, 0, 0, 0])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                }
            },
            { threshold: 0.3 }
        )

        if (ref.current) observer.observe(ref.current)
    }, [])

    // Animated counters
    useEffect(() => {
        if (!visible) return

        const intervals = stats.map((stat, i) => {
            return setInterval(() => {
                setCount((prev) => {
                    const updated = [...prev]
                    if (updated[i] < stat.value) {
                        updated[i] += Math.ceil(stat.value / 40)
                    }
                    return updated
                })
            }, 30)
        })

        return () => intervals.forEach(clearInterval)
    }, [visible])

    return (
        <Box
            id="about"
            sx={{
                py: 12,
                background: 'linear-gradient(180deg, #f6fbf7 0%, #ffffff 100%)',
            }}
        >
            <Container maxWidth="lg" ref={ref}>
                {/* TITLE */}
                <Typography
                    variant="h3"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 800,
                        mb: 2,
                        color: '#1b5e20',
                    }}
                >
                    About SPYSS
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        textAlign: 'center',
                        mb: 6,
                        color: '#4caf50',
                        fontWeight: 600,
                    }}
                >
                    A Humble Beginning. A Global Movement.
                </Typography>

                {/* MAIN GRID */}
                <Grid container spacing={6} alignItems="center">

                    {/* LEFT CONTENT */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                                transition: 'all 0.8s ease',
                            }}
                        >
                            <Typography sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.05rem' }}>
                                Started in <b>1980 at Tumkur, Karnataka</b>, SPYSS has grown into a
                                global movement with <b>700+ branches</b>, <b>40,000+ voluntary teachers</b>,
                                and millions of yoga practitioners.
                            </Typography>

                            <Typography sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.05rem' }}>
                                Guided by <b>Shri A R Ramaswamyanna</b>, under the blessings of
                                <b> late Shri Raghavendra Swamiji</b>, inspired by <b>Shri Ajit Kumar</b>,
                                and rooted in the teachings of <b>Dr. B. K. S. Iyengar</b>.
                            </Typography>

                            <Typography sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
                                Through daily yoga, SPYSS brings a silent transformation—creating
                                healthier lives, positive thinking, strong families, and a better society.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* RIGHT VIDEO */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                borderRadius: 4,
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                                transform: visible ? 'scale(1)' : 'scale(0.9)',
                                opacity: visible ? 1 : 0,
                                transition: 'all 0.8s ease',
                            }}
                        >
                            <video
                                src="https://spyss.org/videos/about.mp4"
                                controls
                                muted
                                style={{ width: '100%', display: 'block' }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                {/* STATS */}
                <Grid container spacing={4} sx={{ mt: 8 }}>
                    {stats.map((item, i) => (
                        <Grid item xs={6} md={3} key={i}>
                            <Card
                                sx={{
                                    textAlign: 'center',
                                    p: 3,
                                    borderRadius: 4,
                                    backdropFilter: 'blur(12px)',
                                    background: 'rgba(255,255,255,0.7)',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    transition: 'all 0.4s ease',
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? 'translateY(0)' : 'translateY(40px)',
                                    transitionDelay: `${i * 0.2}s`,

                                    '&:hover': {
                                        transform: 'translateY(-10px) scale(1.05)',
                                        boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                                    },
                                }}
                            >
                                <CardContent>
                                    {/*<Avatar*/}
                                    {/*    sx={{*/}
                                    {/*        bgcolor: ['#1976d2', '#ff9800', '#e91e63', '#9c27b0'][i],*/}
                                    {/*        m: 'auto',*/}
                                    {/*        mb: 2,*/}
                                    {/*        width: 56,*/}
                                    {/*        height: 56,*/}
                                    {/*    }}*/}
                                    {/*>*/}
                                    {/*    {item.icon}*/}
                                    {/*</Avatar>*/}

                                    <Typography
                                        variant="h5"
                                        sx={{ fontWeight: 800 }}
                                    >
                                        {i === 3
                                            ? item.value
                                            : count[i] >= item.value
                                                ? item.value.toLocaleString() + '+'
                                                : count[i].toLocaleString() + '+'}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        {item.label}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}

export default AboutSection
