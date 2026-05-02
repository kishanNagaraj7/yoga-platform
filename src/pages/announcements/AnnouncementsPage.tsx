import React, { useState } from 'react'
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
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  IconButton,
  Menu,
  Tabs,
  Tab,
  Paper,
} from '@mui/material'
import {
  Add as AddIcon,
  Announcement as AnnouncementIcon,
  MoreVert as MoreVertIcon,
  Send as SendIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { useSupabaseAuth } from '../../contexts/SupabaseAuthContext'

// Mock data for demonstration
const mockAnnouncements = [
  {
    id: '1',
    title: 'Holiday Schedule Update',
    content: 'Please note that classes will be rescheduled during the upcoming holiday period. Check the updated schedule in your dashboard.',
    type: 'urgent',
    targetAudience: 'global',
    targetId: null,
    author: 'Admin',
    authorRole: 'admin',
    status: 'published',
    createdAt: '2024-01-15',
    publishedAt: '2024-01-15',
    expiresAt: '2024-01-30',
    readCount: 245,
  },
  {
    id: '2',
    title: 'New Yoga Class Introduction',
    content: 'We are excited to announce a new Restorative Yoga class starting next month. Perfect for stress relief and relaxation.',
    type: 'general',
    targetAudience: 'branch',
    targetId: 'branch-1',
    author: 'John Teacher',
    authorRole: 'teacher',
    status: 'pending_approval',
    createdAt: '2024-01-14',
    publishedAt: null,
    expiresAt: '2024-02-28',
    readCount: 0,
  },
  {
    id: '3',
    title: 'Workshop: Advanced Breathing Techniques',
    content: 'Join us for a special workshop on advanced pranayama techniques this weekend. Limited spots available.',
    type: 'event',
    targetAudience: 'class',
    targetId: 'class-1',
    author: 'Jane Teacher',
    authorRole: 'teacher',
    status: 'published',
    createdAt: '2024-01-13',
    publishedAt: '2024-01-13',
    expiresAt: '2024-01-21',
    readCount: 89,
  },
]

const mockMyAnnouncements = [
  {
    id: '4',
    title: 'Class Schedule Change',
    content: 'Morning Hatha Yoga class time changed from 6:00 AM to 6:30 AM starting next week.',
    type: 'schedule_change',
    targetAudience: 'class',
    targetId: 'class-1',
    author: 'You',
    authorRole: 'teacher',
    status: 'published',
    createdAt: '2024-01-12',
    publishedAt: '2024-01-12',
    expiresAt: '2024-01-25',
    readCount: 67,
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

const AnnouncementsPage: React.FC = () => {
  const { user } = useSupabaseAuth()
  const [tabValue, setTabValue] = useState(0)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'general',
    targetAudience: 'global',
    targetId: '',
    expiresAt: '',
  })

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleCreateClick = () => {
    setCreateDialogOpen(true)
  }

  const handleCreateClose = () => {
    setCreateDialogOpen(false)
    setFormData({
      title: '',
      content: '',
      type: 'general',
      targetAudience: 'global',
      targetId: '',
      expiresAt: '',
    })
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, announcement: any) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }

  const handleCreateSubmit = () => {
    // Handle announcement creation logic here
    console.log('Creating announcement:', formData)
    handleCreateClose()
  }


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return '#4caf50'
      case 'pending_approval': return '#ff9800'
      case 'draft': return '#757575'
      case 'rejected': return '#f44336'
      case 'expired': return '#9e9e9e'
      default: return '#757575'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircleIcon />
      case 'pending_approval': return <PendingIcon />
      case 'draft': return <ScheduleIcon />
      case 'rejected': return <CancelIcon />
      case 'expired': return <CancelIcon />
      default: return <ScheduleIcon />
    }
  }

  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    if (tabValue === 0) return true // All
    if (tabValue === 1) return announcement.status === 'published' // Published
    if (tabValue === 2) return announcement.status === 'pending_approval' // Pending
    if (tabValue === 3) return announcement.author === user?.name // My Announcements
    return true
  })

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Announcements
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create and manage announcements for students and staff.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateClick}>
          Create Announcement
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary">
                {mockAnnouncements.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Announcements
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main">
                {mockAnnouncements.filter(a => a.status === 'published').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Published
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="warning.main">
                {mockAnnouncements.filter(a => a.status === 'pending_approval').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Approval
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="info.main">
                {mockMyAnnouncements.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                My Announcements
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All Announcements" />
          <Tab label="Published" />
          <Tab label="Pending Approval" />
          <Tab label="My Announcements" />
        </Tabs>
      </Box>

      {/* Announcements List */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {filteredAnnouncements.map((announcement) => (
            <Grid item xs={12} md={6} key={announcement.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Avatar sx={{ bgcolor: getTypeColor(announcement.type), mr: 2 }}>
                      <AnnouncementIcon />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {announcement.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <Chip
                          label={announcement.type}
                          size="small"
                          sx={{ bgcolor: getTypeColor(announcement.type), color: 'white' }}
                        />
                        <Chip
                          label={announcement.status}
                          size="small"
                          color={announcement.status === 'published' ? 'success' : 'warning'}
                          icon={getStatusIcon(announcement.status)}
                        />
                        <Chip
                          label={announcement.targetAudience}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, announcement)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {announcement.content}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        By {announcement.author} ({announcement.authorRole})
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Created: {announcement.createdAt}
                        {announcement.publishedAt && ` • Published: ${announcement.publishedAt}`}
                      </Typography>
                      {announcement.expiresAt && (
                        <Typography variant="caption" color="text.secondary">
                          Expires: {announcement.expiresAt}
                        </Typography>
                      )}
                    </Box>
                    {announcement.readCount > 0 && (
                      <Typography variant="caption" color="text.secondary">
                        {announcement.readCount} views
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {filteredAnnouncements
            .filter(a => a.status === 'published')
            .map((announcement) => (
              <Grid item xs={12} md={6} key={announcement.id}>
                <Card>
                  <CardContent>
                    {/* Same content structure as above */}
                    <Typography variant="h6">{announcement.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {announcement.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {filteredAnnouncements
            .filter(a => a.status === 'pending_approval')
            .map((announcement) => (
              <Grid item xs={12} md={6} key={announcement.id}>
                <Card>
                  <CardContent>
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      This announcement is pending approval.
                    </Alert>
                    <Typography variant="h6">{announcement.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {announcement.content}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Button size="small" variant="contained">
                        Edit
                      </Button>
                      <Button size="small" variant="outlined" color="error">
                        Withdraw
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          {mockMyAnnouncements.map((announcement) => (
            <Grid item xs={12} md={6} key={announcement.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{announcement.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {announcement.content}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button size="small" variant="outlined" startIcon={<EditIcon />}>
                      Edit
                    </Button>
                    <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />}>
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <EditIcon sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <SendIcon sx={{ mr: 1 }} /> Send Now
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ScheduleIcon sx={{ mr: 1 }} /> Schedule
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Create Announcement Dialog */}
      <Dialog open={createDialogOpen} onClose={handleCreateClose} maxWidth="md" fullWidth>
        <DialogTitle>Create New Announcement</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              sx={{ mb: 2 }}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    label="Type"
                  >
                    <MenuItem value="general">General</MenuItem>
                    <MenuItem value="urgent">Urgent</MenuItem>
                    <MenuItem value="schedule_change">Schedule Change</MenuItem>
                    <MenuItem value="holiday">Holiday</MenuItem>
                    <MenuItem value="event">Event</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Target Audience</InputLabel>
                  <Select
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    label="Target Audience"
                  >
                    <MenuItem value="global">All Users</MenuItem>
                    <MenuItem value="region">Region</MenuItem>
                    <MenuItem value="branch">Branch</MenuItem>
                    <MenuItem value="class">Class</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <TextField
              fullWidth
              type="date"
              label="Expires On (Optional)"
              value={formData.expiresAt}
              onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
              sx={{ mt: 2 }}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateClose}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateSubmit}>
            Create Announcement
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AnnouncementsPage
