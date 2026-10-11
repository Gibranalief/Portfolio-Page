export type ProjectTag =
  | 'All'
  | 'Web App'
  | 'Full-Stack'
  | 'AI/ML'
  | 'Data Science'
  | 'Machine Learning'
  | 'Computer Vision'
  | 'Financial Tech'
  | 'Research'
  | 'Team Project';

export interface Collaborator {
  name: string;
  role?: string;
}

export interface InteractiveFeature {
  title: string;
  description: string;
  route?: string; // Optional route if the interactive feature is a separate page/modal
}

export interface ProjectLink {
  title: string;
  url: string;
  type: 'github' | 'demo' | 'other';
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  tags: ProjectTag[];
  collaborators?: Collaborator[];
  myRole?: string;
  interactiveFeatures: InteractiveFeature[];
  links?: ProjectLink[];
  thumbnailUrl?: string; // Path to mockup/screenshot
}

export const projectsData: Project[] = [
  {
    id: 'the-atelier',
    title: 'The Atelier',
    summary: 'Aplikasi Web Full-Stack / Sistem Tempahan Barbershop',
    description: 'Aplikasi tempahan potong rambut penuh-susunan (full-stack) dengan papan pemuka peranan berbeza.',
    tags: ['Web App', 'Full-Stack', 'Team Project'],
    collaborators: [
      { name: 'Kent Natan Herlambang' },
      { name: 'Criswincent Enrico Geraldy' }
    ],
    interactiveFeatures: [
      {
        title: 'Simulator Aliran Tempahan',
        description: 'Widget UI di mana pengguna boleh menguji simulasi mengunci jadual dan melihat pengiraan harga perkhidmatan secara langsung.'
      },
      {
        title: 'Gambarajah Seni Bina',
        description: 'Rajah animasi (SVG line draw animation) yang menunjukkan aliran data antara Next.js, Prisma, dan PostgreSQL.'
      }
    ],
    links: [
      {
        title: 'GitHub',
        url: '#', // TODO: Update with real link
        type: 'github'
      },
      {
        title: 'Live Demo',
        url: '#', // TODO: Update with real link
        type: 'demo'
      }
    ]
  },
  {
    id: 'sistem-ramalan-kebakaran-hutan',
    title: 'Sistem Ramalan Kebakaran Hutan AI (Kalimantan & Sumatera)',
    summary: 'Sistem ramalan kebakaran hutan menggunakan AI dan data iklim',
    description: 'Sistem komprehensif untuk meramal titik panas dan risiko kebakaran hutan berasaskan parameter geografi dan iklim.',
    tags: ['AI/ML', 'Data Science', 'Team Project'],
    collaborators: [
      { name: 'Kent Natan Herlambang', role: 'Pembangunan Model AI & Prapemprosesan Data' },
      { name: 'Radianda Setiawan', role: 'Frontend, Deployment & Testing' }
    ],
    myRole: 'Menyelaraskan pengumpulan data, perancangan konsep sistem ramalan, serta membangunkan backend (API) menggunakan FastAPI untuk menyalurkan data kepada model AI.',
    interactiveFeatures: [
      {
        title: 'Playground Data Langsung (Live Data Playground)',
        description: 'Paparan log maklumat palsu (mock data) yang mensimulasikan penghantaran parameter iklim ke API FastAPI.'
      },
      {
        title: 'Metrik Prestasi Model',
        description: 'Graf perbandingan model (Random Forest vs. Logistic Regression vs. SVM) menggunakan carta interaktif (seperti Recharts atau Chart.js).'
      }
    ],
    links: [
      {
        title: 'GitHub',
        url: 'https://github.com/chicknug19/kebakaran-hutan-AI.git',
        type: 'github'
      }
    ]
  },
  {
    id: 'ramalan-saham-indonesia',
    title: 'Ramalan Pasaran Saham Indonesia (Model LSTM-GRU vs. Analisis Sentimen)',
    summary: 'Model AI untuk ramalan Indeks LQ45 dengan data hibrid',
    description: 'Penyelidikan dan pembangunan seni bina hibrid (LSTM-GRU) yang menggabungkan data pasaran harga dan markah sentimen teks berita.',
    tags: ['Machine Learning', 'Financial Tech', 'Research'],
    collaborators: [
      { name: 'Kent Natan Herlambang', role: 'Analisis Sentimen Berasaskan IndoBERT & Data Berita' }
    ],
    myRole: 'Mengetuai perancangan sistem gabungan (hybrid LSTM-GRU architecture), integrasi vektor dwi-modaliti (data OHLCV & markah sentimen), dan pengoptimuman hiperparameter menggunakan Bayesian Optimization.',
    interactiveFeatures: [
      {
        title: 'Widget Carta Harga',
        description: 'Widget interaktif yang menunjukkan ramalan saham Indeks LQ45 dengan togol "Hidupkan Analisis Sentimen" (untuk melihat perbezaan ramalan dengan dan tanpa sentimen).'
      },
      {
        title: 'Demonstrasi Ekstraksi Sentimen',
        description: 'Potongan kod ringkas atau simulasi bagaimana teks berita kewangan diproses menjadi pemarkahan.'
      }
    ],
    links: [
      {
        title: 'GitHub',
        url: '#', // TODO: Update with real link
        type: 'github'
      }
    ]
  }
];
