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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white min-h-screen antialiased`}>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <TerminalModal />
      </body>
    </html>
  );
}
