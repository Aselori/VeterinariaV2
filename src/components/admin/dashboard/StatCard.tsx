interface StatCardProps {
  label: string
  value: number | string
  sub?: string
}

export default function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-warm-100 dark:border-slate-700 shadow-sm">
      <p className="text-3xl font-semibold text-gray-800 dark:text-gray-100">{value}</p>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">{label}</p>
      {sub && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>}
    </div>
  )
}
