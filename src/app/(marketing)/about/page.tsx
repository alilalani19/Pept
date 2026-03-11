import { createMetadata } from '@/lib/seo/metadata'
import { FlaskConical, BookOpen, ShieldCheck, Scale } from 'lucide-react'

export const metadata = createMetadata({
  title: 'About Pept',
  description:
    'Learn about Pept, an educational peptide research resource providing evidence-based peptide profiles, vetted suppliers, and AI-powered research assistance.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="animate-element animate-delay-100 mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">About Pept</h1>

      <p className="animate-element animate-delay-200 mb-10 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
        Pept is an educational platform dedicated to providing accurate,
        evidence-based information about peptide research. We aggregate and
        organize scientific literature, clinical findings, and regulatory
        information to help researchers, students, and curious individuals
        navigate the rapidly evolving field of peptide science.
      </p>

      <div className="animate-element animate-delay-300 grid gap-4 sm:grid-cols-2 mb-12">
        {[
          { icon: <FlaskConical className="h-5 w-5 text-sky-500" />, title: 'Evidence-Based', desc: 'Every claim is tagged with its level of scientific evidence.' },
          { icon: <BookOpen className="h-5 w-5 text-sky-500" />, title: 'Research Library', desc: 'Detailed peptide profiles covering mechanisms, history, and status.' },
          { icon: <ShieldCheck className="h-5 w-5 text-sky-500" />, title: 'Vetted Suppliers', desc: 'Suppliers evaluated on third-party testing and transparency.' },
          { icon: <Scale className="h-5 w-5 text-sky-500" />, title: 'Regulatory Clarity', desc: 'Clear legal status information across jurisdictions.' },
        ].map((item) => (
          <div key={item.title} className="relative group/feature rounded-xl border border-slate-300 dark:border-neutral-800 p-5 overflow-hidden">
            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            <div className="absolute left-0 top-5 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-sky-500 transition-all duration-200 origin-center" />
            <div className="relative z-10 flex items-start gap-3">
              <div className="mt-0.5">{item.icon}</div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="animate-element animate-delay-400 mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Our Mission</h2>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
          Our mission is to make peptide research accessible and understandable.
          The scientific literature surrounding peptides is vast, fragmented, and
          often difficult to interpret without specialized training. Pept bridges
          this gap by presenting research findings in a clear, organized format
          while always maintaining scientific rigor and transparency about the
          level of evidence behind each claim.
        </p>
        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
          We believe that access to well-organized, accurately presented
          scientific information empowers better decision-making and promotes a
          more informed public discourse around peptide research and its
          potential applications.
        </p>
      </section>

      <section className="animate-element animate-delay-500 mb-10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Our Commitment to Accuracy</h2>
        <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-400">
          Scientific accuracy is the foundation of everything we do. Our content
          is reviewed for factual correctness and updated as new research
          emerges. We cite primary sources wherever possible and clearly
          distinguish between established findings and preliminary research.
        </p>
        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
          When evidence is limited, conflicting, or inconclusive, we say so
          explicitly. We do not overstate findings or make claims that go beyond
          what the available data supports. Our evidence-level indicators provide
          at-a-glance transparency about the quality and quantity of research
          behind every piece of information on the platform.
        </p>
      </section>

      <section className="animate-element animate-delay-600 mb-10 rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/30 dark:bg-amber-900/10">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-amber-800 dark:text-amber-200">Important Notice</h2>
        <p className="mb-4 leading-relaxed text-amber-700 dark:text-amber-300">
          Pept is strictly an educational and informational resource. The
          information provided on this platform does not constitute medical
          advice, diagnosis, or treatment recommendations. We do not promote or
          encourage the use of any substance for human consumption or
          self-administration.
        </p>
        <p className="mb-4 leading-relaxed text-amber-700 dark:text-amber-300">
          Always consult with a qualified healthcare professional before making
          any health-related decisions. The research information presented here
          is intended to inform and educate, not to replace professional medical
          guidance.
        </p>
        <p className="leading-relaxed text-amber-700 dark:text-amber-300">
          Many peptides discussed on this platform are available for research
          purposes only and may not be approved for human use by regulatory
          authorities such as the FDA. It is your responsibility to understand
          and comply with all applicable laws and regulations in your
          jurisdiction.
        </p>
      </section>

      <p className="text-sm text-slate-500 dark:text-slate-500">
        Last updated: February 9, 2025
      </p>
    </div>
  )
}
