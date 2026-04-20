'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ConditionalNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  const isAuth = pathname?.startsWith('/login')

  if (isAdmin || isAuth) return <>{children}</>

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
