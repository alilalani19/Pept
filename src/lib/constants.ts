export const SITE_NAME = 'Pept'
export const SITE_DESCRIPTION = 'Your trusted educational resource for peptide research. Explore evidence-based peptide profiles, vetted suppliers, and AI-powered research assistance.'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pept.me'

export const EVIDENCE_LEVELS = {
  IN_VITRO: { label: 'In Vitro', bars: 1, color: 'text-gray-500' },
  ANIMAL: { label: 'Animal Studies', bars: 2, color: 'text-orange-500' },
  LIMITED_HUMAN: { label: 'Limited Human Data', bars: 3, color: 'text-yellow-500' },
  CLINICAL: { label: 'Clinical Trials', bars: 4, color: 'text-green-500' },
  MIXED: { label: 'Mixed Evidence', bars: 2, color: 'text-blue-500' },
} as const

export const LEGAL_STATUS_COLORS = {
  RESEARCH_ONLY: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', label: 'Research Only' },
  PRESCRIPTION: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', label: 'Prescription' },
  REGULATED: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300', label: 'Regulated' },
  BANNED_SPORT: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', label: 'Banned in Sport' },
  UNREGULATED: { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-300', label: 'Unregulated' },
} as const

export const RATE_LIMIT = {
  CHAT_MESSAGES_PER_HOUR: 30,
} as const

export const DISCLAIMER_TEXT = 'This platform is for educational and research purposes only. The information provided does not constitute medical advice, diagnosis, or treatment recommendations. Always consult a qualified healthcare professional before making any health-related decisions.'
