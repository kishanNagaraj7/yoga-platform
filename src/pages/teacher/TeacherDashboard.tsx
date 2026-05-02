import React, { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  LinearProgress,
} from '@mui/material'
import {
  School as SchoolIcon,
  Schedule as ScheduleIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Event as EventIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material'
import { useSupabaseAuth } from '../../contexts/SupabaseAuthContext'
import StudentApproval from '../../components/teacher/StudentApproval'

// Mock data for demonstration
const mockStats = {
  totalClasses: 5,
  totalStudents: 142,
  todayClasses: 3,
  thisWeekClasses: 12,
  averageAttendance: 87.5,
  pendingAnnouncements: 2,
}

const mockTodayClasses = [
  {
    id: '1',
    title: 'Morning Hatha Yoga',
    time: '06:00 AM - 07:00 AM',
    students: 18,
    capacity: 20,
    mode: 'offline',
    branch: 'Downtown Studio',
    attendanceMarked: false,
  },
  {
    id: '2',
    title: 'Evening Vinyasa Flow',
    time: '06:00 PM - 07:30 PM',
    students: 22,
    capacity: 25,
    mode: 'online',
    branch: 'Online Platform',
    attendanceMarked: false,
  },
  {
    id: '3',
    title: 'Weekend Yin Yoga',
    time: '10:00 AM - 11:30 AM',
    students: 15,
    capacity: 15,
    mode: 'hybrid',
    branch: 'Uptown Studio',
    attendanceMarked: true,
  },
]

const mockMyClasses = [
  {
    id: '1',
    title: 'Morning Hatha Yoga',
    schedule: 'Mon, Wed, Fri - 6:00 AM',
    students: 18,
    capacity: 20,
    attendance: 85,
    mode: 'offline',
  },
  {
    id: '2',
    title: 'Evening Vinyasa Flow',
    schedule: 'Tue, Thu - 6:00 PM',
    students: 22,
    capacity: 25,
    attendance: 92,
    mode: 'online',
  },
  {
    id: '3',
    title: 'Weekend Yin Yoga',
    schedule: 'Sat - 10:00 AM',
    students: 15,
    capacity: 15,
    attendance: 88,
    mode: 'hybrid',
  },
]

const mockRecentActivity = [
  { id: '1', action: 'Marked attendance', class: 'Morning Hatha Yoga', time: '2 hours ago' },
  { id: '2', action: 'Created announcement', class: 'Evening Vinyasa Flow', time: '1 day ago' },
  { id: '3', action: 'Updated class schedule', class: 'Weekend Yin Yoga', time: '2 days ago' },
]

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
  subtitle?: string
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, subtitle }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: color, mr: 2 }}>
          {icon}
        </Avatar>
        <Box>
          <Typography variant="h6" component="div">
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>
      </Box>
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </CardContent>
  </Card>
)

const TeacherDashboard: React.FC = () => {
  const { user } = useSupabaseAuth()
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [pendingApprovals, setPendingApprovals] = useState(0)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, classId: string) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'online': return '#2196f3'
      case 'offline': return '#4caf50'
      case 'hybrid': return '#9c27b0'
      default: return '#757575'
    }
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return '#4caf50'
    if (attendance >= 80) return '#ff9800'
    return '#f44336'
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Teacher Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back, {user?.full_name || user?.email}! Manage your classes and track student progress.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />}>
          Create New Class
        </Button>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="My Classes"
            value={mockStats.totalClasses}
            icon={<SchoolIcon />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value={mockStats.totalStudents}
            icon={<PeopleIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Today's Classes"
            value={mockStats.todayClasses}
            icon={<ScheduleIcon />}
            color="#f57c00"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Attendance"
            value={`${mockStats.averageAttendance}%`}
            icon={<AssessmentIcon />}
            color="#7b1fa2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Approvals"
            value={pendingApprovals}
            icon={<PersonAddIcon />}
            color="#ff9800"
            subtitle={pendingApprovals > 0 ? "Action required" : "All caught up"}
          />
        </Grid>
      </Grid>

      {/* Today's Classes */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Classes
              </Typography>
              <List>
                {mockTodayClasses.map((classItem) => (
                  <ListItem key={classItem.id} divider>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: getModeColor(classItem.mode) }}>
                        <SchoolIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1">
                            {classItem.title}
                          </Typography>
                          <Chip
                            label={classItem.mode}
                            size="small"
                            sx={{ bgcolor: getModeColor(classItem.mode), color: 'white' }}
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {classItem.time} • {classItem.branch}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {classItem.students}/{classItem.capacity} students
                          </Typography>
                        </>
                      }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {classItem.attendanceMarked ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <RadioButtonUncheckedIcon color="action" />
                      )}
                      <IconButton
                        onClick={(e) => handleMenuClick(e, classItem.id)}
                        size="small"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
              </List>
              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Mark Attendance</MenuItem>
                <MenuItem onClick={handleMenuClose}>View Students</MenuItem>
                <MenuItem onClick={handleMenuClose}>Edit Class</MenuItem>
                <MenuItem onClick={handleMenuClose}>Send Announcement</MenuItem>
              </Menu>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="contained" fullWidth startIcon={<AddIcon />}>
                  Create New Class
                </Button>
                <Button variant="outlined" fullWidth startIcon={<PeopleIcon />}>
                  Manage Students
                </Button>
                <Button variant="outlined" fullWidth startIcon={<EventIcon />}>
                  View Schedule
                </Button>
                <Button variant="outlined" fullWidth startIcon={<AssessmentIcon />}>
                  View Reports
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Student Approvals Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <StudentApproval onApprovalCountChange={setPendingApprovals} />
        </Grid>
      </Grid>

      {/* My Classes & Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                My Classes
              </Typography>
              <List>
                {mockMyClasses.map((classItem) => (
                  <ListItem key={classItem.id} divider>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: getModeColor(classItem.mode) }}>
                        <SchoolIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={classItem.title}
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {classItem.schedule} • {classItem.students}/{classItem.capacity} students
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                              Attendance:
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={classItem.attendance}
                              sx={{ width: 100, mr: 1 }}
                            />
                            <Typography
                              variant="caption"
                              sx={{ color: getAttendanceColor(classItem.attendance) }}
                            >
                              {classItem.attendance}%
                            </Typography>
                          </Box>
                        </>
                      }
                    />
                    <Button size="small" variant="outlined">
                      Manage
                    </Button>
                  </ListItem>
                ))}
              </List>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                View All Classes
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {mockRecentActivity.map((activity) => (
                  <ListItem key={activity.id} divider>
                    <ListItemText
                      primary={activity.action}
                      secondary={`${activity.class} • ${activity.time}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TeacherDashboard
