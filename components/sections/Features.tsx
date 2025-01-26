'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Users, Bell, Shield, Clock, MessageSquare } from "lucide-react"

interface Feature {
  title: string
  description: string
  icon: React.ElementType
}

const features: Feature[] = [
  {
    title: "Smart Scheduling",
    description:
      "Our intelligent scheduling system matches you with the right healthcare providers based on your needs, availability, and preferences.",
    icon: Calendar,
  },
  {
    title: "Provider Network",
    description:
      "Access a vast network of qualified healthcare professionals across various specialties and locations.",
    icon: Users,
  },
  {
    title: "Instant Notifications",
    description:
      "Stay informed with real-time updates about your appointments, reminders, and any schedule changes.",
    icon: Bell,
  },
  {
    title: "Secure Platform",
    description:
      "Your health information is protected with enterprise-grade security and HIPAA-compliant infrastructure.",
    icon: Shield,
  },
  {
    title: "Real-time Availability",
    description:
      "View real-time availability of healthcare providers and book appointments instantly.",
    icon: Clock,
  },
  {
    title: "Direct Messaging",
    description:
      "Communicate securely with your healthcare providers through our integrated messaging system.",
    icon: MessageSquare,
  },
]

export function Features() {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Powerful Features for Modern Healthcare
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover how our platform makes healthcare scheduling effortless and efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group"
            >
              <div className="relative h-full p-6 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/60 overflow-hidden">
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="hover-card-gradient"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent -z-10"
                  />
                )}
                <div className="relative z-10">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-5">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 