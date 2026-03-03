export interface AppointmentRow {
  id: string
  petName: string
  ownerName: string
  email: string
  phone: string | null
  service: string
  date: string          // ISO string — serialized from Prisma Date
  notes: string | null
  status: string
  userId: string | null
  createdAt: string
  updatedAt: string
}

export interface AppointmentFormData {
  petName: string
  ownerName: string
  email: string
  phone: string
  service: string
  date: string          // datetime-local string
  notes: string
  status: string
}

export interface DashboardStats {
  totalAppointments: number
  pendingAppointments: number
  completedThisMonth: number
  totalUsers: number
}

export interface ChartDataPoint {
  label: string
  value: number
}
