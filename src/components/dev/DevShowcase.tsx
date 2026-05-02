import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Alert,
  Chip,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  Visibility as VisibilityIcon,
  Login as LoginIcon,
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Schedule as ScheduleIcon,
  HowToReg as HowToRegIcon,
  Assignment as AssignmentIcon,
  Announcement as AnnouncementIcon,
  Assessment as AssessmentIcon,
  Palette as PaletteIcon,
} from '@mui/icons-material'

// Import all page components
import AdminDashboard from '@/pages/admin/AdminDashboard'
import SanchalakaDashboard from '@/pages/sanchalaka/SanchalakaDashboard'
import TeacherDashboard from '@/pages/teacher/TeacherDashboard'
import StudentDashboard from '@/pages/student/StudentDashboard'
import ClassesPage from '@/pages/classes/ClassesPage'
import SchedulePage from '@/pages/schedule/SchedulePage'
import EnrollmentPage from '@/pages/enrollment/EnrollmentPage'
import AttendancePage from '@/pages/attendance/AttendancePage'
import AnnouncementsPage from '@/pages/announcements/AnnouncementsPage'
import ReportsPage from '@/pages/reports/ReportsPage'
import DesignSystemPage from '@/pages/design/DesignSystemPage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'


const DevShowcase: React.FC = () => {
  const [tabValue, setTabValue] = useState(0)
  const [selectedPage, setSelectedPage] = useState<string>('')
  const navigate = useNavigate()

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const pages = [
    // Authentication Pages
    { category: 'Authentication', name: 'Login Page', route: '/login', component: <LoginPage />, icon: <LoginIcon /> },
    { category: 'Authentication', name: 'Register Page', route: '/register', component: <RegisterPage />, icon: <LoginIcon /> },
    
    // Dashboard Pages
    { category: 'Dashboards', name: 'Admin Dashboard', route: '/admin/dashboard', component: <AdminDashboard />, icon: <DashboardIcon /> },
    { category: 'Dashboards', name: 'Sanchalaka Dashboard', route: '/sanchalaka/dashboard', component: <SanchalakaDashboard />, icon: <DashboardIcon /> },
    { category: 'Dashboards', name: 'Teacher Dashboard', route: '/teacher/dashboard', component: <TeacherDashboard />, icon: <DashboardIcon /> },
    { category: 'Dashboards', name: 'Student Dashboard', route: '/student/dashboard', component: <StudentDashboard />, icon: <DashboardIcon /> },
    
    // Core Pages
    { category: 'Core Pages', name: 'Classes', route: '/classes', component: <ClassesPage />, icon: <SchoolIcon /> },
    { category: 'Core Pages', name: 'Schedule', route: '/schedule', component: <SchedulePage />, icon: <ScheduleIcon /> },
    { category: 'Core Pages', name: 'Enrollment', route: '/enrollment', component: <EnrollmentPage />, icon: <HowToRegIcon /> },
    { category: 'Core Pages', name: 'Attendance', route: '/attendance', component: <AttendancePage />, icon: <AssignmentIcon /> },
    { category: 'Core Pages', name: 'Announcements', route: '/announcements', component: <AnnouncementsPage />, icon: <AnnouncementIcon /> },
    { category: 'Core Pages', name: 'Reports', route: '/reports', component: <ReportsPage />, icon: <AssessmentIcon /> },
    { category: 'Core Pages', name: 'Design System', route: '/design-system', component: <DesignSystemPage />, icon: <PaletteIcon /> },
  ]

  const categories = ['Authentication', 'Dashboards', 'Core Pages']
  const filteredPages = pages.filter(page => page.category === categories[tabValue])

  const handlePageClick = (pageName: string, route: string) => {
    // For authentication pages, navigate directly
    if (route === '/login' || route === '/register') {
      navigate(route)
      return
    }
    
    // For protected pages, show preview dialog
    setSelectedPage(pageName)
  }

  const handleCloseDialog = () => {
    setSelectedPage('')
  }

  const selectedPageData = pages.find(page => page.name === selectedPage)

  return (
    <Box sx={{ p: 3 }}>
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          🚀 Development Showcase Mode
        </Typography>
        <Typography variant="body2">
          This is a development showcase to preview all pages and test UI components. 
          Click on any page below to see how it looks and test all buttons and interactions.
        </Typography>
      </Alert>

      {/* Category Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Authentication" />
          <Tab label="Dashboards" />
          <Tab label="Core Pages" />
        </Tabs>
      </Box>

      {/* Pages Grid */}
      <Grid container spacing={3}>
        {filteredPages.map((page, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                }
              }}
              onClick={() => handlePageClick(page.name, page.route)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    bgcolor: 'primary.main', 
                    color: 'white', 
                    p: 1, 
                    borderRadius: 1,
                    mr: 2
                  }}>
                    {page.icon}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {page.name}
                    </Typography>
                    <Chip 
                      label={page.category} 
                      size="small" 
                      variant="outlined"
                    />
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={page.route === '/login' || page.route === '/register' ? <LoginIcon /> : <VisibilityIcon />}
                  fullWidth
                >
                  {page.route === '/login' || page.route === '/register' ? 'Go to Page' : 'Preview Page'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Page Preview Dialog */}
      <Dialog 
        open={Boolean(selectedPage)} 
        onClose={handleCloseDialog}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          sx: { height: '90vh' }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {selectedPageData?.icon}
            <Typography variant="h6" sx={{ ml: 2 }}>
              {selectedPage}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {selectedPageData && selectedPageData.route !== '/login' && selectedPageData.route !== '/register' && (
              <Button 
                onClick={() => {
                  navigate(selectedPageData.route)
                  handleCloseDialog()
                }} 
                variant="contained"
              >
                Navigate to Page
              </Button>
            )}
            <Button onClick={handleCloseDialog} variant="outlined">
              Close
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0, overflow: 'auto' }}>
          {selectedPageData?.component}
        </DialogContent>
      </Dialog>

      {/* Instructions */}
      <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          📋 Testing Instructions
        </Typography>
        <Typography variant="body2" component="div">
          <ul>
            <li>Click on Login/Register pages to navigate directly to them</li>
            <li>Click on protected pages to preview them in a dialog</li>
            <li>Use "Navigate to Page" button in dialog to go to actual pages</li>
            <li>Test all buttons, forms, and interactions within each page</li>
            <li>Check responsive design by resizing the dialog</li>
            <li>All pages use mock data for demonstration purposes</li>
            <li>API structure is preserved for easy backend integration</li>
          </ul>
        </Typography>
      </Box>
    </Box>
  )
}

export default DevShowcase
