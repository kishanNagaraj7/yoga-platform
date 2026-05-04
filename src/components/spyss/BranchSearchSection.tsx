// import React, { useState } from 'react'
// import {
//     Box,
//     Container,
//     Typography,
//     TextField,
//     Button,
//     Grid,
//     Card,
//     CardContent,
//     Stack,
//     Chip,
// } from '@mui/material'
// import {
//     LocationOn,
//     Search,
//     MyLocation,
// } from '@mui/icons-material'
//
// const mockBranches = [
//     {
//         name: 'SPYSS Tumkur Branch',
//         location: 'Tumkur, Karnataka',
//         time: '6:00 AM - 7:30 AM',
//     },
//     {
//         name: 'SPYSS Bangalore Branch',
//         location: 'Bangalore, Karnataka',
//         time: '5:30 AM - 7:00 AM',
//     },
//     {
//         name: 'SPYSS Mysore Branch',
//         location: 'Mysore, Karnataka',
//         time: '6:00 AM - 7:00 AM',
//     },
// ]
//
// const BranchSearchSection: React.FC = () => {
//     const [search, setSearch] = useState('')
//     const [results, setResults] = useState(mockBranches)
//
//     const handleSearch = () => {
//         const filtered = mockBranches.filter((b) =>
//             b.location.toLowerCase().includes(search.toLowerCase())
//         )
//         setResults(filtered)
//     }
//
//     return (
//         <Box
//             sx={{
//                 py: 12,
//                 background:
//                     'linear-gradient(135deg, #f9fbf9 0%, #eef7f1 100%)',
//             }}
//         >
//             <Container maxWidth="lg">
//
//                 {/* 🔥 HEADLINE */}
//                 <Typography
//                     variant="h3"
//                     align="center"
//                     sx={{
//                         fontWeight: 700,
//                         mb: 2,
//                         color: '#1b5e20',
//                     }}
//                 >
//                     Find Free Yoga Classes Near You
//                 </Typography>
//
//                 <Typography
//                     align="center"
//                     sx={{
//                         fontSize: '1.2rem',
//                         mb: 4,
//                         color: 'text.secondary',
//                     }}
//                 >
//                     Begin your yoga journey — completely free, for life 🌿
//                 </Typography>
//
//                 {/* 💥 HIGHLIGHTS */}
//                 <Stack
//                     direction="row"
//                     spacing={2}
//                     justifyContent="center"
//                     flexWrap="wrap"
//                     sx={{ mb: 5 }}
//                 >
//                     {[
//                         '100% Free Classes',
//                         'Lifetime Access',
//                     ].map((item) => (
//                         <Chip
//                             key={item}
//                             label={item}
//                             sx={{
//                                 px: 2,
//                                 py: 1,
//                                 fontSize: '0.95rem',
//                                 fontWeight: 500,
//                                 bgcolor: '#e8f5e9',
//                             }}
//                         />
//                     ))}
//                 </Stack>
//
//                 {/* 🔍 SEARCH BAR */}
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         gap: 2,
//                         justifyContent: 'center',
//                         mb: 6,
//                         flexWrap: 'wrap',
//                     }}
//                 >
//                     <TextField
//                         placeholder="Enter your city or location"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         sx={{
//                             width: { xs: '100%', md: 400 },
//                             bgcolor: '#fff',
//                             borderRadius: 2,
//                         }}
//                     />
//
//                     <Button
//                         variant="contained"
//                         startIcon={<Search />}
//                         onClick={handleSearch}
//                         sx={{
//                             bgcolor: '#2e7d32',
//                             px: 3,
//                         }}
//                     >
//                         Search
//                     </Button>
//
//                     <Button
//                         variant="outlined"
//                         startIcon={<MyLocation />}
//                         sx={{
//                             borderColor: '#2e7d32',
//                             color: '#2e7d32',
//                         }}
//                     >
//                         Use My Location
//                     </Button>
//                 </Box>
//
//                 {/* 📍 RESULTS */}
//                 <Grid container spacing={4}>
//                     {results.map((branch, i) => (
//                         <Grid item xs={12} md={4} key={i}>
//                             <Card
//                                 sx={{
//                                     borderRadius: 4,
//                                     backdropFilter: 'blur(10px)',
//                                     background: 'rgba(255,255,255,0.7)',
//                                     border: '1px solid rgba(255,255,255,0.3)',
//                                     transition: '0.3s',
//
//                                     '&:hover': {
//                                         transform: 'translateY(-8px)',
//                                         boxShadow:
//                                             '0 12px 30px rgba(0,0,0,0.15)',
//                                     },
//                                 }}
//                             >
//                                 <CardContent>
//                                     <Typography
//                                         variant="h6"
//                                         fontWeight="bold"
//                                         sx={{ mb: 1 }}
//                                     >
//                                         {branch.name}
//                                     </Typography>
//
//                                     <Stack
//                                         direction="row"
//                                         spacing={1}
//                                         alignItems="center"
//                                         sx={{ mb: 1 }}
//                                     >
//                                         <LocationOn
//                                             sx={{ fontSize: 18 }}
//                                         />
//                                         <Typography>
//                                             {branch.location}
//                                         </Typography>
//                                     </Stack>
//
//                                     <Typography
//                                         sx={{
//                                             color: 'text.secondary',
//                                             mb: 2,
//                                         }}
//                                     >
//                                         🕒 {branch.time}
//                                     </Typography>
//
//                                     <Button
//                                         fullWidth
//                                         variant="contained"
//                                         sx={{
//                                             bgcolor: '#2e7d32',
//                                             borderRadius: 2,
//                                         }}
//                                     >
//                                         Join Now
//                                     </Button>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//
//                 {/* ❤️ CTA */}
//                 <Box sx={{ textAlign: 'center', mt: 8 }}>
//                     <Typography
//                         sx={{
//                             fontSize: '1.2rem',
//                             mb: 2,
//                             color: 'text.secondary',
//                         }}
//                     >
//                         Join thousands transforming their lives through yoga
//                     </Typography>
//
//                     <Button
//                         variant="contained"
//                         size="large"
//                         sx={{
//                             px: 5,
//                             py: 1.5,
//                             fontSize: '1rem',
//                             bgcolor: '#1b5e20',
//                             borderRadius: 3,
//                         }}
//                     >
//                         Start Your Free Journey Today
//                     </Button>
//                 </Box>
//
//             </Container>
//         </Box>
//     )
// }
//
// export default BranchSearchSection




import React, { useState } from 'react'
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    Stack,
    Chip,
} from '@mui/material'
import {
    LocationOn,
    Search,
    MyLocation,
} from '@mui/icons-material'

const mockBranches = [
    {
        name: 'SPYSS Tumkur Branch',
        location: 'Tumkur, Karnataka',
        time: '6:00 AM - 7:30 AM',
    },
    {
        name: 'SPYSS Bangalore Branch',
        location: 'Bangalore, Karnataka',
        time: '5:30 AM - 7:00 AM',
    },
    {
        name: 'SPYSS Mysore Branch',
        location: 'Mysore, Karnataka',
        time: '6:00 AM - 7:00 AM',
    },
]

const BranchSearchSection: React.FC = () => {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState(mockBranches)

    const handleSearch = () => {
        const filtered = mockBranches.filter((b) =>
            b.location.toLowerCase().includes(search.toLowerCase())
        )
        setResults(filtered)
    }

    return (
        <Box id="branches"
            sx={{
                py: 12,
                background: '#f8fafc', // clean modern background
            }}
        >
            <Container maxWidth="lg">

                {/* 🔥 HEADLINE */}
                <Typography
                    variant="h3"
                    align="center"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: '#111',
                    }}
                >
                    Find Free Yoga Classes Near You
                </Typography>

                {/*<Typography*/}
                {/*    align="center"*/}
                {/*    sx={{*/}
                {/*        fontSize: '1.2rem',*/}
                {/*        mb: 4,*/}
                {/*        color: '#555',*/}
                {/*    }}*/}
                {/*>*/}
                {/*    Begin your yoga journey — completely free, for life 🌿*/}
                {/*</Typography>*/}

                {/* ✨ SUBTLE GRADIENT BAR */}
                <Box
                    sx={{
                        width: 80,
                        height: 4,
                        mx: 'auto',
                        mb: 5,
                        borderRadius: 10,
                        background:
                            'linear-gradient(90deg, #ff8a00, #e52e71)',
                    }}
                />

                {/* 💥 HIGHLIGHTS */}
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    flexWrap="wrap"
                    sx={{ mb: 6 }}
                >
                    {[
                        'Free Classes',
                        'Lifetime Access',
                    ].map((item) => (
                        <Chip
                            key={item}
                            label={item}
                            sx={{
                                px: 2,
                                py: 1,
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                bgcolor: 'rgba(0,0,0,0.05)',
                                color: '#333',
                            }}
                        />
                    ))}
                </Stack>

                {/* 🔍 SEARCH BAR */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'center',
                        mb: 8,
                        flexWrap: 'wrap',
                    }}
                >
                    <TextField
                        placeholder="Enter your city or location"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{
                            width: { xs: '100%', md: 400 },
                            bgcolor: '#fff',
                            borderRadius: 2,
                        }}
                    />

                    <Button
                        variant="contained"
                        startIcon={<Search />}
                        onClick={handleSearch}
                        sx={{
                            bgcolor: '#111',
                            color: '#fff',
                            px: 3,
                            '&:hover': {
                                bgcolor: '#000',
                            },
                        }}
                    >
                        Search
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<MyLocation />}
                        sx={{
                            borderColor: '#ccc',
                            color: '#333',
                        }}
                    >
                        Use My Location
                    </Button>
                </Box>

                {/* 📍 RESULTS */}
                <Grid container spacing={4}>
                    {results.map((branch, i) => (
                        <Grid item xs={12} md={4} key={i}>
                            <Card
                                sx={{
                                    borderRadius: 4,
                                    backdropFilter: 'blur(10px)',
                                    background: 'rgba(255,255,255,0.75)',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    transition: '0.3s',

                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow:
                                            '0 15px 40px rgba(0,0,0,0.12)',
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        sx={{ mb: 1, color: '#111' }}
                                    >
                                        {branch.name}
                                    </Typography>

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                        sx={{ mb: 1 }}
                                    >
                                        <LocationOn
                                            sx={{ fontSize: 18, color: '#e53935' }}
                                        />
                                        <Typography sx={{ color: '#555' }}>
                                            {branch.location}
                                        </Typography>
                                    </Stack>

                                    <Typography
                                        sx={{
                                            color: '#777',
                                            mb: 3,
                                        }}
                                    >
                                        🕒 {branch.time}
                                    </Typography>

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            bgcolor: '#111',
                                            color: '#fff',
                                            borderRadius: 2,
                                            '&:hover': {
                                                bgcolor: '#000',
                                            },
                                        }}
                                    >
                                        Join Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* ❤️ CTA */}
                <Box sx={{ textAlign: 'center', mt: 10 }}>
                    <Typography
                        sx={{
                            fontSize: '1.2rem',
                            mb: 3,
                            color: '#555',
                        }}
                    >
                        A small step today can lead to a healthier, happier life
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            px: 6,
                            py: 1.6,
                            fontSize: '1rem',
                            bgcolor: '#111',
                            borderRadius: 3,
                            '&:hover': {
                                bgcolor: '#000',
                            },
                        }}
                    >
                        Start Your Free Journey Today
                    </Button>
                </Box>

            </Container>
        </Box>
    )
}

export default BranchSearchSection
