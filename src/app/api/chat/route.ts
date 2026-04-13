import { NextRequest, NextResponse } from 'next/server'
import { sendMessageToAI } from '@/lib/ai'
import { createBooking, type BookingInput } from '@/app/api/bookings/route'
import type { Message } from '@/types/chatbot'

const BOOKING_TAG_RE = /<booking>([\s\S]*?)<\/booking>/i

function extractBooking(reply: string): BookingInput | null {
  const match = reply.match(BOOKING_TAG_RE)
  if (!match) return null
  try {
    return JSON.parse(match[1].trim()) as BookingInput
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages }: { messages: Message[] } = await request.json()

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Mensajes inválidos' },
        { status: 400 },
      )
    }

    const reply = await sendMessageToAI(messages)
    const bookingPayload = extractBooking(reply)

    if (!bookingPayload) {
      return NextResponse.json({ message: reply })
    }

    const result = await createBooking(bookingPayload)

    if ('error' in result) {
      const cleanReply = reply.replace(BOOKING_TAG_RE, '').trim()
      return NextResponse.json({
        message:
          `${cleanReply}\n\nLo siento, hubo un problema al registrar la cita: ${result.error}. ` +
          `¿Podrías verificar los datos y volver a intentarlo?`,
      })
    }

    const { appointment } = result
    const formattedDate = new Date(appointment.date).toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    return NextResponse.json({
      message:
        `¡Listo! Tu cita quedó registrada. 🐾\n\n` +
        `• Mascota: ${appointment.petName}\n` +
        `• Dueño: ${appointment.ownerName}\n` +
        `• Servicio: ${appointment.service}\n` +
        `• Fecha: ${formattedDate}\n\n` +
        `Te contactaremos al correo ${appointment.email} para confirmar. ` +
        `¿Puedo ayudarte con algo más?`,
    })
  } catch (err) {
    console.error('[api/chat]', err)
    return NextResponse.json(
      { error: 'No se pudo generar una respuesta.' },
      { status: 500 },
    )
  }
}
