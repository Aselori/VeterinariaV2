'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { ChartDataPoint } from '@/types/appointment'

interface Props {
  data: ChartDataPoint[]
  isDark: boolean
}

export default function AppointmentsByMonthChart({ data, isDark }: Props) {
  const axisColor = isDark ? '#94a3b8' : '#9ca3af'
  const gridColor = isDark ? '#334155' : '#f3f4f6'

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: axisColor }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: axisColor }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            background: isDark ? '#1e293b' : '#fff',
            border: `1px solid ${isDark ? '#334155' : '#ffecc8'}`,
            borderRadius: 12,
            fontSize: 12,
          }}
          itemStyle={{ color: isDark ? '#e2e8f0' : '#374151' }}
          labelStyle={{ color: isDark ? '#94a3b8' : '#6b7280', fontWeight: 600 }}
        />
        <Line
          type="monotone"
          dataKey="value"
          name="Citas"
          stroke="#FFB0B0"
          strokeWidth={2.5}
          dot={{ fill: '#FFB0B0', r: 4 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
