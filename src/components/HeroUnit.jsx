import React, { useRef } from 'react'
import { AssembledHardware } from './HardwareVisual'
import { ChevronDown, Sliders, Cpu, BatteryCharging } from 'lucide-react'

export default function HeroUnit() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between pt-28 pb-12 px-4 overflow-hidden bg-grid-pattern"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FF4D26]/5 blur-[140px] pointer-events-none rounded-full"></div>

      {/* Hero Header Typography */}
      <div className="text-center max-w-4xl mx-auto z-10 space-y-4">
        {/* Monospaced Classification Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D26]"></span>
          <span className="tracking-widest uppercase">HARDWARE SYNTHESIZER & CONTROLLER</span>
        </div>

        {/* Cinematic Headline */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-white uppercase leading-[0.95]"
          style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
        >
          SOUND IN <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
            PHYSICAL SPACE.
          </span>
        </h1>

        {/* Narrative Subtitle */}
        <p className="max-w-xl mx-auto text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
          Engineered for tactile acoustic presence, instant electronic composition, and deep analog filter sculpting in a single machined chassis.
        </p>

        {/* Telemetry Chips */}
        <div className="flex flex-wrap justify-center gap-3 pt-2 font-mono text-[10px] sm:text-xs text-zinc-400">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#12141A] border border-white/10">
            <Cpu className="w-3.5 h-3.5 text-[#00F59B]" />
            <span>32-BIT 192KHZ BURR-BROWN</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#12141A] border border-white/10">
            <Sliders className="w-3.5 h-3.5 text-[#FF4D26]" />
            <span>DUAL ANALOG VCO + VCF</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#12141A] border border-white/10">
            <BatteryCharging className="w-3.5 h-3.5 text-[#00F59B]" />
            <span>18H LI-ION PLAYBACK</span>
          </div>
        </div>
      </div>

      {/* Floating Hardware Centerpiece */}
      <div className="w-full my-8 z-10 flex items-center justify-center">
        <div className="w-full max-w-2xl px-2 transform transition-transform hover:scale-[1.01] duration-500">
          <AssembledHardware />
        </div>
      </div>

      {/* Scroll to Deconstruct Indicator */}
      <div className="z-10 flex flex-col items-center gap-2 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-ping"></span>
          <span className="tracking-widest text-[#00F59B] font-semibold">
            [SCROLL TO DECONSTRUCT]
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-zinc-500 animate-bounce" />
      </div>
    </section>
  )
}
