'use client';

import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-[#FFFDF5] text-black flex flex-col justify-between overflow-x-hidden selection:bg-[#FF6B6B] selection:text-white">
      
      {/* ─── HEADER NAVIGATION ─── */}
      <header className="relative z-50 bg-white border-b-4 border-black w-full">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 h-24 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 select-none border-4 border-black rounded-full bg-white shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none neo-transition cursor-pointer">
              <circle cx="50" cy="50" r="46" fill="white"/>
              <path d="M 50 96 L 14 30 L 24 14 L 32 35 L 68 35 L 76 14 L 86 30 Z" fill="black"/>
              <circle cx="38" cy="48" r="5.5" fill="white"/>
              <circle cx="62" cy="48" r="5.5" fill="white"/>
              <path d="M 40 61 C 40 68, 48 68, 50 62 C 52 68, 60 68, 60 61" stroke="white" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </a>

          {/* Return Home Badge */}
          <div className="flex items-center">
            <a
              href="/"
              className="inline-flex items-center justify-center px-5 py-2.5 border-4 border-black bg-[#FFD93D] rounded-none text-xs md:text-sm font-black uppercase tracking-widest text-black shadow-[4px_4px_0px_0px_#000] select-none hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition cursor-pointer block text-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2 stroke-[3px]" />
              RETURN HOME
            </a>
          </div>
        </div>
      </header>

      {/* ─── MAIN PORTAL CONTENT ─── */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 md:px-8 py-16 relative z-10 flex flex-col justify-center">
        
        {/* Title */}
        <div className="mb-12 text-left">
          <span className="text-gray-500 font-mono text-[14px] uppercase tracking-[0.25em] block mb-3">
            PLATFORM COMPLIANCE
          </span>
          <h1 className="text-black font-black leading-[0.9] tracking-tighter uppercase text-4xl sm:text-6xl md:text-7xl">
            Network Terms
          </h1>
        </div>

        {/* Content Box */}
        <div className="bg-white border-4 border-black p-8 md:p-12 rounded-none text-black shadow-[12px_12px_0px_0px_#000] relative overflow-hidden rotate-1">
          <div className="absolute inset-0 pointer-events-none neo-diagonal-pattern opacity-[0.08]" />
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 border-2 border-black bg-[#FFD93D] rounded-none">
              <FileText size={20} strokeWidth={3} className="text-black" />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-black">
              Rules // Liability Outpost
            </span>
          </div>
          <div className="font-bold leading-relaxed text-base md:text-lg relative z-10 text-neutral-800 space-y-4">
            <div className="font-black text-xl md:text-2xl uppercase tracking-tight text-black mb-2">The Core Rules:</div>
            <ul className="space-y-3 list-disc pl-5">
              <li>
                <strong className="text-black font-black">Independent Status:</strong> Kelly is a matchmaking infrastructure shell. By joining, you explicitly acknowledge that you are an independent contractor.
              </li>
              <li>
                <strong className="text-black font-black">Developer Responsibility:</strong> Creators manage 100% of their own code deployment, execution logic, and bug fixing.
              </li>
              <li>
                <strong className="text-black font-black">Marketer Performance:</strong> Growth agents operate purely on a results-driven performance basis.
              </li>
              <li>
                <strong className="text-black font-black">Platform Insulation:</strong> The core network handles contract escrow tracking and stays completely free of liability for individual execution or project faults.
              </li>
            </ul>
          </div>
        </div>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="border-t-4 border-black bg-white relative z-10 w-full mt-12">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8 text-[13px] font-mono text-black font-bold">
          
          <div className="flex items-center gap-4">
            <a href="/" className="inline-block leading-none">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-90 inline-block select-none border-2 border-black rounded-full bg-white shadow-[1.5px_1.5px_0px_0px_#000] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none neo-transition cursor-pointer">
                <circle cx="50" cy="50" r="46" fill="white"/>
                <path d="M 50 96 L 14 30 L 24 14 L 32 35 L 68 35 L 76 14 L 86 30 Z" fill="black"/>
                <circle cx="38" cy="48" r="5.5" fill="white"/>
                <circle cx="62" cy="48" r="5.5" fill="white"/>
                <path d="M 40 61 C 40 68, 48 68, 50 62 C 52 68, 60 68, 60 61" stroke="white" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </a>
            <span className="text-zinc-300 mx-3 select-none text-[12px] font-light">|</span>
            <span className="font-sans text-[10px] font-black uppercase tracking-widest text-zinc-700 select-none transition-colors duration-150">&copy; 2026 KELLY Networks. All rights reserved.</span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex flex-col sm:flex-row gap-4 font-mono text-xs uppercase tracking-wider">
              <a href="/privacy" className="px-6 py-3 border-2 border-black bg-[#C4B5FD] text-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none neo-transition text-center select-none font-bold">
                Privacy Protocols
              </a>
              <a href="/terms" className="px-6 py-3 border-2 border-black bg-white text-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none neo-transition text-center select-none font-bold">
                Network Terms
              </a>
              <a href="/contact" className="px-6 py-3 border-2 border-black bg-[#FFD93D] text-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none neo-transition text-center select-none font-bold">
                Direct Contact
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
