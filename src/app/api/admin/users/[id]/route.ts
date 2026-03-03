import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { session, error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  const { role } = await req.json()

  if (!['USER', 'ADMIN'].includes(role)) {
    return NextResponse.json({ error: 'Rol inválido' }, { status: 400 })
  }

  // Prevent removing own admin role
  if (session!.user.id === id && role !== 'ADMIN') {
    return NextResponse.json({ error: 'No puedes cambiar tu propio rol' }, { status: 400 })
  }

  const user = await prisma.user.update({
    where: { id },
    data: { role },
    select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
  })

  return NextResponse.json(user)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { session, error } = await requireAdmin()
  if (error) return error

  const { id } = await params

  if (session!.user.id === id) {
    return NextResponse.json({ error: 'No puedes eliminar tu propia cuenta' }, { status: 400 })
  }

  await prisma.user.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
