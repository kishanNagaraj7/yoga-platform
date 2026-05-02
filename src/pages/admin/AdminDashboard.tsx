import React from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
} from '@mui/material'
import {
  People as PeopleIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  Pending as PendingIcon,
  Person as PersonIcon,
  Announcement as AnnouncementIcon,
} from '@mui/icons-material'
import { useSupabaseAuth } from '../../contexts/SupabaseAuthContext'

// Mock data for demonstration
const mockStats = {
  totalUsers: 1247,
  totalClasses: 89,
  activePractitioners: 892,
  totalEnrollments: 3421,
  pendingApprovals: 23,
  attendanceRate: 87.5,
}

const mockRecentUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Student', joinedAt: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher', joinedAt: '2024-01-14' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Student', joinedAt: '2024-01-13' },
]

const mockPendingAnnouncements = [
  { id: '1', title: 'Holiday Schedule Update', author: 'John Teacher', createdAt: '2024-01-15' },
  { id: '2', title: 'New Yoga Class Introduction', author: 'Jane Teacher', createdAt: '2024-01-14' },
]

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
  subtitle?: string
  progress?: number
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, subtitle, progress }) => (
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
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {subtitle}
        </Typography>
      )}
      {progress !== undefined && (
        <Box>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="caption" color="text.secondary">
            {progress}%
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
)

const AdminDashboard: React.FC = () => {
  const { user } = useSupabaseAuth()

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, {user?.full_name || user?.email}! Admin dashboard overview of your yoga platform.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={mockStats.totalUsers}
            icon={<PeopleIcon />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Classes"
            value={mockStats.totalClasses}
            icon={<SchoolIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Practitioners"
            value={mockStats.activePractitioners}
            icon={<TrendingUpIcon />}
            color="#f57c00"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Approvals"
            value={mockStats.pendingApprovals}
            icon={<PendingIcon />}
            color="#d32f2f"
          />
        </Grid>
      </Grid>

      {/* Additional Stats Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <StatCard
            title="Total Enrollments"
            value={mockStats.totalEnrollments}
            icon={<SchoolIcon />}
            color="#7b1fa2"
            subtitle="Across all classes"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatCard
            title="Attendance Rate"
            value={`${mockStats.attendanceRate}%`}
            icon={<TrendingUpIcon />}
            color="#388e3c"
            subtitle="Average across all classes"
            progress={mockStats.attendanceRate}
          />
        </Grid>
      </Grid>

      {/* Recent Activity and Pending Approvals */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Users
              </Typography>
              <List>
                {mockRecentUsers.map((user) => (
                  <ListItem key={user.id} divider>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.name}
                      secondary={`${user.email} • ${user.role} • Joined ${user.joinedAt}`}
                    />
                    <Chip
                      label={user.role}
                      size="small"
                      color={user.role === 'Teacher' ? 'primary' : 'default'}
                    />
                  </ListItem>
                ))}
              </List>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                View All Users
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pending Announcements
              </Typography>
              <List>
                {mockPendingAnnouncements.map((announcement) => (
                  <ListItem key={announcement.id} divider>
                    <ListItemAvatar>
                      <Avatar>
                        <AnnouncementIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={announcement.title}
                      secondary={`By ${announcement.author} • ${announcement.createdAt}`}
                    />
                    <Button size="small" variant="contained" color="primary">
                      Review
                    </Button>
                  </ListItem>
                ))}
              </List>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                View All Announcements
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminDashboard
