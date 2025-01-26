'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  Users,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
  Activity,
  Building,
  UserCheck,
  Download,
  Filter,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { motion } from "framer-motion"

// Mock data for demonstration
const analyticsData = {
  totalAppointments: 1248,
  appointmentsTrend: "+12.5%",
  activePatients: 856,
  patientsTrend: "+5.2%",
  totalDoctors: 24,
  doctorsTrend: "+2",
  averageWaitTime: "12min",
  waitTimeTrend: "-2min",
  totalRevenue: "$125,480",
  revenueTrend: "+8.3%",
  departmentPerformance: [
    { name: "Cardiology", patients: 450, trend: "+5%" },
    { name: "Pediatrics", patients: 380, trend: "+8%" },
    { name: "Orthopedics", patients: 320, trend: "-2%" },
    { name: "Dermatology", patients: 280, trend: "+3%" },
  ],
  appointmentDistribution: [
    { time: "8:00 AM", count: 5 },
    { time: "9:00 AM", count: 8 },
    { time: "10:00 AM", count: 12 },
    { time: "11:00 AM", count: 10 },
    { time: "12:00 PM", count: 6 },
    { time: "1:00 PM", count: 4 },
    { time: "2:00 PM", count: 7 },
    { time: "3:00 PM", count: 9 },
    { time: "4:00 PM", count: 11 },
    { time: "5:00 PM", count: 6 },
  ],
}

export default function Analytics() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string>("")
  const [timeRange, setTimeRange] = useState<"today" | "week" | "month" | "year">("month")

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
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">View detailed insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center gap-2 p-1 bg-card/50 backdrop-blur-sm border border-border/60 rounded-lg w-fit">
        {(["today", "week", "month", "year"] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              timeRange === range
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              analyticsData.appointmentsTrend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'
            }`}>
              {analyticsData.appointmentsTrend.startsWith('+') ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
              <span>{analyticsData.appointmentsTrend}</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold">{analyticsData.totalAppointments}</h3>
            <p className="text-sm text-muted-foreground mt-1">Total Appointments</p>
          </div>
        </motion.div>

        {/* Active Patients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              analyticsData.patientsTrend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'
            }`}>
              {analyticsData.patientsTrend.startsWith('+') ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
              <span>{analyticsData.patientsTrend}</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold">{analyticsData.activePatients}</h3>
            <p className="text-sm text-muted-foreground mt-1">Active Patients</p>
          </div>
        </motion.div>

        {/* Total Doctors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-primary" />
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              analyticsData.doctorsTrend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'
            }`}>
              {analyticsData.doctorsTrend.startsWith('+') ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
              <span>{analyticsData.doctorsTrend}</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold">{analyticsData.totalDoctors}</h3>
            <p className="text-sm text-muted-foreground mt-1">Total Doctors</p>
          </div>
        </motion.div>

        {/* Average Wait Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              analyticsData.waitTimeTrend.startsWith('-') ? 'text-emerald-500' : 'text-red-500'
            }`}>
              {analyticsData.waitTimeTrend.startsWith('-') ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUp className="w-4 h-4" />
              )}
              <span>{analyticsData.waitTimeTrend}</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold">{analyticsData.averageWaitTime}</h3>
            <p className="text-sm text-muted-foreground mt-1">Average Wait Time</p>
          </div>
        </motion.div>
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
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
            <Building className="w-4 h-4" />
            <span>View All</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsData.departmentPerformance.map((dept) => (
            <div key={dept.name} className="p-4 rounded-lg bg-background/50 border border-border/60">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{dept.name}</h4>
                <div className={`flex items-center gap-1 text-sm ${
                  dept.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  {dept.trend.startsWith('+') ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span>{dept.trend}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{dept.patients} Patients</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Appointment Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Appointment Distribution</h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="h-64 flex items-end gap-2">
          {analyticsData.appointmentDistribution.map((slot) => (
            <div key={slot.time} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-primary/20 rounded-t-lg transition-all hover:bg-primary/30"
                style={{ height: `${(slot.count / 12) * 100}%` }}
              ></div>
              <span className="text-xs text-muted-foreground">{slot.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 