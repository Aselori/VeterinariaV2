import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function requireAdmin() {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return {
      session: null,
      error: NextResponse.json({ error: 'No autorizado' }, { status: 401 }),
    }
  }
  return { session, error: null }
}
