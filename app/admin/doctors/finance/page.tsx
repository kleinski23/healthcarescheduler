'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  ArrowUp,
  ArrowDown,
  Download,
  Calendar,
  Filter,
  ChevronRight,
  Building,
  Users,
  Wallet,
  CreditCard,
  DollarSign,
  TrendingUp,
  Clock,
  AlertCircle,
} from "lucide-react"
import { motion } from "framer-motion"

// Mock data for demonstration
const financeData = {
  totalRevenue: 124560,
  revenueTrend: "+12.5%",
  avgConsultationFee: 120,
  consultationTrend: "+5.2%",
  totalPayments: 98450,
  paymentsTrend: "+8.4%",
  pendingPayments: 3280,
  pendingTrend: "+2.1%",
}

const departmentRevenue = [
  {
    name: "Cardiology",
    revenue: 45200,
    trend: "+15.2%",
    isPositive: true,
  },
  {
    name: "Pediatrics",
    revenue: 32800,
    trend: "+8.7%",
    isPositive: true,
  },
  {
    name: "Orthopedics",
    revenue: 28400,
    trend: "-3.4%",
    isPositive: false,
  },
  {
    name: "Dermatology",
    revenue: 25600,
    trend: "+12.1%",
    isPositive: true,
  },
]

const consultationAnalytics = [
  {
    type: "Regular Consultation",
    averageFee: 100,
    totalRevenue: 45000,
    trend: "+8.5%",
    isPositive: true,
  },
  {
    type: "Specialist Consultation",
    averageFee: 150,
    totalRevenue: 52000,
    trend: "+12.3%",
    isPositive: true,
  },
  {
    type: "Emergency Consultation",
    averageFee: 200,
    totalRevenue: 28000,
    trend: "-2.1%",
    isPositive: false,
  },
  {
    type: "Follow-up Visits",
    averageFee: 80,
    totalRevenue: 32000,
    trend: "+5.7%",
    isPositive: true,
  },
]

const patientPaymentAnalytics = [
  {
    category: "Insurance Claims",
    amount: 78500,
    percentage: "65%",
    trend: "+10.2%",
    isPositive: true,
  },
  {
    category: "Direct Payments",
    amount: 32400,
    percentage: "27%",
    trend: "+5.8%",
    isPositive: true,
  },
  {
    category: "Payment Plans",
    amount: 9600,
    percentage: "8%",
    trend: "-2.4%",
    isPositive: false,
  },
]

export default function DoctorFinanceAnalytics() {
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
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance Analytics</h1>
          <p className="text-muted-foreground">Track and analyze financial performance</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
            <Calendar className="w-4 h-4" />
            <span>Monthly</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/60"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-2">${financeData.totalRevenue}</h3>
              <p className="flex items-center gap-1 text-sm text-emerald-500 mt-1">
                <ArrowUp className="w-4 h-4" />
                {financeData.revenueTrend}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-primary" />
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
              <p className="text-sm font-medium text-muted-foreground">Avg. Consultation Fee</p>
              <h3 className="text-2xl font-bold mt-2">${financeData.avgConsultationFee}</h3>
              <p className="flex items-center gap-1 text-sm text-emerald-500 mt-1">
                <ArrowUp className="w-4 h-4" />
                {financeData.consultationTrend}
              </p>
            </div>
            <Wallet className="w-8 h-8 text-primary" />
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
              <p className="text-sm font-medium text-muted-foreground">Total Payments</p>
              <h3 className="text-2xl font-bold mt-2">${financeData.totalPayments}</h3>
              <p className="flex items-center gap-1 text-sm text-emerald-500 mt-1">
                <ArrowUp className="w-4 h-4" />
                {financeData.paymentsTrend}
              </p>
            </div>
            <CreditCard className="w-8 h-8 text-primary" />
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
              <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
              <h3 className="text-2xl font-bold mt-2">${financeData.pendingPayments}</h3>
              <p className="flex items-center gap-1 text-sm text-red-500 mt-1">
                <ArrowUp className="w-4 h-4" />
                {financeData.pendingTrend}
              </p>
            </div>
            <Clock className="w-8 h-8 text-primary" />
          </div>
        </motion.div>
      </div>

      {/* Revenue by Department */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Revenue by Department</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {departmentRevenue.map((dept, index) => (
            <div key={index} className="p-4 rounded-lg bg-background/50 border border-border/60">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{dept.name}</h4>
                <Building className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">${dept.revenue}</p>
              <p className={`flex items-center gap-1 text-sm ${dept.isPositive ? 'text-emerald-500' : 'text-red-500'} mt-1`}>
                {dept.isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {dept.trend}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Consultation Fee Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Consultation Fee Analytics</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {consultationAnalytics.map((item, index) => (
            <div key={index} className="p-4 rounded-lg bg-background/50 border border-border/60">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{item.type}</h4>
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Average Fee</p>
                  <p className="text-lg font-bold">${item.averageFee}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-lg font-bold">${item.totalRevenue}</p>
                </div>
              </div>
              <p className={`flex items-center gap-1 text-sm ${item.isPositive ? 'text-emerald-500' : 'text-red-500'} mt-2`}>
                {item.isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {item.trend}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Patient Payment Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Payment Distribution</h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
              <Calendar className="w-4 h-4" />
              <span>This Month</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {patientPaymentAnalytics.map((item, index) => (
            <div key={index} className="p-4 rounded-lg bg-background/50 border border-border/60">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{item.category}</h4>
                <span className="text-lg font-bold">{item.percentage}</span>
              </div>
              <p className="text-2xl font-bold">${item.amount}</p>
              <p className={`flex items-center gap-1 text-sm ${item.isPositive ? 'text-emerald-500' : 'text-red-500'} mt-1`}>
                {item.isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {item.trend}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 
