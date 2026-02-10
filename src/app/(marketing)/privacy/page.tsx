import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Pept. Learn how we collect, use, and protect your personal information.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">
        Privacy Policy
      </h1>

      <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
        Your privacy is important to us. This Privacy Policy explains how Pept
        (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses,
        discloses, and safeguards your information when you visit our website and
        use our platform (the &quot;Service&quot;).
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          1. Information We Collect
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          We may collect information about you in a variety of ways. The
          information we may collect via the Service includes:
        </p>
        <ul className="list-disc space-y-3 pl-6 text-muted-foreground">
          <li className="leading-relaxed">
            <strong className="text-foreground">Personal Data:</strong> When you
            create an account, we may collect personally identifiable information
            such as your name and email address. If you sign in using a
            third-party provider (e.g., Google), we receive the profile
            information you authorize that provider to share with us.
          </li>
          <li className="leading-relaxed">
            <strong className="text-foreground">Usage Data:</strong> We
            automatically collect certain information when you access the
            Service, including your IP address, browser type, operating system,
            referring URLs, pages viewed, links clicked, and the date and time of
            your visit.
          </li>
          <li className="leading-relaxed">
            <strong className="text-foreground">AI Interaction Data:</strong>{' '}
            When you use our AI research assistant, we may collect the queries
            you submit and the responses generated. This data is used to improve
            the quality and accuracy of the AI assistant.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          2. How We Use Information
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          We use the information we collect for various purposes, including to:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li className="leading-relaxed">
            Provide, operate, and maintain the Service
          </li>
          <li className="leading-relaxed">
            Create and manage your user account
          </li>
          <li className="leading-relaxed">
            Improve, personalize, and expand the Service
          </li>
          <li className="leading-relaxed">
            Understand and analyze how you use the Service
          </li>
          <li className="leading-relaxed">
            Develop new features, products, and functionality
          </li>
          <li className="leading-relaxed">
            Communicate with you, including for customer service, updates, and
            marketing purposes
          </li>
          <li className="leading-relaxed">
            Detect, prevent, and address technical issues, fraud, or abuse
          </li>
          <li className="leading-relaxed">
            Comply with legal obligations and enforce our Terms of Service
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          3. Cookies
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          We use cookies and similar tracking technologies to track activity on
          our Service and store certain information. Cookies are small data files
          placed on your device. You can instruct your browser to refuse all
          cookies or to indicate when a cookie is being sent. However, if you do
          not accept cookies, you may not be able to use some portions of the
          Service.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          We use the following types of cookies: essential cookies required for
          the Service to function (e.g., authentication), analytics cookies to
          understand how visitors interact with the Service, and preference
          cookies to remember your settings and choices.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          4. Third-Party Services
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          We may employ third-party companies and services to facilitate our
          Service, provide the Service on our behalf, perform Service-related
          tasks, or assist us in analyzing how our Service is used. These third
          parties have access to your personal information only to perform these
          tasks on our behalf and are obligated not to disclose or use it for any
          other purpose.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Our Service may contain links to third-party websites and services,
          including peptide research suppliers. We are not responsible for the
          privacy practices of these third parties. We encourage you to review
          the privacy policies of any third-party sites or services you visit
          through links on our platform.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          5. Data Security
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          We implement appropriate technical and organizational security measures
          to protect your personal information against unauthorized access,
          alteration, disclosure, or destruction. However, no method of
          transmission over the Internet or method of electronic storage is 100%
          secure. While we strive to use commercially acceptable means to protect
          your personal information, we cannot guarantee its absolute security.
          In the event of a data breach that affects your personal information,
          we will notify you in accordance with applicable law.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          6. Your Rights
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          Depending on your location, you may have certain rights regarding your
          personal information, including:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li className="leading-relaxed">
            The right to access the personal information we hold about you
          </li>
          <li className="leading-relaxed">
            The right to request correction of inaccurate personal information
          </li>
          <li className="leading-relaxed">
            The right to request deletion of your personal information
          </li>
          <li className="leading-relaxed">
            The right to object to or restrict the processing of your personal
            information
          </li>
          <li className="leading-relaxed">
            The right to data portability
          </li>
          <li className="leading-relaxed">
            The right to withdraw consent at any time where we rely on consent to
            process your personal information
          </li>
        </ul>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          To exercise any of these rights, please contact us using the contact
          information provided below. We will respond to your request within a
          reasonable timeframe and in accordance with applicable law.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          7. Children&apos;s Privacy
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Our Service is not intended for use by children under the age of 13. We
          do not knowingly collect personally identifiable information from
          children under 13. If you are a parent or guardian and you are aware
          that your child has provided us with personal information, please
          contact us so we can take the necessary steps to remove that
          information from our servers. If we become aware that we have collected
          personal information from a child under the age of 13 without
          verification of parental consent, we will take steps to delete that
          information promptly.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          8. Changes to This Policy
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          We may update this Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page and
          updating the &quot;Last updated&quot; date. You are advised to review
          this Privacy Policy periodically for any changes. Changes to this
          Privacy Policy are effective when they are posted on this page. Your
          continued use of the Service after any modifications to the Privacy
          Policy constitutes your acknowledgment of the modifications and your
          consent to abide by the updated policy.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          9. Contact
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          If you have any questions about this Privacy Policy, your personal
          data, or would like to exercise your privacy rights, please contact us
          at{' '}
          <a
            href="mailto:privacy@pept.com"
            className="text-foreground underline underline-offset-4 hover:text-foreground/80"
          >
            privacy@pept.com
          </a>
          .
        </p>
      </section>

      <p className="text-sm text-muted-foreground">
        Last updated: February 9, 2025
      </p>
    </div>
  )
}
