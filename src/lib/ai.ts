import type { Message } from '@/types/chatbot'

/**
 * Sends conversation history to the AI API and returns a response.
 * TODO: Implement with Gemini or OpenAI when ready.
 *
 * Example Gemini structure:
 *   const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, { ... })
 *
 * Example OpenAI structure:
 *   const response = await fetch('https://api.openai.com/v1/chat/completions', {
 *     headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, ...
 *   })
 */
export async function sendMessageToAI(messages: Message[]): Promise<string> {
  throw new Error('AI integration not yet implemented')
}
