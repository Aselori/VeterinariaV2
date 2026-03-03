import { NextRequest, NextResponse } from 'next/server'
import type { Message } from '@/types/chatbot'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages }: { messages: Message[] } = body

    // TODO: Call AI service
    // import { sendMessageToAI } from '@/lib/ai'
    // const reply = await sendMessageToAI(messages)

    void messages // suppress unused warning until AI is integrated

    return NextResponse.json({
      message: 'Integración de IA próximamente.',
    })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
