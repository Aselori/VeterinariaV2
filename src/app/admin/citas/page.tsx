import { prisma } from '@/lib/prisma'
import AppointmentsTable from '@/components/admin/citas/AppointmentsTable'
import type { AppointmentRow } from '@/types/appointment'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Citas — VetClinic Admin',
}

export default async function CitasPage() {
  const raw = await prisma.appointment.findMany({ orderBy: { date: 'desc' } })

  const appointments: AppointmentRow[] = raw.map((a) => ({
    ...a,
    date: a.date.toISOString(),
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  }))

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
          Administración
        </p>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Citas</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {appointments.length} cita{appointments.length !== 1 ? 's' : ''} en total
        </p>
      </div>

      <AppointmentsTable initialAppointments={appointments} />
    </div>
  )
}
