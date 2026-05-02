import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserRole } from '../../types'
import { useSupabaseAuth } from '../../contexts/SupabaseAuthContext'
import { can, getDashboardRoute, Permission } from '../../permissions'
import LoadingSpinner from './LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  roles?: UserRole[]
  permission?: Permission
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles,
  permission,
}) => {
  const { user, isAuthenticated, isLoading } = useSupabaseAuth()

  // ─────────────────────────────────────────────
  // 1. HARD BLOCK UNTIL AUTH IS READY
  // ─────────────────────────────────────────────
  if (isLoading) {
    return <LoadingSpinner />
  }

  // ─────────────────────────────────────────────
  // 2. NOT LOGGED IN → LOGIN
  // ─────────────────────────────────────────────
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  }

  const userRole = user.role as UserRole | undefined

  // ─────────────────────────────────────────────
  // 3. SAFETY CHECK (ROLE MUST EXIST)
  // ─────────────────────────────────────────────
  if (!userRole) {
    console.warn('ProtectedRoute: Missing role, redirecting safely')
    return <Navigate to="/login" replace />
  }

  // ─────────────────────────────────────────────
  // 4. PERMISSION CHECK (RBAC)
  // ─────────────────────────────────────────────
  if (permission && !can(userRole, permission)) {
    return <Navigate to={getDashboardRoute(userRole)} replace />
  }

  // ─────────────────────────────────────────────
  // 5. ROLE CHECK (STRICT ROUTE GUARD)
  // ─────────────────────────────────────────────
  if (roles && roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to={getDashboardRoute(userRole)} replace />
  }

  // ─────────────────────────────────────────────
  // 6. ALLOW ACCESS
  // ─────────────────────────────────────────────
  return <>{children}</>
}

export default ProtectedRoute
