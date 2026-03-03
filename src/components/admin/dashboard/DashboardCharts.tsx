'use client'

import dynamic from 'next/dynamic'
import { useDarkMode } from '@/context/DarkModeContext'
import type { ChartDataPoint } from '@/types/appointment'

const AppointmentsByServiceChart = dynamic(
  () => import('./AppointmentsByServiceChart'),
  { ssr: false, loading: () => <div className="h-[220px] animate-pulse bg-warm-50 dark:bg-slate-700 rounded-xl" /> },
)

const AppointmentsByMonthChart = dynamic(
  () => import('./AppointmentsByMonthChart'),
  { ssr: false, loading: () => <div className="h-[220px] animate-pulse bg-warm-50 dark:bg-slate-700 rounded-xl" /> },
)

interface Props {
  byService: ChartDataPoint[]
  byMonth: ChartDataPoint[]
}

export default function DashboardCharts({ byService, byMonth }: Props) {
  const { isDark } = useDarkMode()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-warm-100 dark:border-slate-700 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Citas por Servicio
        </h2>
        <AppointmentsByServiceChart data={byService} isDark={isDark} />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-warm-100 dark:border-slate-700 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Citas por Mes (últimos 6 meses)
        </h2>
        <AppointmentsByMonthChart data={byMonth} isDark={isDark} />
      </div>
    </div>
  )
}
