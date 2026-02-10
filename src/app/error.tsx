'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-red-600">Something went wrong</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-sky-500 px-6 py-3 text-white hover:bg-sky-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}
