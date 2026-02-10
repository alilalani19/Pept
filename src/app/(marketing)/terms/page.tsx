import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Terms of Service',
  description:
    'Terms of Service for Pept. Read the terms and conditions governing your use of the Pept platform.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">
        Terms of Service
      </h1>

      <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
        These Terms of Service (&quot;Terms&quot;) govern your access to and use
        of the Pept website and platform (the &quot;Service&quot;). Please read
        these Terms carefully before using the Service.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          1. Acceptance of Terms
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          By accessing or using the Service, you agree to be bound by these
          Terms and our Privacy Policy. If you do not agree to these Terms, you
          must not access or use the Service.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          We reserve the right to update or modify these Terms at any time
          without prior notice. Your continued use of the Service after any such
          changes constitutes your acceptance of the new Terms. It is your
          responsibility to review these Terms periodically for updates.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          2. Use of Service
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          You agree to use the Service only for lawful purposes and in
          accordance with these Terms. You agree not to use the Service in any
          way that violates any applicable federal, state, local, or
          international law or regulation.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          You further agree not to: attempt to gain unauthorized access to any
          portion of the Service; use the Service to transmit any harmful,
          offensive, or illegal content; interfere with or disrupt the Service or
          servers or networks connected to the Service; scrape, crawl, or use
          automated means to access the Service without our express written
          permission; or impersonate any person or entity or misrepresent your
          affiliation with any person or entity.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          3. User Accounts
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          Some features of the Service may require you to create an account. You
          are responsible for maintaining the confidentiality of your account
          credentials and for all activities that occur under your account. You
          agree to notify us immediately of any unauthorized use of your account.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          We reserve the right to suspend or terminate your account at our sole
          discretion, without notice, for conduct that we determine violates
          these Terms, is harmful to other users, or is otherwise objectionable.
          You may delete your account at any time by contacting us or using the
          account settings functionality, if available.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          4. AI Assistant
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          The Service includes an AI-powered research assistant designed to help
          users explore peptide research information. The AI assistant generates
          responses based on available research data and our curated database.
          Responses are provided for educational purposes only and should not be
          treated as professional, medical, or legal advice.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          While we strive for accuracy, AI-generated responses may contain
          errors, omissions, or outdated information. You acknowledge that you
          use the AI assistant at your own risk and that Pept is not liable for
          any decisions or actions taken based on AI-generated content. Use of
          the AI assistant is subject to rate limits and fair usage policies as
          determined by Pept.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          5. Affiliate Links
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          The Service may contain affiliate links to third-party products and
          services, including peptide research suppliers. When you click on an
          affiliate link and make a purchase, we may receive a commission at no
          additional cost to you.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          The inclusion of affiliate links does not influence our editorial
          content, supplier evaluations, or research information. We are
          committed to maintaining editorial independence regardless of any
          affiliate relationships. Third-party products and services are not
          endorsed by Pept, and we are not responsible for the quality, safety,
          or legality of any third-party offerings.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          6. Intellectual Property
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          The Service and its original content, features, and functionality are
          owned by Pept and are protected by international copyright, trademark,
          patent, trade secret, and other intellectual property or proprietary
          rights laws.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          You may not reproduce, distribute, modify, create derivative works of,
          publicly display, publicly perform, republish, download, store, or
          transmit any of the material on our Service without our prior written
          consent, except as permitted by applicable law. You may print or
          download pages from the Service for your own personal, non-commercial,
          educational use, provided you do not modify the content and retain all
          copyright and proprietary notices.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          7. Disclaimer of Warranties
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          The Service is provided on an &quot;as is&quot; and &quot;as
          available&quot; basis, without any warranties of any kind, either
          express or implied, including but not limited to implied warranties of
          merchantability, fitness for a particular purpose, non-infringement, or
          course of performance.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Pept does not warrant that the Service will function uninterrupted,
          secure, or available at any particular time or location; that any
          errors or defects will be corrected; that the Service is free of
          viruses or other harmful components; or that the results of using the
          Service will meet your requirements. The information provided on the
          Service, including peptide research data, is for educational purposes
          and may contain inaccuracies or errors.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          8. Limitation of Liability
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          In no event shall Pept, its directors, employees, partners, agents,
          suppliers, or affiliates be liable for any indirect, incidental,
          special, consequential, or punitive damages, including without
          limitation, loss of profits, data, use, goodwill, or other intangible
          losses, resulting from: your access to or use of or inability to
          access or use the Service; any conduct or content of any third party on
          the Service; any content obtained from the Service; unauthorized
          access, use, or alteration of your transmissions or content; or any
          decisions or actions taken based on information provided through the
          Service, including but not limited to health-related decisions. This
          limitation applies whether the alleged liability is based on warranty,
          contract, tort, negligence, strict liability, or any other legal
          theory, even if Pept has been advised of the possibility of such
          damage.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          9. Governing Law
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          These Terms shall be governed and construed in accordance with the laws
          of the United States, without regard to its conflict of law provisions.
          Any disputes arising out of or relating to these Terms or the Service
          shall be resolved exclusively in the federal or state courts located
          within the United States. You consent to the personal jurisdiction of
          and venue in such courts and waive any objection as to inconvenient
          forum.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          10. Changes to Terms
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. If a revision is material, we will make
          reasonable efforts to provide at least 30 days&apos; notice prior to
          any new terms taking effect. What constitutes a material change will be
          determined at our sole discretion.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          By continuing to access or use our Service after those revisions become
          effective, you agree to be bound by the revised Terms. If you do not
          agree to the new Terms, in whole or in part, please stop using the
          Service.
        </p>
      </section>

      <p className="text-sm text-muted-foreground">
        Last updated: February 9, 2025
      </p>
    </div>
  )
}
