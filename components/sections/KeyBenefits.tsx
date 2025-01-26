'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, CheckCircle, MapPin } from 'lucide-react'

const benefits = [
  {
    icon: Calendar,
    title: "Easy Online Scheduling",
    description: "Book appointments with your preferred healthcare providers in just a few clicks, anytime and anywhere.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Clock,
    title: "24/7 Appointment Access",
    description: "Access our scheduling platform round the clock. Your healthcare needs don't wait, and neither should you.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  },
  {
    icon: CheckCircle,
    title: "Instant Confirmations",
    description: "Receive immediate appointment confirmations and reminders via email or SMS to stay on track.",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10"
  },
  {
    icon: MapPin,
    title: "Multiple Locations",
    description: "Find healthcare providers across multiple locations and choose the one most convenient for you.",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export function KeyBenefits() {
  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Why Choose Our Healthcare Scheduler?
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience the convenience of modern healthcare scheduling with our comprehensive platform.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                <div className="h-full p-6 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm hover:border-border hover:shadow-lg transition-all duration-200">
                  <div className={`p-3 rounded-lg w-fit ${benefit.bgColor} mb-4 transition-colors duration-200`}>
                    <Icon className={`w-6 h-6 ${benefit.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
} 