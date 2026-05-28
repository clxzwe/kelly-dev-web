'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  User, 
  Phone, 
  Globe, 
  Lock, 
  Sparkles, 
  ShieldCheck, 
  Code2, 
  Send,
  Zap,
  Terminal,
  HelpCircle,
  Mail,
  GraduationCap,
  Briefcase,
  Clock
} from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function OnboardingWizard() {
  // Core Onboarding and OTP States
  const [step, setStep] = useState(1); // Step 1: Data Intake, Step 2: Questionnaire (for Dev) or OTP (for Marketer), Step 3: OTP (for Dev) or Success (for Marketer), Step 4: Success (for Dev)
  const [intakeSubStep, setIntakeSubStep] = useState(1); // Sub-step 1: Identity, Sub-step 2: Operational Stack
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [activeOtp, setActiveOtp] = useState('');
  const [qSubStep, setQSubStep] = useState(1);
  
  const [error, setError] = useState('');
  const [track, setTrack] = useState<'dev' | 'marketer' | ''>('');
  const [isTrackExplicit, setIsTrackExplicit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'default' | 'loading' | 'success'>('default');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    github: '',
    stack: '',
    portfolio: '',
    strategy: '',
    ageChecked: false,
    otpCode: '',
    additionalInfo: '',
    vibeCodeOption: '',
    aiToolsUsed: '',
    expYears: '',
    expMonths: '',
    roleBestFit: '',
  });

  const devQuotes = [
    "YOUR REPO IS GOING TO BE INSANE!!", 
    "KEEP WRITING CLEAN CODE!!", 
    "NO MEETINGS CAN STOP YOU NOW!!", 
    "BELIEVE IN YOUR BARS OF CODE!!", 
    "LEVEL 99 BUILDER DETECTED!!", 
    "PRO SOFTWARE CRAFTSMAN EN ROUTE!!", 
    "NEVER GIVE UP!!", 
    "YOU CAN DO THIS!!", 
    "LOCK IN. IT'S SHOWTIME!!", 
    "YOU ARE SUPER COOL BTW!!"
  ];

  const marketerQuotes = [
    "LET'S CLAIM THE BAG!!", 
    "THE HUSTLE ALWAYS PAYS OFF!!", 
    "THE GRIND IS TEMPORARY, THE BAG IS PERMANENT!!", 
    "CHASING MULTIPLIERS TODAY!!", 
    "CLOSE DEALS. CLEAR SATURDAY POOLS!!", 
    "HUSTLE HARD. CLAIM THE BAG!!", 
    "UNLIMITED PERFORMANCE SCALE!!", 
    "SECURE THE LEAD // OWN THE COMMISSION!!", 
    "YOU ARE SUPER COOL BTW!!", 
    "LOCK IN. IT'S SHOWTIME!!"
  ];

  const quotes = track === 'dev' ? devQuotes : track === 'marketer' ? marketerQuotes : [...devQuotes, ...marketerQuotes];

  const [quoteIndex, setQuoteIndex] = useState(0);

  // Rotate quotes marquee ticker every 3 seconds
  useEffect(() => {
    setQuoteIndex(0);
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % quotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [track]);

  // Context-Aware Routing state: Auto-determine user track context on arrival
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trackParam = params.get('track') || '';
    if (trackParam === 'dev' || trackParam === 'marketer') {
      setTrack(trackParam);
      setIsTrackExplicit(true);
    }
    if (typeof window !== 'undefined') {
      const alreadyVerified = localStorage.getItem('kelly_network_verified');
      if (alreadyVerified === 'true') {
        setStep(trackParam === 'dev' ? 5 : 4);
      }
    }
  }, []);

  const handleTextChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleWhatsappChange = (value: string) => {
    let cleaned = value.replace(/[^\d+]/g, '');
    if (cleaned.indexOf('+') > 0) {
      cleaned = cleaned.charAt(0) + cleaned.slice(1).replace(/\+/g, '');
    }
    setFormData(prev => ({ ...prev, whatsapp: cleaned }));
    setError('');
  };

  const handleCheckboxChange = () => {
    setFormData(prev => ({ ...prev, ageChecked: !prev.ageChecked }));
    setError('');
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setFormData(prev => ({ ...prev, otpCode: value }));
    setError('');
  };

  // Step 1: Data Intake sub-step validations
  const validateIntake1 = () => {
    if (!formData.name.trim()) {
      setError('⚠️ FULL NAME HANDLE IS REQUIRED');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setError('⚠️ ENTER A VALID EMAIL DIRECTORY FOR ACCESS');
      return false;
    }
    if (!formData.whatsapp.trim() || formData.whatsapp.length < 8) {
      setError('⚠️ WHATSAPP CONNECTIVITY COORDINATE MUST BE AT LEAST 8 NUMERICS');
      return false;
    }
    return true;
  };

  const validateIntake2 = () => {
    if (track === 'dev') {
      if (!formData.github.trim()) {
        setError('⚠️ DROP YOUR GITHUB REPOSITORY LINK');
        return false;
      }
      if (!formData.stack.trim()) {
        setError('⚠️ SPECIFY YOUR PRIMARY TECHNICAL LANGUAGES / COMPILERS');
        return false;
      }
    } else if (track === 'marketer') {
      if (!formData.portfolio.trim()) {
        setError('⚠️ DROP YOUR PROFESSIONAL PORTFOLIO OR SOCIAL URL');
        return false;
      }
      if (!formData.strategy.trim()) {
        setError('⚠️ DESCRIBE YOUR INTENDED SOURCING PIPELINE');
        return false;
      }
    }
    if (!formData.ageChecked) {
      setError('⚠️ YOU MUST ENGAGE THE LEGAL GUARDIAN PROTOCOL CHECKBOX');
      return false;
    }
    return true;
  };

  // STAGE A: OTP TRANSMISSION (TRIGGERED ON STEP 1 SUBMIT)
  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateIntake2()) return;

    // Check Layer 2 Email Security Block
    if (typeof window !== 'undefined') {
      const submittedEmails = JSON.parse(localStorage.getItem('kelly_submitted_emails') || '[]');
      const normalizedEmail = formData.email.trim().toLowerCase();
      if (submittedEmails.includes(normalizedEmail)) {
        setError('⚠️ SECURITY ALERT: THIS EMAIL IS ALREADY LINKED TO AN ACTIVE APPLICATION.');
        return;
      }
    }

    if (track === 'dev') {
      setStep(2);
      return;
    }

    setIsSendingOtp(true);
    setError('');

    // Generate dynamic 6-digit verification code
    const generatedPin = Math.floor(100000 + Math.random() * 900000).toString();
    setActiveOtp(generatedPin);

    // Package transmission payload using Web3Forms
    const otpPayload = new FormData();
    otpPayload.append("access_key", "2c64c122-c505-4342-a149-5f02503d659e");
    otpPayload.append("email", formData.email);
    otpPayload.append("subject", "KELLY NETWORK - Verification Action Required");
    otpPayload.append("from_name", "Kelly Security Protocol");
    otpPayload.append("message", `
ATTENTION RECRUIT OPERATOR,

Your dynamic 6-digit Kelly Network security verification pin code is:

[ ${generatedPin} ]

Enter this pin on the secure onboarding vector screen to unlock direct platform channel credentials.

- KELLY NETWORK CORE ARCHITECTURE
`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: otpPayload
      });
      const result = await response.json();
      
      if (result.success) {
        // Send successfully, advance step
        setStep(2); // Jump to OTP entry
        alert("✓ SECURE VERIFICATION PIN ROUTED TO YOUR EMAIL INBOX!");
      } else {
        setError(`⚠️ OTP ROUTING LAYER COMPROMISED: ${result.message || 'ACCESS DENIED'}`);
      }
    } catch (err) {
      setError('⚠️ OTP ROUTING LAYER SOCKET ERROR. TRANSMISSION ABORTED.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const validateQSubStep1 = () => {
    if (!formData.vibeCodeOption) {
      setError('⚠️ SELECT YOUR VIBE CODING ATTITUDE');
      return false;
    }
    if ((formData.vibeCodeOption === "I vibe code everything completely!" || 
         formData.vibeCodeOption === "I vibe code sometimes but write pure logic too.") && 
        !formData.aiToolsUsed.trim()) {
      setError('⚠️ SPECIFY WHICH AI TOOLS YOU DEPLOY');
      return false;
    }
    setError('');
    return true;
  };

  const validateQSubStep2 = () => {
    if (!formData.expYears.trim() || !formData.expMonths.trim()) {
      setError('⚠️ SPECIFY YOUR TEMPORAL EXPERIENCE METRICS (YEARS & MONTHS)');
      return false;
    }
    const yearsNum = parseInt(formData.expYears, 10);
    const monthsNum = parseInt(formData.expMonths, 10);
    if (isNaN(yearsNum) || yearsNum < 0 || yearsNum > 50) {
      setError('⚠️ ENTER A VALID NUMBER OF YEARS (0 - 50)');
      return false;
    }
    if (isNaN(monthsNum) || monthsNum < 0 || monthsNum > 11) {
      setError('⚠️ ENTER A VALID NUMBER OF MONTHS (0 - 11)');
      return false;
    }
    setError('');
    return true;
  };

  const handleDeveloperQuestionnaireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate questionnaire fields
    if (!validateQSubStep1()) {
      setQSubStep(1);
      return;
    }
    if (!validateQSubStep2()) {
      setQSubStep(2);
      return;
    }
    if (!formData.roleBestFit) {
      setError('⚠️ SELECT YOUR PROFILE ROLE CLASSIFICATION');
      setQSubStep(3);
      return;
    }

    setIsSendingOtp(true);
    setError('');

    // Generate dynamic 6-digit verification code
    const generatedPin = Math.floor(100000 + Math.random() * 900000).toString();
    setActiveOtp(generatedPin);

    try {
      const response = await fetch("/api/verify-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          code: generatedPin
        })
      });
      const result = await response.json();
      
      if (response.status === 429) {
        setError("⚠️ TOO MANY REQUESTS. PLEASE WAIT 5 MINUTES BEFORE RETRYING.");
      } else if (result.success) {
        setStep(3); // Go to OTP verification step
        alert("✓ SECURE VERIFICATION PIN ROUTED TO YOUR EMAIL INBOX!");
      } else {
        setError(`⚠️ OTP ROUTING LAYER COMPROMISED: ${result.message || 'ACCESS DENIED'}`);
      }
    } catch (err) {
      setError('⚠️ OTP ROUTING LAYER SOCKET ERROR. TRANSMISSION ABORTED.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // STAGE B: PLATFORM SECURITY PIN VALIDATION (OTP MATCH & WEB3FORMS SUBMIT)
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.otpCode.length !== 6) {
      setError('⚠️ PLATFORM SECURITY PIN IS NOT FULLY CONFIGURED');
      return;
    }

    if (formData.otpCode !== activeOtp) {
      setError('⚠️ INCORRECT CODE. PLEASE CHECK YOUR INBOX AND TRY AGAIN.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus('loading');
    setError('');

    const requestBody = {
      isFinalSubmit: true,
      email: formData.email,
      code: formData.otpCode,
      name: formData.name,
      whatsapp: formData.whatsapp,
      track,
      github: formData.github,
      stack: formData.stack,
      additionalInfo: formData.additionalInfo,
      vibeCodeOption: formData.vibeCodeOption,
      aiToolsUsed: formData.aiToolsUsed,
      expYears: formData.expYears,
      expMonths: formData.expMonths,
      roleBestFit: formData.roleBestFit,
      portfolio: formData.portfolio,
      strategy: formData.strategy,
    };

    try {
      const response = await fetch("/api/verify-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });
      const result = await response.json();
      
      if (response.status === 429) {
        setSubmissionStatus('default');
        setError("⚠️ TOO MANY REQUESTS. PLEASE WAIT 5 MINUTES BEFORE RETRYING.");
      } else if (result.success) {
        setOtpVerified(true);
        setSubmissionStatus('success');
        
        // Commit email and browser verification to local storage
        if (typeof window !== 'undefined') {
          localStorage.setItem('kelly_network_verified', 'true');
          const submittedEmails = JSON.parse(localStorage.getItem('kelly_submitted_emails') || '[]');
          const normalizedEmail = formData.email.trim().toLowerCase();
          if (!submittedEmails.includes(normalizedEmail)) {
            submittedEmails.push(normalizedEmail);
            localStorage.setItem('kelly_submitted_emails', JSON.stringify(submittedEmails));
          }
        }

        setStep(track === 'dev' ? 4 : 3);
      } else {
        setSubmissionStatus('default');
        setError(`⚠️ WEB3FORMS FINAL DATA PIPELINE COMPROMISED: ${result.message || 'ACCESS DENIED'}`);
      }
    } catch (err) {
      setSubmissionStatus('default');
      setError('⚠️ NETWORK LAYER SOCKET TIMEOUT. FINAL ARCHIVE TRANSMISSION TERMINATED.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Neo-Brutalist Styling Variables
  const trackTheme = {
    bg: track === 'dev' ? 'bg-[#C4B5FD]' : track === 'marketer' ? 'bg-[#facc15]' : 'bg-[#C4B5FD]',
    borderHover: track === 'dev' ? 'hover:bg-[#b29ffd]' : 'hover:bg-[#fde047]',
    textColor: 'text-black',
    accentColor: track === 'dev' ? '#C4B5FD' : '#facc15',
  };

  return (
    <div className="relative min-h-screen bg-[#FFFDF5] text-black flex flex-col justify-between overflow-x-hidden selection:bg-[#C4B5FD] selection:text-black neo-grid-pattern">
      
      {/* Dynamic font loading styles to guarantee precise font scaling */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800;900&family=Space+Grotesk:wght@900&display=swap');
        .font-space-900 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 900;
        }
        .font-inter-700 {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
        }
        .font-inter-800 {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
        }
      ` }} />

      {/* Global Paper-Like Tactile Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 neo-noise-overlay opacity-[0.018] mix-blend-multiply" />

      {/* ─── HEADER NAVIGATION ─── */}
      <header className="relative z-50 bg-white border-b-4 border-black w-full">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 h-24 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-3">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 select-none border-4 border-black rounded-full bg-white shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none neo-transition cursor-pointer">
                <circle cx="50" cy="50" r="46" fill="white"/>
                <path d="M 50 96 L 14 30 L 24 14 L 32 35 L 68 35 L 76 14 L 86 30 Z" fill="black"/>
                <circle cx="38" cy="48" r="5.5" fill="white"/>
                <circle cx="62" cy="48" r="5.5" fill="white"/>
                <path d="M 40 61 C 40 68, 48 68, 50 62 C 52 68, 60 68, 60 61" stroke="white" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <span className="font-space-900 text-xl tracking-tighter uppercase hidden sm:inline-block">
                KELLY NETWORK
              </span>
            </a>
          </div>

          <div>
            <a
              href="/"
              className="font-space-900 inline-flex items-center justify-center px-5 py-2.5 border-4 border-black bg-white hover:bg-gray-50 rounded-none text-xs md:text-sm uppercase tracking-widest text-black shadow-[4px_4px_0px_0px_#000] select-none hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition cursor-pointer block text-center"
            >
              ← RETURN HOME
            </a>
          </div>

        </div>
      </header>

      {/* ─── MAIN PORTAL ONBOARDING WIZARD ─── */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-20 relative z-10 flex flex-col items-center justify-center">
        
        {/* STEP PROGRESS DISPLAY BAR (Hidden if track selection is pending) */}
        {track !== '' && step < (track === 'dev' ? 4 : 3) && (
          <div className="w-full max-w-2xl mb-8 space-y-4">
            <div className="flex items-center justify-between gap-4">
              
              {/* WELCOME TO THE TEAM STICKER BADGE (Rotated slightly on the left) */}
              <div className={`inline-block self-start sm:self-auto rotate-1 border-4 border-black font-black uppercase text-xs sm:text-sm tracking-wide px-4 py-2 text-black shadow-[4px_4px_0px_0px_#000] select-none ${trackTheme.bg}`}>
                WELCOME TO THE TEAM!
              </div>

              {/* PROGRESS STATUS CARD */}
              <div className="flex items-center gap-4 font-sans text-xs sm:text-sm tracking-tight font-medium uppercase text-zinc-700">
                <span>Progress Status</span>
                <span className="bg-white border-4 border-black px-4 py-2 text-black shadow-[4px_4px_0px_0px_#000] rounded-none font-bold">
                  Step 0{step} / 0{track === 'dev' ? 4 : 3}
                </span>
              </div>

            </div>

            <div className="h-6 w-full bg-white border-4 border-black relative overflow-hidden shadow-[4px_4px_0px_0px_#000]">
              <motion.div 
                className={`h-full border-r-4 border-black transition-all ${
                  track === 'dev' ? 'bg-[#C4B5FD]' : 'bg-[#facc15]'
                }`}
                initial={{ width: '0%' }}
                animate={{ width: `${(step / (track === 'dev' ? 4 : 3)) * 100}%` }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}

        {/* ─── MASSIVE STEP CARD ENCLOSURE ─── */}
        <div className="w-full max-w-2xl bg-white border-4 border-black rounded-none text-black shadow-[8px_8px_0px_0px_#000] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none neo-diagonal-pattern opacity-[0.06] z-0" />
          
          {/* Card Header Dynamic Quote Marquee Rotator */}
          {track !== '' && step < (track === 'dev' ? 4 : 3) && (
            <div className={`w-full ${
              track === 'dev' ? 'bg-[#C4B5FD]' : 'bg-[#facc15]'
            } text-black border-b-4 border-black font-space-900 uppercase h-16 min-h-[64px] flex items-center justify-center select-none overflow-hidden relative z-20`}>
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden px-6">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={quoteIndex}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.12, ease: "linear" }}
                    className="whitespace-nowrap flex items-center justify-center text-center w-full h-full text-xl sm:text-2xl font-black uppercase tracking-tighter font-space-900"
                  >
                    {quotes[quoteIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          )}
          
          <div className="p-6 sm:p-10 md:p-12 relative z-10">
            <AnimatePresence mode="wait">
              
              {/* FALLBACK TRACK SELECTION (ONLY IF track IS NOT PRE-SELECTED IN QUERY) */}
              {track === '' && (
                <motion.div
                  key="track-selector"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="space-y-8"
                >
                  <div className="space-y-4 text-center">
                    <span className="inline-block bg-[#FF6B6B] text-white border-2 border-black font-space-900 uppercase text-[10px] tracking-widest px-3 py-1 select-none shadow-[2px_2px_0px_0px_#000]">
                      TRACK UNINITIALIZED
                    </span>
                    <h2 className="text-black font-space-900 leading-[0.9] tracking-tighter uppercase text-4xl sm:text-5xl md:text-6xl text-center">
                      LET'S GET YOU PUT INTO THE GAME!!
                    </h2>
                    <p className="font-inter-700 text-sm uppercase tracking-wider text-gray-700 max-w-md mx-auto text-center pt-2">
                      What is your primary route track? Select your execution portal to begin data syncing.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    {/* BUTTON A: DEVELOPER TRACK */}
                    <button
                      type="button"
                      onClick={() => { setTrack('dev'); setError(''); }}
                      className="group flex flex-col items-center justify-between p-6 sm:p-8 bg-[#C4B5FD] text-black border-4 border-black rounded-none text-center shadow-[6px_6px_0px_0px_#000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition cursor-pointer select-none"
                    >
                      <div className="w-14 h-14 bg-white border-4 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0px_0px_#000] group-hover:rotate-6 neo-transition">
                        <Terminal className="w-7 h-7 text-black stroke-[3px]" />
                      </div>
                      <div className="space-y-2 mt-6">
                        <span className="block font-sans text-xs sm:text-sm tracking-tight text-zinc-700 uppercase font-semibold">
                          PRO-ASYNCHRONOUS CODE
                        </span>
                        <span className="block font-space-900 text-2xl tracking-tighter uppercase leading-tight">
                          I AM A DEV
                        </span>
                      </div>
                      <div className="mt-4 border-t-2 border-black pt-3 w-full font-inter-700 text-[11px] uppercase tracking-wider text-gray-800">
                        SKIP MEETINGS • WRITE CODE • EARN LIQUID
                      </div>
                    </button>

                    {/* BUTTON B: MARKETER/GROWTH AGENT TRACK */}
                    <button
                      type="button"
                      onClick={() => { setTrack('marketer'); setError(''); }}
                      className="group flex flex-col items-center justify-between p-6 sm:p-8 bg-[#facc15] text-black border-4 border-black rounded-none text-center shadow-[6px_6px_0px_0px_#000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition cursor-pointer select-none"
                    >
                      <div className="w-14 h-14 bg-white border-4 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0px_0px_#000] group-hover:-rotate-6 neo-transition">
                        <Zap className="w-7 h-7 text-black fill-black stroke-[1.5px]" />
                      </div>
                      <div className="space-y-2 mt-6">
                        <span className="block font-sans text-xs sm:text-sm tracking-tight text-zinc-700 uppercase font-semibold">
                          SQUEEZE LEAD PIPELINES
                        </span>
                        <span className="block font-space-900 text-2xl tracking-tighter uppercase leading-tight">
                          I AM A GROWTH AGENT
                        </span>
                      </div>
                      <div className="mt-4 border-t-2 border-black pt-3 w-full font-inter-700 text-[11px] uppercase tracking-wider text-gray-800">
                        GROW CHANNELS • SCALE ACQUISITION • COMMISSION LOCK
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 1: DATA INTAKE (SEQUENTIAL SUB-STEPS) */}
              {track !== '' && step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="space-y-8"
                >
                  {intakeSubStep === 1 ? (
                    /* SUB-STEP 1: IDENTITY Matrix details */
                    <>
                      <div className="space-y-3">
                        <h2 className="text-black font-space-900 leading-[0.9] tracking-tighter uppercase text-4xl sm:text-5xl md:text-6xl">
                          TELL US ABOUT YOURSELF
                        </h2>
                        {track === 'dev' ? (
                          <p className="font-sans text-xs sm:text-sm tracking-tight font-semibold uppercase text-zinc-700">
                            Let's get your details locked in so we can fast-track your developer onboarding.
                          </p>
                        ) : (
                          <p className="font-sans text-xs sm:text-sm tracking-tight font-semibold uppercase text-zinc-700">
                            Let's get your details locked in so we can fast-track your onboarding.
                          </p>
                        )}
                      </div>

                      {error && (
                        <div className="p-4 border-4 border-black bg-[#FF6B6B] text-black font-inter-800 text-xs sm:text-sm uppercase tracking-wide shadow-[4px_4px_0px_0px_#000]">
                          {error}
                        </div>
                      )}

                      <div className="space-y-6 pt-2">
                        {/* INPUT 1: FULL NAME */}
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2 font-space-900 text-sm uppercase tracking-widest text-black">
                            <User className="w-4 h-4 stroke-[3px]" />
                            <span>Full Name:</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleTextChange('name', e.target.value)}
                            placeholder="e.g. ALAN TURING"
                            required
                            className="w-full px-5 py-4 border-4 border-black bg-white font-inter-700 placeholder-gray-400 text-black rounded-none text-base focus:bg-[#facc15] focus:outline-none focus:ring-0 focus:border-black neo-transition"
                          />
                        </div>

                        {/* INPUT 2: EMAIL ADDRESS */}
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2 font-space-900 text-sm uppercase tracking-widest text-black">
                            <Mail className="w-4 h-4 stroke-[3px]" />
                            <span>Email Address:</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => handleTextChange('email', e.target.value)}
                            placeholder="e.g. example@gmail.com"
                            required
                            className="w-full px-5 py-4 border-4 border-black bg-white font-inter-700 placeholder-gray-400 text-black rounded-none text-base focus:bg-[#facc15] focus:outline-none focus:ring-0 focus:border-black neo-transition"
                          />
                        </div>

                        {/* INPUT 3: ACTIVE WHATSAPP NUMBER */}
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2 font-space-900 text-sm uppercase tracking-widest text-black">
                            <Phone className="w-4 h-4 stroke-[3px]" />
                            <span>Active WhatsApp Number:</span>
                          </label>
                          <input
                            type="tel"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={(e) => handleWhatsappChange(e.target.value)}
                            placeholder="e.g. +15550192834"
                            required
                            className="w-full px-5 py-4 border-4 border-black bg-white font-inter-700 placeholder-gray-400 text-black rounded-none text-base focus:bg-[#facc15] focus:outline-none focus:ring-0 focus:border-black neo-transition"
                          />
                        </div>
                      </div>

                      {/* BOTTOM ROW NAVIGATION */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-4 border-black">
                        {!isTrackExplicit ? (
                          <button
                            type="button"
                            onClick={() => setTrack('')}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 border-4 border-black bg-white hover:bg-gray-50 text-black font-space-900 text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition cursor-pointer select-none rounded-none"
                          >
                            <ArrowLeft className="w-4 h-4 mr-2 stroke-[3px]" />
                            RESET TRACK
                          </button>
                        ) : (
                          <div className="hidden sm:block" />
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            if (validateIntake1()) {
                              setError('');
                              setIntakeSubStep(2);
                            }
                          }}
                          className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-4 border-black text-black font-space-900 text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition cursor-pointer select-none rounded-none ${trackTheme.bg} ${trackTheme.borderHover}`}
                        >
                          CONTINUE TO APPLICATION
                          <ArrowRight className="w-4 h-4 ml-2 stroke-[3px]" />
                        </button>
                      </div>
                    </>
                  ) : (
                    /* SUB-STEP 2: Operational and capability details */
                    <>
                      <div className="space-y-3">
                        <h2 className="text-black font-space-900 leading-[0.9] tracking-tighter uppercase text-4xl sm:text-5xl md:text-6xl">
                          YOUR BACKGROUND
                        </h2>
                        {track === 'dev' ? (
                          <p className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                            Drop your links and core stack below so we can verify your application.
                          </p>
                        ) : (
                          <p className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                            Drop your links and strategy below so we can verify your application.
                          </p>
                        )}
                      </div>

                      {error && (
                        <div className="p-4 border-4 border-black bg-[#FF6B6B] text-black font-inter-800 text-xs sm:text-sm uppercase tracking-wide shadow-[4px_4px_0px_0px_#000]">
                          {error}
                        </div>
                      )}

                      <div className="space-y-6 pt-2">
                        {track === 'dev' ? (
                          <>
                            {/* DEV FIELD 1: GITHUB */}
                            <div className="space-y-2">
                              <label className="flex items-center space-x-2 font-space-900 text-sm uppercase tracking-widest text-black">
                                <GithubIcon className="w-4 h-4 stroke-[3px]" />
                                <span>GitHub or Project Repository Link:</span>
                              </label>
                              <input
                                type="url"
                                name="github"
                                value={formData.github}
                                onChange={(e) => handleTextChange('github', e.target.value)}
                                placeholder="e.g. github.com/operator"
                                required
                                className="w-full px-5 py-4 border-4 border-black bg-white font-inter-700 placeholder-gray-400 text-black rounded-none text-base focus:bg-[#facc15] focus:outline-none focus:ring-0 focus:border-black neo-transition"
                              />
                            </div>

                            {/* DEV FIELD 2: PROGRAMMING STACK */}
                            <div className="space-y-2">
                              <label className="flex items-center space-x-2 font-space-900 text-sm uppercase tracking-widest text-black">
                                <Code2 className="w-4 h-4 stroke-[3px]" />
                                <span>Primary Language Stack / Toolkit:</span>
                              </label>
                              <input
                                type="text"
                                name="stack"
                                value={formData.stack}
                                onChange={(e) => handleTextChange('stack', e.target.value)}
                                placeholder="e.g. Next.js, Rust, Go, Solidity"
                                required
                                className="w-full px-5 py-4 border-4 border-black bg-white font-inter-700 placeholder-gray-400 text-black rounded-none text-base focus:bg-[#facc15] focus:outline-none focus:ring-0 focus:border-black neo-transition"
                              />
                            </div>

                            {/* DEV FIELD 3: ADDITIONAL INFO */}
                            <div className="space-y-2">
                              <label className="flex items-center space-x-2 font-sans text-xs text-zinc-700 tracking-tight font-semibold uppercase">
                                <span>ANYTHING ELSE WE SHOULD KNOW ABOUT YOU?</span>
                              </label>
                              <textarea
                                name="additionalInfo"
                                value={formData.additionalInfo}
                                onChange={(e) => handleTextChange('additionalInfo', e.target.value)}
                                placeholder="e.g. past projects, cool hackathons, or what you are currently building..."
                                rows={3}
                                className="w-full px-5 py-4 border-4 border-black bg-white font-inter-700 placeholder-gray-400 text-black rounded-none text-base focus:bg-[#facc15] focus:outline-none focus:ring-0 focus:border-black neo-transition resize-none"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            {/* MARKETER FIELD 1: PORTFOLIO */}
                            <div className="space-y-2">
                              <label className="flex items-center space-x-2 font-space-900 text-sm uppercase tracking-widest text-black">
                                <Globe className="w-4 h-4 stroke-[3px]" />
                                <span>LinkedIn or Professional Portfolio Link:</span>
                              </label>
                              <input
                                type="url"
                                name="portfolio"
                                value={formData.portfolio}
                                onChange={(e) => handleTextChange('portfolio', e.target.value)}
                                placeholder="e.g. linkedin.com/in/growthoperator"
                                required
                                className="w-full px-5 py-4 border-4 border-black bg-white font-inter-700 placeholder-gray-400 text-black rounded-none text-base focus:bg-[#facc15] focus:outline-none focus:ring-0 focus:border-black neo-transition"
                              />
                            </div>

                            {/* MARKETER FIELD 2: STRATEGY */}
                            <div className="space-y-2">
                              <label className="flex items-center space-x-2 font-space-900 text-sm uppercase tracking-widest text-black">
                                <HelpCircle className="w-4 h-4 stroke-[3px]" />
                                <span>Primary Target Markets & Lead Sourcing Method:</span>
                              </label>
                              <textarea
                                name="strategy"
                                value={formData.strategy}
                                onChange={(e) => handleTextChange('strategy', e.target.value)}
                                placeholder="e.g. Cold Email pipelines, direct networking, active growth communities"
                                rows={3}
                                required
                                className="w-full px-5 py-4 border-4 border-black bg-white font-inter-700 placeholder-gray-400 text-black rounded-none text-base focus:bg-[#facc15] focus:outline-none focus:ring-0 focus:border-black neo-transition resize-none"
                              />
                            </div>
                          </>
                        )}

                        {/* UNIVERSAL LEGAL GATE CHECKBOX */}
                        <div 
                          onClick={handleCheckboxChange}
                          className="flex items-start gap-4 p-4 border-4 border-black bg-white hover:bg-gray-50 cursor-pointer select-none neo-transition"
                        >
                          <div className="shrink-0 mt-0.5">
                            <div className={`w-8 h-8 border-4 border-black flex items-center justify-center rounded-none neo-transition ${formData.ageChecked ? trackTheme.bg : 'bg-white'}`}>
                              {formData.ageChecked && <Check className="w-5 h-5 text-black stroke-[4px]" />}
                            </div>
                          </div>
                          <span className="font-inter-700 text-xs sm:text-sm text-black leading-relaxed">
                            I verify that I am at least 18 years old, OR I am operating under the direct supervision and permission of my parent or legal guardian.
                          </span>
                        </div>
                      </div>

                      {/* BOTTOM ROW NAVIGATION */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-4 border-black">
                        <button
                          type="button"
                          disabled={isSendingOtp}
                          onClick={() => setIntakeSubStep(1)}
                          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 border-4 border-black bg-white hover:bg-gray-50 text-black font-space-900 text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition cursor-pointer select-none disabled:opacity-50 rounded-none"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2 stroke-[3px]" />
                          BACK DETAILS
                        </button>

                        <button
                          type="button"
                          disabled={isSendingOtp}
                          onClick={handleIntakeSubmit}
                          className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-4 border-black text-black font-space-900 text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition cursor-pointer select-none disabled:opacity-50 rounded-none ${trackTheme.bg} ${trackTheme.borderHover}`}
                        >
                          {track === 'dev' ? 'CONTINUE' : (isSendingOtp ? 'TRANSMITTING OTP...' : 'SEND VERIFICATION CODE')}
                          <ArrowRight className="w-4 h-4 ml-2 stroke-[3px]" />
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {/* DEVELOPER QUESTIONNAIRE (STEP 2 FOR DEV) */}
              {track === 'dev' && step === 2 && (
                <motion.div
                  key="dev-questionnaire"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="space-y-8"
                >
                  <div className="space-y-3">
                    <h2 className="text-black font-space-900 leading-[0.9] tracking-tighter uppercase text-4xl sm:text-5xl md:text-6xl">
                      A FEW QUICK QUESTIONS
                    </h2>
                    <p className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider text-gray-700">
                      Help us understand how you like to build software so we can match you with the right teams.
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 border-4 border-black bg-[#FF6B6B] text-black font-inter-800 text-xs sm:text-sm uppercase tracking-wide shadow-[4px_4px_0px_0px_#000]">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleDeveloperQuestionnaireSubmit} className="space-y-6 pt-2">
                    
                    {/* INNER QUESTION CARD CONTAINER */}
                    <div className="w-full bg-[#fcfcfc] border-4 border-black p-6 my-6 shadow-[4px_4px_0px_0px_#000] rounded-none">
                      
                      {/* Mini Mini-Progress Badge */}
                      <div className="bg-black text-white px-2 py-1 text-[10px] font-black uppercase tracking-wider mb-4 inline-block">
                        Q{qSubStep} / 3
                      </div>

                      {/* DYNAMIC CONTENT RENDERING WITHIN THE CARD */}
                      {qSubStep === 1 && (
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <label className="flex items-center space-x-2 font-sans font-bold text-sm uppercase tracking-wider text-black">
                              <span>1. WHAT IS YOUR STANCE ON VIBE CODING?</span>
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full my-6 text-center items-stretch">
                              {[
                                "I vibe code everything completely!",
                                "I vibe code sometimes but write pure logic too.",
                                "No way, I only write pure logic without AI!"
                              ].map((option) => (
                                <div
                                  key={option}
                                  onClick={() => {
                                    handleTextChange('vibeCodeOption', option);
                                    if (option === "No way, I only write pure logic without AI!") {
                                      handleTextChange('aiToolsUsed', '');
                                    }
                                  }}
                                  className={`flex flex-col items-center justify-center p-5 border-4 border-black min-h-[140px] text-center cursor-pointer select-none transition-all rounded-none ${
                                    formData.vibeCodeOption === option 
                                      ? 'bg-[#C4B5FD] translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_#000]' 
                                      : 'bg-white shadow-[4px_4px_0px_0px_#000] hover:bg-gray-50'
                                  }`}
                                >
                                  <span className="text-center font-sans font-black text-sm text-black tracking-tight uppercase leading-snug">
                                    {option}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* SLIDING TOOL PANEL IF OPTION 1 OR 2 IS SELECTED */}
                          <AnimatePresence>
                            {(formData.vibeCodeOption === "I vibe code everything completely!" ||
                              formData.vibeCodeOption === "I vibe code sometimes but write pure logic too.") && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-2 pt-1 pb-2">
                                  <label className="flex items-center space-x-2 font-sans text-sm tracking-tight text-black font-bold uppercase">
                                    <span>WHICH AI TOOLS DO YOU DEPLOY IN YOUR DEVELOPMENT ENGINE?</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="aiToolsUsed"
                                    value={formData.aiToolsUsed}
                                    onChange={(e) => handleTextChange('aiToolsUsed', e.target.value)}
                                    placeholder="e.g. Cursor, GitHub Copilot, ChatGPT, Claude..."
                                    className="w-full px-5 py-4 border-4 border-black bg-white font-sans font-semibold placeholder-gray-400 text-black rounded-none text-sm tracking-tight focus:bg-[#facc15] focus:outline-none focus:ring-0 focus:border-black neo-transition"
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      {qSubStep === 2 && (
                        <div className="space-y-3">
                          <label className="flex items-center space-x-2 font-sans font-bold text-sm uppercase tracking-wider text-black">
                            <span>2. HOW LONG HAVE YOU BEEN AN INDEPENDENT CREATOR / BUILDER?</span>
                          </label>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="font-sans text-sm tracking-tight text-black font-bold uppercase">Years:</label>
                              <input
                                type="number"
                                min="0"
                                max="50"
                                name="expYears"
                                value={formData.expYears}
                                onChange={(e) => handleTextChange('expYears', e.target.value)}
                                placeholder="Years (e.g. 2)"
                                className="w-full px-5 py-4 border-4 border-black bg-white font-sans font-semibold placeholder-gray-400 text-black rounded-none text-sm tracking-tight focus:bg-[#facc15] focus:outline-none focus:ring-0 focus:border-black neo-transition"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-sans text-sm tracking-tight text-black font-bold uppercase">Months:</label>
                              <input
                                type="number"
                                min="0"
                                max="11"
                                name="expMonths"
                                value={formData.expMonths}
                                onChange={(e) => handleTextChange('expMonths', e.target.value)}
                                placeholder="Months (e.g. 6)"
                                className="w-full px-5 py-4 border-4 border-black bg-white font-sans font-semibold placeholder-gray-400 text-black rounded-none text-sm tracking-tight focus:bg-[#facc15] focus:outline-none focus:ring-0 focus:border-black neo-transition"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {qSubStep === 3 && (
                        <div className="space-y-3">
                          <label className="flex items-center space-x-2 font-sans font-bold text-sm uppercase tracking-wider text-black">
                            <span>3. WHICH OF THESE BEST DESCRIBES YOUR PROFILE ROLE?</span>
                          </label>
                          <div className="grid grid-cols-2 gap-4 w-full my-4 items-stretch">
                            {[
                              { role: "College / University Student", icon: <GraduationCap size={24} strokeWidth={2} /> },
                              { role: "Independent Freelancer / Contractor", icon: <Briefcase size={24} strokeWidth={2} /> },
                              { role: "Full-Time Software Engineer", icon: <Terminal size={24} strokeWidth={2} /> },
                              { role: "Self-Taught / Hobbyist Developer", icon: <Zap size={24} strokeWidth={2} /> }
                            ].map(({ role, icon }) => (
                              <div
                                key={role}
                                onClick={() => handleTextChange('roleBestFit', role)}
                                className={`flex flex-col items-center justify-center p-4 border-4 border-black min-h-[110px] sm:min-h-[130px] text-center cursor-pointer select-none transition-all duration-150 rounded-none ${
                                  formData.roleBestFit === role 
                                    ? 'bg-[#C4B5FD] text-black translate-x-[3px] translate-y-[3px] shadow-[1px_1px_0px_0px_#000]' 
                                    : 'bg-white text-black shadow-[4px_4px_0px_0px_#000] hover:bg-zinc-50 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#000]'
                                }`}
                              >
                                <div className="text-2xl mb-2 block text-black grayscale opacity-100">
                                  {icon}
                                </div>
                                <span className="font-sans text-xs sm:text-sm font-black uppercase tracking-tight text-center leading-tight px-2 text-black">
                                  {role}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>

                    {/* DYNAMIC ACTION BUTTON ROW ALIGNMENT (OUTSIDE THE CARD) */}
                    {qSubStep === 1 && (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-4 border-black">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 border-4 border-black bg-white hover:bg-gray-50 text-black font-space-900 text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition cursor-pointer select-none rounded-none"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2 stroke-[3px]" />
                          ← BACK
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (validateQSubStep1()) {
                              setQSubStep(2);
                            }
                          }}
                          className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-4 border-black text-black font-space-900 text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition cursor-pointer select-none rounded-none ${trackTheme.bg} ${trackTheme.borderHover}`}
                        >
                          NEXT QUESTION ➔
                        </button>
                      </div>
                    )}

                    {qSubStep === 2 && (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-4 border-black">
                        <button
                          type="button"
                          onClick={() => setQSubStep(1)}
                          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 border-4 border-black bg-white hover:bg-gray-50 text-black font-space-900 text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition cursor-pointer select-none rounded-none"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2 stroke-[3px]" />
                          ← BACK
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (validateQSubStep2()) {
                              setQSubStep(3);
                            }
                          }}
                          className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-4 border-black text-black font-space-900 text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition cursor-pointer select-none rounded-none ${trackTheme.bg} ${trackTheme.borderHover}`}
                        >
                          NEXT QUESTION ➔
                        </button>
                      </div>
                    )}

                    {qSubStep === 3 && (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-4 border-black mt-6">
                        <button
                          type="button"
                          onClick={() => setQSubStep(2)}
                          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 border-4 border-black bg-white hover:bg-gray-50 text-black font-space-900 text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition cursor-pointer select-none rounded-none"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2 stroke-[3px]" />
                          ← BACK
                        </button>

                        <button
                          type="submit"
                          disabled={isSendingOtp}
                          className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-4 border-black text-black font-space-900 text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition cursor-pointer select-none disabled:opacity-50 rounded-none ${trackTheme.bg} ${trackTheme.borderHover}`}
                        >
                          {isSendingOtp ? 'TRANSMITTING OTP...' : 'PROCEED TO EMAIL VERIFICATION ➔'}
                        </button>
                      </div>
                    )}
                  </form>
                </motion.div>
              )}

              {/* STEP 3 (STEP 2 FOR MARKETER): LIVE OTP INPUT SCREEN */}
              {track !== '' && step === (track === 'dev' ? 3 : 2) && (
                <motion.div
                  key="step-otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="space-y-8"
                >
                  <div className="space-y-3 text-center">
                    <h2 className="text-black font-space-900 leading-[0.9] tracking-tighter uppercase text-4xl sm:text-5xl md:text-6xl text-center">
                      CHECK YOUR INBOX!
                    </h2>
                    <Mail className="w-20 h-20 text-black stroke-[1.5] mx-auto my-4 block opacity-95" />
                    <p className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider text-gray-700 max-w-md mx-auto pt-2 leading-relaxed">
                      We just emailed a 6-digit verification code to you. Paste it below to unlock your application and join the network.
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 border-4 border-black bg-[#FF6B6B] text-black font-inter-800 text-xs sm:text-sm uppercase tracking-wide shadow-[4px_4px_0px_0px_#000]">
                      {error}
                    </div>
                  )}

                  {/* OTP INPUT LAYOUT */}
                  <form onSubmit={handleFinalSubmit} className="space-y-8 pt-2">
                    <div className="space-y-4">
                      <div className="relative max-w-xs mx-auto">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 select-none">
                          <Lock className="w-5 h-5 text-black stroke-[3px]" />
                        </div>
                        <input
                          type="text"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          value={formData.otpCode}
                          onChange={handleOtpChange}
                          placeholder="000000"
                          required
                          className="w-full pl-12 pr-4 py-5 border-4 border-black bg-white text-center font-space-900 text-3xl text-black tracking-[0.6em] rounded-none focus:bg-[#facc15] focus:outline-none focus:ring-0 focus:border-black neo-transition shadow-[4px_4px_0px_0px_#000]"
                          maxLength={6}
                        />
                      </div>
                      <div className="text-center font-sans text-xs sm:text-sm tracking-tight text-zinc-700 font-medium">
                        Enter the 6-digit code sent to your email.
                      </div>
                    </div>

                    {/* BOTTOM ROW ACTIONS */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-4 border-black">
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => setStep(track === 'dev' ? 2 : 1)}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 border-4 border-black bg-white hover:bg-gray-50 text-black font-space-900 text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition cursor-pointer select-none disabled:opacity-50 rounded-none"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2 stroke-[3px]" />
                        BACK DIRECTORY
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-4 border-black text-black font-space-900 text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition cursor-pointer select-none disabled:opacity-50 rounded-none ${trackTheme.bg} ${trackTheme.borderHover}`}
                      >
                        {submissionStatus === 'loading' ? (
                          'TRANSMITTING DATA...'
                        ) : submissionStatus === 'success' ? (
                          'APPLICATION SECURED. INITIALIZING REVIEW...'
                        ) : (
                          'VERIFY CODE & SUBMIT'
                        )}
                        <ArrowRight size={16} strokeWidth={2.5} className="inline-block ml-2" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 3 OR 4: SUCCESS GATEWAY (VICTORY SCREEN) */}
              {track !== '' && step === (track === 'dev' ? 4 : 3) && (
                <motion.div
                  key="step-success"
                  initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.9, opacity: 0, rotate: 2 }}
                  transition={{ type: "spring", duration: 0.4 }}
                  className="text-center space-y-8 py-4"
                >
                  {/* Victory Corner Badge */}
                  <div className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 md:-top-12 md:-right-12 border-l-4 border-b-4 border-black bg-[#86EFAC] text-black px-4 py-2 text-[10px] sm:text-xs font-sans font-black uppercase tracking-wider select-none rounded-none z-30">
                    YAAYY YOUR JOB IS DONE!
                  </div>

                  {/* Victory Header Badge */}
                  <div className="flex justify-center">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 select-none border-4 border-black rounded-full bg-white shadow-[6px_6px_0px_0px_#000]">
                      <circle cx="50" cy="50" r="46" fill="white"/>
                      <path d="M 50 96 L 14 30 L 24 14 L 32 35 L 68 35 L 76 14 L 86 30 Z" fill="black"/>
                      <circle cx="38" cy="48" r="5.5" fill="white"/>
                      <circle cx="62" cy="48" r="5.5" fill="white"/>
                      <path d="M 40 61 C 40 68, 48 68, 50 62 C 52 68, 60 68, 60 61" stroke="white" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </div>

                  {/* Victory Typography */}
                  <div className="space-y-6">

                    <h3 className="font-space-900 text-3xl sm:text-4xl uppercase tracking-tighter leading-none">
                      THANK YOU FOR APPLYING AT THE KELLY NETWORK!!
                    </h3>

                    {/* HORIZONTAL PROGRESS TRACKER CARD MATRIX */}
                    <div className="grid grid-cols-3 border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000] divide-x-4 divide-black text-center rounded-none my-6 overflow-hidden">
                      
                      {/* COLUMN 1 / STEP 01 */}
                      <div className="p-4 flex flex-col items-center justify-center space-y-2 bg-[#86EFAC] text-black">
                        <span className="font-black text-sm border-2 border-black rounded-none px-2 py-0.5 bg-white text-black shadow-[2px_2px_0px_0px_#000]">[ ✓ ]</span>
                        <div className="flex flex-col">
                          <span className="font-space-900 text-[10px] sm:text-xs uppercase text-black leading-tight">1. Application</span>
                          <span className="text-zinc-700 text-xs sm:text-sm tracking-tight font-medium font-sans">SUBMITTED</span>
                        </div>
                      </div>

                      {/* COLUMN 2 / STEP 02 */}
                      <div className="p-4 bg-white flex flex-col items-center justify-center space-y-2 text-black">
                        <Zap className="w-6 h-6 stroke-[1.75] text-black mx-auto mb-1 block animate-pulse" />
                        <div className="flex flex-col">
                          <span className="font-space-900 text-[10px] sm:text-xs uppercase text-black leading-tight">2. Manual Review</span>
                          <span className="text-black text-xs sm:text-sm font-semibold tracking-tight animate-pulse font-sans">IN PROGRESS</span>
                        </div>
                      </div>

                      {/* COLUMN 3 / STEP 03 */}
                      <div className="p-4 bg-gray-100 flex flex-col items-center justify-center space-y-2 text-gray-500">
                        <Lock className="w-6 h-6 stroke-[1.75] text-zinc-400 mx-auto mb-1 block" />
                        <div className="flex flex-col">
                          <span className="font-space-900 text-[10px] sm:text-xs uppercase text-gray-500 leading-tight">3. Discord Key</span>
                          <span className="text-xs sm:text-sm font-medium text-zinc-400 font-sans">LOCKED VIA GATE</span>
                        </div>
                      </div>

                    </div>

                    {/* INTEGRATE EXPECTED RESPONSE NOTATION */}
                    <div className="pt-2">
                      <div className="bg-[#facc15] border-4 border-black shadow-[4px_4px_0px_0px_#000] py-2.5 px-6 inline-block font-space-900 text-xs sm:text-sm tracking-wide uppercase text-black rounded-none">
                        <Clock className="inline-block w-4 h-4 stroke-[2] text-black mr-2 align-text-top" /> STATUS NOTE: WE TYPICALLY REPLY WITHIN 12 HOURS
                      </div>
                    </div>

                    {/* CAPTION FOOTER */}
                    <p className="font-sans text-xs text-zinc-600 font-medium tracking-tight max-w-md mx-auto leading-relaxed pt-6">
                      We will message your link directly via WhatsApp or Email. Keep an eye on your device notifications!
                    </p>

                  </div>

                  {/* Success Gateway Actions */}
                  <div className="pt-2">
                    <a
                      href="/"
                      className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 border-4 border-black text-black font-space-900 text-base uppercase tracking-widest shadow-[6px_6px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition select-none cursor-pointer bg-white hover:bg-zinc-50"
                    >
                      ← RETURN HOME
                    </a>
                  </div>
                </motion.div>
              )}

              {/* STEP 4 OR 5: PERMANENT LOCKOUT SCREEN (DUAL-LAYER SPAM BLOCK) */}
              {step === (track === 'dev' ? 5 : 4) && (
                <motion.div
                  key="step-4"
                  initial={{ scale: 0.9, opacity: 0, rotate: 2 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.9, opacity: 0, rotate: -2 }}
                  transition={{ type: "spring", duration: 0.4 }}
                  className="text-center space-y-8 py-4"
                >
                  {/* Warning Header Security Badge */}
                  <div className="flex justify-center">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 select-none border-4 border-black rounded-full bg-white shadow-[6px_6px_0px_0px_#000]">
                      <circle cx="50" cy="50" r="46" fill="white"/>
                      <path d="M 50 96 L 14 30 L 24 14 L 32 35 L 68 35 L 76 14 L 86 30 Z" fill="black"/>
                      <circle cx="38" cy="48" r="5.5" fill="white"/>
                      <circle cx="62" cy="48" r="5.5" fill="white"/>
                      <path d="M 40 61 C 40 68, 48 68, 50 62 C 52 68, 60 68, 60 61" stroke="white" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </div>

                  {/* Warning Typography */}
                  <div className="space-y-4">
                    <div className="inline-block rotate-1 border-4 border-black font-black uppercase text-xs sm:text-sm tracking-wide px-4 py-2 bg-[#4ade80] text-black shadow-[4px_4px_0px_0px_#000] select-none">
                      APPLICATION SAVED! 📂
                    </div>
                    <h3 className="font-space-900 text-3xl sm:text-4xl uppercase tracking-tighter leading-none pt-2">
                      YOU'RE ALREADY IN THE QUEUE!
                    </h3>
                    
                    <div className="w-16 h-1 bg-black mx-auto my-3" />
                    
                    <p className="font-inter-700 text-base sm:text-lg tracking-wider text-black max-w-md mx-auto pt-1 leading-relaxed">
                      We have already received an application from this device.
                    </p>
                    
                    <p className="font-sans text-xs sm:text-sm text-zinc-700 font-medium tracking-tight max-w-xs mx-auto leading-relaxed pt-2">
                      Our team is currently reviewing your profile. We will send your private, single-use Discord invite link directly to your WhatsApp number or email within 12 hours!
                    </p>
                  </div>

                  {/* Return Home Actions */}
                  <div className="pt-4 text-center">
                    <a
                      href="/"
                      className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 border-4 border-black bg-white hover:bg-gray-50 text-black font-space-900 text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none neo-transition select-none cursor-pointer text-center rounded-none"
                    >
                      ← RETURN HOME
                    </a>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

      </main>

      {/* ─── FOOTER (NEO-BRUTALIST SOLID BLACK BLOCK) ─── */}
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
