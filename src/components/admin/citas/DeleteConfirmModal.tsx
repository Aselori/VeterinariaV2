'use client'

interface Props {
  message: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

export default function DeleteConfirmModal({ message, onConfirm, onCancel, loading }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-warm-100 dark:border-slate-700 shadow-xl w-full max-w-sm">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Confirmar eliminación
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 bg-warm-50 dark:bg-slate-700 hover:bg-warm-100 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  )
}
