import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSupabaseAuth } from './contexts/SupabaseAuthContext'
import { getDashboardRoute } from './permissions'
import { UserRole } from './types'

// Layout
import Layout from './components/layout/Layout'

// Auth Pages
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

// Dashboards
import AdminDashboard from './pages/admin/AdminDashboard'
import SanchalakaDashboard from './pages/sanchalaka/SanchalakaDashboard'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import StudentDashboard from './pages/student/StudentDashboard'
import GuestDashboard from './pages/guest/GuestDashboard'

// Core Pages
import ClassesPage from './pages/classes/ClassesPage'
import SchedulePage from './pages/schedule/SchedulePage'
import EnrollmentPage from './pages/enrollment/EnrollmentPage'
import AttendancePage from './pages/attendance/AttendancePage'
import AnnouncementsPage from './pages/announcements/AnnouncementsPage'
import ReportsPage from './pages/reports/ReportsPage'
import DesignSystemPage from './pages/design/DesignSystemPage'

// Misc
import DevShowcase from './components/dev/DevShowcase'
import SupabaseTest from './components/SupabaseTest'
import SupabaseBackendTest from './components/SupabaseBackendTest'
import LandingPage from './pages/spyss/LandingPage'

// Common
import LoadingSpinner from './components/common/LoadingSpinner'
import ProtectedRoute from './components/common/ProtectedRoute'

const App: React.FC = () => {
  const { isLoading, user } = useSupabaseAuth()

  // ✅ Prevent flicker / wrong redirects during refresh
  if (isLoading) {
    return <LoadingSpinner />
  }

  
  return (
    <Routes>
      {/* 🌐 Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/about" element={<LandingPage />} />
      <Route path="/programs" element={<LandingPage />} />
      <Route path="/contact" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dev-showcase" element={<DevShowcase />} />
      <Route path="/design-system" element={<DesignSystemPage />} />
      <Route path="/test-supabase" element={<SupabaseTest />} />
      <Route path="/test-supabase-backend" element={<SupabaseBackendTest />} />

      {/* 🔁 Dashboard redirect */}
      <Route path="/dashboard" element={<Navigate to={getDashboardRoute(user?.role as UserRole)} replace />} />

      {/* 🔐 Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.ADMIN]}>
              <AdminDashboard />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.ADMIN]}>
              <ReportsPage />
            </ProtectedRoute>
          </Layout>
        }
      />

      {/* 🔐 Sanchalaka */}
      <Route
        path="/sanchalaka/dashboard"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.SANCHALAKA]}>
              <SanchalakaDashboard />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/sanchalaka/reports"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.SANCHALAKA]}>
              <ReportsPage />
            </ProtectedRoute>
          </Layout>
        }
      />

      {/* 🔐 Teacher */}
      <Route
        path="/teacher/dashboard"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.TEACHER]}>
              <TeacherDashboard />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/teacher/classes"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.TEACHER]}>
              <ClassesPage />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/teacher/attendance"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.TEACHER]}>
              <AttendancePage />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/teacher/announcements"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.TEACHER]}>
              <AnnouncementsPage />
            </ProtectedRoute>
          </Layout>
        }
      />

      {/* 🔐 Student */}
      <Route
        path="/student/dashboard"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.STUDENT]}>
              <StudentDashboard />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/student/classes"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.STUDENT]}>
              <ClassesPage />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/student/schedule"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.STUDENT]}>
              <SchedulePage />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/student/enrollment"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.STUDENT]}>
              <EnrollmentPage />
            </ProtectedRoute>
          </Layout>
        }
      />

      {/* 🔐 Guest */}
      <Route
        path="/guest/dashboard"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.GUEST]}>
              <GuestDashboard />
            </ProtectedRoute>
          </Layout>
        }
      />

      {/* 🔐 Shared Routes */}
      <Route
        path="/classes"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.ADMIN, UserRole.SANCHALAKA, UserRole.TEACHER, UserRole.STUDENT, UserRole.GUEST]}>
              <ClassesPage />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/schedule"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.ADMIN, UserRole.SANCHALAKA, UserRole.TEACHER, UserRole.STUDENT]}>
              <SchedulePage />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/enrollment"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.ADMIN, UserRole.SANCHALAKA, UserRole.TEACHER, UserRole.STUDENT]}>
              <EnrollmentPage />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/attendance"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.ADMIN, UserRole.SANCHALAKA, UserRole.TEACHER]}>
              <AttendancePage />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/announcements"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.ADMIN, UserRole.SANCHALAKA, UserRole.TEACHER]}>
              <AnnouncementsPage />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/reports"
        element={
          <Layout>
            <ProtectedRoute roles={[UserRole.ADMIN, UserRole.SANCHALAKA, UserRole.TEACHER]}>
              <ReportsPage />
            </ProtectedRoute>
          </Layout>
        }
      />

      {/* 🚨 Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
