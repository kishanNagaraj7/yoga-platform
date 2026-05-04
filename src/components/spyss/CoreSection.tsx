import React from 'react'
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
    Psychology,
    Favorite,
} from '@mui/icons-material'
import { motion } from 'framer-motion'

const CoreSection: React.FC = () => {
    return (
        <Box
            sx={{
                py: 12,
                background: 'linear-gradient(135deg, #f9fbf9 0%, #eef7f1 100%)',
            }}
        >
            <Container maxWidth="lg">

                {/* TITLE */}
                <Typography
                    variant="h3"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 700,
                        mb: 8,
                        background: 'linear-gradient(90deg, #2e7d32, #66bb6a)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Our Foundation
                </Typography>

                <Grid container spacing={5}>

                    {/* WHO WE ARE */}
                    <Grid item xs={12} md={4}>
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Card
                                sx={{
                                    height: '100%',
                                    p: 4,
                                    borderRadius: 4,
                                    textAlign: 'center',

                                    // 💎 Glassmorphism
                                    backdropFilter: 'blur(14px)',
                                    background: 'rgba(255,255,255,0.7)',
                                    border: '1px solid rgba(255,255,255,0.4)',

                                    // ✨ Hover
                                    transition: 'all 0.4s ease',
                                    '&:hover': {
                                        transform: 'translateY(-10px) scale(1.03)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                    },

                                    // 🌊 Floating
                                    animation: 'float 6s ease-in-out infinite',

                                    '@keyframes float': {
                                        '0%': { transform: 'translateY(0px)' },
                                        '50%': { transform: 'translateY(-8px)' },
                                        '100%': { transform: 'translateY(0px)' },
                                    },
                                }}
                            >
                                <CardContent>

                                    {/* ICON */}
                                    <Avatar
                                        sx={{
                                            bgcolor: '#1976d2', // 🔵 blue
                                            width: 64,
                                            height: 64,
                                            m: 'auto',
                                            mb: 3,
                                            boxShadow: '0 0 20px rgba(25,118,210,0.5)',
                                        }}
                                    >
                                        <Public />
                                    </Avatar>

                                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                                        Who We Are
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: '1.1rem',
                                            fontWeight: 500,
                                            color: '#1976d2',
                                            mb: 2,
                                        }}
                                    >
                                        A movement for social enrichment through Yoga Sadhana
                                    </Typography>

                                    <Typography color="text.secondary">
                                        Spreading harmony, discipline and awareness through collective yoga practice.
                                    </Typography>

                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>

                    {/* WHAT WE DO */}
                    <Grid item xs={12} md={4}>
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card
                                sx={{
                                    height: '100%',
                                    p: 4,
                                    borderRadius: 4,
                                    textAlign: 'center',

                                    backdropFilter: 'blur(14px)',
                                    background: 'rgba(255,255,255,0.7)',
                                    border: '1px solid rgba(255,255,255,0.4)',

                                    transition: 'all 0.4s ease',
                                    '&:hover': {
                                        transform: 'translateY(-10px) scale(1.03)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                    },

                                    animation: 'float 6s ease-in-out infinite',
                                    animationDelay: '1s',
                                }}
                            >
                                <CardContent>

                                    {/* ICON */}
                                    <Avatar
                                        sx={{
                                            bgcolor: '#f57c00', // 🟠 orange
                                            width: 64,
                                            height: 64,
                                            m: 'auto',
                                            mb: 3,
                                            boxShadow: '0 0 20px rgba(245,124,0,0.5)',
                                        }}
                                    >
                                        <Psychology />
                                    </Avatar>

                                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                                        What We Do
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: '1.05rem',
                                            mb: 3,
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Transforming individuals through disciplined yoga and value-based living.
                                    </Typography>

                                    {/* POINTS */}
                                    <Box sx={{ textAlign: 'left' }}>
                                        {[
                                            'Healthy lifestyle & discipline',
                                            'Positive thinking & confidence',
                                            'Strong family & social harmony',
                                        ].map((item, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.2 }}
                                            >
                                                <Typography
                                                    sx={{
                                                        mb: 1,
                                                        fontSize: '0.95rem',
                                                        display: 'flex',
                                                        gap: 1,
                                                    }}
                                                >
                                                    ✔ {item}
                                                </Typography>
                                            </motion.div>
                                        ))}
                                    </Box>

                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>

                    {/* PHILOSOPHY */}
                    <Grid item xs={12} md={4}>
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card
                                sx={{
                                    height: '100%',
                                    p: 4,
                                    borderRadius: 4,
                                    textAlign: 'center',

                                    backdropFilter: 'blur(14px)',
                                    background: 'rgba(255,255,255,0.7)',
                                    border: '1px solid rgba(255,255,255,0.4)',

                                    transition: 'all 0.4s ease',
                                    '&:hover': {
                                        transform: 'translateY(-10px) scale(1.03)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                    },

                                    animation: 'float 6s ease-in-out infinite',
                                    animationDelay: '2s',
                                }}
                            >
                                <CardContent>

                                    {/* ICON */}
                                    <Avatar
                                        sx={{
                                            bgcolor: '#2e7d32', //  green
                                            width: 64,
                                            height: 64,
                                            m: 'auto',
                                            mb: 3,
                                            boxShadow: '0 0 20px rgba(211,47,47,0.5)',
                                        }}
                                    >
                                        <Favorite />
                                    </Avatar>

                                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                                        Our Philosophy
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: '1.3rem',
                                            fontWeight: 'bold',
                                            color: '#d32f2f',
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        One for All <br /> and <br /> All for One
                                    </Typography>

                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    )
}

export default CoreSection
