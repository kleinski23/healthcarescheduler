'use client'

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    quote: "The scheduling system has transformed our practice efficiency. Patient management has never been easier and more streamlined than before.",
    name: "Dr. Sarah Chen",
    designation: "Cardiologist",
    src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500&h=500&auto=format&fit=crop"
  },
  {
    quote: "Automated reminders have reduced no-shows significantly. It's a game-changer for our clinic and has improved our patient engagement tremendously.",
    name: "Dr. Michael Roberts",
    designation: "Family Physician",
    src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=500&h=500&auto=format&fit=crop"
  },
  {
    quote: "The interface is intuitive and my patients love how easy it is to book appointments. The system has made healthcare more accessible.",
    name: "Dr. Emily Thompson",
    designation: "Pediatrician",
    src: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=500&h=500&auto=format&fit=crop"
  },
]

export function AnimatedTestimonials() {
  const [active, setActive] = useState(0)

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const isActive = (index: number) => {
    return index === active
  }

  useEffect(() => {
    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
  }, [])

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10
  }

  return (
    <section className="relative py-24 overflow-hidden antialiased">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-muted-foreground text-lg">
            See what doctors are saying about our healthcare scheduling platform.
          </p>
        </div>

        <div className="max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <div className="relative h-80 w-full">
                <AnimatePresence>
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.src}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                        z: -100,
                        rotate: randomRotateY(),
                      }}
                      animate={{
                        opacity: isActive(index) ? 1 : 0.7,
                        scale: isActive(index) ? 1 : 0.95,
                        z: isActive(index) ? 0 : -100,
                        rotate: isActive(index) ? 0 : randomRotateY(),
                        zIndex: isActive(index)
                          ? 999
                          : testimonials.length + 2 - index,
                        y: isActive(index) ? [0, -80, 0] : 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        z: 100,
                        rotate: randomRotateY(),
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 origin-bottom"
                    >
                      <Image
                        src={testimonial.src}
                        alt={testimonial.name}
                        width={500}
                        height={500}
                        draggable={false}
                        className="h-full w-full rounded-3xl object-cover object-center"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex justify-between flex-col py-4">
              <motion.div
                key={active}
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -20,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
              >
                <h3 className="text-2xl font-bold text-foreground">
                  {testimonials[active].name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {testimonials[active].designation}
                </p>
                <motion.p className="text-lg text-muted-foreground mt-8">
                  {testimonials[active].quote.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{
                        filter: "blur(10px)",
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.02 * index,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
              <div className="flex gap-4 pt-12 md:pt-0">
                <button
                  onClick={handlePrev}
                  className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button"
                >
                  <IconArrowLeft className="h-5 w-5 text-foreground group-hover/button:rotate-12 transition-transform duration-300" />
                </button>
                <button
                  onClick={handleNext}
                  className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button"
                >
                  <IconArrowRight className="h-5 w-5 text-foreground group-hover/button:-rotate-12 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 