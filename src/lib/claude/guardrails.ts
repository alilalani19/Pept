const BLOCKED_PATTERNS: { pattern: RegExp; reason: string }[] = [
  // Medical advice patterns
  {
    pattern: /\bprescribe\b/i,
    reason:
      'I cannot provide prescription advice. Please consult a licensed healthcare professional.',
  },
  {
    pattern: /\bdiagnose\b/i,
    reason: 'I cannot provide diagnoses. Please consult a licensed healthcare professional.',
  },
  {
    pattern: /\btreat my\b/i,
    reason:
      'I cannot recommend treatments for personal conditions. Please consult a licensed healthcare professional.',
  },
  {
    pattern: /\bcure my\b/i,
    reason:
      'I cannot recommend cures for personal conditions. Please consult a licensed healthcare professional.',
  },

  // Dosing patterns
  {
    pattern: /\bhow much should I take\b/i,
    reason:
      'I cannot recommend personal dosages. Dosing must be determined by a qualified healthcare provider.',
  },
  {
    pattern: /\bdosage for me\b/i,
    reason:
      'I cannot recommend personal dosages. Dosing must be determined by a qualified healthcare provider.',
  },
  {
    pattern: /\binject myself\b/i,
    reason:
      'I cannot provide self-administration guidance. Please consult a healthcare professional for proper protocols.',
  },

  // Purchase patterns
  {
    pattern: /\bwhere to buy\b/i,
    reason:
      'I cannot recommend where to purchase peptides. This falls outside my educational scope.',
  },
  {
    pattern: /\bcheapest\b/i,
    reason: 'I cannot provide purchasing or pricing advice. This falls outside my educational scope.',
  },
  {
    pattern: /\bdiscount code\b/i,
    reason:
      'I cannot provide discount codes or purchasing advice. This falls outside my educational scope.',
  },

  // Harmful patterns
  {
    pattern: /\bsynthesize at home\b/i,
    reason:
      'I cannot provide instructions for home synthesis of peptides. This is potentially dangerous and may be illegal.',
  },
  {
    pattern: /\bmake my own\b/i,
    reason:
      'I cannot provide instructions for manufacturing peptides. This is potentially dangerous and may be illegal.',
  },
  {
    pattern: /\bbypass\b/i,
    reason:
      'I cannot assist with bypassing regulations, safety measures, or restrictions.',
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

const DOSAGE_PATTERN =
  /\b(?:take|inject|administer|use|dose)\s+\d+\s*(?:mcg|mg|ug|μg|ml|mL|cc|iu|IU|units)\b/gi

export function sanitizeOutput(text: string): string {
  return text.replace(
    DOSAGE_PATTERN,
    '[dosage information removed - consult a healthcare professional]'
  )
}
