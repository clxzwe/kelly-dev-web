'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Send, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#FFFDF5] text-black flex flex-col justify-between overflow-x-hidden selection:bg-[#FF6B6B] selection:text-white">
      
      {/* ─── HEADER NAVIGATION (NEO-BRUTALIST SOLID BLACK BAND) ─── */}
      <header className="relative z-50 bg-white border-b-4 border-black w-full">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 h-24 flex items-center justify-between">
          
          {/* Left side: Large Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 select-none border-4 border-black rounded-full bg-white shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none neo-transition cursor-pointer">
                <circle cx="50" cy="50" r="46" fill="white"/>
                <path d="M 50 96 L 14 30 L 24 14 L 32 35 L 68 35 L 76 14 L 86 30 Z" fill="black"/>
                <circle cx="38" cy="48" r="5.5" fill="white"/>
                <circle cx="62" cy="48" r="5.5" fill="white"/>
                <path d="M 40 61 C 40 68, 48 68, 50 62 C 52 68, 60 68, 60 61" stroke="white" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </a>
          </div>

          {/* Right side: Explore link button */}
          <div className="flex items-center">
            <a
              href="/explore"
              className="inline-flex items-center justify-center px-5 py-2.5 border-4 border-black bg-[#FFD93D] rounded-none text-xs md:text-sm font-black uppercase tracking-widest text-black shadow-[4px_4px_0px_0px_#000] select-none hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition cursor-pointer block text-center"
            >
              EXPLORE WAYS TO EARN
            </a>
          </div>
        </div>
      </header>

      {/* ─── MAIN PORTAL CONTENT ─── */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 md:px-8 lg:px-12 relative z-10 flex flex-col justify-center">
        
        {/* ─── THE HIGH-TICKET HERO FOLD (ANTI-SUBTLE POP COLLAGE) ─── */}
        <section className="py-20 md:py-28 lg:py-36 text-left relative bg-[#FFFDF5] border-b-4 border-black neo-grid-pattern">
          
          {/* Neon Floating Stickers */}
          <div className="absolute top-8 right-0 md:right-8 bg-[#C4B5FD] text-black border-4 border-black font-black uppercase text-xs tracking-widest px-4 py-2.5 rotate-6 shadow-[4px_4px_0px_0px_#000] select-none z-20">
            CONNECTING THE DOTS!!
          </div>

          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }} 
            className="absolute bottom-12 right-12 w-14 h-14 border-4 border-black bg-[#FFD93D] hidden md:flex items-center justify-center shadow-[4px_4px_0px_0px_#000] select-none z-20 font-black text-xl"
          >
            ✦
          </motion.div>

          <div className="max-w-5xl space-y-12 relative z-10">
            
            {/* Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-black font-black leading-[0.9] tracking-tighter uppercase text-5xl sm:text-7xl md:text-8xl lg:text-[98px]"
              >
                Next-Generation <br />
                <span className="bg-[#FFD93D] border-4 border-black px-5 py-2 inline-block -rotate-2 shadow-[8px_8px_0px_0px_#000] text-black my-2">
                  Technical
                </span> <br />
                Execution.
              </motion.h1>
            </div>

            {/* Subtext (Collage Card Box) */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white border-4 border-black p-6 md:p-8 rounded-none text-black shadow-[8px_8px_0px_0px_#000] max-w-3xl relative overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none neo-diagonal-pattern opacity-[0.08]" />
              <p className="font-bold leading-relaxed text-lg md:text-xl relative z-10">
                Managing high-velocity software production through automated lead pipelines and decentralized engineering hubs. We match premium business demand with independent technical talent.
              </p>
            </motion.div>

            {/* THE ROUTING GATEWAY (MECHANICAL TICK CLICKS) */}
            <motion.div 
              id="routing-gateway"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-6 pt-4 font-mono text-xs uppercase tracking-widest"
            >
              {/* Access Developer Portal */}
              <a
                href="/developer"
                className="w-full sm:w-auto px-8 py-5 bg-[#C4B5FD] hover:bg-[#b29ffd] text-black border-4 border-black rounded-none text-center font-sans font-black text-[16px] uppercase tracking-wider shadow-[6px_6px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none neo-transition block select-none"
              >
                JOIN AS A DEV
              </a>

              {/* Access Growth Portal */}
              <a
                href="/marketer"
                className="w-full sm:w-auto px-8 py-5 bg-[#facc15] hover:bg-[#fde047] text-black border-4 border-black rounded-none text-center font-sans font-black text-[16px] uppercase tracking-wider shadow-[6px_6px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none neo-transition block select-none"
              >
                JOIN AS A GROWTH AGENT
              </a>
            </motion.div>

          </div>
        </section>

        {/* ─── COMPLIANCE, TRUST, & CONTACT GRID (Lower Fold) ─── */}
        <section className="py-20 bg-[#FFFDF5] relative z-10 w-full mb-12">
          
          <div className="flex items-center space-x-3 mb-12 select-none">
            <Star className="text-black stroke-[3.5px] fill-black w-7 h-7 animate-spin-slow" />
            <h2 className="font-black text-2xl md:text-3xl uppercase tracking-tight">
              Network Infrastructure & Compliance
            </h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto w-full space-y-6"
          >
            
            {/* ROW 1: DOUBLE-BLIND PROXY SHIELD */}
            <div className="w-full flex flex-col md:flex-row items-start md:items-center p-6 md:p-8 bg-[#C4B5FD] border-4 border-black rounded-none text-black shadow-[8px_8px_0px_0px_#000] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#000] neo-transition relative overflow-hidden gap-6 md:gap-8">
              <div className="absolute inset-0 pointer-events-none neo-diagonal-pattern opacity-[0.08]" />
              
              {/* Left Block (Heading Zone) */}
              <div className="w-full md:w-1/3 flex flex-col items-start space-y-4 relative z-10 shrink-0">
                <div className="p-3 border-4 border-black bg-white rounded-none shadow-[4px_4px_0px_0px_#000]">
                  <Shield size={32} strokeWidth={3} className="text-black" />
                </div>
                <h3 className="text-black font-black text-xl md:text-2xl uppercase tracking-tight">
                  Double-Blind Proxy Shield
                </h3>
              </div>

              {/* Right Block (Points Array) */}
              <div className="w-full md:w-2/3 relative z-10">
                <ul className="space-y-3 font-bold text-[15px] text-black">
                  <li className="flex items-start gap-2.5">
                    <span className="text-black font-black select-none">■</span>
                    <span>
                      <strong className="text-black uppercase">Isolated Pipeline:</strong> Complete decoupling of technical development lines from commercial client networks.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-black font-black select-none">■</span>
                    <span>
                      <strong className="text-black uppercase">Peak Velocity:</strong> Eliminating external administrative drag to maximize software build speeds.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-black font-black select-none">■</span>
                    <span>
                      <strong className="text-black uppercase">Identity Protection:</strong> Strict end-to-end anonymity safeguards for all network participants.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* ROW 2: LIMITATION OF LIABILITY */}
            <div className="w-full flex flex-col md:flex-row items-start md:items-center p-6 md:p-8 bg-white border-4 border-black rounded-none text-black shadow-[8px_8px_0px_0px_#000] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#000] neo-transition relative overflow-hidden gap-6 md:gap-8">
              <div className="absolute inset-0 pointer-events-none neo-diagonal-pattern opacity-[0.08]" />
              
              {/* Left Block (Heading Zone) */}
              <div className="w-full md:w-1/3 flex flex-col items-start space-y-4 relative z-10 shrink-0">
                <div className="p-3 border-4 border-black bg-[#FFD93D] rounded-none shadow-[4px_4px_0px_0px_#000]">
                  <FileText size={32} strokeWidth={3} className="text-black" />
                </div>
                <h3 className="text-black font-black text-xl md:text-2xl uppercase tracking-tight">
                  Limitation of Liability
                </h3>
              </div>

              {/* Right Block (Points Array) */}
              <div className="w-full md:w-2/3 relative z-10">
                <ul className="space-y-3 font-bold text-[15px] text-black">
                  <li className="flex items-start gap-2.5">
                    <span className="text-black font-black select-none">■</span>
                    <span>
                      <strong className="text-black uppercase">Matchmaking Infrastructure:</strong> Kelly operates purely as a secure matchmaking and escrow translation shell.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-black font-black select-none">■</span>
                    <span>
                      <strong className="text-black uppercase">Contractor Responsibility:</strong> 100% of code deployment, logic implementation, and software bug fixes rest with the independent creator.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-black font-black select-none">■</span>
                    <span>
                      <strong className="text-black uppercase">Zero Risk Core:</strong> The underlying platform layer remains completely free from any external legal or financial liabilities.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* ROW 3: DIRECT OUTPOST */}
            <div className="w-full flex flex-col md:flex-row items-start md:items-center p-6 md:p-8 bg-[#facc15] border-4 border-black rounded-none text-black shadow-[8px_8px_0px_0px_#000] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#000] neo-transition -rotate-1 relative overflow-hidden gap-6 md:gap-8">
              <div className="absolute inset-0 pointer-events-none neo-diagonal-pattern opacity-[0.08]" />
              
              {/* Left Block (Heading Zone) */}
              <div className="w-full md:w-1/3 flex flex-col items-start space-y-4 relative z-10 shrink-0">
                <div className="p-3 border-4 border-black bg-white rounded-none shadow-[4px_4px_0px_0px_#000]">
                  <Send size={32} strokeWidth={3} className="text-black" />
                </div>
                <h3 className="text-black font-black text-xl md:text-2xl uppercase tracking-tight">
                  Direct Outpost
                </h3>
              </div>

              {/* Right Block (Points Array) */}
              <div className="w-full md:w-2/3 relative z-10">
                <ul className="space-y-3 font-bold text-[15px] text-black">
                  <li className="flex items-start gap-2.5">
                    <span className="text-black font-black select-none">■</span>
                    <span>
                      <strong className="text-black uppercase">Corporate Escalate:</strong> Secure gateway for complex operational queries or client contract dispute resolution.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-black font-black select-none">■</span>
                    <span>
                      <strong className="text-black uppercase">Venture Channels:</strong> Dedicated nodes for joint ventures, structural expansion, and strategic network growth.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-black font-black select-none">■</span>
                    <span>
                      <strong className="text-black uppercase">Secure Coordinates:</strong> Reach out directly to management via Telegram text communication: @KellyNetworkCore.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

          </motion.div>
        </section>

      </main>

      {/* ─── FOOTER (NEO-BRUTALIST SOLID BLACK BLOCK) ─── */}
      <footer className="border-t-4 border-black bg-white relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8 text-[13px] font-mono text-black font-bold">
          
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-90 inline-block select-none border-2 border-black rounded-full bg-white shadow-[1.5px_1.5px_0px_0px_#000] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none neo-transition cursor-pointer">
              <circle cx="50" cy="50" r="46" fill="white"/>
              <path d="M 50 96 L 14 30 L 24 14 L 32 35 L 68 35 L 76 14 L 86 30 Z" fill="black"/>
              <circle cx="38" cy="48" r="5.5" fill="white"/>
              <circle cx="62" cy="48" r="5.5" fill="white"/>
              <path d="M 40 61 C 40 68, 48 68, 50 62 C 52 68, 60 68, 60 61" stroke="white" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            <span className="text-zinc-300 mx-3 select-none text-[12px] font-light">|</span>
            <span className="font-sans text-[10px] font-black uppercase tracking-widest text-zinc-700 select-none transition-colors duration-150">&copy; 2026 KELLY Networks. All rights reserved.</span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            {/* Centered / Stacked Horizontal Link Array */}
            <div className="flex flex-col sm:flex-row gap-4 font-mono text-xs uppercase tracking-wider">
              <a 
                href="/privacy" 
                className="px-6 py-3 border-2 border-black bg-[#C4B5FD] text-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none neo-transition text-center select-none font-bold"
              >
                Privacy Protocols
              </a>
              <a 
                href="/terms" 
                className="px-6 py-3 border-2 border-black bg-white text-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none neo-transition text-center select-none font-bold"
              >
                Network Terms
              </a>
              <a 
                href="/contact" 
                className="px-6 py-3 border-2 border-black bg-[#FFD93D] text-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none neo-transition text-center select-none font-bold"
              >
                Direct Contact
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
