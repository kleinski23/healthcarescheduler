'use client'

import { Sidebar } from '@/components/ui/sidebar'

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-[70px] lg:ml-[240px] transition-all duration-300 ease-in-out">
        {children}
      </main>
    </div>
  )
} 