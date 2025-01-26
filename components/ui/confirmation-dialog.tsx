'use client'

import { CheckCircle2, X } from 'lucide-react'
import { Button } from './button'

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  email?: string
  details?: {
    label: string
    value: string
  }[]
  type?: 'registration' | 'appointment'
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  title,
  message,
  email,
  details,
  type = 'appointment'
}: ConfirmationDialogProps) {
  if (!isOpen) return null

  if (type === 'registration') {
    return (
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%]">
          <div className="bg-background border-2 border-border/60 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-primary/5 p-8 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-card-foreground text-center">{title}</h2>
            </div>
            <div className="p-6">
              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
                <p className="text-sm text-center text-muted-foreground">
                  A confirmation email has been sent to<br />
                  <span className="font-medium text-card-foreground">{email}</span>
                </p>
              </div>
              <Button 
                onClick={onClose}
                className="w-full h-11 text-base font-medium"
              >
                Continue to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%]">
        <div className="bg-background border-2 border-border/60 rounded-xl shadow-lg">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-emerald-500/10">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <h2 className="text-xl font-semibold text-card-foreground">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="mt-6">
              {/* Email Confirmation */}
              {email && (
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground">
                    A confirmation has been sent to <span className="font-medium text-card-foreground">{email}</span>
                  </p>
                </div>
              )}
              
              {/* Details Grid */}
              {details && details.length > 0 && (
                <div className="mt-6 grid gap-4 pt-4 border-t border-border/60">
                  {details.map((detail, index) => (
                    <div key={index} className="flex items-start justify-between gap-4">
                      <p className="text-sm font-medium text-card-foreground">{detail.label}</p>
                      <p className="text-sm text-muted-foreground text-right">{detail.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 