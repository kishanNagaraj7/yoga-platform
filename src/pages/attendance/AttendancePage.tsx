import React, { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress,
} from '@mui/material'
import {
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Save as SaveIcon,
  Search as SearchIcon,
} from '@mui/icons-material'
import { useSupabaseAuth } from '../../contexts/SupabaseAuthContext'

// Mock data for demonstration
const mockClasses = [
  { id: '1', title: 'Morning Hatha Yoga', time: '06:00 AM - 07:00 AM', date: '2024-01-20', students: 18 },
  { id: '2', title: 'Evening Vinyasa Flow', time: '06:00 PM - 07:30 PM', date: '2024-01-20', students: 22 },
  { id: '3', title: 'Weekend Yin Yoga', time: '10:00 AM - 11:30 AM', date: '2024-01-21', students: 15 },
]

const mockStudents = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1234567890',
    attendanceStatus: 'present',
    notes: '',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    phone: '+1234567891',
    attendanceStatus: 'absent',
    notes: 'Sick leave',
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    phone: '+1234567892',
    attendanceStatus: 'present',
    notes: '',
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@example.com',
    phone: '+1234567893',
    attendanceStatus: 'excused',
    notes: 'Medical appointment',
  },
  {
    id: '5',
    name: 'Emma Brown',
    email: 'emma@example.com',
    phone: '+1234567894',
    attendanceStatus: 'present',
    notes: '',
  },
]

const AttendancePage: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [students, setStudents] = useState(mockStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const handleClassChange = (event: any) => {
    setSelectedClass(event.target.value)
    setHasUnsavedChanges(false)
  }

  const handleDateChange = (event: any) => {
    setSelectedDate(event.target.value)
    setHasUnsavedChanges(false)
  }

  const handleAttendanceChange = (studentId: string, status: string) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? { ...student, attendanceStatus: status }
          : student
      )
    )
    setHasUnsavedChanges(true)
  }

  const handleNotesChange = (studentId: string, notes: string) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? { ...student, notes }
          : student
      )
    )
    setHasUnsavedChanges(true)
  }

  const handleSaveAttendance = () => {
    // Save attendance logic here
    setSaveDialogOpen(true)
    setHasUnsavedChanges(false)
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const attendanceStats = {
    present: students.filter(s => s.attendanceStatus === 'present').length,
    absent: students.filter(s => s.attendanceStatus === 'absent').length,
    excused: students.filter(s => s.attendanceStatus === 'excused').length,
    total: students.length,
  }

  const attendanceRate = students.length > 0 
    ? Math.round((attendanceStats.present / students.length) * 100)
    : 0

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Attendance Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Mark and track student attendance for your classes.
        </Typography>
      </Box>

      {/* Class and Date Selection */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Select Class</InputLabel>
            <Select
              value={selectedClass}
              onChange={handleClassChange}
              label="Select Class"
            >
              {mockClasses.map((cls) => (
                <MenuItem key={cls.id} value={cls.id}>
                  {cls.title} - {cls.time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Select Date</InputLabel>
            <Select
              value={selectedDate}
              onChange={handleDateChange}
              label="Select Date"
            >
              {mockClasses.map((cls) => (
                <MenuItem key={cls.id} value={cls.date}>
                  {cls.date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            fullWidth
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Grid>
      </Grid>

      {selectedClass && selectedDate && (
        <>
          {/* Attendance Stats */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="success.main">
                    {attendanceStats.present}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Present
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="error.main">
                    {attendanceStats.absent}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Absent
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="warning.main">
                    {attendanceStats.excused}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Excused
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="primary.main">
                    {attendanceRate}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Attendance Rate
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Attendance Progress */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Overall Attendance Progress
            </Typography>
            <LinearProgress
              variant="determinate"
              value={attendanceRate}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>

          {/* Students Table */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  Student Attendance ({filteredStudents.length} students)
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveAttendance}
                  disabled={!hasUnsavedChanges}
                >
                  Save Attendance
                </Button>
              </Box>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student</TableCell>
                      <TableCell>Contact</TableCell>
                      <TableCell align="center">Present</TableCell>
                      <TableCell align="center">Absent</TableCell>
                      <TableCell align="center">Excused</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                              <PersonIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight="medium">
                                {student.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                ID: {student.id}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2">
                              {student.email}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {student.phone}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={student.attendanceStatus === 'present'}
                            onChange={() => handleAttendanceChange(student.id, 'present')}
                            color="success"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={student.attendanceStatus === 'absent'}
                            onChange={() => handleAttendanceChange(student.id, 'absent')}
                            color="error"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={student.attendanceStatus === 'excused'}
                            onChange={() => handleAttendanceChange(student.id, 'excused')}
                            sx={{ color: '#ff9800' }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Add notes..."
                            value={student.notes}
                            onChange={(e) => handleNotesChange(student.id, e.target.value)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button variant="outlined" onClick={() => {
              setStudents(prevStudents =>
                prevStudents.map(student => ({ ...student, attendanceStatus: 'present', notes: '' }))
              )
              setHasUnsavedChanges(true)
            }}>
              Mark All Present
            </Button>
            <Button variant="outlined" onClick={() => {
              setStudents(prevStudents =>
                prevStudents.map(student => ({ ...student, attendanceStatus: 'absent', notes: '' }))
              )
              setHasUnsavedChanges(true)
            }}>
              Mark All Absent
            </Button>
            <Button variant="outlined" onClick={() => {
              setStudents(mockStudents)
              setHasUnsavedChanges(false)
            }}>
              Reset
            </Button>
          </Box>
        </>
      )}

      {!selectedClass && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Please select a class and date to mark attendance.
        </Alert>
      )}

      {/* Save Confirmation Dialog */}
      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
        <DialogTitle>Attendance Saved</DialogTitle>
        <DialogContent>
          <Alert severity="success">
            Attendance has been successfully saved for {mockClasses.find(c => c.id === selectedClass)?.title}.
          </Alert>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {attendanceStats.present} students marked as present
            {attendanceStats.absent > 0 && `, ${attendanceStats.absent} marked as absent`}
            {attendanceStats.excused > 0 && `, ${attendanceStats.excused} marked as excused`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Close</Button>
          <Button variant="contained" onClick={() => setSaveDialogOpen(false)}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AttendancePage
