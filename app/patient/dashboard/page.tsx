'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import {
  Activity,
  Calendar,
  Clock,
  Bell,
  FileText,
  Pill,
  Stethoscope,
  AlertCircle,
  Heart,
  MessageSquare,
  UserCog,
  BadgeHelp,
  ChevronRight,
  Syringe,
  CreditCard,
  ClipboardList
} from 'lucide-react'

interface UserProfile {
  firstName: string
  email: string
}

export default function PatientDashboard() {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<UserProfile>({ firstName: '', email: '' })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = sessionStorage.getItem('userEmail')
      const storedProfile = sessionStorage.getItem('userProfile')
      
      if (!email) {
        router.push('/auth/login')
        return
      }

      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile))
      } else {
        // For now, we'll use a default first name. In a real app, you'd fetch this from your backend
        setUserProfile({ firstName: 'Patient', email: email })
      }
      
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('userEmail')
      sessionStorage.removeItem('userProfile')
      router.push('/auth/login')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-6 bg-background min-h-screen space-y-6">
      {/* Welcome Section with Notifications */}
      <div className="bg-card rounded-xl p-5 border-2 border-border/60 shadow-sm">
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl font-semibold text-card-foreground tracking-tight">Welcome Back, {userProfile.firstName}!</h1>
            <p className="text-sm text-muted-foreground/90 mt-1">{userProfile.email}</p>
            <div className="mt-5 flex items-center justify-between">
              <Button 
                variant="outline" 
                size="default"
                onClick={() => router.push('/patient/messages')}
                className="h-10 px-4 font-medium"
              >
                <Bell className="w-4 h-4 mr-2 stroke-[1.5]" />
                Messages
              </Button>
              <Button 
                onClick={() => router.push('/patient/book-appointment')}
                size="default"
                className="h-10 px-4 font-medium"
              >
                <Calendar className="w-4 h-4 mr-2 stroke-[1.5]" />
                Book Appointment
              </Button>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-2">
            <div className="space-y-2">
              {[
                {
                  title: 'New Message from Dr. Wilson',
                  desc: 'Regarding your last appointment',
                  time: '2 hours ago',
                  icon: MessageSquare,
                  color: 'text-blue-500 bg-blue-500/10'
                },
                {
                  title: 'Prescription Refill Due',
                  desc: 'Lisinopril needs to be refilled',
                  time: '1 day ago',
                  icon: Pill,
                  color: 'text-emerald-500 bg-emerald-500/10'
                }
              ].map((notification, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-2.5 rounded-lg border border-border/40 hover:border-border transition-colors group hover:bg-accent/5"
                >
                  <div className={`p-1.5 rounded-md ${notification.color}`}>
                    <notification.icon className="w-3.5 h-3.5 stroke-[1.5]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors">{notification.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{notification.desc}</p>
                  </div>
                  <span className="text-[11px] text-muted-foreground whitespace-nowrap">{notification.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BentoGrid>
        {/* Health Reminders */}
        <BentoGridItem className="md:col-span-1 lg:col-span-2 row-span-2 border-2 border-border/60">
          <div className="h-full flex flex-col">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-md bg-primary/10">
                <AlertCircle className="w-5 h-5 text-primary stroke-[1.5]" />
              </div>
              <h2 className="text-lg font-semibold text-card-foreground tracking-tight">Health Reminders</h2>
            </div>
            <div className="grid gap-3 flex-1">
              {[
                {
                  title: 'Medication Reminder',
                  desc: 'Take your morning medication at 9:00 AM',
                  icon: Pill,
                  color: 'text-blue-500 bg-blue-500/10'
                },
                {
                  title: 'Upcoming Vaccination',
                  desc: 'Flu shot due in 2 weeks',
                  icon: Calendar,
                  color: 'text-emerald-500 bg-emerald-500/10'
                },
                {
                  title: 'Lab Test Required',
                  desc: 'Schedule your annual blood work',
                  icon: FileText,
                  color: 'text-violet-500 bg-violet-500/10'
                }
              ].map((reminder, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border/60 hover:border-border transition-colors flex items-start gap-3 group hover:bg-accent/5"
                >
                  <div className={`p-2 rounded-md ${reminder.color}`}>
                    <reminder.icon className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-card-foreground group-hover:text-primary transition-colors">{reminder.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{reminder.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BentoGridItem>

        {/* Health Status */}
        <BentoGridItem className="md:col-span-1 lg:col-span-2 row-span-2 border-2 border-border/60">
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-md bg-rose-500/10">
                  <Heart className="w-5 h-5 text-rose-500 stroke-[1.5]" />
                </div>
                <h2 className="text-lg font-semibold text-card-foreground tracking-tight">Health Status</h2>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/patient/health-status')}
                className="h-8 px-3 font-medium"
              >
                View Details
              </Button>
            </div>
            <div className="space-y-5 flex-1">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-card-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary stroke-[1.5]" />
                  Latest Vitals
                </h3>
                <div className="grid gap-2">
                  {[
                    { label: 'Blood Pressure', value: '120/80 mmHg' },
                    { label: 'Heart Rate', value: '72 bpm' },
                    { label: 'Temperature', value: '98.6°F' }
                  ].map((vital, index) => (
                    <div key={index} className="flex justify-between items-center text-sm p-3 rounded-md border border-border/60 hover:border-border transition-colors">
                      <span className="text-muted-foreground">{vital.label}</span>
                      <span className="font-medium text-card-foreground">{vital.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-card-foreground flex items-center gap-2">
                  <Pill className="w-4 h-4 text-primary stroke-[1.5]" />
                  Current Medications
                </h3>
                <div className="grid gap-2">
                  {[
                    { name: 'Lisinopril', dosage: '10mg daily' },
                    { name: 'Metformin', dosage: '500mg twice daily' }
                  ].map((med, index) => (
                    <div key={index} className="flex justify-between items-center text-sm p-3 rounded-md border border-border/60 hover:border-border transition-colors">
                      <span className="font-medium text-card-foreground">{med.name}</span>
                      <span className="text-sm text-muted-foreground">{med.dosage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </BentoGridItem>

        {/* Upcoming Vaccinations */}
        <BentoGridItem className="md:col-span-1 lg:col-span-2 border-2 border-border/60">
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-md bg-violet-500/10">
                  <Syringe className="w-5 h-5 text-violet-500 stroke-[1.5]" />
                </div>
                <h2 className="text-lg font-semibold text-card-foreground tracking-tight">Vaccinations</h2>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/patient/vaccinations')}
                className="h-8 px-3 font-medium"
              >
                Schedule
              </Button>
            </div>
            <div className="space-y-3 flex-1">
              {[
                {
                  name: 'Flu Shot',
                  date: 'Due in 2 weeks',
                  status: 'Upcoming'
                },
                {
                  name: 'COVID-19 Booster',
                  date: 'Due in 3 months',
                  status: 'Scheduled'
                }
              ].map((vaccine, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/60 hover:border-border transition-colors"
                >
                  <div>
                    <p className="text-base font-medium text-card-foreground">{vaccine.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{vaccine.date}</p>
                  </div>
                  <span className="text-xs bg-accent/50 text-accent-foreground px-2 py-1 rounded-full">
                    {vaccine.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </BentoGridItem>

        {/* Medical Bills & Insurance */}
        <BentoGridItem className="md:col-span-1 lg:col-span-2 border-2 border-border/60">
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-md bg-emerald-500/10">
                  <CreditCard className="w-5 h-5 text-emerald-500 stroke-[1.5]" />
                </div>
                <h2 className="text-lg font-semibold text-card-foreground tracking-tight">Billing & Insurance</h2>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/patient/billing')}
                className="h-8 px-3 font-medium"
              >
                View Details
              </Button>
            </div>
            <div className="space-y-4 flex-1">
              <div className="p-4 rounded-lg border border-border/60">
                <h3 className="text-sm font-medium text-card-foreground mb-3">Insurance Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Provider</span>
                    <span className="font-medium text-card-foreground">Blue Cross Blue Shield</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Policy Number</span>
                    <span className="font-medium text-card-foreground">XXX-XXX-1234</span>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-border/60">
                <h3 className="text-sm font-medium text-card-foreground mb-3">Recent Bills</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Visit</span>
                    <span className="font-medium text-emerald-500">Paid</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Lab Tests</span>
                    <span className="font-medium text-amber-500">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BentoGridItem>

        {/* Treatment Plans */}
        <BentoGridItem className="md:col-span-1 lg:col-span-2 border-2 border-border/60">
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-md bg-rose-500/10">
                  <ClipboardList className="w-5 h-5 text-rose-500 stroke-[1.5]" />
                </div>
                <h2 className="text-lg font-semibold text-card-foreground tracking-tight">Treatment Plans</h2>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/patient/treatments')}
                className="h-8 px-3 font-medium"
              >
                View All
              </Button>
            </div>
            <div className="space-y-3 flex-1">
              {[
                {
                  condition: 'Hypertension Management',
                  doctor: 'Dr. Sarah Wilson',
                  progress: 'On Track',
                  nextReview: 'March 30, 2024'
                },
                {
                  condition: 'Diabetes Care',
                  doctor: 'Dr. Michael Chen',
                  progress: 'Review Needed',
                  nextReview: 'March 25, 2024'
                }
              ].map((plan, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg border border-border/60 hover:border-border transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-base font-medium text-card-foreground">{plan.condition}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      plan.progress === 'On Track' 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {plan.progress}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Managed by {plan.doctor}</p>
                  <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1.5 stroke-[1.5]" />
                    Next Review: {plan.nextReview}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BentoGridItem>

        {/* Next Appointment */}
        <BentoGridItem className="md:col-span-1 lg:col-span-2 border-2 border-border/60">
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-md bg-emerald-500/10">
                  <Stethoscope className="w-5 h-5 text-emerald-500 stroke-[1.5]" />
                </div>
                <h2 className="text-lg font-semibold text-card-foreground tracking-tight">Next Appointment</h2>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/patient/appointments')}
                className="h-8 px-3 font-medium"
              >
                View All
              </Button>
            </div>
            <div className="p-4 rounded-lg border border-border/60 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-medium text-card-foreground">General Checkup</h3>
                  <p className="text-sm text-muted-foreground mt-1">Dr. Sarah Wilson</p>
                  <div className="mt-3 flex items-center gap-4">
                    <span className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1.5 stroke-[1.5]" />
                      March 15, 2024
                    </span>
                    <span className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1.5 stroke-[1.5]" />
                      10:00 AM
                    </span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => router.push('/patient/appointments/upcoming')}
                  className="h-8 px-3 font-medium"
                >
                  Details
                </Button>
              </div>
            </div>
          </div>
        </BentoGridItem>

        {/* Help & Support */}
        <BentoGridItem className="col-span-full border-2 border-border/60">
          <div className="h-full flex flex-col">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-md bg-blue-500/10">
                <BadgeHelp className="w-5 h-5 text-blue-500 stroke-[1.5]" />
              </div>
              <h2 className="text-lg font-semibold text-card-foreground tracking-tight">Help & Support</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { icon: BadgeHelp, label: 'FAQs', href: '/patient/faq', color: 'bg-blue-500/10 text-blue-500' },
                { icon: MessageSquare, label: 'Contact Support', href: '/patient/support', color: 'bg-emerald-500/10 text-emerald-500' },
                { icon: UserCog, label: 'Account Settings', href: '/patient/settings', color: 'bg-violet-500/10 text-violet-500' }
              ].map((item, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  size="default"
                  className="h-12 text-sm font-medium justify-between group border-border/60 hover:border-border"
                  onClick={() => router.push(item.href)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-md ${item.color}`}>
                      <item.icon className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    {item.label}
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform stroke-[1.5]" />
                </Button>
              ))}
            </div>
          </div>
        </BentoGridItem>
      </BentoGrid>
    </div>
  )
} 