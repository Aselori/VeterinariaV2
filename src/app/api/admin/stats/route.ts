import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'
import { SERVICES } from '@/constants/services'

export async function GET() {
  const { error } = await requireAdmin()
  if (error) return error

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [totalAppointments, pendingAppointments, completedThisMonth, totalUsers] =
    await Promise.all([
      prisma.appointment.count(),
      prisma.appointment.count({ where: { status: 'pendiente' } }),
      prisma.appointment.count({
        where: { status: 'completada', date: { gte: startOfMonth } },
      }),
      prisma.user.count(),
    ])

  // Appointments by service
  const byServiceRaw = await prisma.appointment.groupBy({
    by: ['service'],
    _count: { service: true },
  })

  const byService = SERVICES.map((s) => ({
    label: s.title,
    value: byServiceRaw.find((r) => r.service === s.id)?._count.service ?? 0,
  }))

  // Appointments by month — last 6 months
  const monthLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const byMonth = await Promise.all(
    Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
      const start = new Date(d.getFullYear(), d.getMonth(), 1)
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 1)
      return prisma.appointment
        .count({ where: { date: { gte: start, lt: end } } })
        .then((count) => ({ label: monthLabels[d.getMonth()], value: count }))
    }),
  )

  return NextResponse.json({
    totalAppointments,
    pendingAppointments,
    completedThisMonth,
    totalUsers,
    byService,
    byMonth,
  })
}
