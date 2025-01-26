'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'

interface FormData {
  name: string
  email: string
  password: string
  dateOfBirth: string
  phone: string
  address: string
}

// Separate ConfirmationBox component
const ConfirmationBox = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <Card className="p-6 max-w-md w-full mx-4 bg-white">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg 
            className="w-8 h-8 text-green-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Registration Successful!</h2>
        <p className="text-gray-600">
          Your account has been created successfully. You will be redirected to the login page in a few seconds.
        </p>
        <Button
          onClick={onClose}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Go to Login
        </Button>
      </div>
    </Card>
  </div>
)

const RegisterPage = () => {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [step, setStep] = useState(1)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateStep1 = () => {
    return formData.name && formData.email && formData.password
  }

  const validateStep2 = () => {
    return formData.dateOfBirth && formData.phone && formData.address
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateStep2()) {
      // Store user data
      if (isMounted) {
        sessionStorage.setItem('userEmail', formData.email)
        sessionStorage.setItem('userName', formData.name)
      }
      
      setShowConfirmation(true)
    }
  }

  const handleConfirmationClose = () => {
    setShowConfirmation(false)
    router.push('/auth/login')
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            Create an Account
          </h1>
          <p className="text-lg text-gray-600">
            Step {step} of 2
          </p>
        </div>

        <Card className="p-8 bg-white shadow-xl rounded-xl border border-gray-100">
          <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-6">
            {step === 1 ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="123 Main St, City, Country"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between space-x-4">
              {step === 2 && (
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 h-12"
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white"
                disabled={step === 1 ? !validateStep1() : !validateStep2()}
              >
                {step === 1 ? 'Next' : 'Create Account'}
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-6 text-center text-gray-600 border-t border-gray-100">
            Already have an account?{' '}
            <Link 
              href="/auth/login" 
              className="font-semibold text-primary hover:text-primary/90 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </Card>
      </div>

      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        title="Registration Successful!"
        message=""
        email={formData.email}
        type="registration"
      />
    </div>
  )
}

export default RegisterPage 