import { prisma } from '@/lib/db'
import { sendEmail, sendBatchEmails } from './client'
import {
  signInAlertEmail,
  newPeptideEmail,
  newsletterEmail,
  welcomeEmail,
} from './templates'

export async function notifySignIn(userId: string, ip: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, emailSignInAlert: true },
    })

    if (!user?.email || !user.emailSignInAlert) return

    const date = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    await sendEmail(
      user.email,
      'New sign-in to your Pept account',
      signInAlertEmail(user.name || '', date, ip)
    )
  } catch (error) {
    console.error('Sign-in notification error:', error)
  }
}

export async function notifyNewPeptide(
  peptideName: string,
  peptideSlug: string
) {
  try {
    const users = await prisma.user.findMany({
      where: { emailNewPeptide: true, email: { not: null } },
      select: { name: true, email: true },
    })

    if (users.length === 0) return

    // Send individually so each user sees their name
    for (const user of users) {
      if (!user.email) continue
      sendEmail(
        user.email,
        `New peptide on Pept: ${peptideName}`,
        newPeptideEmail(user.name || '', peptideName, peptideSlug)
      ).catch((err) => console.error('New peptide email error:', err))
    }
  } catch (error) {
    console.error('New peptide notification error:', error)
  }
}

export async function sendNewsletterToAll(subject: string, bodyHtml: string) {
  try {
    const [users, subscribers] = await Promise.all([
      prisma.user.findMany({
        where: { emailNewsletter: true, email: { not: null } },
        select: { email: true },
      }),
      prisma.newsletterSubscriber.findMany({
        where: { active: true },
        select: { email: true },
      }),
    ])

    const allEmails = new Set<string>()
    for (const u of users) {
      if (u.email) allEmails.add(u.email)
    }
    for (const s of subscribers) {
      allEmails.add(s.email)
    }

    const recipients = Array.from(allEmails)
    if (recipients.length === 0) return 0

    const html = newsletterEmail(subject, bodyHtml)
    await sendBatchEmails(recipients, subject, html)

    return recipients.length
  } catch (error) {
    console.error('Newsletter send error:', error)
    throw error
  }
}

export async function sendNewsletterToEmails(
  emails: string[],
  subject: string,
  bodyHtml: string
) {
  try {
    if (emails.length === 0) return 0

    const html = newsletterEmail(subject, bodyHtml)
    await sendBatchEmails(emails, subject, html)

    return emails.length
  } catch (error) {
    console.error('Newsletter send error:', error)
    throw error
  }
}

export async function sendWelcome(name: string, email: string) {
  try {
    await sendEmail(email, 'Welcome to Pept!', welcomeEmail(name))
  } catch (error) {
    console.error('Welcome email error:', error)
  }
}
