'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface BentoGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  header?: React.ReactNode
  className?: string
  children: React.ReactNode
}

const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 w-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
BentoGrid.displayName = "BentoGrid"

const BentoGridItem = React.forwardRef<HTMLDivElement, BentoGridItemProps>(
  ({ className, title, description, header, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-lg bg-card border border-border/40 shadow-sm",
          "hover:shadow-md hover:border-border/80 transition-all duration-200",
          "dark:shadow-none dark:border-border/20 dark:hover:border-border/40",
          "p-4 flex flex-col",
          className
        )}
        {...props}
      >
        {header}
        <div className="space-y-2">
          {title && (
            <div className="text-sm font-medium text-card-foreground tracking-tight">
              {title}
            </div>
          )}
          {description && (
            <div className="text-xs text-muted-foreground leading-normal">
              {description}
            </div>
          )}
        </div>
        <div className="flex-1 min-h-0">
          {children}
        </div>
      </div>
    )
  }
)
BentoGridItem.displayName = "BentoGridItem"

export { BentoGrid, BentoGridItem } 