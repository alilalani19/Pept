const BLOCKED_PATTERNS: { pattern: RegExp; reason: string }[] = [
  // Synthesis / manufacturing at home
  {
    pattern: /\bsynthesize at home\b/i,
    reason:
      'I cannot provide instructions for home synthesis of peptides. This is potentially dangerous and may be illegal.',
  },
  {
    pattern: /\bmake my own\b.*peptide/i,
    reason:
      'I cannot provide instructions for manufacturing peptides at home. This is potentially dangerous and may be illegal.',
  },

  // Self-harm patterns
  {
    pattern: /\bharm myself\b/i,
    reason:
      'I cannot assist with self-harm. If you are in crisis, please contact the 988 Suicide & Crisis Lifeline by calling or texting 988.',
  },
  {
    pattern: /\bsuicid/i,
    reason:
      'If you or someone you know is in crisis, please contact the 988 Suicide & Crisis Lifeline by calling or texting 988.',
  },

  // Illegal activity
  {
    pattern: /\bbypass\s+(?:fda|regulation|law|customs|import)\b/i,
    reason:
      'I cannot assist with bypassing regulations, laws, or import restrictions.',
  },
  {
    pattern: /\bsmuggl/i,
    reason:
      'I cannot assist with smuggling or illegal importation of any substances.',
  },
]

export function validateInput(message: string): { safe: boolean; reason?: string } {
  for (const { pattern, reason } of BLOCKED_PATTERNS) {
    if (pattern.test(message)) {
      return { safe: false, reason }
    }
  }

  return { safe: true }
}

export function sanitizeOutput(text: string): string {
  // Output sanitization is now minimal — we allow dosage mentions
  // in research/literature context. The system prompt handles
  // appropriate framing and disclaimers.
  return text
}
