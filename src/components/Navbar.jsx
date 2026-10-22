import React from 'react'
import { Volume2, VolumeX, Radio, Sparkles } from 'lucide-react'

export default function Navbar({ isAmbientPlaying, toggleAmbient, onReserveClick }) {
  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-4 md:px-6 py-2.5 rounded-full bg-[#12141A]/85 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] max-w-5xl w-full">
        {/* Brand / Title */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-md bg-[#FF4D26] flex items-center justify-center font-mono font-black text-black text-xs group-hover:scale-105 transition-transform">
            S1
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-bold tracking-wider text-xs md:text-sm text-white flex items-center gap-1.5">
              SYNTH-01
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] inline-block animate-pulse"></span>
            </span>
            <span className="font-mono text-[9px] text-zinc-500 hidden sm:inline">
              TACTILE KINETIC INSTRUMENT
            </span>
          </div>
        </a>

        {/* Center: Hardware Telemetry HUD */}
        <div className="hidden md:flex items-center gap-3 px-3 py-1 rounded-full bg-black/40 border border-white/5 font-mono text-[11px] text-zinc-400">
          <Radio className="w-3.5 h-3.5 text-[#00F59B]" />
          <span>BATCH 01</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-300">500 UNITS GLOBALLY</span>
          <span className="text-zinc-600">•</span>
          <span className="text-[#00F59B]">342 REMAINING</span>
        </div>

        {/* Right Actions: Audio Toggle & Reserve Button */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Ambient Audio Toggle */}
          <button
            onClick={toggleAmbient}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs border transition-all duration-300 ${
              isAmbientPlaying
                ? 'bg-[#00F59B]/15 border-[#00F59B]/60 text-[#00F59B] phosphor-glow-sm'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
            }`}
            title="Toggle Ambient Studio Drone"
          >
            {isAmbientPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">AMBIENT: ON</span>
                {/* Micro animated sound bars */}
                <div className="flex items-end gap-0.5 h-3 ml-0.5">
                  <span className="w-0.5 bg-[#00F59B] h-2 animate-[pulse_0.8s_ease-in-out_infinite]"></span>
                  <span className="w-0.5 bg-[#00F59B] h-3 animate-[pulse_1.1s_ease-in-out_infinite_0.2s]"></span>
                  <span className="w-0.5 bg-[#00F59B] h-1.5 animate-[pulse_0.9s_ease-in-out_infinite_0.4s]"></span>
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">AMBIENT: OFF</span>
              </>
            )}
          </button>

          {/* Reserve CTA */}
          <button
            onClick={onReserveClick}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FF4D26] hover:bg-[#ff613d] text-white font-mono text-xs font-semibold tracking-wide laser-glow-sm transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-white" />
            <span>RESERVE</span>
          </button>
        </div>
      </nav>
    </header>
  )
}
