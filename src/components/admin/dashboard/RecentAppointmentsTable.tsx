import type { AppointmentRow } from '@/types/appointment'
import { SERVICES } from '@/constants/services'

const STATUS_STYLES: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  confirmada: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  completada: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  cancelada: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
}

interface Props {
  appointments: AppointmentRow[]
}

export default function RecentAppointmentsTable({ appointments }: Props) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-warm-100 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-warm-100 dark:border-slate-700">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Citas Recientes
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-warm-100 dark:border-slate-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Mascota</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Dueño</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Servicio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-warm-100 dark:divide-slate-700">
            {appointments.map((appt) => (
              <tr key={appt.id} className="hover:bg-warm-50/50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-3 font-medium text-gray-800 dark:text-gray-200">{appt.petName}</td>
                <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{appt.ownerName}</td>
                <td className="px-6 py-3 text-gray-600 dark:text-gray-400">
                  {SERVICES.find((s) => s.id === appt.service)?.title ?? appt.service}
                </td>
                <td className="px-6 py-3 text-gray-600 dark:text-gray-400">
                  {new Date(appt.date).toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-6 py-3">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[appt.status] ?? ''}`}>
                    {appt.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {appointments.length === 0 && (
          <p className="px-6 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
            Sin citas recientes.
          </p>
        )}
      </div>
    </div>
  )
}
