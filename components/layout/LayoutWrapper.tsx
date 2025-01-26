'use client'

import { usePathname } from 'next/navigation'
import Navbar from "./Navbar"
import { Footer } from "./Footer"

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  // Don't show navbar and footer on admin and patient dashboard paths
  const shouldHideNavigation = pathname.startsWith('/admin') || pathname.startsWith('/patient')

  return (
    <>
      {!shouldHideNavigation && <Navbar />}
      {children}
      {!shouldHideNavigation && <Footer />}
    </>
  )
} 