import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Menu,
  Alert,
  Skeleton,
  InputAdornment,
} from '@mui/material'
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material'

import { ClassCategory, ClassLevel, ClassMode } from '../../types'
import { useSupabaseAuth } from '../../contexts/SupabaseAuthContext'
import { supabase } from '../../services/supabaseClient'

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface Class {
  id: string
  title: string
  description: string

  category: ClassCategory
  level: ClassLevel
  mode: ClassMode

  capacity: number
  enrolled_count: number
  waitlist_count: number

  teacher: {
    name: string
  }

  branch: {
    name: string
  }

  duration: number
  price?: number
  rating?: number
  next_class?: string
  is_active: boolean
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

const getCategoryColor = (c: ClassCategory) =>
  ({
    hatha: '#4caf50',
    vinyasa: '#ff9800',
    yin: '#9c27b0',
    ashtanga: '#f44336',
    kundalini: '#e91e63',
    restorative: '#607d8b',
    meditation: '#795548',
    pranayama: '#009688',
  }[c] || '#1976d2')

const getLevelColor = (l: ClassLevel) =>
  ({
    beginner: '#4caf50',
    intermediate: '#ff9800',
    advanced: '#f44336',
    all_levels: '#1976d2',
  }[l] || '#757575')

const getModeColor = (m: ClassMode) =>
  ({
    online: '#2196f3',
    offline: '#4caf50',
    hybrid: '#ff9800',
  }[m] || '#757575')

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

const ClassesPage: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [classes, setClasses] = useState<Class[]>([])
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState<ClassCategory | ''>('')
  const [level, setLevel] = useState<ClassLevel | ''>('')
  const [mode, setMode] = useState<ClassMode | ''>('')

  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)

  useEffect(() => {
    fetchClasses()
  }, [])

  // ─────────────────────────────────────────────
  // FETCH CLASSES (FIXED)
  // ─────────────────────────────────────────────

  const fetchClasses = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('yoga_classes')
        .select(`
          id,
          name,
          description,
          branch:branches!yoga_classes_branch_id_fkey(
            name
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      const transformed: Class[] = (data || []).map((item: any) => ({
        id: item.id,
        title: item.name,
        description: item.description || '',

        category: item.category || 'ALL',
        level: item.level || 'ALL_LEVELS',
        mode: item.mode || 'OFFLINE',

        capacity: item.capacity || 0,

        enrolled_count: 0, // TODO: compute from enrollments
        waitlist_count: 0, // TODO: compute later

        teacher: {
          name: item.teacher?.full_name || 'Unknown Teacher',
        },

        branch: {
          name: item.branch?.name || 'Online',
        },

        duration: 0,
        price: item.price || 0,
        rating: 4.5,
        next_class: undefined,
        is_active: item.is_active,
      }))

      setClasses(transformed)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load classes')
    } finally {
      setLoading(false)
    }
  }

  // ─────────────────────────────────────────────
  // FILTERS
  // ─────────────────────────────────────────────

  const filtered = classes.filter((c) => {
    return (
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!category || c.category === category) &&
      (!level || c.level === level) &&
      (!mode || c.mode === mode)
    )
  })

  // ─────────────────────────────────────────────
  // UI
  // ─────────────────────────────────────────────

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
        <Button onClick={fetchClasses}>Retry</Button>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Classes</Typography>

      {/* SEARCH */}
      <Box sx={{ my: 2, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Search classes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <IconButton onClick={(e) => setFilterAnchorEl(e.currentTarget)}>
          <FilterIcon />
        </IconButton>
      </Box>

      {/* FILTER MENU */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={() => setFilterAnchorEl(null)}
      >
        <Box sx={{ p: 2, width: 220 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value as any)}>
              <MenuItem value="">All</MenuItem>
              {Object.values(ClassCategory).map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Level</InputLabel>
            <Select value={level} onChange={(e) => setLevel(e.target.value as any)}>
              <MenuItem value="">All</MenuItem>
              {Object.values(ClassLevel).map((l) => (
                <MenuItem key={l} value={l}>{l}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Mode</InputLabel>
            <Select value={mode} onChange={(e) => setMode(e.target.value as any)}>
              <MenuItem value="">All</MenuItem>
              {Object.values(ClassMode).map((m) => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Menu>

      {/* GRID */}
      {loading ? (
        <Skeleton height={200} />
      ) : (
        <Grid container spacing={3}>
          {filtered.map((c) => (
            <Grid item xs={12} md={4} key={c.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{c.title}</Typography>

                  <Typography variant="body2">{c.description}</Typography>

                  <Box mt={1}>
                    <Chip label={c.category} sx={{ bgcolor: getCategoryColor(c.category), color: '#fff', mr: 1 }} />
                    <Chip label={c.level} sx={{ bgcolor: getLevelColor(c.level), color: '#fff', mr: 1 }} />
                    <Chip label={c.mode} sx={{ bgcolor: getModeColor(c.mode), color: '#fff' }} />
                  </Box>

                  <Box mt={2}>
                    <Typography variant="body2">
                      👨‍🏫 {c.teacher.name}
                    </Typography>
                    <Typography variant="body2">
                      📍 {c.branch.name}
                    </Typography>
                    <Typography variant="body2">
                      👥 Capacity: {c.capacity}
                    </Typography>
                  </Box>

                  <Button fullWidth sx={{ mt: 2 }} variant="contained">
                    Enroll
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default ClassesPage
