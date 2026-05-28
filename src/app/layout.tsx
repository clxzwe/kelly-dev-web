import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "KELLY — Technical Execution Networks",
  description: "Next-Generation Technical Execution Networks managing high-velocity software production through automated lead pipelines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="bg-[#FFFDF5] text-black font-neo antialiased min-h-screen relative overflow-x-hidden">
        
        {/* Global Paper-Like Tactile Noise Overlay */}
        <div className="absolute inset-0 pointer-events-none z-50 neo-noise-overlay opacity-[0.018] mix-blend-multiply" />
        
        {/* Main Content Node */}
        <div className="relative z-10 min-h-screen flex flex-col justify-between">
          {children}
        </div>
      </body>
    </html>
  );
}
