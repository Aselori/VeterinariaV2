const STATUS_STYLES: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  confirmada: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  completada: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  cancelada: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
}

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
        STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-600'
      }`}
    >
      {status}
    </span>
  )
}
