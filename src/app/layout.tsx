import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import TerminalModal from "@/components/cli/TerminalModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gibran Alief Irawan | Interactive Portfolio",
  description: "Interactive Personal Portfolio & Showcase Website",
};

// Runs before first paint so the saved (or system) theme is applied without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.style.colorScheme=t}catch(e){document.documentElement.classList.add('dark')}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.className} min-h-screen bg-bg text-fg antialiased`}>
        <Navbar />
        <main>{children}</main>
        <TerminalModal />
      </body>
    </html>
  );
}
