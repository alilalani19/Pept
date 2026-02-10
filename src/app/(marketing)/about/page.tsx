import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'About Pept',
  description:
    'Learn about Pept, an educational peptide research resource providing evidence-based peptide profiles, vetted suppliers, and AI-powered research assistance.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">About Pept</h1>

      <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
        Pept is an educational platform dedicated to providing accurate,
        evidence-based information about peptide research. We aggregate and
        organize scientific literature, clinical findings, and regulatory
        information to help researchers, students, and curious individuals
        navigate the rapidly evolving field of peptide science.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          Our Mission
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          Our mission is to make peptide research accessible and understandable.
          The scientific literature surrounding peptides is vast, fragmented, and
          often difficult to interpret without specialized training. Pept bridges
          this gap by presenting research findings in a clear, organized format
          while always maintaining scientific rigor and transparency about the
          level of evidence behind each claim.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          We believe that access to well-organized, accurately presented
          scientific information empowers better decision-making and promotes a
          more informed public discourse around peptide research and its
          potential applications.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          What We Do
        </h2>
        <ul className="mb-4 list-disc space-y-3 pl-6 text-muted-foreground">
          <li className="leading-relaxed">
            <strong className="text-foreground">Peptide Profiles:</strong> We
            maintain detailed profiles for a wide range of peptides, covering
            their mechanisms of action, research history, evidence levels, and
            regulatory status across jurisdictions.
          </li>
          <li className="leading-relaxed">
            <strong className="text-foreground">Evidence Classification:</strong>{' '}
            Every claim on our platform is tagged with its level of scientific
            evidence, from in-vitro studies through full clinical trials, so you
            always know the strength of the data behind the information.
          </li>
          <li className="leading-relaxed">
            <strong className="text-foreground">Supplier Directory:</strong> We
            provide a vetted directory of peptide research suppliers, evaluated
            on criteria such as third-party testing, transparency, and
            reputation within the research community.
          </li>
          <li className="leading-relaxed">
            <strong className="text-foreground">AI Research Assistant:</strong>{' '}
            Our AI-powered assistant helps you explore peptide research by
            answering questions grounded in the scientific literature and our
            curated database.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          Our Commitment to Accuracy
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          Scientific accuracy is the foundation of everything we do. Our content
          is reviewed for factual correctness and updated as new research
          emerges. We cite primary sources wherever possible and clearly
          distinguish between established findings and preliminary research.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          When evidence is limited, conflicting, or inconclusive, we say so
          explicitly. We do not overstate findings or make claims that go beyond
          what the available data supports. Our evidence-level indicators provide
          at-a-glance transparency about the quality and quantity of research
          behind every piece of information on the platform.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          Important Notice
        </h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          Pept is strictly an educational and informational resource. The
          information provided on this platform does not constitute medical
          advice, diagnosis, or treatment recommendations. We do not promote or
          encourage the use of any substance for human consumption or
          self-administration.
        </p>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          Always consult with a qualified healthcare professional before making
          any health-related decisions. The research information presented here
          is intended to inform and educate, not to replace professional medical
          guidance.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Many peptides discussed on this platform are available for research
          purposes only and may not be approved for human use by regulatory
          authorities such as the FDA. It is your responsibility to understand
          and comply with all applicable laws and regulations in your
          jurisdiction.
        </p>
      </section>

      <p className="text-sm text-muted-foreground">
        Last updated: February 9, 2025
      </p>
    </div>
  )
}
