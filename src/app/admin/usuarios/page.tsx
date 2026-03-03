import { prisma } from '@/lib/prisma'
import UsersTable from '@/components/admin/usuarios/UsersTable'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Usuarios — VetClinic Admin',
}

export default async function UsuariosPage() {
  const raw = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  const users = raw.map((u) => ({
    ...u,
    createdAt: u.createdAt.toISOString(),
    updatedAt: u.updatedAt.toISOString(),
  }))

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
          Administración
        </p>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Usuarios</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {users.length} usuario{users.length !== 1 ? 's' : ''} registrado{users.length !== 1 ? 's' : ''}
        </p>
      </div>

      <UsersTable initialUsers={users} />
    </div>
  )
}
