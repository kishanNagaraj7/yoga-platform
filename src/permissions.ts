import { UserRole } from './types'

// ─────────────────────────────────────────────────────────────
// 🔐 Permission Types
// ─────────────────────────────────────────────────────────────

export type Permission =
  | 'view_classes'
  | 'view_schedule'
  | 'enroll'
  | 'view_announcements'
  | 'mark_attendance'
  | 'manage_own_classes'
  | 'create_announcement'
  | 'manage_classes'
  | 'view_reports'
  | 'manage_announcements'
  | 'manage_users'
  | 'manage_roles'
  | 'manage_branch'
  | 'manage_region'

// ─────────────────────────────────────────────────────────────
// ♻️ Shared Permission Groups (reduce duplication)
// ─────────────────────────────────────────────────────────────

const COMMON_VIEW_PERMISSIONS: Permission[] = [
  'view_classes',
  'view_schedule',
]

// ─────────────────────────────────────────────────────────────
// 🧩 RBAC MAP
// ─────────────────────────────────────────────────────────────

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.GUEST]: [
    ...COMMON_VIEW_PERMISSIONS,
  ],

  [UserRole.STUDENT]: [
    ...COMMON_VIEW_PERMISSIONS,
    'enroll',
    'view_announcements',
  ],

  [UserRole.TEACHER]: [
    ...COMMON_VIEW_PERMISSIONS,
    'mark_attendance',
    'manage_own_classes',
    'view_announcements',
    'create_announcement',
  ],

  [UserRole.SANCHALAKA]: [
    ...COMMON_VIEW_PERMISSIONS,
    'manage_classes',
    'view_reports',
    'manage_announcements',
    'mark_attendance',
  ],

  [UserRole.ADMIN]: [
    ...COMMON_VIEW_PERMISSIONS,
    'manage_classes',
    'view_reports',
    'manage_announcements',
    'mark_attendance',
    'manage_users',
    'manage_roles',
  ],

  [UserRole.JHILLA_PRASHIKSHANA]: [
    ...COMMON_VIEW_PERMISSIONS,
    'view_reports',
    'manage_branch',
  ],

  [UserRole.PRANTHA_PRASHIKSHANA]: [
    ...COMMON_VIEW_PERMISSIONS,
    'view_reports',
    'manage_region',
  ],

  [UserRole.ATMANUSANDHAN]: [
    ...COMMON_VIEW_PERMISSIONS,
    'view_reports',
  ],

  [UserRole.PRAGATHA]: [
    ...COMMON_VIEW_PERMISSIONS,
    'view_reports',
  ],
}

// ─────────────────────────────────────────────────────────────
// 🔍 Permission Checker
// ─────────────────────────────────────────────────────────────

export const can = (
  role: UserRole | undefined,
  permission: Permission
): boolean => {
  if (!role) return false

  // 🔥 Admin override (optional but common in enterprise RBAC)
  if (role === UserRole.ADMIN) return true

  const permissions = ROLE_PERMISSIONS[role]

  if (!permissions) {
    console.warn('Unknown role in RBAC:', role)
    return false
  }

  return permissions.includes(permission)
}

// ─────────────────────────────────────────────────────────────
// 📦 Get Permissions Helper (useful for UI logic)
// ─────────────────────────────────────────────────────────────

export const getPermissions = (role?: UserRole): Permission[] => {
  if (!role) return []
  return ROLE_PERMISSIONS[role] ?? []
}

// ─────────────────────────────────────────────────────────────
// 🧭 Dashboard Routing (safe + scalable)
// ─────────────────────────────────────────────────────────────

const ROLE_ROUTE_MAP: Partial<Record<UserRole, string>> = {
  [UserRole.ADMIN]: '/admin/dashboard',
  [UserRole.SANCHALAKA]: '/sanchalaka/dashboard',
  [UserRole.TEACHER]: '/teacher/dashboard',
  [UserRole.STUDENT]: '/student/dashboard',
  [UserRole.GUEST]: '/guest/dashboard',
}

export const getDashboardRoute = (role?: UserRole): string => {
  return ROLE_ROUTE_MAP[role ?? UserRole.GUEST] ?? '/guest/dashboard'
}
