'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Sparkles } from 'lucide-react';

export default function ExplorePortal() {
  return (
    <div className="relative min-h-screen bg-[#FFFDF5] text-black flex flex-col justify-center items-center overflow-x-hidden selection:bg-[#C4B5FD] selection:text-black neo-grid-pattern p-6">
      
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

      {/* Snappy hardware-accelerated entry animation container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.15, ease: 'linear' }}
        className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center relative z-10"
      >
        {/* Small Accent Badge */}
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
          className="bg-white border-4 border-black px-5 py-2 font-space-900 text-xs sm:text-sm uppercase tracking-widest text-black shadow-[4px_4px_0px_0px_#000] select-none -rotate-1 mb-8"
        >
          PHASE 01 // SELECTION
        </motion.div>

        {/* Main Hype Headline */}
        <h1 className="text-black font-space-900 leading-[0.95] tracking-tighter uppercase text-4xl sm:text-6xl md:text-7xl text-center mb-6 max-w-3xl drop-shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
          Let's get you put into the game!!
        </h1>

        {/* Sub-prompt Question Box */}
        <motion.div 
          initial={{ rotate: -2 }}
          animate={{ rotate: 1 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
          className="bg-white border-4 border-black py-3 px-8 text-xl sm:text-2xl font-space-900 text-center uppercase tracking-tight shadow-[6px_6px_0px_0px_#000] mb-12 select-none"
        >
          What's your speciality?
        </motion.div>

        {/* The Two-Channels Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl px-4">
          
          {/* Path 1: Developer Node */}
          <a
            href="/developer"
            className="group flex flex-col items-center justify-center p-8 bg-[#C4B5FD] border-4 border-black rounded-none text-black text-center shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:translate-y-[-4px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition select-none"
          >
            <div className="p-3 border-4 border-black bg-white rounded-none mb-4 group-hover:rotate-6 neo-transition">
              <Terminal size={32} strokeWidth={3} className="text-black" />
            </div>
            <span className="font-space-900 text-2xl uppercase tracking-wider">
              I AM A DEV
            </span>
          </a>

          {/* Path 2: Growth Agent Node */}
          <a
            href="/marketer"
            className="group flex flex-col items-center justify-center p-8 bg-[#facc15] border-4 border-black rounded-none text-black text-center shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:translate-y-[-4px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition select-none"
          >
            <div className="p-3 border-4 border-black bg-white rounded-none mb-4 group-hover:-rotate-6 neo-transition">
              <Sparkles size={32} strokeWidth={3} className="text-black" />
            </div>
            <span className="font-space-900 text-2xl uppercase tracking-wider">
              I AM A GROWTH AGENT
            </span>
          </a>

        </div>

        {/* Home Link anchor */}
        <div className="mt-16">
          <a 
            href="/" 
            className="font-space-900 text-xs sm:text-sm uppercase tracking-widest text-black hover:underline flex items-center space-x-2"
          >
            <span>Return to Landing Outpost</span>
            <ArrowRight size={16} strokeWidth={3.5} />
          </a>
        </div>

      </motion.div>

    </div>
  );
}
