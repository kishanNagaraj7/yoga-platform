import React from 'react'
import { Box, Typography, Container } from '@mui/material'

const HomeHeader: React.FC = () => {
    return (
        <Box id="home"
            sx={{
                py: 6,
                background: 'linear-gradient(180deg, #f9fdfb 0%, #eef7f2 100%)',
                textAlign: 'center',
            }}
        >
            <Container maxWidth="lg">

                {/* 🔥 TOP VALUES LINE */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        maxWidth: 900,
                        mx: 'auto',
                        mb: 2,
                        fontWeight: 'bold',
                        fontSize: { xs: '0.9rem', md: '1.2rem' },
                        letterSpacing: 1,
                        color: '#2e7d32',
                    }}
                >
                    <Box sx={{ flex: 1, textAlign: 'center' }}>Samskara</Box>
                    <Box sx={{ flex: 1, textAlign: 'center' }}>Sanghatane</Box>
                    <Box sx={{ flex: 1, textAlign: 'center' }}>Seve</Box>
                </Box>

                {/* 🔥 ORG NAME (MATCH WIDTH) */}
                <Typography
                    sx={{
                        maxWidth: 900,
                        mx: 'auto',
                        fontWeight: 'bold',
                        fontSize: { xs: '1rem', md: '1.6rem' },
                        color: '#1b5e20',
                        letterSpacing: 1,
                        mb: 4,
                    }}
                >
                    Shri Pathanjali Yoga Shikshana Samiti (R) Karnataka
                </Typography>

                {/* 🔥 IMAGE ROW */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        maxWidth: 900,
                        mx: 'auto',
                        gap: 3,
                        flexWrap: 'wrap',
                    }}
                >
                    {/* 🇮🇳 Bharat Mata */}
                    <Box
                        component="img"
                        src="https://tse2.mm.bing.net/th/id/OIP.uAqLqIwxFtfyfvnlX3hdvgHaJW?rs=1&pid=ImgDetMain&o=7&rm=3"
                        alt="Bharat Mata"
                        sx={{
                            width: { xs: 80, md: 120 },
                            height: 'auto',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            boxShadow: 3,
                            transition: '0.3s',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                boxShadow: '0 0 20px rgba(255,152,0,0.6)',
                            },
                        }}
                    />

                    {/* 🕉 SPYSS LOGO */}
                    <Box
                        component="img"
                        src="https://spyss.org/spyss_logo.png"
                        alt="SPYSS Logo"
                        sx={{
                            width: { xs: 100, md: 150 },
                            height: 'auto',
                            transition: '0.3s',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            },
                        }}
                    />

                    {/* 🧘 Vivekananda */}
                    <Box
                        component="img"
                        src="https://tse1.explicit.bing.net/th/id/OIP.nkI8YzaB7GTFuMvWcQ6SMQHaKR?pid=ImgDet&w=187&h=259&c=7&dpr=1.3&o=7&rm=3"
                        alt="Swami Vivekananda"
                        sx={{
                            width: { xs: 80, md: 120 },
                            height: 'auto',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            boxShadow: 3,
                            transition: '0.3s',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                boxShadow: '0 0 20px rgba(233,30,99,0.6)',
                            },
                        }}
                    />
                </Box>

                {/* 🌟 SUBTLE DIVIDER */}
                <Box
                    sx={{
                        mt: 5,
                        height: 2,
                        width: 120,
                        mx: 'auto',
                        bgcolor: '#2e7d32',
                        borderRadius: 2,
                        opacity: 0.4,
                    }}
                />
            </Container>
        </Box>
    )
}

export default HomeHeader
