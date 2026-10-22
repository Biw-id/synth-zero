import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TopChassis, CircuitCore, BottomChassis } from './HardwareVisual'
import { Layers, Activity, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ExplodedView() {
  const containerRef = useRef(null)
  const topLayerRef = useRef(null)
  const coreLayerRef = useRef(null)
  const bottomLayerRef = useRef(null)
  const headlineRef = useRef(null)
  const calloutsRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Exploded translation timeline
      tl.to(
        topLayerRef.current,
        {
          y: -170,
          scale: 0.94,
          opacity: 0.45,
          rotateX: 10,
          ease: 'power2.out',
        },
        0
      )
        .to(
          bottomLayerRef.current,
          {
            y: 190,
            scale: 0.94,
            opacity: 0.45,
            rotateX: -10,
            ease: 'power2.out',
          },
          0
        )
        .to(
          coreLayerRef.current,
          {
            scale: 1.05,
            opacity: 1,
            ease: 'power2.out',
          },
          0
        )
        .fromTo(
          calloutsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0.3
        )
        .fromTo(
          headlineRef.current,
          { opacity: 0.6, letterSpacing: '-0.02em' },
          { opacity: 1, letterSpacing: '-0.04em', ease: 'power1.out' },
          0
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="exploded-view"
      className="relative min-h-screen flex flex-col justify-center items-center py-16 px-4 overflow-hidden bg-[#0A0B0E]"
    >
      {/* Background Accent Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-[#00F59B]/5 blur-[120px] pointer-events-none rounded-full"></div>

      {/* Narrative Section Header */}
      <div className="text-center z-20 mb-8 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-[#00F59B] mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>DECONSTRUCTED ARCHITECTURE // ACT 02</span>
        </div>
        <h2
          ref={headlineRef}
          className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-[-0.04em]"
          style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
        >
          ANALOG SOUL.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D26] to-[#00F59B]">
            DIGITAL PRECISION.
          </span>
        </h2>
        <p className="font-mono text-xs text-zinc-400 mt-2">
          EXPLODED 3D KINEMATICS: SCROLL TO REVEAL THE 4-LAYER INTERIOR SANCTUARY
        </p>
      </div>

      {/* Exploded Hardware Layers Viewport */}
      <div className="relative w-full max-w-4xl flex items-center justify-center my-auto min-h-[500px]">
        {/* Top Chassis Layer */}
        <div
          ref={topLayerRef}
          className="absolute z-30 w-full max-w-2xl px-4 will-change-transform"
        >
          <div className="relative">
            <TopChassis isExploded={true} />
            <div className="absolute -top-6 left-6 font-mono text-[10px] text-zinc-400 flex items-center gap-2 bg-[#12141A]/90 px-2.5 py-1 rounded border border-white/10 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D26]"></span>
              <span>LAYER 01: CNC ANODIZED TOP PLATE</span>
            </div>
          </div>
        </div>

        {/* Center Circuit Core Layer */}
        <div
          ref={coreLayerRef}
          className="relative z-20 w-full max-w-2xl px-4 will-change-transform"
        >
          <div className="relative">
            <CircuitCore isExploded={true} />
            <div className="absolute -bottom-6 left-6 font-mono text-[10px] text-[#00F59B] flex items-center gap-2 bg-[#0c1a14]/90 px-2.5 py-1 rounded border border-[#00F59B]/40 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] animate-pulse"></span>
              <span>LAYER 02: DSP PROCESSOR & ANALOG FILTERS</span>
            </div>
          </div>
        </div>

        {/* Bottom Chassis Layer */}
        <div
          ref={bottomLayerRef}
          className="absolute z-10 w-full max-w-2xl px-4 will-change-transform"
        >
          <div className="relative">
            <BottomChassis isExploded={true} />
            <div className="absolute -bottom-6 right-6 font-mono text-[10px] text-zinc-400 flex items-center gap-2 bg-[#12141A]/90 px-2.5 py-1 rounded border border-white/10 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
              <span>LAYER 03: 5000mAh CELL & DAMPING TRAY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hotspot Breakdown Cards (Telemetry Callouts) */}
      <div
        ref={calloutsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full z-20 mt-8 pt-4 font-mono text-xs"
      >
        <div className="p-3.5 rounded-lg bg-[#12141A]/80 border border-white/10 flex items-start gap-3 backdrop-blur-sm">
          <div className="w-7 h-7 rounded bg-[#FF4D26]/10 border border-[#FF4D26]/30 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-[#FF4D26]" />
          </div>
          <div>
            <div className="font-bold text-white mb-0.5">DUAL VOLTAGE-CONTROLLED OSC</div>
            <div className="text-[11px] text-zinc-400">
              Discrete analog triangle & saw cores with temperature-compensated tracking.
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#12141A]/80 border border-[#00F59B]/30 flex items-start gap-3 backdrop-blur-sm">
          <div className="w-7 h-7 rounded bg-[#00F59B]/10 border border-[#00F59B]/30 flex items-center justify-center shrink-0">
            <Activity className="w-4 h-4 text-[#00F59B]" />
          </div>
          <div>
            <div className="font-bold text-white mb-0.5">CORTEX-M7 SIGNAL DSP</div>
            <div className="text-[11px] text-zinc-400">
              480 MHz processor handling realtime 16-step kinetic sequencing and MIDI clocks.
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#12141A]/80 border border-white/10 flex items-start gap-3 backdrop-blur-sm">
          <div className="w-7 h-7 rounded bg-white/5 border border-white/20 flex items-center justify-center shrink-0">
            <span className="text-white font-black text-xs">AI</span>
          </div>
          <div>
            <div className="font-bold text-white mb-0.5">ACOUSTIC INTERNAL DAMPING</div>
            <div className="text-[11px] text-zinc-400">
              Silicone gasket isolation absorbs keybed vibrations for clean uncolored output.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
