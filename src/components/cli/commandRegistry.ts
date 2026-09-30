export function processCommand(cmd: string): React.ReactNode {
  const parts = cmd.trim().toLowerCase().split(' ');
  const command = parts[0];

  switch (command) {
    case 'help':
      return "Available commands:\n  help     - Show list of available commands\n  about    - Show professional summary\n  skills   - List technical skills\n  projects - Show featured projects\n  clear    - Clear terminal history\n  contact  - Show contact information";
    case 'about':
      return "Gibran Alief Irawan\nFull-Stack Web Developer & ML Practitioner.\nExperienced in building Web Apps, crafting UI/UX, and solving Computer Vision problems.";
    case 'skills':
      return JSON.stringify({ 
        web: ["Next.js", "React", "TypeScript", "Tailwind CSS"], 
        ml_cv: ["Python", "TensorFlow", "OpenCV", "Scikit"], 
        tools: ["Git", "Docker", "Figma"] 
      }, null, 2);
    case 'projects':
      return "1. Full-Stack Barbershop Booking System\n2. Mental Health NLP Classifier\n3. CV Feature Comparison Slider";
    case 'contact':
      return "Email: gibran@example.com\nGitHub: github.com/gibran\nLinkedIn: linkedin.com/in/gibran";
    default:
      return `gibran-os: command not found: ${command}. Type 'help' to see available commands.`;
  }
}
