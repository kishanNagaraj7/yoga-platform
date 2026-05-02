import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  Alert,
  Skeleton,
} from '@mui/material'

import {
  School,
  Event,
  CalendarMonth,
} from '@mui/icons-material'

import { supabase } from '../../services/supabaseClient'

const GuestDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true)

  const [data, setData] = useState({
    classes: 0,
    schedules: 0,
    announcements: 0,
  })

  useEffect(() => {
    fetchGuestData()
  }, [])

  const fetchGuestData = async () => {
    try {
      setLoading(true)

      // ─── PUBLIC CLASSES ONLY ─────
      const { count: classCount } = await supabase
        .from('yoga_classes')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)

      // ─── PUBLIC SCHEDULE ─────────
      const { count: scheduleCount } = await supabase
        .from('class_schedules')
        .select('*', { count: 'exact', head: true })

      // ─── PUBLIC ANNOUNCEMENTS ────
      const { count: announcementCount } = await supabase
        .from('announcements')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'PUBLISHED')

      setData({
        classes: classCount || 0,
        schedules: scheduleCount || 0,
        announcements: announcementCount || 0,
      })
    } finally {
      setLoading(false)
    }
  }

  // ───────────────────────────────
  // UI CARD
  // ───────────────────────────────
  const StatCard = ({ icon, title, value, color }: any) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Box sx={{ mr: 2, color }}>{icon}</Box>

          <Box>
            <Typography variant="h6">
              {loading ? <Skeleton width={40} /> : value}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">
        Welcome to SPYSS Yoga
      </Typography>

      <Alert severity="info" sx={{ mt: 2 }}>
        Guest Access Mode - Limited Features Enabled
      </Alert>

      {/* ONLY PUBLIC DATA */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <StatCard
            icon={<School />}
            title="Public Classes"
            value={data.classes}
            color="#1976d2"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard
            icon={<Event />}
            title="Schedules"
            value={data.schedules}
            color="#ff9800"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard
            icon={<CalendarMonth />}
            title="Announcements"
            value={data.announcements}
            color="#9c27b0"
          />
        </Grid>
      </Grid>

      {/* ACTIONS */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Browse Classes</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                View available yoga classes
              </Typography>

              <Button href="/classes" variant="contained">
                Explore
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Announcements</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Read public updates only
              </Typography>

              <Button href="/announcements" variant="contained">
                View
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default GuestDashboard
