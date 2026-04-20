import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type ContactInput = {
  name: string
  email: string
  subject: string
  message: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactInput
    const { name, email, subject, message } = body

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 },
      )
    }

    const created = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      },
    })

    return NextResponse.json({ id: created.id }, { status: 201 })
  } catch (err) {
    console.error('[api/contact]', err)
    return NextResponse.json(
      { error: 'No se pudo enviar el mensaje' },
      { status: 500 },
    )
  }
}
