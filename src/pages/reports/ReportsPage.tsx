import React, { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Avatar,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material'
import {
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Download as DownloadIcon,
} from '@mui/icons-material'
import { useSupabaseAuth } from '../../contexts/SupabaseAuthContext'

// Mock data for demonstration
const mockAttendanceData = [
  {
    className: 'Morning Hatha Yoga',
    totalSessions: 16,
    averageAttendance: 87.5,
    attendanceRate: 87.5,
    peakAttendance: 95,
    lowAttendance: 78,
  },
  {
    className: 'Evening Vinyasa Flow',
    totalSessions: 15,
    averageAttendance: 92.3,
    attendanceRate: 92.3,
    peakAttendance: 100,
    lowAttendance: 85,
  },
  {
    className: 'Weekend Yin Yoga',
    totalSessions: 12,
    averageAttendance: 83.3,
    attendanceRate: 83.3,
    peakAttendance: 90,
    lowAttendance: 75,
  },
]

const mockEnrollmentData = [
  { month: 'Jan 2024', enrollments: 45, newStudents: 12, returningStudents: 33 },
  { month: 'Feb 2024', enrollments: 52, newStudents: 15, returningStudents: 37 },
  { month: 'Mar 2024', enrollments: 48, newStudents: 10, returningStudents: 38 },
  { month: 'Apr 2024', enrollments: 61, newStudents: 18, returningStudents: 43 },
]

const mockPopularClasses = [
  {
    className: 'Evening Vinyasa Flow',
    enrollmentCount: 89,
    attendanceRate: 92.3,
    revenue: 2670,
    rating: 4.8,
  },
  {
    className: 'Morning Hatha Yoga',
    enrollmentCount: 76,
    attendanceRate: 87.5,
    revenue: 1900,
    rating: 4.6,
  },
  {
    className: 'Weekend Yin Yoga',
    enrollmentCount: 54,
    attendanceRate: 83.3,
    revenue: 1620,
    rating: 4.7,
  },
]

const mockBranchPerformance = [
  {
    branchName: 'Downtown Studio',
    totalStudents: 250,
    attendanceRate: 88.5,
    totalClasses: 67,
    revenue: 15420,
    growth: 12.3,
  },
  {
    branchName: 'Uptown Studio',
    totalStudents: 180,
    attendanceRate: 85.2,
    totalClasses: 45,
    revenue: 10800,
    growth: 8.7,
  },
  {
    branchName: 'Westside Studio',
    totalStudents: 220,
    attendanceRate: 91.3,
    totalClasses: 52,
    revenue: 13200,
    growth: 15.6,
  },
]

const mockTeacherPerformance = [
  {
    teacherName: 'John Doe',
    totalClasses: 5,
    totalStudents: 142,
    averageAttendance: 89.2,
    studentSatisfaction: 4.7,
    revenue: 4260,
  },
  {
    teacherName: 'Jane Smith',
    totalClasses: 4,
    totalStudents: 118,
    averageAttendance: 93.1,
    studentSatisfaction: 4.9,
    revenue: 3540,
  },
  {
    teacherName: 'Mike Johnson',
    totalClasses: 3,
    totalStudents: 95,
    averageAttendance: 86.8,
    studentSatisfaction: 4.5,
    revenue: 2850,
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

const ReportsPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0)
  const [dateRange, setDateRange] = useState('this-month')
  const [exportDialogOpen, setExportDialogOpen] = useState(false)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleExportClick = () => {
    setExportDialogOpen(true)
  }

  const handleExportClose = () => {
    setExportDialogOpen(false)
  }

  const getPerformanceColor = (value: number) => {
    if (value >= 90) return '#4caf50'
    if (value >= 80) return '#ff9800'
    return '#f44336'
  }

  const getGrowthColor = (value: number) => {
    if (value >= 10) return '#4caf50'
    if (value >= 5) return '#ff9800'
    return '#f44336'
  }

  const totalRevenue = mockBranchPerformance.reduce((sum, branch) => sum + branch.revenue, 0)
  const totalStudents = mockBranchPerformance.reduce((sum, branch) => sum + branch.totalStudents, 0)
  const averageAttendance = mockBranchPerformance.reduce((sum, branch) => sum + branch.attendanceRate, 0) / mockBranchPerformance.length

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Reports & Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Comprehensive insights into your yoga platform performance.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Date Range</InputLabel>
            <Select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              label="Date Range"
            >
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="this-week">This Week</MenuItem>
              <MenuItem value="this-month">This Month</MenuItem>
              <MenuItem value="last-month">Last Month</MenuItem>
              <MenuItem value="this-quarter">This Quarter</MenuItem>
              <MenuItem value="this-year">This Year</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExportClick}>
            Export Report
          </Button>
        </Box>
      </Box>

      {/* Overview Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#2e7d32', mr: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{totalStudents}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Students
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" color="success.main">
                +12.3% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>
                  <SchoolIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{mockAttendanceData.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Classes
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" color="success.main">
                +2 new classes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#f57c00', mr: 2 }}>
                  <TrendingUpIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{averageAttendance.toFixed(1)}%</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Attendance
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" color="success.main">
                +3.2% improvement
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: '#7b1fa2', mr: 2 }}>
                  <AssessmentIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">${totalRevenue.toLocaleString()}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Revenue
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" color="success.main">
                +18.7% growth
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Report Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Attendance" />
          <Tab label="Enrollment" />
          <Tab label="Popular Classes" />
          <Tab label="Branch Performance" />
          <Tab label="Teacher Performance" />
        </Tabs>
      </Box>

      {/* Attendance Report */}
      <TabPanel value={tabValue} index={0}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Class Attendance Analysis
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Class Name</TableCell>
                    <TableCell align="right">Total Sessions</TableCell>
                    <TableCell align="right">Avg Attendance</TableCell>
                    <TableCell align="right">Attendance Rate</TableCell>
                    <TableCell align="right">Peak Attendance</TableCell>
                    <TableCell align="right">Low Attendance</TableCell>
                    <TableCell align="center">Performance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockAttendanceData.map((classData) => (
                    <TableRow key={classData.className}>
                      <TableCell component="th" scope="row">
                        {classData.className}
                      </TableCell>
                      <TableCell align="right">{classData.totalSessions}</TableCell>
                      <TableCell align="right">{classData.averageAttendance}%</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            {classData.attendanceRate}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={classData.attendanceRate}
                            sx={{ width: 60 }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="right">{classData.peakAttendance}%</TableCell>
                      <TableCell align="right">{classData.lowAttendance}%</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={classData.attendanceRate >= 85 ? 'Excellent' : classData.attendanceRate >= 75 ? 'Good' : 'Needs Improvement'}
                          size="small"
                          color={classData.attendanceRate >= 85 ? 'success' : classData.attendanceRate >= 75 ? 'warning' : 'error'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Enrollment Report */}
      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Enrollment Trends
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell align="right">Total Enrollments</TableCell>
                    <TableCell align="right">New Students</TableCell>
                    <TableCell align="right">Returning Students</TableCell>
                    <TableCell align="right">Growth Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockEnrollmentData.map((data) => (
                    <TableRow key={data.month}>
                      <TableCell component="th" scope="row">
                        {data.month}
                      </TableCell>
                      <TableCell align="right">{data.enrollments}</TableCell>
                      <TableCell align="right">{data.newStudents}</TableCell>
                      <TableCell align="right">{data.returningStudents}</TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" color="success.main">
                          +{Math.round((data.newStudents / data.enrollments) * 100)}%
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Popular Classes */}
      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Most Popular Classes
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Class Name</TableCell>
                    <TableCell align="right">Enrollments</TableCell>
                    <TableCell align="right">Attendance Rate</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                    <TableCell align="center">Rating</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockPopularClasses.map((classData) => (
                    <TableRow key={classData.className}>
                      <TableCell component="th" scope="row">
                        {classData.className}
                      </TableCell>
                      <TableCell align="right">{classData.enrollmentCount}</TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ color: getPerformanceColor(classData.attendanceRate) }}>
                          {classData.attendanceRate}%
                        </Typography>
                      </TableCell>
                      <TableCell align="right">${classData.revenue.toLocaleString()}</TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" color="warning.main">
                          ⭐ {classData.rating}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label="High Demand"
                          size="small"
                          color="success"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Branch Performance */}
      <TabPanel value={tabValue} index={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Branch Performance Overview
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Branch Name</TableCell>
                    <TableCell align="right">Total Students</TableCell>
                    <TableCell align="right">Attendance Rate</TableCell>
                    <TableCell align="right">Total Classes</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                    <TableCell align="right">Growth</TableCell>
                    <TableCell align="center">Performance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockBranchPerformance.map((branch) => (
                    <TableRow key={branch.branchName}>
                      <TableCell component="th" scope="row">
                        {branch.branchName}
                      </TableCell>
                      <TableCell align="right">{branch.totalStudents}</TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ color: getPerformanceColor(branch.attendanceRate) }}>
                          {branch.attendanceRate}%
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{branch.totalClasses}</TableCell>
                      <TableCell align="right">${branch.revenue.toLocaleString()}</TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ color: getGrowthColor(branch.growth) }}>
                          +{branch.growth}%
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={branch.growth >= 10 ? 'Excellent' : branch.growth >= 5 ? 'Good' : 'Average'}
                          size="small"
                          color={branch.growth >= 10 ? 'success' : branch.growth >= 5 ? 'warning' : 'default'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Teacher Performance */}
      <TabPanel value={tabValue} index={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Teacher Performance Metrics
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Teacher Name</TableCell>
                    <TableCell align="right">Total Classes</TableCell>
                    <TableCell align="right">Total Students</TableCell>
                    <TableCell align="right">Avg Attendance</TableCell>
                    <TableCell align="right">Student Satisfaction</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                    <TableCell align="center">Performance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockTeacherPerformance.map((teacher) => (
                    <TableRow key={teacher.teacherName}>
                      <TableCell component="th" scope="row">
                        {teacher.teacherName}
                      </TableCell>
                      <TableCell align="right">{teacher.totalClasses}</TableCell>
                      <TableCell align="right">{teacher.totalStudents}</TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ color: getPerformanceColor(teacher.averageAttendance) }}>
                          {teacher.averageAttendance}%
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" color="warning.main">
                          ⭐ {teacher.studentSatisfaction}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">${teacher.revenue.toLocaleString()}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={teacher.studentSatisfaction >= 4.7 ? 'Top Performer' : 'Good'}
                          size="small"
                          color={teacher.studentSatisfaction >= 4.7 ? 'success' : 'primary'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onClose={handleExportClose}>
        <DialogTitle>Export Report</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Choose the format and date range for your report export.
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Format</InputLabel>
            <Select label="Format" defaultValue="pdf">
              <MenuItem value="pdf">PDF</MenuItem>
              <MenuItem value="excel">Excel</MenuItem>
              <MenuItem value="csv">CSV</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Date Range</InputLabel>
            <Select label="Date Range" value={dateRange}>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="this-week">This Week</MenuItem>
              <MenuItem value="this-month">This Month</MenuItem>
              <MenuItem value="last-month">Last Month</MenuItem>
              <MenuItem value="this-quarter">This Quarter</MenuItem>
              <MenuItem value="this-year">This Year</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExportClose}>Cancel</Button>
          <Button variant="contained" onClick={handleExportClose}>
            Export Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ReportsPage
