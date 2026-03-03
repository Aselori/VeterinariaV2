import { prisma } from '@/lib/prisma'
import { SERVICES } from '@/constants/services'
import StatCard from '@/components/admin/dashboard/StatCard'
import DashboardCharts from '@/components/admin/dashboard/DashboardCharts'
import RecentAppointmentsTable from '@/components/admin/dashboard/RecentAppointmentsTable'
import type { AppointmentRow, ChartDataPoint } from '@/types/appointment'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Dashboard — VetClinic Admin',
}

async function getDashboardData() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [
    totalAppointments,
    pendingAppointments,
    completedThisMonth,
    totalUsers,
    byServiceRaw,
    recentRaw,
  ] = await Promise.all([
    prisma.appointment.count(),
    prisma.appointment.count({ where: { status: 'pendiente' } }),
    prisma.appointment.count({ where: { status: 'completada', date: { gte: startOfMonth } } }),
    prisma.user.count(),
    prisma.appointment.groupBy({ by: ['service'], _count: { service: true } }),
    prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ])

  const byService: ChartDataPoint[] = SERVICES.map((s) => ({
    label: s.title,
    value: byServiceRaw.find((r) => r.service === s.id)?._count.service ?? 0,
  }))

  const monthLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const byMonth: ChartDataPoint[] = await Promise.all(
    Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
      const start = new Date(d.getFullYear(), d.getMonth(), 1)
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 1)
      return prisma.appointment
        .count({ where: { date: { gte: start, lt: end } } })
        .then((count) => ({ label: monthLabels[d.getMonth()], value: count }))
    }),
  )

  const recent: AppointmentRow[] = recentRaw.map((a) => ({
    ...a,
    date: a.date.toISOString(),
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  }))

  return { totalAppointments, pendingAppointments, completedThisMonth, totalUsers, byService, byMonth, recent }
}

export default async function AdminDashboardPage() {
  const {
    totalAppointments,
    pendingAppointments,
    completedThisMonth,
    totalUsers,
    byService,
    byMonth,
    recent,
  } = await getDashboardData()

  const now = new Date()
  const monthName = now.toLocaleDateString('es-MX', { month: 'long' })

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
          Administración
        </p>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Dashboard</h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Citas" value={totalAppointments} />
        <StatCard label="Citas Pendientes" value={pendingAppointments} />
        <StatCard
          label="Completadas este Mes"
          value={completedThisMonth}
          sub={monthName.charAt(0).toUpperCase() + monthName.slice(1)}
        />
        <StatCard label="Total Usuarios" value={totalUsers} />
      </div>

      {/* Charts */}
      <DashboardCharts byService={byService} byMonth={byMonth} />

      {/* Recent appointments */}
      <RecentAppointmentsTable appointments={recent} />
    </div>
  )
}
