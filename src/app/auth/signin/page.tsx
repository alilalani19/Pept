'use client'

import { signIn } from 'next-auth/react'
import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { SignInPage as SignInPageUI } from '@/components/ui/sign-in'

function SignInForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const error = searchParams.get('error')
  const [loading, setLoading] = useState(false)

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      callbackUrl,
    })
    setLoading(false)
  }

  return (
    <SignInPageUI
      title={<span className="font-light tracking-tighter">Sign in to <span className="font-semibold">Pept</span></span>}
      description="Access the AI assistant, peptide profiles, and your saved research"
      heroImageSrc="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=2160&q=80"
      error={error}
      loading={loading}
      onSignIn={handleSignIn}
      onGoogleSignIn={() => signIn('google', { callbackUrl })}
      onGitHubSignIn={() => signIn('github', { callbackUrl })}
      onCreateAccount={() => router.push('/auth/signup')}
    />
  )
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-950">
          <div className="w-full max-w-md animate-pulse space-y-4 p-8">
            <div className="mx-auto h-10 w-48 rounded-xl bg-slate-200 dark:bg-slate-700" />
            <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-700" />
            <div className="h-12 rounded-xl bg-slate-200 dark:bg-slate-700" />
            <div className="h-12 rounded-xl bg-sky-200 dark:bg-sky-900" />
          </div>
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  )
}
