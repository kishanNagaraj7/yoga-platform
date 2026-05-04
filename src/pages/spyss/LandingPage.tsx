import React from 'react'
import { Box } from '@mui/material'
import Header from '../../components/spyss/Header'
import HeroSection from '../../components/spyss/HeroSection'


const LandingPage: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Header />
            <HeroSection />
        </Box>
    )
}

export default LandingPage
