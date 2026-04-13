import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { SERVICES } from '@/constants/services'

export type BookingInput = {
  petName: string
  ownerName: string
  email: string
  phone?: string
  service: string
  date: string
  notes?: string
}

export async function createBooking(input: BookingInput) {
  const { petName, ownerName, email, phone, service, date, notes } = input

  if (!petName || !ownerName || !email || !service || !date) {
    return { error: 'Campos requeridos faltantes', status: 400 as const }
  }

  const serviceExists = SERVICES.some(
    (s) => s.id === service || s.title === service,
  )
  if (!serviceExists) {
    return { error: 'Servicio no válido', status: 400 as const }
  }

  const parsedDate = new Date(date)
  if (Number.isNaN(parsedDate.getTime())) {
    return { error: 'Fecha inválida', status: 400 as const }
  }

  const session = await auth()

  const appointment = await prisma.appointment.create({
    data: {
      petName,
      ownerName,
      email,
      phone: phone || null,
      service,
      date: parsedDate,
      notes: notes || null,
      status: 'pendiente',
      userId: session?.user?.id ?? null,
    },
  })

  return { appointment }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BookingInput
    const result = await createBooking(body)

    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status })
    }

    return NextResponse.json(result.appointment, { status: 201 })
  } catch (err) {
    console.error('[api/bookings]', err)
    return NextResponse.json(
      { error: 'No se pudo crear la cita' },
      { status: 500 },
    )
  }
}
