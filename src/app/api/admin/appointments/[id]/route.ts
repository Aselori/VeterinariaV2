import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params
  const body = await req.json()
  const { petName, ownerName, email, phone, service, date, notes, status } = body

  const appointment = await prisma.appointment.update({
    where: { id },
    data: {
      ...(petName !== undefined && { petName }),
      ...(ownerName !== undefined && { ownerName }),
      ...(email !== undefined && { email }),
      ...(phone !== undefined && { phone: phone || null }),
      ...(service !== undefined && { service }),
      ...(date !== undefined && { date: new Date(date) }),
      ...(notes !== undefined && { notes: notes || null }),
      ...(status !== undefined && { status }),
    },
  })

  return NextResponse.json(appointment)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAdmin()
  if (error) return error

  const { id } = await params

  await prisma.appointment.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
