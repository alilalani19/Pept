import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm transition-colors',
          'placeholder:text-slate-500',
          'focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-slate-300 dark:border-slate-600',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
