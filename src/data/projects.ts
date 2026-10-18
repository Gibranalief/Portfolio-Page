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
  | 'Automation'
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
    summary: 'Full-Stack Web App / Barbershop Booking System',
    description: 'A full-stack haircut booking application with role-based dashboards.',
    tags: ['Web App', 'Full-Stack', 'Team Project'],
    collaborators: [
      { name: 'Kent Natan Herlambang' },
      { name: 'Criswincent Enrico Geraldy' }
    ],
    interactiveFeatures: [
      {
        title: 'Booking Flow Simulator',
        description: 'A UI widget where users can try out simulated schedule locking and see service price calculations live.'
      },
      {
        title: 'Architecture Diagram',
        description: 'An animated SVG line-draw diagram showing the data flow between Next.js, Prisma, and PostgreSQL.'
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
    title: 'AI Forest Fire Prediction System (Kalimantan & Sumatra)',
    summary: 'Forest fire prediction system using AI and climate data',
    description: 'A comprehensive system for predicting hotspots and forest fire risk based on geographic and climate parameters.',
    tags: ['AI/ML', 'Data Science', 'Team Project'],
    collaborators: [
      { name: 'Kent Natan Herlambang', role: 'AI Model Development & Data Preprocessing' },
      { name: 'Radianda Setiawan', role: 'Frontend, Deployment & Testing' }
    ],
    myRole: 'Coordinated data collection, designed the prediction system concept, and built the FastAPI backend (API) that feeds data to the AI model.',
    interactiveFeatures: [
      {
        title: 'Live Data Playground',
        description: 'A mock data log view that simulates sending climate parameters to the FastAPI API.'
      },
      {
        title: 'Model Performance Metrics',
        description: 'A model comparison chart (Random Forest vs. Logistic Regression vs. SVM) using interactive charts (such as Recharts or Chart.js).'
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
    title: 'Indonesian Stock Market Prediction (LSTM-GRU Model vs. Sentiment Analysis)',
    summary: 'AI model for LQ45 Index prediction using hybrid data',
    description: 'Research and development of a hybrid architecture (LSTM-GRU) that combines market price data with sentiment scores from news text.',
    tags: ['Machine Learning', 'Financial Tech', 'Research'],
    collaborators: [
      { name: 'Kent Natan Herlambang', role: 'IndoBERT-Based Sentiment Analysis & News Data' }
    ],
    myRole: 'Led the design of the hybrid LSTM-GRU architecture, the integration of dual-modality vectors (OHLCV data & sentiment scores), and hyperparameter optimization using Bayesian Optimization.',
    interactiveFeatures: [
      {
        title: 'Price Chart Widget',
        description: 'An interactive widget showing LQ45 Index stock predictions with a "Enable Sentiment Analysis" toggle (to compare predictions with and without sentiment).'
      },
      {
        title: 'Sentiment Extraction Demo',
        description: 'A short code snippet or simulation of how financial news text is processed into a score.'
      }
    ],
    links: [
      {
        title: 'GitHub',
        url: '#', // TODO: Update with real link
        type: 'github'
      }
    ]
  },
  {
    id: 'mindease',
    title: 'MindEase',
    summary: 'NLP-based mental health chatbot with a FastAPI backend and React frontend',
    description: 'A chatbot application that classifies user messages (depression, anxiety, stress, and suicide risk) using a Logistic Regression model with TF-IDF, then replies with an appropriate empathetic response. High-risk messages are accompanied by crisis helpline information.',
    tags: ['AI/ML', 'Full-Stack', 'Web App'],
    myRole: 'Built the entire system solo: trained the text classification model, built the FastAPI backend (text preprocessing, prediction, and response generation), and created the chat interface with React, Vite, and Tailwind CSS, deployed on Vercel.',
    interactiveFeatures: [
      {
        title: 'Live Chat Demo',
        description: 'A chat interface where users can send messages and see the predicted label and the model\'s confidence score.'
      },
      {
        title: 'NLP Pipeline Visualization',
        description: 'A step-by-step diagram showing raw text being processed into lowercase text, a TF-IDF vector, and finally the predicted class.'
      }
    ],
    links: [
      {
        title: 'GitHub',
        url: 'https://github.com/Gibranalief/MindEase',
        type: 'github'
      },
      {
        title: 'Live Demo',
        url: 'https://mind-ease-plum.vercel.app',
        type: 'demo'
      }
    ]
  },
  {
    id: 'beel-bot',
    title: 'Beel-Bot',
    summary: 'LLM-powered browser automation agent with audio transcription',
    description: 'An asynchronous Python agent that controls a browser to detect question types (multiple choice, fill-in-the-blank, drag-and-drop, and listening), extract page content, request answers from a large language model through the Groq API, and carry out those answers in the interface. Audio questions are transcribed before being answered.',
    tags: ['Automation', 'AI/ML'],
    myRole: 'Built the entire agent solo: the browser module, question extractor, LLM-based solver, action executor, and audio processing.',
    interactiveFeatures: [
      {
        title: 'Agent Flow Diagram',
        description: 'An animated diagram showing the agent cycle: detect question type, extract, solve with the LLM, and execute the answer.'
      },
      {
        title: 'Simulated Execution Log',
        description: 'A terminal-style log view that simulates the agent\'s output while handling different question types.'
      }
    ],
    links: [
      {
        title: 'GitHub',
        url: 'https://github.com/Gibranalief/beel-bot',
        type: 'github'
      }
    ]
  }
];
