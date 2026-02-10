import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'flex h-10 w-full appearance-none rounded-lg border bg-white px-3 py-2 pr-8 text-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'dark:bg-gray-900 dark:text-gray-100',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 dark:border-gray-600',
          className
        )}
        {...props}
      >
        {children}
      </select>
    )
  }
)

Select.displayName = 'Select'
