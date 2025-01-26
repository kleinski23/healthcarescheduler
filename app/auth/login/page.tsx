'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

interface LoginData {
  email: string
  password: string
  isAdmin: boolean
}

// Test accounts
const TEST_ACCOUNTS = {
  ADMIN: { email: 'admin@mail.com', password: '123' },
  PATIENT: { email: '2@mail.com', password: '123' }
}

const LoginPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
    isAdmin: false
  })
  const [error, setError] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('') // Clear any previous errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      if (formData.isAdmin) {
        // Admin login check
        if (formData.email === TEST_ACCOUNTS.ADMIN.email && 
            formData.password === TEST_ACCOUNTS.ADMIN.password) {
          sessionStorage.setItem('isAdmin', 'true')
          sessionStorage.setItem('userEmail', formData.email)
          router.push('/admin/dashboard')
          return
        }
        setError('Invalid admin credentials')
        return
      }

      // Patient login check
      if (formData.email === TEST_ACCOUNTS.PATIENT.email && 
          formData.password === TEST_ACCOUNTS.PATIENT.password) {
        sessionStorage.setItem('userEmail', formData.email)
        sessionStorage.setItem('userName', 'Test Patient')
        router.push('/patient/dashboard')
        return
      }

      setError('Invalid email or password')
    } catch (error) {
      console.error('Login error:', error)
      setError('Login failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-600">
            Sign in to your account
          </p>
        </div>

        <Card className="p-8 bg-white shadow-xl rounded-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-12 text-base border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-semibold text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="h-12 text-base border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isAdmin"
                  name="isAdmin"
                  checked={formData.isAdmin}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                />
                <Label htmlFor="isAdmin" className="text-sm text-gray-600">
                  Login as Administrator
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-white"
            >
              Sign In
            </Button>

            <div className="text-center">
              <Link 
                href="/auth/forgot-password" 
                className="text-sm text-primary hover:text-primary/90 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          </form>

          <div className="mt-8 pt-6 text-center text-base text-gray-600 border-t border-gray-100">
            Don't have an account?{' '}
            <Link 
              href="/auth/register" 
              className="font-semibold text-primary hover:text-primary/90 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage 