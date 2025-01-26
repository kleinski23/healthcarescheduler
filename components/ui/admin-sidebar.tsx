'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  UserCog,
  Calendar,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Building,
  FileText,
  BarChart,
  Bell,
  MessageSquare,
  Shield,
  HardDrive,
  Activity
} from 'lucide-react'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Doctor Management', href: '/admin/doctors', icon: UserCog },
  { name: 'Finance Analytics', href: '/admin/doctors/finance', icon: BarChart },
  { name: 'Patient Records', href: '/admin/patients', icon: Users },
  { name: 'Appointments', href: '/admin/appointments', icon: Calendar },
  { name: 'Departments', href: '/admin/departments', icon: Building },
  { name: 'Reports', href: '/admin/reports', icon: FileText },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Notifications', href: '/admin/notifications', icon: Bell },
]

const systemNavigation: NavItem[] = [
  { name: 'Security', href: '/admin/security', icon: Shield },
  { name: 'System Health', href: '/admin/system-health', icon: Activity },
  { name: 'Backup & Restore', href: '/admin/backup', icon: HardDrive },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('userEmail')
      router.push('/auth/login')
    }
  }

  // Auto minimize on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    // Initial check
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <motion.div
      initial={{ width: isOpen ? 240 : 70 }}
      animate={{ width: isOpen ? 240 : 70 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen fixed top-0 left-0 bottom-0 bg-card border-r border-border/40 shadow-sm z-40"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b border-border/40">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-lg font-semibold text-card-foreground tracking-tight"
            >
              Admin Portal
            </motion.div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-accent/80 transition-colors"
            aria-label={isOpen ? "Minimize sidebar" : "Expand sidebar"}
          >
            {isOpen ? 
              <ChevronLeft className="w-4 h-4 text-muted-foreground" /> : 
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            }
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
          {/* Main Navigation */}
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out group ${
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isOpen ? 'mr-3' : ''} stroke-[1.5]`} />
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="truncate"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* System Navigation */}
          <div className="mt-6 pt-6 border-t border-border/40">
            {systemNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out group ${
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isOpen ? 'mr-3' : ''} stroke-[1.5]`} />
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="truncate"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-2 border-t border-border/40">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out text-red-500 hover:bg-red-500/10 group"
          >
            <LogOut className={`w-4 h-4 ${isOpen ? 'mr-3' : ''} stroke-[1.5]`} />
            {isOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="truncate"
              >
                Logout
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
} 