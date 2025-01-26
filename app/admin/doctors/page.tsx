'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Filter,
  Building,
  BarChart,
  Calendar,
  Settings,
  Mail,
  Download,
  Plus,
  CheckCircle,
  XCircle,
  UserCheck,
  ChevronRight,
  UserPlus,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { motion } from "framer-motion"

// Mock data for demonstration
const pendingDoctors = [
  {
    id: 1,
    name: "Dr. Robert Wilson",
    specialty: "Neurologist",
    appliedDate: "2024-03-15",
  },
  {
    id: 2,
    name: "Dr. Emma Thompson",
    specialty: "Dermatologist",
    appliedDate: "2024-03-14",
  },
]

export default function DoctorsManagement() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string>("")

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
          <h1 className="text-3xl font-bold tracking-tight">Doctor Management</h1>
          <p className="text-muted-foreground">Manage doctors, departments, and approvals</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
            <Building className="w-4 h-4" />
            <span>Departments</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            <UserPlus className="w-4 h-4" />
            <span>Add Doctor</span>
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
              placeholder="Search doctors..."
              className="w-64 pl-9 pr-4 h-10 rounded-lg bg-card/50 border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="h-10 flex items-center gap-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-10 flex items-center gap-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
            <Building className="w-4 h-4" />
            <span>Departments</span>
          </button>
          <button className="h-10 flex items-center gap-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
            <BarChart className="w-4 h-4" />
            <span>Finance Analytics</span>
          </button>
        </div>
      </div>

      {/* Department Management Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Department Management</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
            <Plus className="w-4 h-4" />
            <span>Add Department</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-background/50 border border-border/60">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Cardiology</h4>
              <span className="text-sm text-muted-foreground">8 Doctors</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Head: Dr. Sarah Wilson</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <div className="p-4 rounded-lg bg-background/50 border border-border/60">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Pediatrics</h4>
              <span className="text-sm text-muted-foreground">6 Doctors</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Head: Dr. Michael Chang</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <div className="p-4 rounded-lg bg-background/50 border border-border/60">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Orthopedics</h4>
              <span className="text-sm text-muted-foreground">5 Doctors</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Head: Dr. James Anderson</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Active Doctors Section */}
      <div className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Active Doctors</h3>
          <div className="flex items-center gap-2">
            <button className="h-10 flex items-center gap-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <UserPlus className="w-4 h-4" />
              <span>Add New Doctor</span>
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground pb-2 border-b border-border/60">
            <span>Name</span>
            <span>Specialty</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-4 items-center p-3 rounded-lg bg-background/50 border border-border/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">Dr. Sarah Wilson</span>
              </div>
              <span className="text-muted-foreground">Cardiologist</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-muted-foreground">Active</span>
              </span>
              <div className="flex items-center gap-2">
                <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Calendar className="w-4 h-4" />
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <BarChart className="w-4 h-4" />
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 items-center p-3 rounded-lg bg-background/50 border border-border/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">Dr. Michael Chang</span>
              </div>
              <span className="text-muted-foreground">Pediatrician</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-muted-foreground">Active</span>
              </span>
              <div className="flex items-center gap-2">
                <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Calendar className="w-4 h-4" />
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <BarChart className="w-4 h-4" />
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 items-center p-3 rounded-lg bg-background/50 border border-border/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">Dr. Emma Thompson</span>
              </div>
              <span className="text-muted-foreground">Dermatologist</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-muted-foreground">Active</span>
              </span>
              <div className="flex items-center gap-2">
                <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Calendar className="w-4 h-4" />
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <BarChart className="w-4 h-4" />
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 items-center p-3 rounded-lg bg-background/50 border border-border/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">Dr. James Anderson</span>
              </div>
              <span className="text-muted-foreground">Orthopedic Surgeon</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-muted-foreground">Active</span>
              </span>
              <div className="flex items-center gap-2">
                <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Calendar className="w-4 h-4" />
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <BarChart className="w-4 h-4" />
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 items-center p-3 rounded-lg bg-background/50 border border-border/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">Dr. Rachel Green</span>
              </div>
              <span className="text-muted-foreground">Neurologist</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-muted-foreground">Active</span>
              </span>
              <div className="flex items-center gap-2">
                <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Calendar className="w-4 h-4" />
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <BarChart className="w-4 h-4" />
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-border/60">
          <button className="h-10 flex items-center gap-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
            <Mail className="w-4 h-4" />
            <span>Bulk Email</span>
          </button>
          <button className="h-10 flex items-center gap-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Pending Approvals Section */}
      <div className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6">
        <h3 className="text-lg font-semibold mb-4">Pending Doctor Approvals</h3>
        <div className="space-y-4">
          {pendingDoctors.map((doctor) => (
            <div key={doctor.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/60">
              <div>
                <h4 className="font-medium">{doctor.name}</h4>
                <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                <p className="text-xs text-muted-foreground">Applied: {doctor.appliedDate}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500/20">
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20">
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 