import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Avatar,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Event as EventIcon,
  People as PeopleIcon,
  Announcement as AnnouncementIcon,
  Assessment as AssessmentIcon,
  MenuBook as MenuBookIcon,
  Schedule as ScheduleIcon,
  HowToReg as HowToRegIcon,
} from '@mui/icons-material'
import { useSupabaseAuth } from '../../contexts/SupabaseAuthContext'
import { UserRole } from '../../types'

interface SidebarProps {
  onClose?: () => void
}

interface MenuItem {
  text: string
  icon: React.ReactNode
  path: string
  roles: UserRole[]
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { user } = useSupabaseAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems: MenuItem[] = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: user?.role === UserRole.ADMIN ? '/admin/dashboard' :
            user?.role === UserRole.SANCHALAKA ? '/sanchalaka/dashboard' :
            user?.role === UserRole.TEACHER ? '/teacher/dashboard' :
            '/student/dashboard',
      roles: [UserRole.ADMIN, UserRole.SANCHALAKA, UserRole.TEACHER, UserRole.STUDENT]
    },
    {
      text: 'Classes',
      icon: <SchoolIcon />,
      path: '/classes',
      roles: [UserRole.ADMIN, UserRole.SANCHALAKA, UserRole.TEACHER, UserRole.STUDENT]
    },
    {
      text: 'Schedule',
      icon: <ScheduleIcon />,
      path: '/schedule',
      roles: [UserRole.ADMIN, UserRole.SANCHALAKA, UserRole.TEACHER, UserRole.STUDENT]
    },
    {
      text: 'Enrollment',
      icon: <HowToRegIcon />,
      path: '/enrollment',
      roles: [UserRole.ADMIN, UserRole.SANCHALAKA, UserRole.TEACHER, UserRole.STUDENT]
    },
    {
      text: 'Attendance',
      icon: <MenuBookIcon />,
      path: '/attendance',
      roles: [UserRole.ADMIN, UserRole.SANCHALAKA, UserRole.TEACHER, UserRole.STUDENT]
    },
    {
      text: 'Announcements',
      icon: <AnnouncementIcon />,
      path: '/announcements',
      roles: [UserRole.ADMIN, UserRole.SANCHALAKA, UserRole.TEACHER, UserRole.STUDENT]
    },
    {
      text: 'Users',
      icon: <PeopleIcon />,
      path: '/admin/users',
      roles: [UserRole.ADMIN]
    },
    {
      text: 'Reports',
      icon: <AssessmentIcon />,
      path: '/reports',
      roles: [UserRole.ADMIN, UserRole.SANCHALAKA, UserRole.TEACHER, UserRole.STUDENT]
    },
    {
      text: 'Events',
      icon: <EventIcon />,
      path: '/events',
      roles: [UserRole.ADMIN, UserRole.SANCHALAKA]
    },
  ]

  const filteredMenuItems = menuItems.filter(item => 
    user && user.role && item.roles.includes(user.role as UserRole)
  )

  const handleNavigation = (path: string) => {
    navigate(path)
    if (onClose) {
      onClose()
    }
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <Box sx={{ height: '100%', bgcolor: '#f8f9fa' }}>
      {/* User Profile Section */}
      <Box sx={{ p: 2, bgcolor: 'white', borderBottom: '1px solid rgba(0,0,0,0.12)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={user?.profile?.avatar}
            alt={user?.name}
            sx={{ width: 40, height: 40 }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" noWrap>
              {user?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Toolbar />

      {/* Navigation Menu */}
      <List sx={{ px: 1, py: 1 }}>
        {filteredMenuItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={isActive(item.path)}
              sx={{
                borderRadius: 1,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.04)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: isActive(item.path) ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Branch/Region Info */}
      {user?.branch && (
        <>
          <Divider sx={{ mx: 2, my: 2 }} />
          <Box sx={{ px: 2, pb: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Branch
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {user.branch.name}
            </Typography>
            {user.branch.region && (
              <>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  Region
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {user.branch.region.name}
                </Typography>
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  )
}

export default Sidebar
