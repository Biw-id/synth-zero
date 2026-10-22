import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sliders, Disc, Cpu, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function PinnedDeck() {
  const containerRef = useRef(null)
  const slidesRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)

  // Sequencer live demo state
  const [seqStep, setSeqStep] = useState(0)
  const [filterFreq, setFilterFreq] = useState(2400)
  const [filterRes, setFilterRes] = useState(72)

  // Running sequencer LED playhead simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSeqStep((prev) => (prev + 1) % 16)
    }, 180)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.deck-slide')
      const totalSlides = slides.length

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalSlides * 100}%`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const current = Math.min(
              totalSlides - 1,
              Math.floor(self.progress * totalSlides)
            )
            setActiveSlide(current)
          },
        },
      })

      // Horizontal sliding presentation
      tl.to(slidesRef.current, {
        xPercent: -100 * (totalSlides - 1) / totalSlides,
        ease: 'none',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const slidesData = [
    {
      id: '01',
      title: 'DUAL ANALOG FILTER',
      subtitle: 'VOLTAGE-CONTROLLED 24dB/OCT STATE VARIABLE FILTER',
      description:
        'Sculpt harmonic frequencies with pristine warmth and zero digital aliasing. Featuring switchable lowpass, bandpass, and highpass poles with self-oscillating resonance peaks.',
      icon: Sliders,
      tag: 'ACOUSTIC SCULPTING',
    },
    {
      id: '02',
      title: 'TACTILE MECHANICAL ENCODERS',
      subtitle: 'ALPS ALPINE 96-PULSE ROTARY DETENTS',
      description:
        'Machined aluminum knobs with micro-knurled grips provide micro-millimeter physical haptic confirmation. Every turn maps instantaneously to internal DSP voltage sweeps.',
      icon: Disc,
      tag: 'PHYSICAL HAPTICS',
    },
    {
      id: '03',
      title: '16-STEP KINETIC SEQUENCER',
      subtitle: 'POLYMETRIC TIME ENGINE WITH RATCHET & SWING',
      description:
        'Chain complex rhythmic patterns in real-time. Features individual per-step velocity, micro-timing nudge, probability triggers, and continuous MIDI clock synchronization.',
      icon: Cpu,
      tag: 'KINETIC COMPOSITION',
    },
  ]

  return (
    <section
      ref={containerRef}
      id="deck"
      className="relative min-h-screen flex flex-col justify-between py-12 px-4 md:px-8 bg-[#0D0F14] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[#FF4D26]/5 blur-[130px] pointer-events-none rounded-full"></div>

      {/* Deck Header & Step Indicator */}
      <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-20 pb-4 border-b border-white/10 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF4D26] animate-pulse"></span>
          <span className="text-white font-bold tracking-widest uppercase">
            ENGINEERING SPECIFICATION // ACT 03
          </span>
        </div>

        {/* Slide Tracker Dots & Monospaced Counter */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === idx
                    ? 'w-8 bg-[#FF4D26] laser-glow-sm'
                    : 'w-2 bg-white/20'
                }`}
              ></div>
            ))}
          </div>
          <span className="text-zinc-400">
            [0{activeSlide + 1} / 03]
          </span>
        </div>
      </div>

      {/* Slides Container */}
      <div className="relative w-full max-w-6xl mx-auto my-auto z-10 overflow-hidden py-6">
        <div
          ref={slidesRef}
          className="flex will-change-transform"
          style={{ width: '300%' }}
        >
          {/* SLIDE 1: FILTER ENGINE */}
          <div className="deck-slide w-1/3 px-3 sm:px-6">
            <div className="rounded-2xl bg-[#12141A] border border-white/15 p-6 md:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text Specs */}
              <div className="lg:col-span-6 space-y-4 font-sans">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF4D26]/10 border border-[#FF4D26]/30 font-mono text-[10px] text-[#FF4D26]">
                  <span>{slidesData[0].tag}</span>
                </div>
                <h3
                  className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase"
                  style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
                >
                  {slidesData[0].title}
                </h3>
                <div className="font-mono text-xs text-[#00F59B]">
                  {slidesData[0].subtitle}
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {slidesData[0].description}
                </p>

                {/* Live Filter Controls */}
                <div className="pt-4 space-y-3 font-mono text-xs border-t border-white/10">
                  <div className="flex justify-between text-zinc-300">
                    <span>CUTOFF FREQUENCY:</span>
                    <span className="text-[#FF4D26] font-bold">{filterFreq} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="8000"
                    step="50"
                    value={filterFreq}
                    onChange={(e) => setFilterFreq(Number(e.target.value))}
                    className="w-full accent-[#FF4D26] cursor-pointer"
                  />
                  <div className="flex justify-between text-zinc-300">
                    <span>RESONANCE (Q):</span>
                    <span className="text-[#00F59B] font-bold">{filterRes}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="99"
                    value={filterRes}
                    onChange={(e) => setFilterRes(Number(e.target.value))}
                    className="w-full accent-[#00F59B] cursor-pointer"
                  />
                </div>
              </div>

              {/* Graphic Display: Frequency Response Curve SVG */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="rounded-xl bg-[#090A0D] border border-white/15 p-5 shadow-inner space-y-3">
                  <div className="flex justify-between font-mono text-[10px] text-zinc-400 border-b border-white/10 pb-2">
                    <span>FILTER TOPOLOGY: 4-POLE CASCADED OTA</span>
                    <span className="text-[#00F59B]">-24 dB / OCTAVE</span>
                  </div>

                  {/* SVG Response Curve */}
                  <div className="h-48 w-full flex items-center justify-center relative">
                    <svg
                      className="w-full h-full stroke-[#FF4D26] fill-none"
                      viewBox="0 0 300 120"
                    >
                      {/* Grid background lines */}
                      <line x1="0" y1="30" x2="300" y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 2" />
                      <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 2" />
                      <line x1="0" y1="90" x2="300" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 2" />

                      {/* Dynamic Frequency Response Curve */}
                      <path
                        d={`M 10 30 L ${Math.min(220, 30 + (filterFreq / 8000) * 180)} 30 Q ${Math.min(250, 40 + (filterFreq / 8000) * 190)} ${Math.max(8, 30 - filterRes * 0.28)} ${Math.min(290, 80 + (filterFreq / 8000) * 200)} 110`}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Resonance peak dot */}
                      <circle
                        cx={Math.min(250, 40 + (filterFreq / 8000) * 190)}
                        cy={Math.max(8, 30 - filterRes * 0.28)}
                        r="4"
                        fill="#00F59B"
                      />
                    </svg>
                  </div>

                  <div className="flex justify-between font-mono text-[9px] text-zinc-500">
                    <span>20 Hz</span>
                    <span>100 Hz</span>
                    <span>1 kHz</span>
                    <span>10 kHz</span>
                    <span>20 kHz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 2: TACTILE MECHANICAL ENCODERS */}
          <div className="deck-slide w-1/3 px-3 sm:px-6">
            <div className="rounded-2xl bg-[#12141A] border border-white/15 p-6 md:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text Specs */}
              <div className="lg:col-span-6 space-y-4 font-sans">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#00F59B]/10 border border-[#00F59B]/30 font-mono text-[10px] text-[#00F59B]">
                  <span>{slidesData[1].tag}</span>
                </div>
                <h3
                  className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase"
                  style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
                >
                  {slidesData[1].title}
                </h3>
                <div className="font-mono text-xs text-[#FF4D26]">
                  {slidesData[1].subtitle}
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {slidesData[1].description}
                </p>

                {/* Encoder Mechanical Specs */}
                <div className="grid grid-cols-2 gap-3 pt-4 font-mono text-xs border-t border-white/10">
                  <div className="p-2.5 rounded bg-black/40 border border-white/10">
                    <div className="text-zinc-500 text-[10px]">DETENT TORQUE</div>
                    <div className="text-white font-bold">2.5 N·cm PRECISION</div>
                  </div>
                  <div className="p-2.5 rounded bg-black/40 border border-white/10">
                    <div className="text-zinc-500 text-[10px]">ROTATION LIFE</div>
                    <div className="text-[#00F59B] font-bold">100,000 CYCLES</div>
                  </div>
                </div>
              </div>

              {/* Graphic Display: Macro Dial Zoom */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center">
                <div className="relative w-64 h-64 rounded-full bg-gradient-to-tr from-[#161820] to-[#252a38] border-2 border-white/20 p-4 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center">
                  {/* Outer Notches (360 degrees) */}
                  <div className="absolute inset-2 rounded-full border border-dashed border-white/20"></div>

                  {/* Inner Machined Bevel */}
                  <div className="w-48 h-48 rounded-full bg-[#1b1e29] border border-white/15 flex items-center justify-center shadow-inner relative">
                    {/* Dial Center Cap */}
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#2c3244] to-[#12141a] border border-white/25 flex items-center justify-center shadow-lg relative group cursor-grab">
                      {/* Signal Orange Indicator Laser */}
                      <div className="absolute top-2 w-1.5 h-8 rounded-full bg-[#FF4D26] laser-glow"></div>
                      <span className="font-mono text-[9px] text-zinc-400 font-bold tracking-widest">
                        PUSH / ROTATE
                      </span>
                    </div>
                  </div>

                  {/* Angle Callout Badge */}
                  <div className="absolute -bottom-3 px-3 py-1 rounded-full bg-[#FF4D26] text-white font-mono text-[10px] font-bold laser-glow-sm">
                    96 PULSES / REV
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 3: 16-STEP KINETIC SEQUENCER */}
          <div className="deck-slide w-1/3 px-3 sm:px-6">
            <div className="rounded-2xl bg-[#12141A] border border-white/15 p-6 md:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text Specs */}
              <div className="lg:col-span-6 space-y-4 font-sans">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF4D26]/10 border border-[#FF4D26]/30 font-mono text-[10px] text-[#FF4D26]">
                  <span>{slidesData[2].tag}</span>
                </div>
                <h3
                  className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase"
                  style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
                >
                  {slidesData[2].title}
                </h3>
                <div className="font-mono text-xs text-[#00F59B]">
                  {slidesData[2].subtitle}
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {slidesData[2].description}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-4 font-mono text-xs border-t border-white/10">
                  <div className="p-2.5 rounded bg-black/40 border border-white/10">
                    <div className="text-zinc-500 text-[10px]">CURRENT STEP</div>
                    <div className="text-[#00F59B] font-bold">STEP #{seqStep + 1} ACTIVE</div>
                  </div>
                  <div className="p-2.5 rounded bg-black/40 border border-white/10">
                    <div className="text-zinc-500 text-[10px]">CLOCK SYNC</div>
                    <div className="text-white font-bold">INTERNAL 128.0 BPM</div>
                  </div>
                </div>
              </div>

              {/* Graphic Display: 16-Step Live Sequencer Matrix */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="rounded-xl bg-[#090A0D] border border-white/15 p-5 shadow-inner space-y-4">
                  <div className="flex justify-between font-mono text-[10px] text-zinc-400 border-b border-white/10 pb-2">
                    <span>LIVE PATTERN: "OBSIDIAN_DRIFT"</span>
                    <span className="text-[#FF4D26] animate-pulse">● REC / PLAY</span>
                  </div>

                  {/* 16 Step Grid */}
                  <div className="grid grid-cols-4 gap-2.5">
                    {Array.from({ length: 16 }).map((_, stepIdx) => {
                      const isPlayhead = stepIdx === seqStep
                      const isPatternTrigger = [0, 2, 4, 7, 8, 10, 12, 15].includes(stepIdx)
                      return (
                        <div
                          key={stepIdx}
                          className={`p-2.5 rounded-lg border font-mono text-center transition-all ${
                            isPlayhead
                              ? 'bg-[#00F59B] text-black border-[#00F59B] scale-105 phosphor-glow font-bold'
                              : isPatternTrigger
                              ? 'bg-[#FF4D26]/20 border-[#FF4D26]/60 text-white'
                              : 'bg-white/5 border-white/10 text-zinc-500'
                          }`}
                        >
                          <div className="text-[9px]">STEP {stepIdx + 1}</div>
                          <div className="text-[12px] font-bold mt-1">
                            {isPatternTrigger ? 'TRIG' : '—'}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex justify-between items-center font-mono text-[9px] text-zinc-500 pt-2 border-t border-white/10">
                    <span>VELOCITY: 112</span>
                    <span>GATE: 75%</span>
                    <span>SWING: 58%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deck Footer Note */}
      <div className="max-w-6xl mx-auto w-full flex justify-between items-center z-20 font-mono text-[11px] text-zinc-500 pt-4 border-t border-white/10">
        <span>SWIPE OR SCROLL TO NAVIGATE SLIDE DECK</span>
        <span className="text-zinc-400 flex items-center gap-1">
          NEXT: PLAYABLE SOUND LAB <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </section>
  )
}
