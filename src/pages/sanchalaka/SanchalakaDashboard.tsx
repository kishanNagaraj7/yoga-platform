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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import {
  People as PeopleIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Announcement as AnnouncementIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material'
import { useSupabaseAuth } from '../../contexts/SupabaseAuthContext'

// Mock data for demonstration
const mockStats = {
  totalTeachers: 45,
  totalStudents: 892,
  totalClasses: 67,
  totalBranches: 8,
  attendanceRate: 85.3,
  pendingApprovals: 12,
}

const mockTeachers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', branch: 'Downtown Studio', classes: 5, students: 120 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', branch: 'Uptown Studio', classes: 4, students: 95 },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', branch: 'Westside Studio', classes: 6, students: 140 },
]

const mockBranches = [
  { id: '1', name: 'Downtown Studio', teachers: 8, students: 250, classes: 15, attendance: 88 },
  { id: '2', name: 'Uptown Studio', teachers: 6, students: 180, classes: 12, attendance: 82 },
  { id: '3', name: 'Westside Studio', teachers: 7, students: 220, classes: 14, attendance: 86 },
]

const mockPendingAnnouncements = [
  { id: '1', title: 'Holiday Schedule Update', branch: 'Downtown Studio', author: 'John Teacher', createdAt: '2024-01-15' },
  { id: '2', title: 'New Workshop Announcement', branch: 'Uptown Studio', author: 'Jane Teacher', createdAt: '2024-01-14' },
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

const SanchalakaDashboard: React.FC = () => {
  const { user } = useSupabaseAuth()

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sanchalaka Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, {user?.full_name || user?.email}! Here's an overview of your region's yoga platform.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Teachers"
            value={mockStats.totalTeachers}
            icon={<PeopleIcon />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value={mockStats.totalStudents}
            icon={<SchoolIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Classes"
            value={mockStats.totalClasses}
            icon={<BusinessIcon />}
            color="#f57c00"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Branches"
            value={mockStats.totalBranches}
            icon={<BusinessIcon />}
            color="#7b1fa2"
          />
        </Grid>
      </Grid>

      {/* Additional Stats Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <StatCard
            title="Attendance Rate"
            value={`${mockStats.attendanceRate}%`}
            icon={<TrendingUpIcon />}
            color="#388e3c"
            subtitle="Average across all branches"
            progress={mockStats.attendanceRate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatCard
            title="Pending Approvals"
            value={mockStats.pendingApprovals}
            icon={<AssessmentIcon />}
            color="#d32f2f"
            subtitle="Announcements awaiting review"
          />
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Teachers Overview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Teachers Overview
              </Typography>
              <List>
                {mockTeachers.map((teacher) => (
                  <ListItem key={teacher.id} divider>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={teacher.name}
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {teacher.email}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {teacher.branch} • {teacher.classes} classes • {teacher.students} students
                          </Typography>
                        </>
                      }
                    />
                    <Button size="small" variant="outlined">
                      View Details
                    </Button>
                  </ListItem>
                ))}
              </List>
              <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                Manage All Teachers
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Branch Performance */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Branch Performance
              </Typography>
              <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Branch</TableCell>
                      <TableCell align="right">Teachers</TableCell>
                      <TableCell align="right">Students</TableCell>
                      <TableCell align="right">Attendance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockBranches.map((branch) => (
                      <TableRow key={branch.id}>
                        <TableCell component="th" scope="row">
                          {branch.name}
                        </TableCell>
                        <TableCell align="right">{branch.teachers}</TableCell>
                        <TableCell align="right">{branch.students}</TableCell>
                        <TableCell align="right">
                          <Chip
                            label={`${branch.attendance}%`}
                            size="small"
                            color={branch.attendance >= 85 ? 'success' : 'warning'}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                View Detailed Reports
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Announcements */}
        <Grid item xs={12}>
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
                      secondary={`By ${announcement.author} • ${announcement.branch} • ${announcement.createdAt}`}
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

export default SanchalakaDashboard
