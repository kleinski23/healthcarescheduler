'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  Users,
  Calendar,
  Clock,
  Bell,
  ArrowUp,
  ArrowDown,
  Activity,
  Building,
  UserCheck,
  AlertCircle,
  UserPlus,
  Shield,
  Settings,
  Search,
  Filter,
  UserX,
  CheckCircle,
  XCircle,
  Mail,
  Lock,
  BellRing,
  Palette,
  Globe,
  Database,
  HardDrive,
  Key,
  ChevronRight,
  Plus,
  Download,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
  pendingApprovals: 5,
}

const recentActivities = [
  {
    type: "appointment",
    message: "New appointment scheduled with Dr. Smith",
    time: "5 minutes ago",
  },
  {
    type: "patient",
    message: "New patient registration: John Doe",
    time: "10 minutes ago",
  },
  {
    type: "alert",
    message: "System maintenance scheduled for tonight",
    time: "1 hour ago",
  },
  {
    type: "doctor",
    message: "Dr. Johnson updated availability",
    time: "2 hours ago",
  },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string>("")
  const [showSettings, setShowSettings] = useState(false)

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
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {userEmail}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg hover:bg-accent/80 transition-colors"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/60"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Appointments</p>
              <h3 className="text-2xl font-bold mt-2">{analyticsData.totalAppointments}</h3>
              <p className="flex items-center gap-1 text-sm text-emerald-500 mt-1">
                <ArrowUp className="w-4 h-4" />
                {analyticsData.appointmentsTrend}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-primary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/60"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Patients</p>
              <h3 className="text-2xl font-bold mt-2">{analyticsData.activePatients}</h3>
              <p className="flex items-center gap-1 text-sm text-emerald-500 mt-1">
                <ArrowUp className="w-4 h-4" />
                {analyticsData.patientsTrend}
              </p>
            </div>
            <Users className="w-8 h-8 text-primary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/60"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Doctors</p>
              <h3 className="text-2xl font-bold mt-2">{analyticsData.totalDoctors}</h3>
              <p className="flex items-center gap-1 text-sm text-emerald-500 mt-1">
                <ArrowUp className="w-4 h-4" />
                {analyticsData.doctorsTrend}
              </p>
            </div>
            <Building className="w-8 h-8 text-primary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/60"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Wait Time</p>
              <h3 className="text-2xl font-bold mt-2">{analyticsData.averageWaitTime}</h3>
              <p className="flex items-center gap-1 text-sm text-emerald-500 mt-1">
                <ArrowDown className="w-4 h-4" />
                {analyticsData.waitTimeTrend}
              </p>
            </div>
            <Clock className="w-8 h-8 text-primary" />
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  {activity.type === "appointment" && <Calendar className="w-4 h-4 text-primary" />}
                  {activity.type === "patient" && <UserCheck className="w-4 h-4 text-primary" />}
                  {activity.type === "alert" && <AlertCircle className="w-4 h-4 text-primary" />}
                  {activity.type === "doctor" && <Activity className="w-4 h-4 text-primary" />}
                </div>
                <div>
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <button className="h-24 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors flex flex-col items-center justify-center gap-3 text-center group">
              <UserPlus className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Add Doctor</span>
            </button>
            <button className="h-24 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors flex flex-col items-center justify-center gap-3 text-center group">
              <Shield className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Verify Accounts</span>
            </button>
            <button className="h-24 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors flex flex-col items-center justify-center gap-3 text-center group">
              <BarChart className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">View Reports</span>
            </button>
            <button className="h-24 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors flex flex-col items-center justify-center gap-3 text-center group">
              <Calendar className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Schedule</span>
            </button>
            <button className="h-24 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors flex flex-col items-center justify-center gap-3 text-center group">
              <AlertCircle className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Alerts</span>
            </button>
            <button className="h-24 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors flex flex-col items-center justify-center gap-3 text-center group">
              <Activity className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Analytics</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 