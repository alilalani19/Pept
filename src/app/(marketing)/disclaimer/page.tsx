import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Medical Disclaimer',
  description:
    'Medical disclaimer for Pept. This platform is for educational and research purposes only and does not provide medical advice.',
  path: '/disclaimer',
})

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">
        Medical Disclaimer
      </h1>

      <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
        Please read this disclaimer carefully before using the Pept platform.
        Your access to and use of this website is conditioned on your acceptance
        of and compliance with this disclaimer.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          General Disclaimer
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          The information provided on Pept (the &quot;Platform&quot;) is for
          general informational and educational purposes only. All information on
          the Platform is provided in good faith based on available scientific
          literature and research data. However, we make no representation or
          warranty of any kind, express or implied, regarding the accuracy,
          adequacy, validity, reliability, availability, or completeness of any
          information on the Platform.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          Not Medical Advice
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          The information contained on this Platform is not intended to be a
          substitute for professional medical advice, diagnosis, or treatment.
          Always seek the advice of your physician or other qualified healthcare
          provider with any questions you may have regarding a medical condition
          or treatment and before undertaking a new healthcare regimen.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Never disregard professional medical advice or delay in seeking it
          because of something you have read on this Platform. If you think you
          may have a medical emergency, call your doctor, go to the emergency
          department, or call emergency services immediately.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          Educational Purpose Only
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Pept is designed exclusively as an educational resource for
          understanding peptide research. The content presented, including
          peptide profiles, research summaries, mechanism descriptions, and
          evidence classifications, is intended to help users understand the
          current state of scientific research. This information should not be
          interpreted as an endorsement, recommendation, or encouragement to use
          any peptide or substance for any purpose, including but not limited to
          self-administration, performance enhancement, or treatment of any
          medical condition.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          No Doctor-Patient Relationship
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use of this Platform, including interaction with our AI research
          assistant, does not create a doctor-patient relationship between you
          and Pept or any of its contributors, employees, or affiliates. The
          Platform does not offer personalized medical advice or diagnosis.
          Responses provided by our AI assistant are generated based on
          publicly available research data and should not be treated as
          individualized medical guidance.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          Research Information
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          The research information presented on this Platform reflects the state
          of scientific knowledge at the time of writing or last update.
          Scientific understanding evolves continuously, and information that is
          current today may be revised or superseded by new findings. We make
          reasonable efforts to keep content up to date, but we cannot guarantee
          that all information reflects the very latest research developments.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Evidence levels assigned to research findings on this Platform
          represent our assessment of the available data and may differ from
          assessments made by other organizations or researchers. Users should
          consult primary sources and qualified professionals when making
          decisions based on research information.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          Regulatory Status
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          Many peptides discussed on this Platform are classified as research
          chemicals and are not approved by the U.S. Food and Drug
          Administration (FDA) or equivalent regulatory bodies in other
          jurisdictions for human use, consumption, or therapeutic application.
          Regulatory status varies by jurisdiction and is subject to change.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Information about regulatory status provided on this Platform is for
          informational purposes only and should not be relied upon as legal
          advice. It is your sole responsibility to understand and comply with
          all applicable laws and regulations in your jurisdiction regarding the
          purchase, possession, and use of any substance discussed on this
          Platform.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          Limitation of Liability
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Under no circumstance shall Pept, its owners, contributors, employees,
          or affiliates be liable for any direct, indirect, incidental,
          consequential, special, or exemplary damages arising out of or in
          connection with your use of the Platform or reliance on any information
          provided herein. This includes, without limitation, any damages
          resulting from the use or misuse of any substance discussed on this
          Platform, decisions made based on information found on this Platform,
          or any errors or omissions in the content provided.
        </p>
      </section>

      <p className="text-sm text-muted-foreground">
        Last updated: February 9, 2025
      </p>
    </div>
  )
}
