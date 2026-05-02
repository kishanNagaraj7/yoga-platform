import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Alert,
  CircularProgress,
  Skeleton,
} from '@mui/material'
import {
  School as SchoolIcon,
  Today as TodayIcon,
  CheckCircle as CheckCircleIcon,
  Event as EventIcon,
} from '@mui/icons-material'
import { useSupabaseAuth } from '../../contexts/SupabaseAuthContext'
import { supabase } from '../../services/supabaseClient'

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface EnrolledClass {
  id: string
  title: string
  teacher: string
  next_class: string
  attendance_count: number
  progress: number
}

interface ScheduleItem {
  id: string
  class_title: string
  start_time: string
  end_time: string
  teacher: string
  branch_name?: string
}

interface DashboardStats {
  enrolledClasses: number
  classesToday: number
  attendanceRate: number
  totalSessions: number
}

// ─────────────────────────────────────────────
// UI CARD
// ─────────────────────────────────────────────

const StatCard = ({ title, value, icon, color, loading }: any) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: color, mr: 2 }}>
          {loading ? <CircularProgress size={20} /> : icon}
        </Avatar>
        <Box>
          <Typography variant="h6">
            {loading ? <Skeleton width={40} /> : value}
          </Typography>
          <Typography variant="body2">{title}</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
)

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

const StudentDashboard: React.FC = () => {
  const { user } = useSupabaseAuth()

  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [todaySchedule, setTodaySchedule] = useState<ScheduleItem[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  // ─────────────────────────────────────────────
  // FETCH DATA
  // ─────────────────────────────────────────────

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      const userId = user?.id
      if (!userId) throw new Error('User not found')

      // ───── ENROLLMENTS (FIXED) ─────
      const { data: enrolledData, error: enrolledError } = await supabase
        .from('enrollments')
        .select(`
          id,
          yoga_classes!inner(
            id,
            name,
            teacher_id
          )
        `)
        .eq('student_id', userId)
        .eq('status', 'APPROVED')

      if (enrolledError) throw enrolledError

      const classes: EnrolledClass[] = (enrolledData || []).map((item: any) => ({
        id: item.id,
        title: item.yoga_classes.name,
        teacher: item.yoga_classes.teacher_id
          ? `Teacher ${item.yoga_classes.teacher_id.slice(0, 8)}`
          : 'Teacher',
        next_class: 'TBD',
        attendance_count: 0,
        progress: 0,
      }))

      // ───── TODAY SCHEDULE (FIXED) ─────
      const today = new Date()
      const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString()
      const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString()

      const { data: scheduleData, error: scheduleError } = await supabase
        .from('class_schedules')
        .select(`
          id,
          start_time,
          end_time,
          yoga_classes!inner(
            name,
            branch:branches(name)
          )
        `)
        .gte('start_time', startOfDay)
        .lte('start_time', endOfDay)
        .order('start_time', { ascending: true })

      if (scheduleError) throw scheduleError

      const schedule: ScheduleItem[] = (scheduleData || []).map((item: any) => ({
        id: item.id,
        class_title: item.yoga_classes.name,
        start_time: item.start_time,
        end_time: item.end_time,
        teacher: item.yoga_classes.teacher?.full_name || 'Unknown',
        branch_name: item.yoga_classes.branch?.name,
      }))

      // ───── STATS (SAFE CALCULATION) ─────
      const stats: DashboardStats = {
        enrolledClasses: classes.length,
        classesToday: schedule.length,
        attendanceRate: 0,
        totalSessions: 0,
      }

      setEnrolledClasses(classes)
      setTodaySchedule(schedule)
      setStats(stats)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  // ─────────────────────────────────────────────
  // ERROR STATE
  // ─────────────────────────────────────────────

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
        <Button onClick={fetchDashboardData}>Retry</Button>
      </Box>
    )
  }

  // ─────────────────────────────────────────────
  // UI
  // ─────────────────────────────────────────────

  return (
    <Box p={3}>
      <Typography variant="h4">Student Dashboard</Typography>

      {/* STATS */}
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Classes"
            value={stats?.enrolledClasses || 0}
            icon={<SchoolIcon />}
            color="#2e7d32"
            loading={loading}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Today"
            value={stats?.classesToday || 0}
            icon={<TodayIcon />}
            color="#1976d2"
            loading={loading}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Attendance"
            value={`${stats?.attendanceRate || 0}%`}
            icon={<CheckCircleIcon />}
            color="#f57c00"
            loading={loading}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Sessions"
            value={stats?.totalSessions || 0}
            icon={<EventIcon />}
            color="#7b1fa2"
            loading={loading}
          />
        </Grid>
      </Grid>

      {/* TODAY SCHEDULE */}
      <Box mt={4}>
        <Typography variant="h6">Today's Schedule</Typography>

        {todaySchedule.map((item) => (
          <Card key={item.id} sx={{ mt: 2, p: 2 }}>
            <Typography fontWeight="bold">{item.class_title}</Typography>
            <Typography variant="body2">
              {new Date(item.start_time).toLocaleTimeString()} -{' '}
              {new Date(item.end_time).toLocaleTimeString()}
            </Typography>
            <Typography variant="body2">{item.teacher}</Typography>
            <Typography variant="caption">{item.branch_name}</Typography>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default StudentDashboard
