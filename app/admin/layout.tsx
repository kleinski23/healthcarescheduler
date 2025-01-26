'use client'

import { AdminSidebar } from "@/components/ui/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 pl-[70px] lg:pl-[240px]">
        {children}
      </main>
    </div>
  )
} 