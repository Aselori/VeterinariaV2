import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin()
  if (error) return error

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const service = searchParams.get('service')

  const appointments = await prisma.appointment.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(service ? { service } : {}),
    },
    orderBy: { date: 'desc' },
  })

  return NextResponse.json(appointments)
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin()
  if (error) return error

  const body = await req.json()
  const { petName, ownerName, email, phone, service, date, notes, status } = body

  if (!petName || !ownerName || !email || !service || !date) {
    return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 })
  }

  const appointment = await prisma.appointment.create({
    data: {
      petName,
      ownerName,
      email,
      phone: phone || null,
      service,
      date: new Date(date),
      notes: notes || null,
      status: status || 'pendiente',
    },
  })

  return NextResponse.json(appointment, { status: 201 })
}
