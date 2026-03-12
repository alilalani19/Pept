import { auth } from '@/lib/auth'
import { SendEmailForm } from '@/components/admin/send-email-form'

export default async function SendEmailPage() {
  const session = await auth()
  const fullName = session?.user?.name || 'Pept'
  const fromEmail = 'team@pept.me'

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Send Email</h1>
      <SendEmailForm senderName={fullName} fromEmail={fromEmail} />
    </div>
  )
}
