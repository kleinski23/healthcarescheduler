'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  User,
  CalendarCheck,
  CheckCircle,
  ArrowLeft,
  Star
} from 'lucide-react'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'

interface Doctor {
  id: number
  name: string
  specialization: string
  image: string
  availability: {
    morning: string[]
    afternoon: string[]
  }
  rating: number
  experience: string
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Wilson',
    specialization: 'General Physician',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    availability: {
      morning: ['9:00 AM', '10:00 AM', '11:00 AM'],
      afternoon: ['2:00 PM', '3:00 PM']
    },
    rating: 4.8,
    experience: '15 years'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'Cardiologist',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    availability: {
      morning: ['9:30 AM', '10:30 AM'],
      afternoon: ['1:30 PM', '2:30 PM', '4:00 PM']
    },
    rating: 4.9,
    experience: '20 years'
  },
  {
    id: 3,
    name: 'Dr. Emily Brown',
    specialization: 'Pediatrician',
    image: 'https://randomuser.me/api/portraits/women/89.jpg',
    availability: {
      morning: ['8:00 AM', '10:00 AM'],
      afternoon: ['1:00 PM', '3:00 PM', '4:30 PM']
    },
    rating: 4.7,
    experience: '12 years'
  }
]

export default function BookAppointment() {
  const router = useRouter()
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [reason, setReason] = useState<string>('')
  const [step, setStep] = useState(1)
  const [mounted, setMounted] = useState(false)
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [userEmail, setUserEmail] = useState<string>('')

  useEffect(() => {
    setMounted(true)
    const email = sessionStorage.getItem('userEmail')
    if (email) {
      setUserEmail(email)
    }
  }, [])

  if (!mounted) {
    return null
  }

  const handleMonthChange = (increment: number) => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(currentMonth.getMonth() + increment)
    setCurrentMonth(newMonth)
  }

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    
    // Get first day of the month
    const firstDayOfMonth = new Date(year, month, 1)
    // Get last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0)
    
    // Calculate days from previous month to fill the first week
    const firstDayWeekday = firstDayOfMonth.getDay()
    const prevMonthDays = []
    if (firstDayWeekday > 0) {
      const prevMonth = new Date(year, month, 0)
      const prevMonthLastDay = prevMonth.getDate()
      for (let i = firstDayWeekday - 1; i >= 0; i--) {
        prevMonthDays.push({
          date: new Date(year, month - 1, prevMonthLastDay - i),
          isCurrentMonth: false,
          isPast: true
        })
      }
    }
    
    // Current month days
    const currentMonthDays = []
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(year, month, day)
      currentMonthDays.push({
        date,
        isCurrentMonth: true,
        isPast: date < new Date(new Date().setHours(0, 0, 0, 0))
      })
    }
    
    // Calculate days from next month to fill the last week
    const lastDayWeekday = lastDayOfMonth.getDay()
    const nextMonthDays = []
    if (lastDayWeekday < 6) {
      for (let i = 1; i <= 6 - lastDayWeekday; i++) {
        nextMonthDays.push({
          date: new Date(year, month + 1, i),
          isCurrentMonth: false,
          isPast: false
        })
      }
    }
    
    // Combine all days
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
  }

  const handleSubmit = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !reason) {
      alert('Please fill in all fields')
      return
    }
    
    setShowConfirmation(true)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const steps = [
    { number: 1, title: 'Choose Doctor', icon: User },
    { number: 2, title: 'Select Schedule', icon: Calendar },
    { number: 3, title: 'Confirm Details', icon: CheckCircle }
  ]

  return (
    <div className="p-4 lg:p-6 bg-background min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/patient/dashboard')}
            className="h-8 w-8 p-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold text-card-foreground tracking-tight">Book Appointment</h1>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex justify-between relative mb-8">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2" />
          {steps.map((s, i) => (
            <div key={s.number} className="relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= s.number 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <s.icon className="w-5 h-5 stroke-[1.5]" />
              </div>
              <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium ${
                step >= s.number 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
              }`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Card className="border-2 border-border/60 max-w-4xl mx-auto">
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="p-2 rounded-md bg-primary/10">
                  <Stethoscope className="w-5 h-5 text-primary stroke-[1.5]" />
                </div>
                <h2 className="text-lg font-semibold text-card-foreground tracking-tight">Select a Doctor</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-lg ${
                      selectedDoctor?.id === doctor.id
                        ? 'border-primary bg-primary/5 shadow-primary/20'
                        : 'border-border/60 hover:border-border shadow-border/20'
                    }`}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <div className="flex gap-4">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-card-foreground">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{doctor.specialization}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="text-sm font-medium text-primary">{doctor.rating}</span>
                          <span className="text-xs text-muted-foreground ml-1">• {doctor.experience}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Clock className="w-4 h-4 text-emerald-500 stroke-[1.5]" />
                          <span className="text-xs text-emerald-500 font-medium">{doctor.availability.morning.length + doctor.availability.afternoon.length} slots available today</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedDoctor}
                  className="h-10 px-4 font-medium"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2 stroke-[1.5]" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="p-2 rounded-md bg-primary/10">
                  <Calendar className="w-5 h-5 text-primary stroke-[1.5]" />
                </div>
                <h2 className="text-lg font-semibold text-card-foreground tracking-tight">Select Date & Time</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-card-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary stroke-[1.5]" />
                    Available Dates
                  </h3>
                  <div className="rounded-xl border-2 border-border/60 p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => handleMonthChange(-1)}
                        className="p-1 rounded-md hover:bg-primary/10 text-muted-foreground"
                      >
                        <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
                      </button>
                      <h4 className="text-sm font-medium text-card-foreground">
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </h4>
                      <button
                        onClick={() => handleMonthChange(1)}
                        className="p-1 rounded-md hover:bg-primary/10 text-muted-foreground"
                      >
                        <ChevronRight className="w-4 h-4 stroke-[1.5]" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                        <div 
                          key={day} 
                          className="text-xs font-medium text-muted-foreground text-center py-1 w-full inline-block"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {generateCalendarDays().map((day, index) => {
                        const dateStr = day.date.toISOString().split('T')[0]
                        const isToday = new Date().toISOString().split('T')[0] === dateStr
                        
                        return (
                          <button
                            key={dateStr + index}
                            onClick={() => setSelectedDate(dateStr)}
                            disabled={day.isPast || !day.isCurrentMonth}
                            className={`aspect-square rounded-lg p-1 text-sm transition-all relative ${
                              !day.isCurrentMonth
                                ? 'text-muted-foreground/25 cursor-not-allowed hover:bg-transparent'
                                : selectedDate === dateStr
                                ? 'bg-primary text-primary-foreground hover:bg-primary'
                                : isToday
                                ? 'bg-primary/10 text-primary font-medium hover:bg-primary/20'
                                : day.isPast
                                ? 'text-muted-foreground/50 cursor-not-allowed hover:bg-transparent'
                                : 'text-card-foreground hover:bg-primary/10'
                            }`}
                          >
                            <span className="absolute inset-0 flex items-center justify-center">
                              {day.date.getDate()}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-card-foreground">Available Time Slots</h3>
                  <div className="rounded-xl border-2 border-border/60 p-4 bg-muted/30 space-y-4">
                    {/* Morning Slots */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-muted-foreground">Morning</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedDoctor?.availability.morning.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-2.5 rounded-lg text-sm transition-all ${
                              selectedTime === time
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-card hover:bg-primary/10 text-card-foreground'
                            } text-center`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Afternoon Slots */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-muted-foreground">Afternoon</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedDoctor?.availability.afternoon.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-2.5 rounded-lg text-sm transition-all ${
                              selectedTime === time
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-card hover:bg-primary/10 text-card-foreground'
                            } text-center`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="h-10 px-4 font-medium"
                >
                  <ChevronLeft className="w-4 h-4 mr-2 stroke-[1.5]" />
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!selectedDate || !selectedTime}
                  className="h-10 px-4 font-medium"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2 stroke-[1.5]" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="p-2 rounded-md bg-primary/10">
                  <CalendarCheck className="w-5 h-5 text-primary stroke-[1.5]" />
                </div>
                <h2 className="text-lg font-semibold text-card-foreground tracking-tight">Confirm Appointment</h2>
              </div>
              <div className="space-y-6">
                <div className="p-6 rounded-lg border-2 border-border/60 space-y-6 bg-muted/30">
                  <div className="flex items-start gap-4">
                    <img
                      src={selectedDoctor?.image}
                      alt={selectedDoctor?.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-base font-medium text-card-foreground">{selectedDoctor?.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedDoctor?.specialization}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm font-medium text-primary">{selectedDoctor?.rating}</span>
                        <span className="text-xs text-muted-foreground ml-1">• {selectedDoctor?.experience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-border/60">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary stroke-[1.5] mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-card-foreground">Appointment Date</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedDate ? formatDate(selectedDate) : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary stroke-[1.5] mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-card-foreground">Appointment Time</p>
                        <p className="text-sm text-muted-foreground mt-1">{selectedTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-card-foreground flex items-center gap-2">
                    <CalendarCheck className="w-4 h-4 text-primary stroke-[1.5]" />
                    Reason for Visit
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Please describe your symptoms or reason for visit"
                    className="w-full h-32 px-4 py-3 text-sm rounded-lg border-2 border-border/60 bg-background placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="h-10 px-4 font-medium"
                >
                  <ChevronLeft className="w-4 h-4 mr-2 stroke-[1.5]" />
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!reason}
                  className="h-10 px-4 font-medium"
                >
                  Confirm Booking
                  <CheckCircle className="w-4 h-4 ml-2 stroke-[1.5]" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false)
          router.push('/patient/dashboard')
        }}
        title="Appointment Confirmed!"
        message=""
        email={userEmail}
        details={[
          {
            label: "Doctor",
            value: selectedDoctor?.name || ''
          },
          {
            label: "Date",
            value: selectedDate ? formatDate(selectedDate) : ''
          },
          {
            label: "Time",
            value: selectedTime
          },
          {
            label: "Reason for Visit",
            value: reason
          }
        ]}
      />
    </div>
  )
} 