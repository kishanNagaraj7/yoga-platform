import React, { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Divider,
  Button,
  TextField,
  IconButton,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  Badge,
  Switch,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Rating,
  LinearProgress,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Tooltip,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Schedule as ScheduleIcon,
  People as PeopleIcon,
  Announcement as AnnouncementIcon,
  Assessment as AssessmentIcon,
  MenuBook as MenuBookIcon,
  HowToReg as HowToRegIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Event as EventIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from '@mui/icons-material'

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

const DesignSystemPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [ratingValue, setRatingValue] = useState(3)
  const [sliderValue, setSliderValue] = useState(50)
  const [switchState, setSwitchState] = useState(true)
  const [checkboxState, setCheckboxState] = useState(false)
  const [radioValue, setRadioValue] = useState('option1')
  const [selectValue, setSelectValue] = useState('')

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  // Design Tokens
  const designTokens = {
    colors: {
      primary: '#2e7d32',
      secondary: '#1976d2',
      success: '#2e7d32',
      warning: '#ed6c02',
      error: '#d32f2f',
      info: '#0288d1',
      grey: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#bdbdbd',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: '2.125rem', fontWeight: 300, lineHeight: 1.167 },
      h2: { fontSize: '1.5rem', fontWeight: 400, lineHeight: 1.2 },
      h3: { fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.167 },
      h4: { fontSize: '1.125rem', fontWeight: 400, lineHeight: 1.235 },
      h5: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.334 },
      h6: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.6 },
      body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 },
      body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.43 },
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    borderRadius: {
      small: 4,
      medium: 8,
      large: 12,
    },
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        🎨 Design System
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Complete UI component library and design guidelines for the Yoga Platform
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Design Tokens" />
          <Tab label="Colors" />
          <Tab label="Typography" />
          <Tab label="Components" />
          <Tab label="Icons" />
          <Tab label="Layouts" />
        </Tabs>
      </Box>

      {/* Design Tokens */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Color Palette
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {Object.entries(designTokens.colors).map(([key, value]) => {
                    if (typeof value === 'string') {
                      return (
                        <Box key={key} sx={{ textAlign: 'center' }}>
                          <Box
                            sx={{
                              width: 60,
                              height: 60,
                              bgcolor: value,
                              borderRadius: 1,
                              mb: 1,
                            }}
                          />
                          <Typography variant="caption" display="block">
                            {key}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block">
                            {value}
                          </Typography>
                        </Box>
                      )
                    }
                    return null
                  })}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Spacing Scale
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {Object.entries(designTokens.spacing).map(([key, value]) => (
                    <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ minWidth: 40 }}>
                        {key}:
                      </Typography>
                      <Box
                        sx={{
                          height: value,
                          bgcolor: 'primary.main',
                          borderRadius: 1,
                          flex: 1,
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {value}px
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Typography Scale
                </Typography>
                {Object.entries(designTokens.typography).map(([key, value]) => {
                  if (typeof value === 'object' && value !== null) {
                    return (
                      <Box key={key} sx={{ mb: 2 }}>
                        <Typography variant={key as any} sx={{ mb: 1 }}>
                          {key.charAt(0).toUpperCase() + key.slice(1)} Text
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Font Size: {value.fontSize} | Weight: {value.fontWeight}
                        </Typography>
                      </Box>
                    )
                  }
                  return null
                })}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Colors */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Status Colors
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Alert severity="success" sx={{ flex: 1, minWidth: 200 }}>
                    Success - Operations completed successfully
                  </Alert>
                  <Alert severity="warning" sx={{ flex: 1, minWidth: 200 }}>
                    Warning - Please review before proceeding
                  </Alert>
                  <Alert severity="error" sx={{ flex: 1, minWidth: 200 }}>
                    Error - Something went wrong
                  </Alert>
                  <Alert severity="info" sx={{ flex: 1, minWidth: 200 }}>
                    Info - Additional information
                  </Alert>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Status Icons
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
                    <Typography variant="caption" display="block">Success</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <WarningIcon color="warning" sx={{ fontSize: 40 }} />
                    <Typography variant="caption" display="block">Warning</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <ErrorIcon color="error" sx={{ fontSize: 40 }} />
                    <Typography variant="caption" display="block">Error</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <InfoIcon color="info" sx={{ fontSize: 40 }} />
                    <Typography variant="caption" display="block">Info</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Typography */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Typography Examples
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <Typography variant="h1">Heading 1 - Main Page Title</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Used for main page titles and hero sections
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h2">Heading 2 - Section Titles</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Used for major section titles and card headers
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h3">Heading 3 - Subsection Titles</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Used for subsection titles and important labels
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      Body text - This is the main body text used throughout the application. 
                      It's optimized for readability and works well for longer content descriptions.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      Body text 2 - This is secondary body text used for captions, 
                      helper text, and less important information.
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Components */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          {/* Buttons */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Buttons
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                  <Button variant="contained" color="primary">
                    Primary
                  </Button>
                  <Button variant="contained" color="secondary">
                    Secondary
                  </Button>
                  <Button variant="outlined">
                    Outlined
                  </Button>
                  <Button variant="text">
                    Text
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                  <Button variant="contained" startIcon={<AddIcon />}>
                    With Icon
                  </Button>
                  <Button variant="contained" endIcon={<DownloadIcon />}>
                    Download
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Button variant="contained" disabled>
                    Disabled
                  </Button>
                  <Button variant="contained" color="error">
                    Delete
                  </Button>
                  <Button variant="contained" color="success">
                    Save
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Form Controls */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Form Controls
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Text Field"
                    placeholder="Enter text here"
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                  />
                  <FormControl fullWidth>
                    <InputLabel>Select</InputLabel>
                    <Select
                      value={selectValue}
                      label="Select"
                      onChange={(e) => setSelectValue(e.target.value)}
                    >
                      <MenuItem value="">Choose option</MenuItem>
                      <MenuItem value="option1">Option 1</MenuItem>
                      <MenuItem value="option2">Option 2</MenuItem>
                      <MenuItem value="option3">Option 3</MenuItem>
                    </Select>
                  </FormControl>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <FormControlLabel
                      control={<Checkbox checked={checkboxState} onChange={(e) => setCheckboxState(e.target.checked)} />}
                      label="Checkbox"
                    />
                    <FormControlLabel
                      control={<Switch checked={switchState} onChange={(e) => setSwitchState(e.target.checked)} />}
                      label="Switch"
                    />
                  </Box>
                  <RadioGroup value={radioValue} onChange={(e) => setRadioValue(e.target.value)}>
                    <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                    <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                  </RadioGroup>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Chips & Badges */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Chips & Badges
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                  <Chip label="Default" />
                  <Chip label="Primary" color="primary" />
                  <Chip label="Success" color="success" />
                  <Chip label="Warning" color="warning" />
                  <Chip label="Error" color="error" />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Badge badgeContent={4} color="primary">
                    <NotificationsIcon />
                  </Badge>
                  <Badge badgeContent={99} color="error">
                    <EmailIcon />
                  </Badge>
                  <Badge badgeContent={0} showZero color="secondary">
                    <SettingsIcon />
                  </Badge>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Progress & Loading */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Progress & Loading
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Linear Progress
                    </Typography>
                    <LinearProgress variant="determinate" value={75} />
                  </Box>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Circular Progress
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <CircularProgress />
                      <CircularProgress variant="determinate" value={60} />
                      <CircularProgress color="secondary" />
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Rating
                    </Typography>
                    <Rating
                      value={ratingValue}
                      onChange={(_, newValue) => setRatingValue(newValue || 0)}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Slider
                    </Typography>
                    <Slider
                      value={sliderValue}
                      onChange={(_, newValue) => setSliderValue(Array.isArray(newValue) ? newValue[0] : newValue)}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Tables */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tables
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Age</TableCell>
                        <TableCell align="right">Role</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>John Doe</TableCell>
                        <TableCell align="right">28</TableCell>
                        <TableCell align="right">Teacher</TableCell>
                        <TableCell align="right">
                          <Chip label="Active" color="success" size="small" />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton size="small">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Jane Smith</TableCell>
                        <TableCell align="right">32</TableCell>
                        <TableCell align="right">Student</TableCell>
                        <TableCell align="right">
                          <Chip label="Active" color="success" size="small" />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton size="small">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Icons */}
      <TabPanel value={tabValue} index={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Navigation Icons
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {[
                    { icon: <DashboardIcon />, name: 'Dashboard' },
                    { icon: <SchoolIcon />, name: 'Classes' },
                    { icon: <ScheduleIcon />, name: 'Schedule' },
                    { icon: <PeopleIcon />, name: 'Users' },
                    { icon: <AnnouncementIcon />, name: 'Announcements' },
                    { icon: <AssessmentIcon />, name: 'Reports' },
                    { icon: <MenuBookIcon />, name: 'Attendance' },
                    { icon: <HowToRegIcon />, name: 'Enrollment' },
                  ].map(({ icon, name }) => (
                    <Box key={name} sx={{ textAlign: 'center', minWidth: 80 }}>
                      <IconButton size="large">{icon}</IconButton>
                      <Typography variant="caption" display="block">
                        {name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Action Icons
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {[
                    { icon: <SearchIcon />, name: 'Search' },
                    { icon: <AddIcon />, name: 'Add' },
                    { icon: <EditIcon />, name: 'Edit' },
                    { icon: <DeleteIcon />, name: 'Delete' },
                    { icon: <VisibilityIcon />, name: 'View' },
                    { icon: <FavoriteIcon />, name: 'Favorite' },
                    { icon: <ShareIcon />, name: 'Share' },
                    { icon: <DownloadIcon />, name: 'Download' },
                    { icon: <UploadIcon />, name: 'Upload' },
                  ].map(({ icon, name }) => (
                    <Box key={name} sx={{ textAlign: 'center', minWidth: 80 }}>
                      <IconButton size="large">{icon}</IconButton>
                      <Typography variant="caption" display="block">
                        {name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User & Account Icons
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {[
                    { icon: <AccountCircleIcon />, name: 'Profile' },
                    { icon: <LoginIcon />, name: 'Login' },
                    { icon: <LogoutIcon />, name: 'Logout' },
                    { icon: <PersonAddIcon />, name: 'Register' },
                    { icon: <SettingsIcon />, name: 'Settings' },
                    { icon: <NotificationsIcon />, name: 'Notifications' },
                  ].map(({ icon, name }) => (
                    <Box key={name} sx={{ textAlign: 'center', minWidth: 80 }}>
                      <IconButton size="large">{icon}</IconButton>
                      <Typography variant="caption" display="block">
                        {name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Content Icons
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {[
                    { icon: <EventIcon />, name: 'Event' },
                    { icon: <LocationIcon />, name: 'Location' },
                    { icon: <PhoneIcon />, name: 'Phone' },
                    { icon: <EmailIcon />, name: 'Email' },
                    { icon: <StarIcon />, name: 'Star' },
                    { icon: <TrendingUpIcon />, name: 'Trending Up' },
                    { icon: <TrendingDownIcon />, name: 'Trending Down' },
                  ].map(({ icon, name }) => (
                    <Box key={name} sx={{ textAlign: 'center', minWidth: 80 }}>
                      <IconButton size="large">{icon}</IconButton>
                      <Typography variant="caption" display="block">
                        {name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Layouts */}
      <TabPanel value={tabValue} index={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Card Layouts
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Standard Card
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        This is a standard card layout used throughout the application
                        for displaying content in an organized manner.
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card variant="elevation">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Elevated Card
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        This card has elevation for visual hierarchy.
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  List Layouts
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Paper variant="outlined">
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Yoga Classes"
                          secondary="Manage and schedule yoga classes"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemIcon>
                          <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="User Management"
                          secondary="Handle users and permissions"
                        />
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemIcon>
                          <AssessmentIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Reports"
                          secondary="View analytics and insights"
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Interactive Components
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    onClick={() => setSnackbarOpen(true)}
                  >
                    Show Snackbar
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setDialogOpen(true)}
                  >
                    Open Dialog
                  </Button>
                  <Fab color="primary" aria-label="add">
                    <AddIcon />
                  </Fab>
                  <Tooltip title="This is a tooltip">
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Avatar Examples */}
                <Box sx={{ mt: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Avatar>JD</Avatar>
                  <Avatar src="/static/images/avatar/1.jpg" />
                  <Avatar variant="square">AS</Avatar>
                  <Avatar variant="rounded">
                    <AccountCircleIcon />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Sample Dialog</DialogTitle>
        <DialogContent>
          <Typography>
            This is a sample dialog that demonstrates the dialog component
            used throughout the application for confirmations, forms, and
            additional information display.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => setDialogOpen(false)} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="This is a snackbar notification!"
      />
    </Container>
  )
}

export default DesignSystemPage
