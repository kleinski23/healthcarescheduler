'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Filter,
  UserPlus,
  UserX,
  Users,
  Calendar,
  Lock,
  Settings,
  Mail,
  Download,
  FileText,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { motion } from "framer-motion"

// Mock data for demonstration
const patients = [
  {
    id: "P-2024-001",
    name: "John Smith",
    email: "john.smith@email.com",
    lastVisit: "2024-03-15",
    status: "active",
  },
  {
    id: "P-2024-002",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    lastVisit: "2024-03-18",
    status: "pending",
  },
  {
    id: "P-2024-003",
    name: "Michael Brown",
    email: "m.brown@email.com",
    lastVisit: "2024-03-10",
    status: "blocked",
  },
  {
    id: "P-2024-004",
    name: "Emily Davis",
    email: "emily.d@email.com",
    lastVisit: "2024-03-20",
    status: "active",
  },
]

export default function PatientRecords() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500'
      case 'pending':
        return 'bg-yellow-500'
      case 'blocked':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="p-6 space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Records</h1>
          <p className="text-muted-foreground">View and manage patient information</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
            <FileText className="w-4 h-4" />
            <span>Export Records</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            <UserPlus className="w-4 h-4" />
            <span>Add Patient</span>
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
              placeholder="Search patients..."
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
            <UserX className="w-4 h-4" />
            <span>Blocked Users</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
            <Mail className="w-4 h-4" />
            <span>Bulk Email</span>
          </button>
        </div>
      </div>

      {/* Patient Records Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground pb-2 border-b border-border/60">
            <span>Name</span>
            <span>Email</span>
            <span>Last Visit</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          <div className="space-y-3">
            {patients.map((patient) => (
              <div key={patient.id} className="grid grid-cols-5 gap-4 items-center p-3 rounded-lg bg-background/50 border border-border/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">{patient.name}</span>
                    <p className="text-xs text-muted-foreground">ID: {patient.id}</p>
                  </div>
                </div>
                <span className="text-muted-foreground">{patient.email}</span>
                <span className="text-muted-foreground">{patient.lastVisit}</span>
                <span className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(patient.status)}`}></div>
                  <span className="text-sm text-muted-foreground capitalize">{patient.status}</span>
                </span>
                <div className="flex items-center gap-2">
                  <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <Calendar className="w-4 h-4" />
                  </button>
                  <button className={`h-9 w-9 flex items-center justify-center rounded-lg ${
                    patient.status === 'blocked' 
                      ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' 
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  } transition-colors`}>
                    <Lock className="w-4 h-4" />
                  </button>
                  <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
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
              <span>Bulk Email</span>
            </button>
            <button className="h-10 flex items-center gap-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Records</span>
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