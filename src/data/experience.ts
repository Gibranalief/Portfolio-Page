export type ExperienceTab = 'Work' | 'Education' | 'Research & Certs';

export interface ExperienceItem {
  id: string;
  tab: ExperienceTab;
  title: string;
  organization: string;
  period: string;
  points?: string[];
  highlights?: string[]; // Short stat pills shown under the description
  badge?: string; // e.g. "Current"
}

export const experienceTabs: ExperienceTab[] = ['Work', 'Education', 'Research & Certs'];

export const experienceData: ExperienceItem[] = [
  // Work
  {
    id: 'ren-ai',
    tab: 'Work',
    title: 'Chinese Teacher (Part-time)',
    organization: 'Ren Ai Mandarin Learning Centre',
    period: 'Jul 2026 – Present',
    badge: 'Current',
    points: ['Teach Mandarin as a part-time Chinese teacher at the learning centre.'],
  },
  {
    id: 'sasc-mentor',
    tab: 'Work',
    title: 'SASC Scholarship Mentor',
    organization: 'BINUS University',
    period: 'Jan 2026 – Jul 2026',
    points: [
      'Mentored undergraduate Computer Science students through the BINUS SASC mentoring program.',
      'Helped mentees improve and monitor their academic performance through guided practice, concept reviews, and personalized support.',
    ],
  },
  {
    id: 'freshmen-partner',
    tab: 'Work',
    title: 'Freshmen Partner',
    organization: 'BINUS University',
    period: 'Sep 2025 – Jul 2026',
    points: ['Guided first-year BINUS students throughout their transition into university life.'],
  },

  // Education
  {
    id: 'binus',
    tab: 'Education',
    title: 'Bachelor of Computer Science',
    organization: 'Bina Nusantara University (BINUS), Alam Sutera',
    period: 'Sep 2024 – Present',
    badge: 'Current',
    points: ['Specialization: Intelligent Systems (5th semester).'],
  },
  {
    id: 'pahoa',
    tab: 'Education',
    title: 'Sekolah Terpadu Pahoa',
    organization: 'School education',
    period: 'Jul 2009 – May 2024',
  },

  // Research & Certs
  {
    id: 'lq45-paper',
    tab: 'Research & Certs',
    title: 'LQ45 Stock Forecasting with Hybrid LSTM-GRU and IndoBERT',
    organization: 'Research paper · Submitted to ICORIS 2026 · First author',
    period: '2026',
    points: [
      'Proposed a hybrid forecasting model for the LQ45 index combining daily OHLCV data (Jan 2020 – Dec 2023) with sentiment scores from a fine-tuned IndoBERT classifier on Indonesian financial news.',
      'Hyperparameters tuned with Bayesian Optimization.',
    ],
    highlights: ['MAPE 25.03% → 13.48%', 'RMSE 0.0131', 'MAE 0.0093', 'IndoBERT F1 0.86'],
  },
  {
    id: 'toefl',
    tab: 'Research & Certs',
    title: 'TOEFL ITP',
    organization: 'TOEFL',
    period: 'Nov 2025',
  },
  {
    id: 'ai-900',
    tab: 'Research & Certs',
    title: 'Microsoft AI-900T00-A: Learning AI from the Basics',
    organization: 'Microsoft',
    period: 'Mar 2026',
  },
];
