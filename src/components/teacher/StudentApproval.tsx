import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  IconButton,
  Alert,
  Snackbar,
  Grid,
  Paper,
  LinearProgress,
} from '@mui/material'
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Cake as CakeIcon,
  Home as HomeIcon,
  MedicalServices as MedicalIcon,
  EmergencyShare as EmergencyIcon,
  CheckCircle as CheckIcon,
  Cancel as RejectIcon,
  Visibility as ViewIcon,
  Pending as PendingIcon,
} from '@mui/icons-material'
import { approvalService, StudentProfile, ApprovalRequest } from '@/services/approvalService'

interface StudentApprovalProps {
  onApprovalCountChange?: (count: number) => void
}

const StudentApproval: React.FC<StudentApprovalProps> = ({ onApprovalCountChange }) => {
  const [pendingProfiles, setPendingProfiles] = useState<StudentProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProfile, setSelectedProfile] = useState<StudentProfile | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false)
  const [notes, setNotes] = useState('')
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error' | 'warning'
  }>({ open: false, message: '', severity: 'success' })

  useEffect(() => {
    fetchPendingApprovals()
  }, [])

  const fetchPendingApprovals = async () => {
    try {
      setLoading(true)
      setError(null)
      const profiles = await approvalService.getPendingApprovals()
      setPendingProfiles(profiles)
      onApprovalCountChange?.(profiles.length)
    } catch (error) {
      console.error('Error fetching pending approvals:', error)
      setError('Failed to fetch pending approvals. Please check if the backend server is running.')
      setSnackbar({
        open: true,
        message: 'Failed to fetch pending approvals',
        severity: 'error'
      })
      setPendingProfiles([])
      onApprovalCountChange?.(0)
    } finally {
      setLoading(false)
    }
  }

  const handleViewProfile = async (profile: StudentProfile) => {
    try {
      const fullProfile = await approvalService.getStudentProfile(profile.id)
      setSelectedProfile(fullProfile)
      setDetailDialogOpen(true)
    } catch (error) {
      console.error('Error fetching profile details:', error)
      setSnackbar({
        open: true,
        message: 'Failed to fetch profile details',
        severity: 'error'
      })
    }
  }

  const handleApprove = (profile: StudentProfile) => {
    setSelectedProfile(profile)
    setApprovalDialogOpen(true)
  }

  const handleReject = (profile: StudentProfile) => {
    setSelectedProfile(profile)
    setRejectionDialogOpen(true)
  }

  const confirmApproval = async () => {
    if (!selectedProfile) return

    try {
      const request: ApprovalRequest = {
        profileId: selectedProfile.id,
        decision: 'APPROVE',
        notes: notes.trim() || undefined
      }

      await approvalService.approveStudent(request)
      
      setSnackbar({
        open: true,
        message: `Student ${selectedProfile.userFullName} approved successfully!`,
        severity: 'success'
      })

      setApprovalDialogOpen(false)
      setNotes('')
      setSelectedProfile(null)
      fetchPendingApprovals()
    } catch (error) {
      console.error('Error approving student:', error)
      setSnackbar({
        open: true,
        message: 'Failed to approve student',
        severity: 'error'
      })
    }
  }

  const confirmRejection = async () => {
    if (!selectedProfile) return

    try {
      const request: ApprovalRequest = {
        profileId: selectedProfile.id,
        decision: 'REJECT',
        notes: notes.trim() || 'No reason provided'
      }

      await approvalService.rejectStudent(request)
      
      setSnackbar({
        open: true,
        message: `Student ${selectedProfile.userFullName} rejected`,
        severity: 'warning'
      })

      setRejectionDialogOpen(false)
      setNotes('')
      setSelectedProfile(null)
      fetchPendingApprovals()
    } catch (error) {
      console.error('Error rejecting student:', error)
      setSnackbar({
        open: true,
        message: 'Failed to reject student',
        severity: 'error'
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Pending Student Approvals
          </Typography>
          <LinearProgress />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Pending Student Approvals
          </Typography>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button variant="outlined" onClick={fetchPendingApprovals}>
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Pending Student Approvals
            {pendingProfiles.length > 0 && (
              <Chip
                label={pendingProfiles.length}
                color="warning"
                size="small"
                sx={{ ml: 2 }}
                icon={<PendingIcon />}
              />
            )}
          </Typography>
          
          {pendingProfiles.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CheckIcon color="success" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="body1" color="text.secondary">
                No pending student approvals
              </Typography>
            </Box>
          ) : (
            <List>
              {pendingProfiles.map((profile) => (
                <ListItem key={profile.id} divider>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#ff9800' }}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1">
                          {profile.userFullName}
                        </Typography>
                        <Chip label="PENDING" size="small" color="warning" />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          <EmailIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                          {profile.userEmail}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <CakeIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                          Age: {calculateAge(profile.dateOfBirth)} • {formatDate(profile.dateOfBirth)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <HomeIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                          {profile.address}
                        </Typography>
                      </Box>
                    }
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      onClick={() => handleViewProfile(profile)}
                      color="primary"
                      title="View Details"
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleApprove(profile)}
                      color="success"
                      title="Approve"
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleReject(profile)}
                      color="error"
                      title="Reject"
                    >
                      <RejectIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Profile Detail Dialog */}
      <Dialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Student Profile Details</DialogTitle>
        <DialogContent>
          {selectedProfile && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Personal Information
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      {selectedProfile.userFullName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      {selectedProfile.userEmail}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CakeIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      Age: {calculateAge(selectedProfile.dateOfBirth)} ({formatDate(selectedProfile.dateOfBirth)})
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <HomeIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      {selectedProfile.address}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Medical Information
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <MedicalIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      {selectedProfile.medicalConditions || 'No medical conditions'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmergencyIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      {selectedProfile.emergencyContact}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    <strong>Experience Level:</strong> {selectedProfile.experienceLevel}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Additional Information
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Family Details:</strong> {selectedProfile.familyDetails}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Government ID:</strong> {selectedProfile.governmentIdProof}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Applied on:</strong> {formatDate(selectedProfile.createdAt)}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailDialogOpen(false)}>Close</Button>
          <Button
            onClick={() => {
              setDetailDialogOpen(false)
              handleApprove(selectedProfile!)
            }}
            variant="contained"
            color="success"
            startIcon={<CheckIcon />}
          >
            Approve
          </Button>
          <Button
            onClick={() => {
              setDetailDialogOpen(false)
              handleReject(selectedProfile!)
            }}
            variant="outlined"
            color="error"
            startIcon={<RejectIcon />}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>

      {/* Approval Dialog */}
      <Dialog open={approvalDialogOpen} onClose={() => setApprovalDialogOpen(false)}>
        <DialogTitle>Approve Student Application</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Approve application for <strong>{selectedProfile?.userFullName}</strong>?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Approval Notes (Optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes for this approval..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApprovalDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmApproval} variant="contained" color="success">
            Confirm Approval
          </Button>
        </DialogActions>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={rejectionDialogOpen} onClose={() => setRejectionDialogOpen(false)}>
        <DialogTitle>Reject Student Application</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Reject application for <strong>{selectedProfile?.userFullName}</strong>?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Rejection Reason (Required)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Please provide a reason for rejection..."
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectionDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={confirmRejection} 
            variant="outlined" 
            color="error"
            disabled={!notes.trim()}
          >
            Confirm Rejection
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default StudentApproval
