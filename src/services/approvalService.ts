import { ApiResponse } from '@/types/api'

export interface StudentProfile {
  id: number
  userId: number
  userEmail: string
  userFullName: string
  age: number
  dateOfBirth: string
  address: string
  governmentIdProof: string
  familyDetails: string
  medicalConditions: string
  emergencyContact: string
  experienceLevel: string
  approvingTeacherId?: number
  approvingTeacherName?: string
  approvalDate?: string
  approvalNotes?: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
}

export interface ApprovalRequest {
  profileId: number
  decision: 'APPROVE' | 'REJECT'
  notes?: string
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

class ApprovalService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token')
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  }

  async getPendingApprovals(): Promise<StudentProfile[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/teacher/pending-approvals`, {
        headers: this.getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<StudentProfile[]> = await response.json()
      return result.data || []
    } catch (error) {
      console.error('Error fetching pending approvals:', error)
      throw error
    }
  }

  async getStudentProfile(profileId: number): Promise<StudentProfile> {
    try {
      const response = await fetch(`${API_BASE_URL}/teacher/profile/${profileId}`, {
        headers: this.getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<StudentProfile> = await response.json()
      return result.data!
    } catch (error) {
      console.error('Error fetching student profile:', error)
      throw error
    }
  }

  async approveStudent(request: ApprovalRequest): Promise<StudentProfile> {
    try {
      const response = await fetch(`${API_BASE_URL}/teacher/approve-student`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(request)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<StudentProfile> = await response.json()
      return result.data!
    } catch (error) {
      console.error('Error approving student:', error)
      throw error
    }
  }

  async rejectStudent(request: ApprovalRequest): Promise<StudentProfile> {
    try {
      const response = await fetch(`${API_BASE_URL}/teacher/reject-student`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(request)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<StudentProfile> = await response.json()
      return result.data!
    } catch (error) {
      console.error('Error rejecting student:', error)
      throw error
    }
  }
}

export const approvalService = new ApprovalService()
