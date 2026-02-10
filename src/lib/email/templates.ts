const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pept.me'

function layout(content: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px;">
    <div style="background:#fff;border-radius:12px;border:1px solid #e2e8f0;padding:32px;">
      <div style="margin-bottom:24px;">
        <strong style="font-size:18px;color:#0ea5e9;">Pept</strong>
      </div>
      ${content}
    </div>
    <div style="text-align:center;margin-top:24px;">
      <p style="font-size:12px;color:#94a3b8;">
        You received this because you have an account on Pept.<br>
        <a href="${SITE_URL}/account/settings" style="color:#0ea5e9;">Manage notification preferences</a>
      </p>
    </div>
  </div>
</body>
</html>`
}

export function signInAlertEmail(name: string, date: string, ip: string) {
  return layout(`
    <h2 style="margin:0 0 16px;font-size:20px;color:#0f172a;">Sign-in Alert</h2>
    <p style="color:#334155;line-height:1.6;">
      Hey ${name || 'there'}, someone just signed into your Pept account.
    </p>
    <div style="background:#f8fafc;border-radius:8px;padding:16px;margin:16px 0;">
      <p style="margin:0;font-size:14px;color:#475569;">
        <strong>Date:</strong> ${date}<br>
        <strong>IP Address:</strong> ${ip}
      </p>
    </div>
    <p style="color:#334155;line-height:1.6;">
      If this was you, no action is needed. If you don't recognize this activity,
      please change your password immediately.
    </p>
  `)
}

export function newPeptideEmail(
  name: string,
  peptideName: string,
  peptideSlug: string
) {
  return layout(`
    <h2 style="margin:0 0 16px;font-size:20px;color:#0f172a;">New Peptide Listed</h2>
    <p style="color:#334155;line-height:1.6;">
      Hey ${name || 'there'}, a new peptide just dropped on Pept:
    </p>
    <div style="background:#f0f9ff;border-radius:8px;padding:16px;margin:16px 0;border:1px solid #bae6fd;">
      <p style="margin:0;font-size:16px;font-weight:600;color:#0369a1;">
        ${peptideName}
      </p>
    </div>
    <a href="${SITE_URL}/peptides/${peptideSlug}"
       style="display:inline-block;background:#0ea5e9;color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:500;">
      View Peptide
    </a>
  `)
}

export function newsletterEmail(subject: string, bodyHtml: string) {
  return layout(`
    <h2 style="margin:0 0 16px;font-size:20px;color:#0f172a;">${subject}</h2>
    <div style="color:#334155;line-height:1.6;">
      ${bodyHtml}
    </div>
  `)
}

export function welcomeEmail(name: string) {
  return layout(`
    <h2 style="margin:0 0 16px;font-size:20px;color:#0f172a;">Welcome to Pept!</h2>
    <p style="color:#334155;line-height:1.6;">
      Hey ${name || 'there'}, welcome aboard! Here's what you can do on Pept:
    </p>
    <ul style="color:#334155;line-height:1.8;padding-left:20px;">
      <li>Browse our peptide research library</li>
      <li>Save your favorite peptides</li>
      <li>Chat with our AI research assistant</li>
      <li>Compare verified suppliers</li>
    </ul>
    <a href="${SITE_URL}/peptides"
       style="display:inline-block;background:#0ea5e9;color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:500;">
      Explore Peptides
    </a>
  `)
}
