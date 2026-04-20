import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Mensajes — VetClinic Admin',
}

export default async function MensajesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
          Administración
        </p>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Mensajes de Contacto
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {messages.length} mensaje{messages.length !== 1 ? 's' : ''} recibido
          {messages.length !== 1 ? 's' : ''}
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-warm-100 dark:border-slate-700 p-10 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Aún no hay mensajes.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {messages.map((m) => (
            <li
              key={m.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-warm-100 dark:border-slate-700 p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {m.subject}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {m.name} · {m.email}
                  </p>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                  {m.createdAt.toLocaleString('es-ES', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {m.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
