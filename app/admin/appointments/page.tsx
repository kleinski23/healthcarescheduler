'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  UserCheck,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Plus,
  Download,
  Mail,
} from "lucide-react"
import { motion } from "framer-motion"

// Mock data for demonstration
const appointments = [
  {
    id: "A-2024-001",
    patientName: "John Smith",
    doctorName: "Dr. Sarah Wilson",
    department: "Cardiology",
    date: "2024-03-25",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: "A-2024-002",
    patientName: "Sarah Johnson",
    doctorName: "Dr. Michael Chang",
    department: "Pediatrics",
    date: "2024-03-25",
    time: "11:30 AM",
    status: "pending",
  },
  {
    id: "A-2024-003",
    patientName: "Michael Brown",
    doctorName: "Dr. James Anderson",
    department: "Orthopedics",
    date: "2024-03-25",
    time: "2:00 PM",
    status: "cancelled",
  },
  {
    id: "A-2024-004",
    patientName: "Emily Davis",
    doctorName: "Dr. Emma Thompson",
    department: "Dermatology",
    date: "2024-03-25",
    time: "3:30 PM",
    status: "confirmed",
  },
]

export default function AppointmentsManagement() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = sessionStorage.getItem("userEmail")
      if (!email) {
        router.push("/auth/login")
      } else {
        setUserEmail(email)
        setIsLoading(false)
      }
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-500'
      case 'pending':
        return 'bg-yellow-500'
      case 'cancelled':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusActions = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500/20">
              <CheckCircle className="w-4 h-4" />
              <span>Confirm</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20">
              <XCircle className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        )
      case 'confirmed':
        return (
          <button className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20">
            <XCircle className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-6 space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">Manage and schedule appointments</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
            <Calendar className="w-4 h-4" />
            <span>Calendar View</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 w-64 rounded-lg bg-card/50 border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
            <Mail className="w-4 h-4" />
            <span>Send Reminders</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-6 gap-4 text-sm font-medium text-muted-foreground pb-2 border-b border-border/60">
            <span>Patient</span>
            <span>Doctor</span>
            <span>Department</span>
            <span>Date & Time</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="grid grid-cols-6 gap-4 items-center p-3 rounded-lg bg-background/50 border border-border/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">{appointment.patientName}</span>
                    <p className="text-xs text-muted-foreground">ID: {appointment.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserCheck className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{appointment.doctorName}</span>
                </div>
                <span className="text-sm text-muted-foreground">{appointment.department}</span>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
                <span className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(appointment.status)}`}></div>
                  <span className="text-sm text-muted-foreground capitalize">{appointment.status}</span>
                </span>
                <div className="flex items-center justify-end">
                  {getStatusActions(appointment.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/60">
          <div className="flex items-center gap-2">
            <button className="h-10 flex items-center gap-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
              <Mail className="w-4 h-4" />
              <span>Bulk Notifications</span>
            </button>
            <button className="h-10 flex items-center gap-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export List</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg">
              {currentPage}
            </button>
            <button className="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
              {currentPage + 1}
            </button>
            <button className="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
              {currentPage + 2}
            </button>
            <button 
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 