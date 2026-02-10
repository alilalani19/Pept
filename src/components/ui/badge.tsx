import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'info'
}

const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  secondary: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  outline: 'border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-transparent',
  destructive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
}
