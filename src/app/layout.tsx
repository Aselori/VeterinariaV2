import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import './globals.css'
import { DarkModeProvider } from '@/context/DarkModeContext'
import ConditionalNav from '@/components/ConditionalNav'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'VetClinic',
  description: 'Servicios veterinarios profesionales para tus mascotas',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <SessionProvider>
          <DarkModeProvider>
            <ConditionalNav>{children}</ConditionalNav>
          </DarkModeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
