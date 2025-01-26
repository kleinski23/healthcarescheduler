import { Hero } from "@/components/Hero"
import { Features } from "@/components/sections/Features"
import { AnimatedTestimonials } from "@/components/sections/AnimatedTestimonials"
import { FAQ } from "@/components/sections/FAQ"
import { Pricing } from "@/components/sections/Pricing"

export default function Home() {
  return (
    <>
      {/* Dotted Grid Background */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(75 85 99 / 0.2) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />
      <main className="min-h-screen bg-transparent relative">
        <Hero />
        <Features />
        <AnimatedTestimonials />
        <FAQ />
        <Pricing />
      </main>
    </>
  )
} 