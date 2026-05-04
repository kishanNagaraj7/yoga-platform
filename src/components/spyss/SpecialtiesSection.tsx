import React, { useEffect, useState } from 'react'
import {
    Box,
    Container,
    Typography,
    IconButton,
} from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'

const items = [
    {
        title: 'Yoga & Meditation',
        desc: 'Yoga, Meditation, Pranayama, Yoga Therapy, Relaxation, Human Anatomy',
        image: 'https://spyss.org/spyss_logo.png',
    },
    {
        title: 'Yoga Camps',
        desc: 'Yoga Pravesh, Preliminary & Advanced Classes, Aatmanusandhana, Sadhana Sourabha',
        image: '/images/camp.jpg',
    },
    {
        title: 'Teacher Training',
        desc: 'Preliminary, Secondary, Pragata Advanced & Professional Training',
        image: '/images/training.jpg',
    },
    {
        title: 'Community Programs',
        desc: 'Children, Youth, Slum, Farmers & Patient-focused Yoga programs',
        image: '/images/community.jpg',
    },
    {
        title: 'Traditional Practices',
        desc: 'Abhyanjana, Matru Bhojana, Natural healing practices',
        image: '/images/traditional.jpg',
    },
    {
        title: 'Seva & Activities',
        desc: 'Tree Plantation, Surya Namaskar Yagna, Free Yoga',
        image: '/images/seva.jpg',
    },
    {
        title: 'Lifestyle & Skills',
        desc: 'Cooking, Herbal Drinks, Parenting, Storytelling',
        image: '/images/lifestyle.jpg',
    },
]

const SpecialtiesSection: React.FC = () => {
    const [index, setIndex] = useState(0)
    const [paused, setPaused] = useState(false)

    const current = items[index]

    // 🔥 Auto-play
    useEffect(() => {
        if (paused) return

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % items.length)
        }, 7000)

        return () => clearInterval(interval)
    }, [paused, index])

    // 🔄 Resume after inactivity
    useEffect(() => {
        if (!paused) return

        const timeout = setTimeout(() => {
            setPaused(false)
        }, 10000)

        return () => clearTimeout(timeout)
    }, [paused])

    const next = () => {
        setIndex((prev) => (prev + 1) % items.length)
        setPaused(true)
    }

    const prev = () => {
        setIndex((prev) => (prev - 1 + items.length) % items.length)
        setPaused(true)
    }

    return (
        <Box
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            sx={{
                height: '90vh',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* BACKGROUND IMAGE */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current.image}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${current.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </AnimatePresence>

            {/* DARK OVERLAY */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'linear-gradient(180deg, rgba(0,0,0,0.5), rgba(0,0,0,0.85))',
                }}
            />

            {/* CONTENT */}
            <Container
                maxWidth="lg"
                sx={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current.title}
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* TITLE */}
                        <Typography
                            variant="h2"
                            sx={{
                                color: '#fff',
                                fontWeight: 700,
                                mb: 3,
                            }}
                        >
                            {current.title}
                        </Typography>

                        {/* FEATURE PILLS */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                gap: 2,
                                maxWidth: 850,
                                mx: 'auto',
                            }}
                        >
                            {current.desc.split(',').map((item, i) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.12 }}
                                >
                                    <Box
                                        sx={{
                                            px: 3,
                                            py: 1.3,
                                            borderRadius: 10,

                                            backdropFilter: 'blur(10px)',
                                            background: 'rgba(255,255,255,0.12)',
                                            border: '1px solid rgba(255,255,255,0.2)',

                                            color: '#fff',
                                            fontSize: '0.95rem',
                                            fontWeight: 500,

                                            transition: '0.3s',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                background: 'rgba(255,255,255,0.18)',
                                            },
                                        }}
                                    >
                                        ✦ {item.trim()}
                                    </Box>
                                </motion.div>
                            ))}
                        </Box>
                    </motion.div>
                </AnimatePresence>
            </Container>

            {/* NAV BUTTONS */}
            <IconButton
                onClick={prev}
                sx={{
                    position: 'absolute',
                    left: 20,
                    top: '50%',
                    color: '#fff',
                }}
            >
                <ArrowBackIos />
            </IconButton>

            <IconButton
                onClick={next}
                sx={{
                    position: 'absolute',
                    right: 20,
                    top: '50%',
                    color: '#fff',
                }}
            >
                <ArrowForwardIos />
            </IconButton>

            {/* DOT INDICATORS */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 30,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                }}
            >
                {items.map((_, i) => (
                    <Box
                        key={i}
                        onClick={() => {
                            setIndex(i)
                            setPaused(true)
                        }}
                        sx={{
                            width: index === i ? 24 : 10,
                            height: 10,
                            borderRadius: 5,
                            bgcolor: '#fff',
                            opacity: index === i ? 1 : 0.4,
                            cursor: 'pointer',
                            transition: '0.3s',
                        }}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default SpecialtiesSection
