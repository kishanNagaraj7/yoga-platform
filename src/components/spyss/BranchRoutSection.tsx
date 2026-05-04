import React from 'react'
import {
    Box,
    Typography,
    Button,
    Stack,
    Chip,
} from '@mui/material'
import { ArrowForward } from "@mui/icons-material"

const BranchRoutSection: React.FC = () => {

    const scrollTo = (id: string) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <Box
            sx={{
                position: 'relative',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',

                // 🍏 Apple-style soft background (light, calm)
                background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
            }}
        >

            {/* 🌿 Soft floating ambient light (no harsh colors) */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 700,
                    height: 700,
                    background: 'radial-gradient(circle, rgba(15,162,233,0.08), transparent 60%)',
                    top: -250,
                    left: -200,
                    filter: 'blur(90px)',
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    width: 700,
                    height: 700,
                    background: 'radial-gradient(circle, rgba(80,177,172,0.06), transparent 60%)',
                    bottom: -250,
                    right: -200,
                    filter: 'blur(90px)',
                }}
            />

            {/* 🧘 Yoga background image */}
            <Box
                component="img"
                src="https://cdn.vectorstock.com/i/500p/13/43/meditating-and-doing-yoga-man-vector-951343.jpg"
                alt="Yoga Pose"
                sx={{
                    position: 'absolute',
                    width: { xs: '140%', md: '70%' },
                    opacity: 0.18,
                    filter: 'blur(0.5px)',
                    animation: 'float 7s ease-in-out infinite',
                }}
            />

            {/* 🌫️ readability overlay (Apple style soft veil) */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(248,250,252,0.95) 70%)',
                }}
            />

            {/* CONTENT */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    px: 3,
                    maxWidth: 780,
                }}
            >

                {/* HEADLINE */}
                <Typography
                    sx={{
                        fontWeight: 850,
                        fontSize: { xs: '2.2rem', md: '3.5rem' },
                        letterSpacing: '-1px',
                        color: '#0f172a',
                        mb: 2,
                        whiteSpace: { xs: 'normal', md: 'nowrap' },
                    }}
                >
                    Free Yoga Classes Near You
                </Typography>

                {/* CHIPS */}
                <Stack
                    direction="row"
                    spacing={1.2}
                    justifyContent="center"
                    flexWrap="wrap"
                    sx={{ mb: 4 }}
                >
                    {['General', 'Youth', 'Women', 'Children', 'Professionals', 'Seniors'].map((item) => (
                        <Chip
                            key={item}
                            label={item}
                            sx={{
                                bgcolor: '#f1f5f9',
                                color: '#334155',
                                fontWeight: 500,
                                border: '1px solid rgba(15, 23, 42, 0.06)',
                                px: 0.5,
                            }}
                        />
                    ))}
                </Stack>

                {/* SUBTEXT */}
                <Typography
                    sx={{
                        fontSize: '1.1rem',
                        mb: 4,
                        color: '#64748b',
                    }}
                >
                    Experience the yogic way of life from day one.
                </Typography>

                {/* CTA */}
                <Button
                    variant="contained"
                    onClick={() => scrollTo('branches')}
                    endIcon={<ArrowForward sx={{ fontSize: 22 }} />}
                    sx={{
                        px: 6,
                        py: 2,
                        borderRadius: '999px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'none',

                        color: '#fff',
                        background: 'linear-gradient(90deg, #50B1AC, #0FA2E9)',

                        boxShadow: '0 10px 25px rgba(15, 162, 233, 0.18)',

                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 14px 35px rgba(15, 162, 233, 0.28)',
                            background: 'linear-gradient(90deg, #3fa39e, #0b8fce)',
                        },

                        transition: 'all 0.25s ease',
                    }}
                >
                    Find Classes
                </Button>

            </Box>

            {/* animation */}
            <style>
                {`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-12px); }
                    100% { transform: translateY(0px); }
                }
                `}
            </style>

        </Box>
    )
}

export default BranchRoutSection




// import React from 'react'
// import {
//     Box,
//     Typography,
//     Button,
//     Stack,
//     Chip,
// } from '@mui/material'
// import { ArrowForward } from "@mui/icons-material"
//
// const BranchRoutSection: React.FC = () => {
//
//     const scrollTo = (id: string) => {
//         const el = document.getElementById(id)
//         if (el) el.scrollIntoView({ behavior: 'smooth' })
//     }
//
//     return (
//         <Box
//             sx={{
//                 position: 'relative',
//                 height: '100vh',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 overflow: 'hidden',
//                 background: '#f7f9fc',
//             }}
//         >
//
//             {/* 🌿 Animated Yoga Background */}
//             <Box
//                 component="img"
//                 src="https://cdn.vectorstock.com/i/500p/13/43/meditating-and-doing-yoga-man-vector-951343.jpg"   // or Lottie / SVG animation
//                 alt="Yoga Pose"
//                 sx={{
//                     position: 'absolute',
//                     width: { xs: '120%', md: '60%' },
//                     opacity: 0.20,
//                     filter: 'blur(0.5px)',
//                     animation: 'float 6s ease-in-out infinite',
//                 }}
//             />
//
//             {/* soft overlay for readability */}
//             <Box
//                 sx={{
//                     position: 'absolute',
//                     inset: 0,
//                     background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(247,249,252,0.95) 70%)',
//                 }}
//             />
//
//             {/* CONTENT */}
//             <Box
//                 sx={{
//                     position: 'relative',
//                     zIndex: 2,
//                     textAlign: 'center',
//                     px: 3,
//                     maxWidth: 700,
//                 }}
//             >
//
//                 <Typography
//                     sx={{
//                         fontWeight: 800,
//                         fontSize: { xs: '2.2rem', md: '3.5rem' },
//                         letterSpacing: '-1px',
//                         color: '#0f172a',
//                         mb: 2,
//
//                         whiteSpace: { xs: 'normal', md: 'nowrap' },
//                     }}
//                 >
//                     Free Yoga Classes Near You
//                 </Typography>
//
//                 <Stack
//                     direction="row"
//                     spacing={1.5}
//                     justifyContent="center"
//                     flexWrap="wrap"
//                     sx={{ mb: 4 }}
//                 >
//                     {['General', 'Youth', 'Women', 'Professionals', 'Seniors'].map((item) => (
//                         <Chip
//                             key={item}
//                             label={item}
//                             sx={{
//                                 bgcolor: '#f1f5f9',
//                                 color: '#334155',
//                                 fontWeight: 500,
//                                 border: '1px solid rgba(15, 23, 42, 0.06)',
//                             }}
//                         />
//                     ))}
//                 </Stack>
//
//                 <Typography
//                     sx={{
//                         fontSize: '1.1rem',
//                         mb: 4,
//                         color: '#64748b',
//                     }}
//                 >
//                     Experience the yogic way of life from day one.
//                 </Typography>
//
//                 <Button
//                     variant="contained"
//                     onClick={() => scrollTo('branchSearchSection')}
//                     endIcon={<ArrowForward sx={{ fontSize: 22 }} />}
//                     sx={{
//                         px: 6,
//                         py: 2,
//                         borderRadius: '999px',
//                         fontSize: '1.1rem',
//                         fontWeight: 600,
//                         textTransform: 'none',
//                         color: '#fff',
//                         background: 'linear-gradient(90deg, #50B1AC, #0FA2E9)',
//                         boxShadow: '0 10px 25px rgba(15, 162, 233, 0.2)',
//                         '&:hover': {
//                             transform: 'translateY(-2px)',
//                             boxShadow: '0 14px 35px rgba(15, 162, 233, 0.3)',
//                         },
//                         transition: '0.25s ease',
//                     }}
//                 >
//                     Find Classes
//                 </Button>
//
//             </Box>
//
//             {/* animation */}
//             <style>
//                 {`
//                 @keyframes float {
//                     0% { transform: translateY(0px); }
//                     50% { transform: translateY(-15px); }
//                     100% { transform: translateY(0px); }
//                 }
//                 `}
//             </style>
//
//         </Box>
//     )
// }
//
// export default BranchRoutSection




// import React from 'react'
// import {
//     Box,
//     Container,
//     Typography,
//     Button,
//     Stack,
//     Chip,
// } from '@mui/material'
// import { ArrowForward } from "@mui/icons-material"
//
// const BranchRoutSection: React.FC = () => {
//
//     const scrollTo = (id: string) => {
//         const el = document.getElementById(id)
//         if (el) el.scrollIntoView({ behavior: 'smooth' })
//     }
//
//     return (
//         <Box
//             sx={{
//                 position: 'relative',
//                 py: { xs: 10, md: 14 },
//                 overflow: 'hidden',
//                 background: 'linear-gradient(180deg, #f7f9fc 0%, #ffffff 100%)',
//             }}
//         >
//
//             {/* soft background glow */}
//             <Box sx={{
//                 position: 'absolute',
//                 width: 600,
//                 height: 600,
//                 background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent 60%)',
//                 top: -200,
//                 left: -200,
//                 filter: 'blur(80px)',
//             }} />
//
//             <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
//
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'space-between',
//                         gap: 6,
//                         flexDirection: { xs: 'column', md: 'row' },
//                     }}
//                 >
//
//                     {/* LEFT CONTENT */}
//                     <Box sx={{ flex: 1 }}>
//
//                         <Typography
//                             sx={{
//                                 fontWeight: 750,
//                                 fontSize: { xs: '2.2rem', md: '3.2rem' },
//                                 letterSpacing: '-1px',
//                                 color: '#0f172a',
//                                 mb: 2,
//                             }}
//                         >
//                             Free Yoga Classes Near You
//                         </Typography>
//
//                         <Stack
//                             direction="row"
//                             spacing={1.5}
//                             flexWrap="wrap"
//                             sx={{ mb: 3 }}
//                         >
//                             {['General', 'Youth', 'Women', 'Professionals', 'Seniors'].map((item) => (
//                                 <Chip
//                                     key={item}
//                                     label={item}
//                                     sx={{
//                                         bgcolor: '#f1f5f9',
//                                         color: '#334155',
//                                         fontWeight: 500,
//                                         border: '1px solid rgba(15, 23, 42, 0.06)',
//                                     }}
//                                 />
//                             ))}
//                         </Stack>
//
//                         <Typography
//                             sx={{
//                                 fontSize: '1.05rem',
//                                 mb: 4,
//                                 color: '#64748b',
//                                 maxWidth: 450,
//                             }}
//                         >
//                             Experience the yogic way of life from day one.
//                         </Typography>
//
//                         <Button
//                             variant="contained"
//                             onClick={() => scrollTo('branchSearchSection')}
//                             endIcon={<ArrowForward sx={{ fontSize: 24 }} />}
//                             sx={{
//                                 px: 5,
//                                 py: 2,
//                                 borderRadius: '40px',
//                                 fontSize: '1.1rem',
//                                 fontWeight: 600,
//                                 textTransform: 'none',
//                                 color: '#F8FAFC',
//                                 background: 'linear-gradient(90deg, #50B1AC, #0FA2E9)',
//                                 boxShadow: '0 10px 25px rgba(15, 162, 233, 0.25)',
//                                 '&:hover': {
//                                     background: 'linear-gradient(90deg, #3fa39e, #0b8fce)',
//                                     transform: 'translateY(-2px)',
//                                     boxShadow: '0 14px 35px rgba(15, 162, 233, 0.35)',
//                                 },
//                                 transition: 'all 0.25s ease',
//                             }}
//                         >
//                             Find Classes
//                         </Button>
//
//                     </Box>
//
//                     {/* RIGHT VISUAL */}
//                     <Box
//                         sx={{
//                             flex: 1,
//                             display: 'flex',
//                             justifyContent: 'center',
//                         }}
//                     >
//                         <Box
//                             component="img"
//                             src="https://cdn.vectorstock.com/i/500p/13/43/meditating-and-doing-yoga-man-vector-951343.jpg"   // <-- replace with your image
//                             alt="Yoga Pose"
//                             sx={{
//                                 width: '100%',
//                                 maxWidth: 420,
//                                 filter: 'drop-shadow(0px 20px 40px rgba(0,0,0,0.08))',
//                             }}
//                         />
//                     </Box>
//
//                 </Box>
//
//             </Container>
//         </Box>
//     )
// }
//
// export default BranchRoutSection



// import React from 'react'
// import {
//     Box,
//     Container,
//     Typography,
//     Button,
//     Stack,
//     Chip,
// } from '@mui/material'
// import { ArrowForward } from "@mui/icons-material"
//
// const BranchRoutSection: React.FC = () => {
//
//     const scrollTo = (id: string) => {
//         const el = document.getElementById(id)
//         if (el) el.scrollIntoView({ behavior: 'smooth' })
//     }
//
//     return (
//         <Box
//             sx={{
//                 position: 'relative',
//                 py: { xs: 10, md: 14 },
//                 overflow: 'hidden',
//                 background: 'linear-gradient(180deg, #f7f9fc 0%, #ffffff 100%)',
//             }}
//         >
//
//             {/* Soft ambient light */}
//             <Box
//                 sx={{
//                     position: 'absolute',
//                     width: 600,
//                     height: 600,
//                     background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent 60%)',
//                     top: -200,
//                     left: -200,
//                     filter: 'blur(80px)',
//                 }}
//             />
//
//             <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
//
//                 {/* HERO CARD (Apple-like soft panel) */}
//                 <Box
//                     sx={{
//                         textAlign: 'center',
//                         px: { xs: 3, md: 7 },
//                         py: { xs: 7, md: 9 },
//                         borderRadius: 6,
//                         background: '#ffffff',
//                         border: '1px solid rgba(15, 23, 42, 0.06)',
//                         boxShadow: '0 20px 60px rgba(15, 23, 42, 0.06)',
//                     }}
//                 >
//
//                     {/* HEADLINE */}
//                     <Typography
//                         sx={{
//                             fontWeight: 750,
//                             fontSize: { xs: '2.2rem', md: '3.2rem' },
//                             letterSpacing: '-1px',
//                             color: '#0f172a',
//                             mb: 2,
//                         }}
//                     >
//                         Free Yoga Classes Near You
//                     </Typography>
//
//                     {/* CHIPS (Apple-style soft pills) */}
//                     <Stack
//                         direction="row"
//                         spacing={1.5}
//                         justifyContent="center"
//                         flexWrap="wrap"
//                         sx={{ mb: 5 }}
//                     >
//                         {['General', 'Youth', 'Women', 'Professionals', 'Seniors'].map((item) => (
//                             <Chip
//                                 key={item}
//                                 label={item}
//                                 sx={{
//                                     bgcolor: '#f1f5f9',
//                                     color: '#334155',
//                                     fontWeight: 500,
//                                     border: '1px solid rgba(15, 23, 42, 0.06)',
//                                 }}
//                             />
//                         ))}
//                     </Stack>
//
//                     {/* CTA TEXT */}
//                     <Typography
//                         sx={{
//                             fontSize: '1.05rem',
//                             mb: 3,
//                             color: '#64748b',
//                         }}
//                     >
//                         Experience the yogic way of life from day one.
//                     </Typography>
//
//                     <Button
//                         variant="contained"
//                         onClick={() => scrollTo('branchSearchSection')}
//                         endIcon={
//                             <ArrowForward sx={{ fontSize: 24 }} />
//                         }
//                         sx={{
//                             px: 5,
//                             py: 2,
//                             borderRadius: '40px',
//                             fontSize: '1.25rem',
//                             fontWeight: 600,
//                             textTransform: 'none',
//                             color: '#F8FAFC',
//
//                             background: 'linear-gradient(90deg, #50B1AC, #0FA2E9)',
//
//                             display: 'flex',
//                             gap: 1,
//                             margin: '0 auto',
//
//                             boxShadow: '0 10px 25px rgba(15, 162, 233, 0.25)',
//
//                             '&:hover': {
//                                 background: 'linear-gradient(90deg, #3fa39e, #0b8fce)',
//                                 boxShadow: '0 14px 35px rgba(15, 162, 233, 0.35)',
//                                 transform: 'translateY(-2px)',
//                             },
//
//                             transition: 'all 0.25s ease',
//                         }}
//                     >
//                         Find Classes
//                     </Button>
//
//
//
//                 </Box>
//
//             </Container>
//         </Box>
//     )
// }
//
// export default BranchRoutSection
