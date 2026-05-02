export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  profile?: {
    avatar?: string;
    bio?: string;
  };
  branch?: Branch;
  region?: Region;
}

export enum UserRole {
  ADMIN = 'admin',
  SANCHALAKA = 'sanchalaka',
  TEACHER = 'teacher',
  STUDENT = 'student',
  GUEST = 'guest',
  JHILLA_PRASHIKSHANA = 'jhilla_prashikshana',
  PRANTHA_PRASHIKSHANA = 'prantha_prashikshana',
  ATMANUSANDHAN = 'atmanusandhan',
  PRAGATHA = 'pragatha'
}

export interface Country {
  id: string;
  name: string;
  code: string;
}

export interface Region {
  id: string;
  name: string;
  countryId: string;
  country?: Country;
}

export interface Branch {
  id: string;
  name: string;
  regionId: string;
  region?: Region;
  address?: string;
  phone?: string;
}

export interface Class {
  id: string;
  title: string;
  description?: string;
  category: ClassCategory;
  level: ClassLevel;
  mode: ClassMode;
  capacity: number;
  enrolledCount: number;
  waitlistCount: number;
  teacherId: string;
  teacher?: User;
  branchId: string;
  branch?: Branch;
  schedule: ClassSchedule[];
  isActive: boolean;
  price?: number;
  duration: number; // in minutes
}

export enum ClassCategory {
  HATHA = 'hatha',
  VINYASA = 'vinyasa',
  ASHTANGA = 'ashtanga',
  YIN = 'yin',
  RESTORATIVE = 'restorative',
  MEDITATION = 'meditation',
  PRANAYAMA = 'pranayama'
}

export enum ClassLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  ALL_LEVELS = 'all_levels'
}

export enum ClassMode {
  ONLINE = 'online',
  OFFLINE = 'offline',
  HYBRID = 'hybrid'
}

export interface ClassSchedule {
  id: string;
  classId: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  recurring: boolean;
  substituteTeacherId?: string;
  substituteTeacher?: User;
  isCancelled: boolean;
}

export interface Enrollment {
  id: string;
  studentId: string;
  student?: User;
  classId: string;
  class?: Class;
  status: EnrollmentStatus;
  enrolledAt: string;
  approvedAt?: string;
  approvedBy?: string;
  waitlistPosition?: number;
}

export enum EnrollmentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  WAITLISTED = 'waitlisted',
  CANCELLED = 'cancelled'
}

export interface Attendance {
  id: string;
  studentId: string;
  student?: User;
  classScheduleId: string;
  classSchedule?: ClassSchedule;
  status: AttendanceStatus;
  markedBy?: string;
  markedAt?: string;
  notes?: string;
}

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  EXCUSED = 'excused'
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  targetAudience: AnnouncementTarget;
  targetId?: string; // branchId, regionId, or classId
  authorId: string;
  author?: User;
  status: AnnouncementStatus;
  createdAt: string;
  publishedAt?: string;
  approvedAt?: string;
  approvedBy?: string;
  expiresAt?: string;
}

export enum AnnouncementType {
  GENERAL = 'general',
  URGENT = 'urgent',
  SCHEDULE_CHANGE = 'schedule_change',
  HOLIDAY = 'holiday',
  EVENT = 'event'
}

export enum AnnouncementTarget {
  GLOBAL = 'global',
  REGION = 'region',
  BRANCH = 'branch',
  CLASS = 'class'
}

export enum AnnouncementStatus {
  DRAFT = 'draft',
  PENDING_APPROVAL = 'pending_approval',
  APPROVED = 'approved',
  PUBLISHED = 'published',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface OTPCredentials {
  phone: string;
  otp: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: UserRole;
  branchId?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FilterOptions {
  category?: ClassCategory;
  level?: ClassLevel;
  mode?: ClassMode;
  branchId?: string;
  teacherId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalClasses: number;
  activePractitioners: number;
  totalEnrollments: number;
  pendingApprovals: number;
  attendanceRate: number;
}

export interface ReportData {
  attendanceByClass: Array<{
    className: string;
    attendanceRate: number;
    totalSessions: number;
    averageAttendance: number;
  }>;
  enrollmentByMonth: Array<{
    month: string;
    enrollments: number;
  }>;
  popularClasses: Array<{
    className: string;
    enrollmentCount: number;
  }>;
  branchPerformance: Array<{
    branchName: string;
    totalStudents: number;
    attendanceRate: number;
  }>;
}
