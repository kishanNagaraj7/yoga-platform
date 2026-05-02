import { User, UserRole } from '@/types'

// Mock user database
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: UserRole.ADMIN,
    isActive: true,
    profile: { avatar: '', bio: 'Platform Administrator' },
    phone: '+1234567890',
  },
  {
    id: '2',
    name: 'Regional Manager',
    email: 'sanchalaka@example.com',
    role: UserRole.SANCHALAKA,
    isActive: true,
    profile: { avatar: '', bio: 'Regional Yoga Manager' },
    phone: '+1234567891',
  },
  {
    id: '3',
    name: 'John Teacher',
    email: 'teacher@example.com',
    role: UserRole.TEACHER,
    isActive: true,
    profile: { avatar: '', bio: 'Certified Yoga Instructor' },
    phone: '+1234567892',
  },
  {
    id: '4',
    name: 'Sarah Student',
    email: 'student@example.com',
    role: UserRole.STUDENT,
    isActive: true,
    profile: { avatar: '', bio: 'Yoga Enthusiast' },
    phone: '+1234567893',
  },
]

// Mock authentication responses
export const mockAuthResponses = {
  login: (email: string, password: string) => {
    const user = mockUsers.find(u => u.email === email)
    if (user && password === 'password123') {
      return {
        success: true,
        data: {
          user,
          token: `mock-jwt-${user.id}-${Date.now()}`
        }
      }
    }
    return {
      success: false,
      message: 'Invalid credentials'
    }
  },

  loginWithOTP: (phone: string, otp: string) => {
    if (otp === '123456') {
      const user = {
        id: '5',
        name: 'OTP User',
        email: 'otp@example.com',
        role: UserRole.STUDENT,
        isActive: true,
        profile: { avatar: '', bio: 'Student via OTP' },
        phone,
      }
      return {
        success: true,
        data: {
          user,
          token: `mock-jwt-otp-${Date.now()}`
        }
      }
    }
    return {
      success: false,
      message: 'Invalid OTP'
    }
  },

  getCurrentUser: (token: string) => {
    // Extract user ID from token (mock implementation)
    const userId = token.split('-')[2] || '1'
    const user = mockUsers.find(u => u.id === userId) || mockUsers[0]
    return user
  }
}

// Mock delay to simulate API calls
export const mockDelay = (ms: number = 1000) => 
  new Promise(resolve => setTimeout(resolve, ms))

// Mock API responses for various endpoints
export const mockApiData = {
  // Classes data
  classes: [
    {
      id: '1',
      title: 'Morning Hatha Yoga',
      description: 'Traditional Hatha yoga practice focusing on alignment and breathing',
      category: 'HATHA',
      level: 'BEGINNER',
      mode: 'OFFLINE',
      capacity: 20,
      enrolledCount: 18,
      waitlistCount: 5,
      teacherId: '3',
      teacher: mockUsers[2],
      branchId: '1',
      branch: { id: '1', name: 'Downtown Studio', address: '123 Main St' },
      schedule: [
        { id: '1', classId: '1', startTime: '06:00', endTime: '07:00', dayOfWeek: 1, recurring: true, isCancelled: false }
      ],
      isActive: true,
      price: 25,
      duration: 60,
    },
    {
      id: '2',
      title: 'Evening Vinyasa Flow',
      description: 'Dynamic flowing sequences connecting breath with movement',
      category: 'VINYASA',
      level: 'INTERMEDIATE',
      mode: 'HYBRID',
      capacity: 15,
      enrolledCount: 12,
      waitlistCount: 3,
      teacherId: '3',
      teacher: mockUsers[2],
      branchId: '2',
      branch: { id: '2', name: 'Uptown Studio', address: '456 Oak Ave' },
      schedule: [
        { id: '2', classId: '2', startTime: '18:00', endTime: '19:30', dayOfWeek: 3, recurring: true, isCancelled: false }
      ],
      isActive: true,
      price: 30,
      duration: 90,
    },
    {
      id: '3',
      title: 'Weekend Yin Yoga',
      description: 'Slow-paced practice with long-held passive poses',
      category: 'YIN',
      level: 'ALL_LEVELS',
      mode: 'ONLINE',
      capacity: 25,
      enrolledCount: 20,
      waitlistCount: 8,
      teacherId: '3',
      teacher: mockUsers[2],
      branchId: '3',
      branch: { id: '3', name: 'Online Platform', address: 'Virtual' },
      schedule: [
        { id: '3', classId: '3', startTime: '10:00', endTime: '11:30', dayOfWeek: 6, recurring: true, isCancelled: false }
      ],
      isActive: true,
      price: 20,
      duration: 90,
    },
  ],

  // Attendance data
  attendance: [
    {
      id: '1',
      classId: '1',
      date: '2024-01-20',
      attendanceRecords: [
        { studentId: '4', student: mockUsers[3], status: 'PRESENT', checkInTime: '06:05' },
        { studentId: '5', student: mockUsers[3], status: 'ABSENT', checkInTime: null },
        { studentId: '6', student: mockUsers[3], status: 'PRESENT', checkInTime: '06:02' },
      ],
      totalStudents: 20,
      presentCount: 15,
      absentCount: 5,
    },
  ],

  // Announcements data
  announcements: [
    {
      id: '1',
      title: 'Holiday Schedule Update',
      content: 'Please note that classes will be rescheduled during the upcoming holiday period.',
      type: 'URGENT',
      targetAudience: 'GLOBAL',
      targetId: null,
      authorId: '1',
      author: mockUsers[0],
      status: 'PUBLISHED',
      createdAt: '2024-01-15',
      publishedAt: '2024-01-15',
      expiresAt: '2024-01-30',
      readCount: 245,
    },
    {
      id: '2',
      title: 'New Yoga Class Introduction',
      content: 'We are excited to announce a new Restorative Yoga class starting next month.',
      type: 'GENERAL',
      targetAudience: 'BRANCH',
      targetId: '1',
      authorId: '3',
      author: mockUsers[2],
      status: 'PENDING_APPROVAL',
      createdAt: '2024-01-14',
      publishedAt: null,
      expiresAt: '2024-02-28',
      readCount: 0,
    },
  ],

  // Reports data
  reports: {
    attendance: [
      {
        className: 'Morning Hatha Yoga',
        totalSessions: 16,
        averageAttendance: 87.5,
        attendanceRate: 87.5,
        peakAttendance: 95,
        lowAttendance: 78,
      },
    ],
    enrollment: [
      { month: 'Jan 2024', enrollments: 45, newStudents: 12, returningStudents: 33 },
      { month: 'Feb 2024', enrollments: 52, newStudents: 15, returningStudents: 37 },
    ],
    revenue: [
      { month: 'Jan 2024', revenue: 15420, growth: 12.3 },
      { month: 'Feb 2024', revenue: 17250, growth: 11.9 },
    ],
  },
}
