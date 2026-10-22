import React, { useState } from 'react'
import { Sparkles, ArrowUp, CheckCircle, Globe, Shield, X } from 'lucide-react'

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export default function FinalCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [reservedSerial, setReservedSerial] = useState(null)

  const handleReserve = (e) => {
    e.preventDefault()
    if (!email) return
    const randomSerial = 'RES-2026-' + Math.floor(1000 + Math.random() * 9000)
    setReservedSerial(randomSerial)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="reserve" className="relative bg-[#08090C] text-white pt-24 pb-12 px-4 md:px-8 border-t border-white/10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FF4D26]/10 blur-[150px] pointer-events-none rounded-full"></div>

      <div className="max-w-5xl mx-auto z-10 space-y-16">
        {/* Main CTA Box */}
        <div className="rounded-3xl bg-gradient-to-b from-[#181B24] to-[#101217] border border-white/20 p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden space-y-6">
          {/* Subtle Corner Markers */}
          <div className="absolute top-4 left-4 font-mono text-[9px] text-zinc-600">
            [SYS_BUILD: 2026.1]
          </div>
          <div className="absolute top-4 right-4 font-mono text-[9px] text-[#00F59B]">
            ● OPEN ALLOCATIONS
          </div>

          {/* Allocation Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 font-mono text-xs text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-pulse"></span>
            <span>EDITION: BATCH 01 — 500 UNITS GLOBALLY</span>
            <span className="text-zinc-600">|</span>
            <span className="text-[#FF4D26] font-bold">342 ALLOCATED</span>
          </div>

          {/* Title */}
          <h2
            className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight max-w-3xl mx-auto leading-none"
            style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
          >
            CLAIM YOUR SPOT IN{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D26] via-[#ff7c5c] to-white">
              BATCH 01.
            </span>
          </h2>

          <p className="max-w-lg mx-auto text-zinc-400 text-sm sm:text-base font-sans">
            Each instrument is individually machined, hand-assembled, and serial-engraved in limited production cycles. Worldwide priority shipping begins Q4 2026.
          </p>

          {/* Action Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-full bg-[#FF4D26] hover:bg-[#ff613d] text-white font-mono text-sm font-bold tracking-wider laser-glow transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>RESERVE SYNTH-01 // $599 USD</span>
            </button>
          </div>

          <div className="font-mono text-[11px] text-zinc-500 pt-2 flex justify-center items-center gap-4">
            <span>NO UPFRONT PAYMENT REQUIRED</span>
            <span>•</span>
            <span>30-DAY HASSLE-FREE TRIAL</span>
          </div>
        </div>

        {/* Agency Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/10 font-mono text-xs text-zinc-400">
          {/* Creator Credit */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="text-white font-bold flex items-center gap-2">
              <span>SYNTH-01 : TACTILE KINETIC INSTRUMENT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B]"></span>
            </div>
            <div>
              Engineered & Crafted by{' '}
              <a
                href="https://abiyyu-portfolio.netlify.app/"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-[#FF4D26] transition-colors underline decoration-white/30 underline-offset-4"
              >
                Abiyyu Shiddiq As'ad (KaptenBiu)
              </a>
            </div>
          </div>

          {/* External Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Biw-id/synth-zero"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GITHUB REPO</span>
            </a>
            <a
              href="https://abiyyu-portfolio.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4 text-[#00F59B]" />
              <span>PORTFOLIO</span>
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors cursor-pointer"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="text-center font-mono text-[10px] text-zinc-600">
          © 2026 SYNTH-01 KINETIC AUDIO LABS. ALL RIGHTS RESERVED. DESIGN INSPIRED BY TEENAGE ENGINEERING & NOTHING TECH.
        </div>
      </div>

      {/* Reservation Interactive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-[#12141A] border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => {
                setIsModalOpen(false)
                setReservedSerial(null)
              }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!reservedSerial ? (
              <form onSubmit={handleReserve} className="space-y-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#FF4D26]/10 border border-[#FF4D26]/30 font-mono text-[10px] text-[#FF4D26]">
                    <span>PRIORITY QUEUE</span>
                  </div>
                  <h3
                    className="text-2xl font-black text-white uppercase"
                    style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
                  >
                    RESERVE BATCH 01
                  </h3>
                  <p className="text-zinc-400 text-xs font-sans">
                    Enter your email to secure your hardware production slot and receive your reservation certificate.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[11px] text-zinc-400">
                    CONTACT EMAIL ADDRESS:
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-[#FF4D26]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#FF4D26] hover:bg-[#ff613d] text-white font-mono text-xs font-bold tracking-wider laser-glow transition-all cursor-pointer"
                >
                  CONFIRM ALLOCATION
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-center py-2">
                <div className="w-12 h-12 rounded-full bg-[#00F59B]/20 border border-[#00F59B] text-[#00F59B] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3
                  className="text-2xl font-black text-white uppercase"
                  style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
                >
                  ALLOCATION SECURED
                </h3>
                <div className="p-4 rounded-xl bg-black/60 border border-[#00F59B]/40 font-mono space-y-1">
                  <div className="text-[10px] text-zinc-500">RESERVATION SERIAL ID</div>
                  <div className="text-base text-[#00F59B] font-bold tracking-widest">
                    {reservedSerial}
                  </div>
                  <div className="text-[10px] text-zinc-400 pt-1">
                    SLOT: #159 OF 500 UNITS • BATCH 01
                  </div>
                </div>
                <p className="text-zinc-400 text-xs font-sans">
                  A verification confirmation has been generated for{' '}
                  <span className="text-white font-mono font-semibold">{email}</span>.
                </p>
                <button
                  onClick={() => {
                    setIsModalOpen(false)
                    setReservedSerial(null)
                    setEmail('')
                  }}
                  className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
                >
                  CLOSE DIALOG
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  )
}
