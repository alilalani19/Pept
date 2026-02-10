import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_FROM = process.env.EMAIL_FROM || 'notis@pept.me'

export async function sendEmail(to: string, subject: string, html: string) {
  const { error } = await resend.emails.send({
    from: `Pept <${EMAIL_FROM}>`,
    to,
    subject,
    html,
  })

  if (error) {
    console.error('Email send error:', error)
    throw error
  }
}

export async function sendBatchEmails(
  recipients: string[],
  subject: string,
  html: string
) {
  if (recipients.length === 0) return

  // Resend batch API supports up to 100 emails per call
  const batches: string[][] = []
  for (let i = 0; i < recipients.length; i += 100) {
    batches.push(recipients.slice(i, i + 100))
  }

  for (const batch of batches) {
    const { error } = await resend.batch.send(
      batch.map((to) => ({
        from: `Pept <${EMAIL_FROM}>`,
        to,
        subject,
        html,
      }))
    )

    if (error) {
      console.error('Batch email error:', error)
    }
  }
}
