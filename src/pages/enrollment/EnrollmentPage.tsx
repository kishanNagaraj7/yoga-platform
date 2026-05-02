import React, { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  Tabs,
  Tab,
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import {
  School as SchoolIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
} from '@mui/icons-material'

// Mock data for demonstration
const mockActiveEnrollments = [
  {
    id: '1',
    classId: '1',
    className: 'Morning Hatha Yoga',
    teacher: 'John Doe',
    schedule: 'Mon, Wed, Fri - 6:00 AM',
    branch: 'Downtown Studio',
    status: 'approved',
    enrolledAt: '2024-01-15',
    progress: 75,
    attendance: 12,
    totalSessions: 16,
    nextClass: '2024-01-20 06:00 AM',
  },
  {
    id: '2',
    classId: '2',
    className: 'Evening Vinyasa Flow',
    teacher: 'Jane Smith',
    schedule: 'Tue, Thu - 6:00 PM',
    branch: 'Online Platform',
    status: 'approved',
    enrolledAt: '2024-01-10',
    progress: 60,
    attendance: 9,
    totalSessions: 15,
    nextClass: '2024-01-20 06:00 PM',
  },
]

const mockPendingRequests = [
  {
    id: '3',
    classId: '3',
    className: 'Weekend Yin Yoga',
    teacher: 'Mike Johnson',
    schedule: 'Sat - 10:00 AM',
    branch: 'Uptown Studio',
    status: 'pending',
    requestedAt: '2024-01-18',
    waitlistPosition: null,
  },
  {
    id: '4',
    classId: '4',
    className: 'Advanced Ashtanga',
    teacher: 'Sarah Wilson',
    schedule: 'Sun - 8:00 AM',
    branch: 'Downtown Studio',
    status: 'pending',
    requestedAt: '2024-01-17',
    waitlistPosition: 3,
  },
]

const mockWaitlisted = [
  {
    id: '5',
    classId: '5',
    className: 'Meditation Basics',
    teacher: 'David Chen',
    schedule: 'Mon, Wed - 7:00 PM',
    branch: 'Online Platform',
    status: 'waitlisted',
    waitlistPosition: 2,
    requestedAt: '2024-01-16',
  },
]

const mockAvailableClasses = [
  {
    id: '6',
    title: 'Restorative Yoga',
    teacher: 'Emma Davis',
    schedule: 'Tue, Thu - 5:00 PM',
    branch: 'Westside Studio',
    capacity: 15,
    enrolled: 12,
    category: 'Restorative',
    level: 'All Levels',
    mode: 'offline',
    price: 25,
  },
  {
    id: '7',
    title: 'Power Yoga',
    teacher: 'Chris Johnson',
    schedule: 'Mon, Wed, Fri - 7:00 AM',
    branch: 'Downtown Studio',
    capacity: 20,
    enrolled: 18,
    category: 'Vinyasa',
    level: 'Advanced',
    mode: 'hybrid',
    price: 30,
  },
]

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

const EnrollmentPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0)
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<any>(null)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleEnrollClick = (classItem: any) => {
    setSelectedClass(classItem)
    setEnrollDialogOpen(true)
  }

  const handleEnrollConfirm = () => {
    // Handle enrollment logic here
    setEnrollDialogOpen(false)
    setSelectedClass(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#4caf50'
      case 'pending': return '#ff9800'
      case 'waitlisted': return '#2196f3'
      case 'rejected': return '#f44336'
      default: return '#757575'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircleIcon />
      case 'pending': return <PendingIcon />
      case 'waitlisted': return <ScheduleIcon />
      case 'rejected': return <CancelIcon />
      default: return <ScheduleIcon />
    }
  }

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'online': return '#2196f3'
      case 'offline': return '#4caf50'
      case 'hybrid': return '#9c27b0'
      default: return '#757575'
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Enrollment Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your class enrollments, requests, and waitlist status.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary">
                {mockActiveEnrollments.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Enrollments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="warning.main">
                {mockPendingRequests.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Requests
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="info.main">
                {mockWaitlisted.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Waitlisted Classes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main">
                {mockAvailableClasses.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Available Classes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Active Enrollments" />
          <Tab label="Pending Requests" />
          <Tab label="Waitlisted" />
          <Tab label="Available Classes" />
        </Tabs>
      </Box>

      {/* Active Enrollments */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {mockActiveEnrollments.map((enrollment) => (
            <Grid item xs={12} md={6} key={enrollment.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: getStatusColor(enrollment.status), mr: 2 }}>
                      <SchoolIcon />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{enrollment.className}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {enrollment.teacher} • {enrollment.branch}
                      </Typography>
                    </Box>
                    <Chip
                      label={enrollment.status}
                      color="success"
                      size="small"
                      icon={getStatusIcon(enrollment.status)}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Schedule: {enrollment.schedule}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Next class: {enrollment.nextClass}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Enrolled: {enrollment.enrolledAt}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Progress: {enrollment.attendance}/{enrollment.totalSessions} sessions
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={enrollment.progress}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" variant="outlined">
                      View Details
                    </Button>
                    <Button size="small" variant="outlined" color="error">
                      Drop Class
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Pending Requests */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {mockPendingRequests.map((request) => (
            <Grid item xs={12} md={6} key={request.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: getStatusColor(request.status), mr: 2 }}>
                      <PendingIcon />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{request.className}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {request.teacher} • {request.branch}
                      </Typography>
                    </Box>
                    <Chip
                      label={request.status}
                      color="warning"
                      size="small"
                      icon={getStatusIcon(request.status)}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Schedule: {request.schedule}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Requested: {request.requestedAt}
                    </Typography>
                    {request.waitlistPosition && (
                      <Typography variant="body2" color="text.secondary">
                        Waitlist Position: #{request.waitlistPosition}
                      </Typography>
                    )}
                  </Box>

                  <Alert severity="info" sx={{ mb: 2 }}>
                    Your enrollment request is pending approval from the teacher.
                  </Alert>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" variant="outlined">
                      View Details
                    </Button>
                    <Button size="small" variant="outlined" color="error">
                      Cancel Request
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Waitlisted */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {mockWaitlisted.map((waitlist) => (
            <Grid item xs={12} md={6} key={waitlist.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: getStatusColor(waitlist.status), mr: 2 }}>
                      <ScheduleIcon />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{waitlist.className}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {waitlist.teacher} • {waitlist.branch}
                      </Typography>
                    </Box>
                    <Chip
                      label={`Waitlist #${waitlist.waitlistPosition}`}
                      color="info"
                      size="small"
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Schedule: {waitlist.schedule}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Added to waitlist: {waitlist.requestedAt}
                    </Typography>
                  </Box>

                  <Alert severity="info" sx={{ mb: 2 }}>
                    You are #{waitlist.waitlistPosition} on the waitlist. You'll be notified when a spot becomes available.
                  </Alert>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" variant="outlined">
                      View Details
                    </Button>
                    <Button size="small" variant="outlined" color="error">
                      Remove from Waitlist
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Available Classes */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          {mockAvailableClasses.map((classItem) => (
            <Grid item xs={12} md={6} key={classItem.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: getModeColor(classItem.mode), mr: 2 }}>
                      <SchoolIcon />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{classItem.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {classItem.teacher} • {classItem.branch}
                      </Typography>
                    </Box>
                    <Chip
                      label={classItem.mode}
                      size="small"
                      sx={{ bgcolor: getModeColor(classItem.mode), color: 'white' }}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Schedule: {classItem.schedule}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {classItem.category} • {classItem.level}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${classItem.price} per session
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Availability: {classItem.enrolled}/{classItem.capacity} seats
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(classItem.enrolled / classItem.capacity) * 100}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<AddIcon />}
                    onClick={() => handleEnrollClick(classItem)}
                    disabled={classItem.enrolled >= classItem.capacity}
                  >
                    {classItem.enrolled >= classItem.capacity ? 'Class Full' : 'Request Enrollment'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Enrollment Dialog */}
      <Dialog open={enrollDialogOpen} onClose={() => setEnrollDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Request Enrollment</DialogTitle>
        <DialogContent>
          {selectedClass && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedClass.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedClass.teacher} • {selectedClass.branch}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Schedule: {selectedClass.schedule}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Price: ${selectedClass.price} per session
              </Typography>
              
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Additional Notes (Optional)"
                placeholder="Any special requirements or questions..."
                sx={{ mt: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEnrollDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEnrollConfirm}>
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default EnrollmentPage
