'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Building, Users, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingItem {
  title: string
  price: string
  monthlyPrice: string
  description: string
  features: string[]
  icon: React.ReactNode
  subtitle: string
}

const plans: PricingItem[] = [
  {
    title: "Clinic",
    subtitle: "For Small to Medium Practices",
    price: "$29",
    monthlyPrice: "$29/mo",
    description: "Perfect for individual practices and small clinics looking to streamline their scheduling.",
    icon: <Users className="w-6 h-6 text-violet-500" />,
    features: [
      "Unlimited appointment scheduling",
      "Patient management system",
      "Multiple provider support",
      "Real-time availability",
      "SMS & email reminders",
      "Custom branding options",
      "Analytics dashboard",
      "Priority support",
      "Secure patient records",
      "Online payments",
    ],
  },
  {
    title: "Hospital",
    subtitle: "For Large Medical Facilities",
    price: "Custom",
    monthlyPrice: "Contact us",
    description: "Comprehensive solution for hospitals and large medical facilities with multiple departments.",
    icon: <Building className="w-6 h-6 text-emerald-500" />,
    features: [
      "All Clinic features",
      "Multi-location support",
      "Department management",
      "HIPAA compliance",
      "API integration access",
      "Advanced reporting suite",
      "Dedicated account manager",
      "24/7 premium support",
      "Custom development",
      "Staff training & onboarding",
    ],
  },
]

export function Pricing() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <section className="relative py-24 overflow-hidden antialiased">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Choose Your Plan
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Select the perfect solution for your healthcare facility
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsAnnual(false)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                  !isAnnual
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Monthly billing
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                  isAnnual
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Annual billing
              </button>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className={cn(
                  "h-full p-8 rounded-2xl transition-all duration-300",
                  "bg-card/50 backdrop-blur-sm border border-border/60",
                  hoveredIndex === index && "border-primary/60 shadow-lg"
                )}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-card/50">{plan.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold">{plan.title}</h3>
                    <p className="text-muted-foreground text-sm">{plan.subtitle}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold tracking-tight">
                      {isAnnual ? plan.price : plan.monthlyPrice}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className="text-muted-foreground text-base">{isAnnual ? "/year" : "/month"}</span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <button
                  className={cn(
                    "w-full mb-8 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                    "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </button>

                <div>
                  <span className="text-sm font-medium">Features included:</span>
                  <ul className="mt-4 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Need a custom solution? <a href="#" className="text-primary hover:underline">Talk to our team</a>
          </p>
        </div>
      </div>
    </section>
  )
} 