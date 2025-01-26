import Link from "next/link"
import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <nav className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="text-xl font-bold text-primary"
            aria-label="Home"
          >
            HealthCare Scheduler
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 