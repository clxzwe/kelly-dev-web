'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function MarketerPortal() {
  return (
    <div className="relative min-h-screen bg-[#FFFDF5] text-black flex flex-col justify-between overflow-x-hidden selection:bg-[#facc15] selection:text-black neo-grid-pattern">
      
      {/* Dynamic font styles to guarantee Space Grotesk 900 and Inter 700 are fully loaded and respected */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Space+Grotesk:wght@900&display=swap');
        .font-space-900 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 900;
        }
        .font-inter-700 {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
        }
      ` }} />

      {/* Tactile Noise Overlay for the premium zine texture */}
      <div className="absolute inset-0 pointer-events-none z-50 neo-noise-overlay opacity-[0.018] mix-blend-multiply" />

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-10 relative z-10 flex flex-col justify-between">
        
        {/* ─── NAV BAR / FLOATING HEADER ─── */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-50 w-full mb-12"
        >
          <div className="bg-white border-4 border-black p-5 md:p-6 rounded-none text-black shadow-[8px_8px_0px_0px_#000] flex items-center justify-between">
            <a href="/" className="flex items-center space-x-3 hover:translate-x-[2px] neo-transition">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 select-none border-4 border-black rounded-full bg-white shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none neo-transition cursor-pointer">
                <circle cx="50" cy="50" r="46" fill="white"/>
                <path d="M 50 96 L 14 30 L 24 14 L 32 35 L 68 35 L 76 14 L 86 30 Z" fill="black"/>
                <circle cx="38" cy="48" r="5.5" fill="white"/>
                <circle cx="62" cy="48" r="5.5" fill="white"/>
                <path d="M 40 61 C 40 68, 48 68, 50 62 C 52 68, 60 68, 60 61" stroke="white" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <span className="font-space-900 text-lg md:text-2xl tracking-tighter uppercase text-black">
                GROWTH PORTAL
              </span>
            </a>
            <div>
              <a
                href="/"
                className="font-space-900 inline-flex items-center justify-center px-5 py-2.5 border-4 border-black bg-[#facc15] hover:bg-[#eab308] rounded-none text-xs md:text-sm uppercase tracking-widest text-black shadow-[4px_4px_0px_0px_#000] select-none hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition cursor-pointer block text-center"
              >
                Return Home
              </a>
            </div>
          </div>
        </motion.header>

        {/* ─── MAIN PORTAL BODY GRID ─── */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start py-4">
          
          {/* LEFT COLUMN: HERO SECTION / SALES MANIFESTO */}
          <motion.section 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-10"
          >
            {/* Sales Badge */}
            <div className="inline-block bg-[#facc15] text-black border-4 border-black font-space-900 uppercase text-xs tracking-widest px-4 py-2 shadow-[4px_4px_0px_0px_#000] select-none -rotate-1">
              HUSTLE HARD. CLAIM THE BAG.
            </div>

            {/* Display Heading */}
            <h1 className="text-black font-space-900 leading-[0.9] tracking-tighter uppercase text-5xl sm:text-7xl md:text-8xl lg:text-[88px] drop-shadow-[5px_5px_0px_rgba(0,0,0,0.15)]">
              Find Leads. <br />
              Secure Contracts. <br />
              <span className="bg-[#facc15] border-4 border-black px-4 py-2 inline-block -rotate-1 shadow-[8px_8px_0px_0px_#000] text-black mt-3">
                Claim Your Bag.
              </span>
            </h1>

            {/* Copy Manifesto */}
            <div className="bg-white border-4 border-black p-6 md:p-8 rounded-none text-black shadow-[8px_8px_0px_0px_#000] relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none neo-diagonal-pattern opacity-[0.08]" />
              <p className="font-inter-700 leading-relaxed text-base md:text-lg relative z-10 text-black">
                We handle the entire execution loop. Your job is simple: find target business clients, lock in the project definition, and secure the baseline asset. No production management, no developer delivery stress—just highly optimized revenue generation.
              </p>
            </div>

            {/* Massive CTA */}
            <div className="pt-4">
              <a
                href="/onboarding?track=marketer"
                className="font-space-900 inline-flex items-center justify-center w-full sm:w-auto px-10 py-6 bg-[#facc15] hover:bg-[#eab308] text-black border-4 border-black rounded-none text-center text-xl sm:text-2xl uppercase tracking-wider shadow-[8px_8px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none neo-transition select-none cursor-pointer"
              >
                JOIN AS A GROWTH AGENT
              </a>
            </div>
          </motion.section>

          {/* RIGHT COLUMN: OPERATIONAL RULES / POINT-BY-POINT CARD */}
          <motion.section 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="space-y-5 p-8 bg-white border-4 border-black rounded-none text-black shadow-[8px_8px_0px_0px_#000] relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none neo-diagonal-pattern opacity-[0.08]" />
              
              {/* Card Badge */}
              <div className="flex items-center space-x-2 mb-4 relative z-10">
                <Star className="text-black stroke-[3px] fill-black w-5 h-5" />
                <span className="font-space-900 text-xs uppercase tracking-widest">
                  GIVE YOUR BEST & EARN YOUR BEST!!
                </span>
              </div>

              {/* Card Heading */}
              <h3 className="font-space-900 text-3xl sm:text-4xl uppercase tracking-tight text-black pb-4 border-b-4 border-black relative z-10">
                The Agent Framework
              </h3>

              {/* Bullet Points */}
              <ul className="space-y-8 pt-4 font-inter-700 text-base leading-relaxed text-black relative z-10">
                
                <li className="flex items-start gap-4">
                  <span className="text-[#facc15] font-black text-xl leading-none select-none">■</span>
                  <span>
                    <strong className="text-black uppercase">Marketer 50/50 Engine:</strong> Claim 50% commission instantly the exact day your lead's client capital clears, with the remaining 50% distributed on the Saturday pool reset.
                  </span>
                </li>

                <li className="flex items-start gap-4">
                  <span className="text-[#facc15] font-black text-xl leading-none select-none">■</span>
                  <span>
                    <strong className="text-black uppercase">Accelerated Milestone Scaling:</strong> Hit your basic weekly target quota to automatically unlock premium bonus commission rates on all subsequent deals.
                  </span>
                </li>

                <li className="flex items-start gap-4">
                  <span className="text-[#facc15] font-black text-xl leading-none select-none">■</span>
                  <span>
                    <strong className="text-black uppercase">Zero Administrative Drag:</strong> Never manage developers, handle server deployments
                  </span>
                </li>

              </ul>
            </div>
          </motion.section>

        </main>
      </div>

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
