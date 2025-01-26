'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "How do I schedule an appointment?",
    answer: "Scheduling an appointment is easy! Simply log in to your account, select your preferred healthcare provider, choose an available time slot, and confirm your booking. You'll receive an instant confirmation via email."
  },
  {
    question: "Can I reschedule or cancel my appointment?",
    answer: "Yes, you can reschedule or cancel your appointment up to 24 hours before the scheduled time. Log in to your account, go to 'My Appointments', and select the reschedule or cancel option for the specific appointment."
  },
  {
    question: "What happens if I miss my appointment?",
    answer: "If you miss your appointment without prior cancellation, it may be marked as a 'no-show'. We recommend rescheduling at least 24 hours in advance to avoid any cancellation fees and to allow other patients to use that time slot."
  },
  {
    question: "How do I receive appointment reminders?",
    answer: "We send automatic reminders via email and SMS 48 hours and 24 hours before your scheduled appointment. You can customize your reminder preferences in your account settings."
  },
  {
    question: "Is my medical information secure?",
    answer: "Yes, we take your privacy seriously. Our platform is HIPAA-compliant and uses enterprise-grade encryption to protect your medical information. All data is stored securely and accessed only by authorized healthcare providers."
  },
  {
    question: "What should I do in case of an emergency?",
    answer: "For medical emergencies, please dial 911 or visit the nearest emergency room immediately. Our scheduling platform is designed for non-emergency medical appointments only."
  }
]

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="relative py-24 overflow-hidden antialiased">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about our healthcare scheduling platform.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/60 hover:bg-card/80 transition-colors"
              >
                <span className="font-medium text-left">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-foreground transition-transform duration-200 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 