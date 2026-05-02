import React, { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material'
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Today as TodayIcon,
  ViewWeek as ViewWeekIcon,
  CalendarViewMonth as ViewMonthIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  VideoCall as VideoCallIcon,
} from '@mui/icons-material'
// import { format, addDays, startOfWeek, addWeeks, subWeeks } from 'date-fns'

// Mock data for demonstration
const mockSchedule = [
  {
    id: '1',
    className: 'Morning Hatha Yoga',
    teacher: { name: 'John Doe', avatar: '' },
    time: '06:00 AM - 07:00 AM',
    mode: 'offline',
    branch: { name: 'Downtown Studio' },
    category: 'Hatha',
    level: 'Beginner',
    day: 'Monday',
  },
  {
    id: '2',
    className: 'Evening Vinyasa Flow',
    teacher: { name: 'Jane Smith', avatar: '' },
    time: '06:00 PM - 07:30 PM',
    mode: 'online',
    branch: { name: 'Online Platform' },
    category: 'Vinyasa',
    level: 'Intermediate',
    day: 'Tuesday',
  },
  {
    id: '3',
    className: 'Weekend Yin Yoga',
    teacher: { name: 'Mike Johnson', avatar: '' },
    time: '10:00 AM - 11:30 AM',
    mode: 'hybrid',
    branch: { name: 'Uptown Studio' },
    category: 'Yin',
    level: 'All Levels',
    day: 'Saturday',
  },
]

type ViewType = 'day' | 'week' | 'month'

const SchedulePage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewType, setViewType] = useState<ViewType>('week')

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const fullDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const getWeekDates = () => {
    // Simple mock implementation without date-fns
    const dates = []
    const start = new Date(currentDate)
    start.setDate(start.getDate() - start.getDay())
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(start)
      date.setDate(start.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const getClassesForDay = (dayName: string) => {
    return mockSchedule.filter(cls => cls.day === dayName)
  }

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'online': return <VideoCallIcon />
      case 'offline': return <LocationIcon />
      case 'hybrid': return <LocationIcon />
      default: return <LocationIcon />
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

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'hatha': return '#4caf50'
      case 'vinyasa': return '#2196f3'
      case 'yin': return '#9c27b0'
      case 'ashtanga': return '#ff5722'
      case 'meditation': return '#795548'
      default: return '#757575'
    }
  }

  const weekDates = getWeekDates()

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Schedule
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View and manage your class schedule
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={handlePreviousWeek}>
            <ChevronLeftIcon />
          </IconButton>
          <Button
            variant="outlined"
            startIcon={<TodayIcon />}
            onClick={handleToday}
          >
            Today
          </Button>
          <IconButton onClick={handleNextWeek}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      {/* View Type Selector */}
      <Box sx={{ mb: 3, display: 'flex', gap: 1 }}>
        <Button
          variant={viewType === 'day' ? 'contained' : 'outlined'}
          startIcon={<TodayIcon />}
          onClick={() => setViewType('day')}
        >
          Day
        </Button>
        <Button
          variant={viewType === 'week' ? 'contained' : 'outlined'}
          startIcon={<ViewWeekIcon />}
          onClick={() => setViewType('week')}
        >
          Week
        </Button>
        <Button
          variant={viewType === 'month' ? 'contained' : 'outlined'}
          startIcon={<ViewMonthIcon />}
          onClick={() => setViewType('month')}
        >
          Month
        </Button>
      </Box>

      {/* Week View */}
      {viewType === 'week' && (
        <Box>
          {/* Week Header */}
          <Typography variant="h6" sx={{ mb: 2 }}>
            Week of {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </Typography>

          {/* Week Grid */}
          <Grid container spacing={2}>
            {weekDates.map((date, index) => {
              const dayName = fullDayNames[index]
              const dayClasses = getClassesForDay(dayName)
              const isToday = date.toDateString() === new Date().toDateString()

              return (
                <Grid item xs={12} sm={6} md={12} lg={12} key={index}>
                  <Card
                    sx={{
                      border: isToday ? '2px solid #2e7d32' : '1px solid rgba(0,0,0,0.12)',
                      bgcolor: isToday ? 'rgba(46, 125, 50, 0.04)' : 'background.paper',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ mr: 2 }}>
                          {weekDays[index]}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </Typography>
                        {isToday && (
                          <Chip label="Today" size="small" color="primary" sx={{ ml: 1 }} />
                        )}
                      </Box>

                      {dayClasses.length > 0 ? (
                        <List dense>
                          {dayClasses.map((classItem) => (
                            <ListItem key={classItem.id} sx={{ pl: 0 }}>
                              <ListItemAvatar>
                                <Avatar sx={{ bgcolor: getCategoryColor(classItem.category) }}>
                                  <PersonIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="subtitle2">
                                      {classItem.className}
                                    </Typography>
                                    <Chip
                                      label={classItem.category}
                                      size="small"
                                      sx={{
                                        bgcolor: getCategoryColor(classItem.category),
                                        color: 'white',
                                        fontSize: '0.7rem',
                                        height: 20,
                                      }}
                                    />
                                  </Box>
                                }
                                secondary={
                                  <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                      <TimeIcon sx={{ fontSize: 14 }} />
                                      <Typography variant="caption">
                                        {classItem.time}
                                      </Typography>
                                      <Chip
                                        icon={getModeIcon(classItem.mode)}
                                        label={classItem.mode}
                                        size="small"
                                        sx={{
                                          bgcolor: getModeColor(classItem.mode),
                                          color: 'white',
                                          fontSize: '0.7rem',
                                          height: 20,
                                        }}
                                      />
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">
                                      {classItem.teacher.name} • {classItem.branch.name}
                                    </Typography>
                                  </Box>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                          No classes scheduled
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      )}

      {/* Day View (Simplified) */}
      {viewType === 'day' && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                Day view would show detailed hourly schedule here
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Month View (Simplified) */}
      {viewType === 'month' && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                Month view would show calendar grid here
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Legend */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Legend
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip label="Online" size="small" sx={{ bgcolor: '#2196f3', color: 'white' }} />
              <Typography variant="caption">Online Class</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip label="Offline" size="small" sx={{ bgcolor: '#4caf50', color: 'white' }} />
              <Typography variant="caption">In-Person Class</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip label="Hybrid" size="small" sx={{ bgcolor: '#9c27b0', color: 'white' }} />
              <Typography variant="caption">Hybrid Class</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default SchedulePage
