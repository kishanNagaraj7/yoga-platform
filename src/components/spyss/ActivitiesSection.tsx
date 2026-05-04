import React, { useEffect, useRef } from 'react'
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
} from '@mui/material'

import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'
import HikingIcon from '@mui/icons-material/DownhillSkiing'
import SpaIcon from '@mui/icons-material/Spa'
import GroupsIcon from '@mui/icons-material/Groups'
import ParkIcon from '@mui/icons-material/Park'

const sections = [
    {
        title: 'Activities at SPYSS',
        icon: <SelfImprovementIcon />,
        color: '#1976d2',
        text:
            'SPYSS conducts free yoga classes in all branches with voluntary teachers. Yoga is used for health, moral education, youth mentoring, family counseling, hygiene, stress-free living and spiritual training.',
        bg: 'https://images.unsplash.com/photo-1545389336-cf090694435e',
    },
    {
        title: 'How are we different?',
        icon: <GroupsIcon />,
        color: '#ff9800',
        text:
            'We go beyond yoga asanas. We develop Sanskar, Sanghatan & Seva, promoting social harmony, enrichment and complete personality development.',
        bg: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
    },
    {
        title: 'Nature & Healing Practices',
        icon: <SpaIcon />,
        color: '#9c27b0',
        text:
            'Abhyanjan (Oil Bath), Mud Bath, chanting, herbal healing, and natural detox practices reconnect individuals with traditional wellness systems.',
        bg: 'https://images.unsplash.com/photo-1604881991720-f91add269bed',
    },
    {
        title: 'Trekking & Outdoor Growth',
        icon: <HikingIcon />,
        color: '#00acc1',
        text:
            'Trekking builds confidence, awareness, teamwork and strengthens Sanghatan (unity) through nature-based experiences.',
        bg: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    },
    {
        title: 'Social & Cultural Activities',
        icon: <ParkIcon />,
        color: '#f06292',
        text:
            'Cultural programs, traditional games, seva activities, yoga camps, and community bonding experiences enrich personality development.',
        bg: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac',
    },
]

const ActivitiesSection: React.FC = () => {
    const refs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show')
                    }
                })
            },
            { threshold: 0.15 }
        )

        refs.current.forEach((el) => {
            if (el) observer.observe(el)
        })
    }, [])

    return (
        <Box id="activities" sx={{ py: 10, background: '#f7fafc', position: 'relative' }}>

            {/* HEADER */}
            <Container>
                <Typography
                    variant="h3"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 800,
                        mb: 2,
                        color: '#0f172a',
                    }}
                >
                    Activities at SPYSS
                </Typography>

                <Typography
                    sx={{
                        textAlign: 'center',
                        mb: 6,
                        color: '#64748b',
                        fontSize: '1.1rem',
                    }}
                >
                    A journey through yoga, tradition, nature & transformation
                </Typography>

                {/* STORY CARDS */}
                <Grid container spacing={4}>
                    {sections.map((s, i) => (
                        <Grid item xs={12} key={i}>
                            <Box
                                ref={(el) => (refs.current[i] = el)}
                                className="reveal"
                                sx={{
                                    opacity: 0,
                                    transform: 'translateY(40px)',
                                    transition: 'all 0.8s ease',
                                    '&.show': {
                                        opacity: 1,
                                        transform: 'translateY(0)',
                                    },
                                }}
                            >
                                <Card
                                    sx={{
                                        borderRadius: 4,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            backgroundImage: `url(${s.bg})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            opacity: 0.15,
                                        }}
                                    />

                                    <CardContent sx={{ p: 4, position: 'relative' }}>
                                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                            <Box sx={{ color: s.color }}>{s.icon}</Box>
                                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                                {s.title}
                                            </Typography>
                                        </Box>

                                        <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                                            {s.text}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* 🎥 FINAL VIDEO SECTION */}
                <Box sx={{ mt: 10, textAlign: 'center' }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            color: '#0f172a',
                        }}
                    >
                        Experience SPYSS in Action
                    </Typography>

                    <Typography sx={{ mb: 4, color: '#64748b' }}>
                        A glimpse into real yoga camps, seva activities & transformation journeys
                    </Typography>

                    <Box
                        sx={{
                            maxWidth: 900,
                            mx: 'auto',
                            borderRadius: 4,
                            overflow: 'hidden',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                            border: '1px solid rgba(0,0,0,0.08)',
                        }}
                    >
                        <video
                            src="https://spyss.org/videos/activities.mp4"
                            controls
                            autoPlay
                            muted
                            loop
                            style={{
                                width: '100%',
                                display: 'block',
                            }}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default ActivitiesSection
