import React from 'react'
import AboutSection from '../../components/spyss/AboutSection'
import CoreSection from '../../components/spyss/CoreSection'
import CorePrinciplesSection from '../../components/spyss/CorePrinciplesSection'
import ProgramsSection from '../../components/spyss/ProgramsSection'
import HomeHeader from '../../components/spyss/HomeHeader'
import ActivitiesSection from "@/components/spyss/ActivitiesSection.tsx";
import SpecialtiesSection from "@/components/spyss/SpecialtiesSection.tsx";
import ReachUsSection from "@/components/spyss/ReachUsSection.tsx";
import BranchSearchSection from "@/components/spyss/BranchSearchSection.tsx";
import {
    Box,
    Container,
    Typography,
    Button,
} from '@mui/material'
import {
    ArrowForward,
} from '@mui/icons-material'
import BranchRoutSection from "@/components/spyss/BranchRoutSection.tsx";





const HeroSection: React.FC = () => {

    const scrollTo = (id: string) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            {/* pages */}
            <Box sx={{ py: 8, bgcolor: '#f9f9f9' }}>
                <HomeHeader />
                <BranchRoutSection />
                <AboutSection />
                <CorePrinciplesSection />
                <CoreSection />
                <SpecialtiesSection />
                <ActivitiesSection />
                <ProgramsSection />
                <BranchSearchSection />
                <ReachUsSection />

            </Box>


            {/*/!* CTA *!/*/}
            {/*<Box textAlign="center">*/}
            {/*    <Button*/}
            {/*        variant="contained"*/}
            {/*        onClick={() => scrollTo('programs')}*/}
            {/*        endIcon={<ArrowForward />}*/}
            {/*        sx={{ bgcolor: 'white', color: '#2e7d32' }}*/}
            {/*    >*/}
            {/*        Browse Classes*/}
            {/*    </Button>*/}
            {/*</Box>*/}

            {/*/!* BRANCHES *!/*/}
            {/*<Box id="branches" sx={{ py: 8 }}>*/}
            {/*    <Container>*/}
            {/*        <Typography variant="h5" gutterBottom>Find Nearby Branch</Typography>*/}

            {/*        <Typography>*/}
            {/*            India → Karnataka → Bangalore → Area → Classes (connect DB here)*/}
            {/*        </Typography>*/}
            {/*    </Container>*/}
            {/*</Box>*/}
        </>
    )
}

export default HeroSection
