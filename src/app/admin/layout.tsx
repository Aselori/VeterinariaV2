import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/layout/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-warm-50 dark:bg-slate-900">
      <AdminSidebar />
      <main className="pl-56 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
