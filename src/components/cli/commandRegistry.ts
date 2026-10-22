export function processCommand(cmd: string): React.ReactNode {
  const parts = cmd.trim().toLowerCase().split(' ');
  const command = parts[0];

  switch (command) {
    case 'help':
      return "Available commands:\n  help     - Show list of available commands\n  about    - Show professional summary\n  skills   - List technical skills\n  projects - Show featured projects\n  clear    - Clear terminal history\n  contact  - Show contact information";
    case 'about':
      return "Gibran Alief Irawan\nComputer Science student at BINUS University (Intelligent Systems).\nSoftware engineer and AI enthusiast: web apps, NLP, and automation.";
    case 'skills':
      return JSON.stringify({ 
        web: ["Next.js", "React", "TypeScript", "Tailwind CSS", "NestJS", "Prisma", "PostgreSQL"],
        ml_nlp: ["Python", "scikit-learn", "LSTM", "GRU", "IndoBERT", "pandas", "NumPy"],
        automation: ["FastAPI", "Playwright", "Groq API", "Git & GitHub"]
      }, null, 2);
    case 'projects':
      return "1. The Atelier - Barbershop Booking System\n2. AI Forest Fire Prediction System\n3. LQ45 Stock Prediction (LSTM-GRU + IndoBERT)\n4. MindEase - Mental Health Chatbot\n5. Beel-Bot - Browser Automation Agent";
    case 'contact':
      return "Email: gbrnalief@gmail.com\nGitHub: github.com/Gibranalief\nLinkedIn: linkedin.com/in/gibran-alief-irawan-394775311";
    default:
      return `gibran-os: command not found: ${command}. Type 'help' to see available commands.`;
  }
}
