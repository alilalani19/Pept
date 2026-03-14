import 'dotenv/config'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const SUBJECT = 'Supplier Partnership Template — Pept'

const HTML = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; line-height: 1.7; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">

<p style="color: #64748b; font-size: 12px; margin-bottom: 24px;"><em>Template — customize the bracketed fields before sending to each supplier.</em></p>

<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">

<p>Subject: <strong>Partnership Opportunity — Pept Research Platform</strong></p>

<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">

<p>Hi [Supplier Name] team,</p>

<p>My name is Ali, and I'm the founder of <a href="https://pept.me" style="color: #0ea5e9; text-decoration: none; font-weight: 600;">Pept</a> — a peptide research and education platform with an AI-powered assistant that helps users learn about peptides and find trusted research suppliers.</p>

<p>I'm reaching out because I think there's a strong opportunity for us to work together.</p>

<p style="font-weight: 600; font-size: 15px; margin-top: 24px;">What Pept does:</p>
<ul style="padding-left: 20px;">
  <li>AI research assistant that educates users on peptides and recommends vetted suppliers</li>
  <li>Peptide database with detailed research profiles, evidence levels, and safety info</li>
  <li>Supplier directory where users compare and discover research sources</li>
  <li>Growing organic traffic from users actively researching peptides</li>
</ul>

<p style="font-weight: 600; font-size: 15px; margin-top: 24px;">What I'm proposing:</p>
<ul style="padding-left: 20px;">
  <li><strong>Featured listing</strong> on our supplier directory at <a href="https://pept.me/suppliers" style="color: #0ea5e9; text-decoration: none;">pept.me/suppliers</a></li>
  <li><strong>AI-powered recommendations</strong> — when users ask our assistant about peptides you carry, it recommends your products with direct links</li>
  <li><strong>Affiliate partnership</strong> — we drive qualified traffic to your site and earn a commission on referred sales</li>
</ul>

<p>We're currently partnered with Ascension Peptides and Royal Peptides, and we're selectively expanding to a few more trusted suppliers.</p>

<p style="font-weight: 600; font-size: 15px; margin-top: 24px;">What I'd need from you:</p>
<ul style="padding-left: 20px;">
  <li>An affiliate or referral program we can join (or a custom arrangement)</li>
  <li>Confirmation of third-party testing and/or COA availability</li>
  <li>A brief description of your company for the listing</li>
</ul>

<p>You can check out the platform at <a href="https://pept.me" style="color: #0ea5e9; text-decoration: none; font-weight: 600;">pept.me</a> and our AI assistant at <a href="https://pept.me/assistant" style="color: #0ea5e9; text-decoration: none; font-weight: 600;">pept.me/assistant</a> to see what users experience.</p>

<p>Would you be open to a quick conversation about this? Happy to jump on a call or continue over email — whatever works best.</p>

<p style="margin-top: 24px;">Best,<br>
<strong>Ali Lalani</strong><br>
Founder, Pept<br>
<a href="https://pept.me" style="color: #0ea5e9; text-decoration: none;">pept.me</a></p>

</div>
`

async function main() {
  const { error } = await resend.emails.send({
    from: 'Pept <team@pept.me>',
    to: 'alilalani19@gmail.com',
    subject: SUBJECT,
    html: HTML,
  })

  if (error) {
    console.error('Failed to send:', error)
    process.exit(1)
  }

  console.log('Partnership template email sent to alilalani19@gmail.com')
}

main()
