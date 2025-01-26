'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Filter,
  Building,
  Users,
  UserCheck,
  BarChart,
  Plus,
  Settings,
  ChevronRight,
  Download,
  Mail,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { motion } from "framer-motion"

// Mock data for demonstration
const departments = [
  {
    id: "D-001",
    name: "Cardiology",
    head: "Dr. Sarah Wilson",
    totalDoctors: 8,
    totalPatients: 450,
    appointmentsToday: 12,
    trend: "+5%",
  },
  {
    id: "D-002",
    name: "Pediatrics",
    head: "Dr. Michael Chang",
    totalDoctors: 6,
    totalPatients: 380,
    appointmentsToday: 15,
    trend: "+8%",
  },
  {
    id: "D-003",
    name: "Orthopedics",
    head: "Dr. James Anderson",
    totalDoctors: 5,
    totalPatients: 320,
    appointmentsToday: 10,
    trend: "-2%",
  },
  {
    id: "D-004",
    name: "Dermatology",
    head: "Dr. Emma Thompson",
    totalDoctors: 4,
    totalPatients: 280,
    appointmentsToday: 8,
    trend: "+3%",
  },
]

export default function DepartmentsManagement() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")

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

  return (
    <div className="p-6 space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
          <p className="text-muted-foreground">Manage hospital departments and staff</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
            <BarChart className="w-4 h-4" />
            <span>Analytics</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            <span>Add Department</span>
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
              placeholder="Search departments..."
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
            <span>Bulk Email</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Department Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <motion.div
            key={department.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6 space-y-6"
          >
            {/* Department Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{department.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserCheck className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Head: {department.head}</span>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-accent/80 transition-colors">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Department Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Total Doctors</span>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-lg font-semibold">{department.totalDoctors}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Total Patients</span>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-lg font-semibold">{department.totalPatients}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Today's Appointments</span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-lg font-semibold">{department.appointmentsToday}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Growth</span>
                <div className="flex items-center gap-2">
                  {department.trend.startsWith('+') ? (
                    <ArrowUp className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-lg font-semibold ${
                    department.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'
                  }`}>
                    {department.trend}
                  </span>
                </div>
              </div>
            </div>

            {/* Department Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border/60">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
                <Users className="w-4 h-4" />
                <span>Staff</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
                <BarChart className="w-4 h-4" />
                <span>Analytics</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
                <Calendar className="w-4 h-4" />
                <span>Schedule</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Department Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Department Performance</h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
              <Clock className="w-4 h-4" />
              <span>Last 30 Days</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {departments.slice(0, 3).map((department) => (
            <div key={department.id} className="p-4 rounded-lg bg-background/50 border border-border/60">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{department.name}</h4>
                <span className="text-sm text-muted-foreground">{department.totalDoctors} Doctors</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Head: {department.head}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 