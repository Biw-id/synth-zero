import React from 'react'

export function TopChassis({ isExploded = false }) {
  return (
    <div
      className={`relative w-full max-w-[640px] aspect-[16/10] rounded-xl bg-gradient-to-b from-[#181B24] to-[#111319] border border-white/15 shadow-2xl p-5 select-none transition-shadow duration-300 ${
        isExploded ? 'shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-white/20' : 'hover:border-white/25'
      }`}
    >
      {/* Top Edge Screws */}
      <div className="absolute top-2 left-3 w-2 h-2 rounded-full border border-white/20 bg-[#0e1015] flex items-center justify-center">
        <div className="w-1.5 h-[1px] bg-white/30 rotate-45"></div>
      </div>
      <div className="absolute top-2 right-3 w-2 h-2 rounded-full border border-white/20 bg-[#0e1015] flex items-center justify-center">
        <div className="w-1.5 h-[1px] bg-white/30 -rotate-12"></div>
      </div>
      <div className="absolute bottom-2 left-3 w-2 h-2 rounded-full border border-white/20 bg-[#0e1015] flex items-center justify-center">
        <div className="w-1.5 h-[1px] bg-white/30 rotate-90"></div>
      </div>
      <div className="absolute bottom-2 right-3 w-2 h-2 rounded-full border border-white/20 bg-[#0e1015] flex items-center justify-center">
        <div className="w-1.5 h-[1px] bg-white/30 rotate-30"></div>
      </div>

      {/* Header Bar on Hardware */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-[10px] text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF4D26] animate-pulse"></span>
          <span className="font-bold text-white tracking-widest">SYNTH-01</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-500 hidden sm:inline">KINETIC ANALOG ENGINE</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">
            REV. 2.4
          </span>
          <span className="text-[#00F59B] flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] inline-block"></span>
            ACTIVE
          </span>
        </div>
      </div>

      {/* Main Hardware Section */}
      <div className="grid grid-cols-12 gap-3 pt-4 h-[calc(100%-36px)]">
        {/* Left Column: OLED Screen & Encoders */}
        <div className="col-span-5 flex flex-col justify-between">
          {/* OLED Screen */}
          <div className="rounded-lg bg-[#07080A] border border-white/15 p-3 flex flex-col justify-between h-[110px] relative overflow-hidden shadow-inner">
            <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 border-b border-white/5 pb-1">
              <span>OSC 1+2: SAW</span>
              <span className="text-[#00F59B]">128.0 BPM</span>
            </div>
            {/* Screen Waveform Graphic */}
            <div className="py-2 flex items-center justify-center">
              <svg className="w-full h-8 stroke-[#00F59B] fill-none" viewBox="0 0 160 30">
                <path
                  d="M0,15 L20,15 L35,5 L50,25 L65,5 L80,25 L95,5 L110,25 L125,5 L140,25 L150,15 L160,15"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex justify-between text-[8px] font-mono text-zinc-400">
              <span>CUTOFF: 2.40kHz</span>
              <span>RES: 68%</span>
            </div>
            {/* Glass Glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
          </div>

          {/* Rotary Knobs Section */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[
              { label: 'CUTOFF', val: '72%', angle: '45deg', color: '#FF4D26' },
              { label: 'RESO', val: '64%', angle: '110deg', color: '#00F59B' },
              { label: 'DRIVE', val: '28%', angle: '-20deg', color: '#FFFFFF' },
            ].map((k, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="relative w-9 h-9 rounded-full bg-[#1e222d] border border-white/20 shadow-md flex items-center justify-center cursor-pointer group">
                  {/* Outer notched ring */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-white/10"></div>
                  {/* Center dial cap */}
                  <div className="w-6 h-6 rounded-full bg-gradient-to-b from-[#2a2f3e] to-[#151821] flex items-center justify-center shadow">
                    {/* Dial Indicator Line */}
                    <div
                      className="w-0.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: k.color,
                        transform: `rotate(${k.angle}) translateY(-2px)`,
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-[7px] font-mono text-zinc-400 mt-1 uppercase tracking-wider">
                  {k.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Keypad & Sequencer Grid */}
        <div className="col-span-7 flex flex-col justify-between pl-1">
          {/* Speaker Perforations & Sliders */}
          <div className="flex items-center justify-between pb-2">
            {/* Speaker Grille */}
            <div className="grid grid-cols-8 gap-1.5 p-1 bg-black/40 rounded border border-white/5">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-white/20"></div>
              ))}
            </div>

            {/* Hardware Badging */}
            <div className="text-right font-mono text-[9px] text-zinc-500">
              <div>FIELD SYNTHESIS</div>
              <div className="text-[#FF4D26] font-semibold">SERIES 01</div>
            </div>
          </div>

          {/* 16-Step LED Sequence Matrix */}
          <div className="p-2 rounded-lg bg-black/30 border border-white/10">
            <div className="text-[8px] font-mono text-zinc-500 mb-1 flex justify-between">
              <span>STEP SEQUENCER [16-STEP]</span>
              <span className="text-[#FF4D26]">RUNNING</span>
            </div>
            <div className="grid grid-cols-8 gap-1.5">
              {Array.from({ length: 16 }).map((_, i) => {
                const isActive = [0, 3, 6, 8, 10, 12, 14].includes(i)
                const isCurrent = i === 3
                return (
                  <div
                    key={i}
                    className={`h-3.5 rounded-sm flex items-center justify-center border transition-all ${
                      isCurrent
                        ? 'bg-[#00F59B] border-[#00F59B] phosphor-glow-sm'
                        : isActive
                        ? 'bg-[#FF4D26]/80 border-[#FF4D26] laser-glow-sm'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <span className="text-[6px] font-mono text-black/90 font-bold">
                      {isCurrent ? '•' : ''}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 4 Tactile Capacitive Performance Keys */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            {['C3', 'E3', 'G3', 'B3'].map((note, idx) => (
              <div
                key={idx}
                className="h-12 rounded-md bg-gradient-to-b from-[#222734] to-[#151821] border border-white/15 flex flex-col justify-between p-1.5 shadow-sm hover:border-[#FF4D26]/60 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-[11px] font-bold text-white">{note}</span>
                  <span className="text-[7px] text-zinc-500">0{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function CircuitCore({ isExploded = false }) {
  return (
    <div
      className={`relative w-full max-w-[620px] aspect-[16/9.5] rounded-xl bg-gradient-to-br from-[#0c1a14] via-[#09130e] to-[#050b08] border border-[#00F59B]/30 p-5 select-none shadow-2xl transition-all duration-300 ${
        isExploded ? 'phosphor-glow border-[#00F59B]/50' : ''
      }`}
    >
      {/* PCB Substrate Texture */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none"></div>

      {/* PCB Header */}
      <div className="flex justify-between items-center text-[9px] font-mono text-[#00F59B]/70 pb-2 border-b border-[#00F59B]/20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm bg-[#00F59B] animate-pulse"></span>
          <span className="text-white font-bold tracking-wider">PCB CORE: AGY-DSP-M7</span>
        </div>
        <div>SILICON REV. 4 // 4-LAYER IMMERSION GOLD</div>
      </div>

      {/* Circuit Traces Vector Graphic */}
      <div className="relative h-[calc(100%-28px)] flex items-center justify-between">
        <svg
          className="absolute inset-0 w-full h-full stroke-[#00F59B]/40 fill-none pointer-events-none"
          viewBox="0 0 580 260"
        >
          {/* Main bus lines */}
          <path d="M 40 40 L 160 40 L 200 90 L 380 90 L 420 40 L 540 40" strokeWidth="1.5" />
          <path d="M 60 220 L 180 220 L 220 170 L 360 170 L 400 220 L 520 220" strokeWidth="1.5" />
          <path d="M 290 20 L 290 70" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M 290 190 L 290 240" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="200" cy="90" r="3" fill="#00F59B" />
          <circle cx="380" cy="90" r="3" fill="#00F59B" />
          <circle cx="220" cy="170" r="3" fill="#00F59B" />
          <circle cx="360" cy="170" r="3" fill="#00F59B" />
        </svg>

        {/* Central DSP Chipset */}
        <div className="relative z-10 mx-auto w-36 h-36 rounded-lg bg-[#14171e] border-2 border-[#00F59B] p-2 flex flex-col justify-between items-center shadow-[0_0_30px_rgba(0,245,155,0.25)]">
          {/* Pins on top & bottom */}
          <div className="w-full flex justify-around text-[7px] font-mono text-[#00F59B]/60">
            <span>•</span>
            <span>•</span>
            <span>•</span>
            <span>•</span>
            <span>•</span>
          </div>

          <div className="text-center font-mono">
            <div className="text-[10px] font-bold text-white tracking-widest">ARM CORTEX-M7</div>
            <div className="text-[8px] text-[#00F59B]">480 MHz // 32-BIT</div>
            <div className="text-[7px] text-zinc-400 mt-1">DUAL BURR-BROWN DAC</div>
          </div>

          <div className="w-full flex justify-around text-[7px] font-mono text-[#00F59B]/60">
            <span>•</span>
            <span>•</span>
            <span>•</span>
            <span>•</span>
            <span>•</span>
          </div>
        </div>

        {/* Left Side: Analog Oscillators & Op-Amps */}
        <div className="relative z-10 flex flex-col justify-around h-full py-4 text-[8px] font-mono">
          <div className="p-2 rounded bg-black/60 border border-[#00F59B]/30 text-zinc-300">
            <span className="text-[#00F59B] font-bold">VCO 01</span> // TRI-CORE
          </div>
          <div className="p-2 rounded bg-black/60 border border-[#00F59B]/30 text-zinc-300">
            <span className="text-[#00F59B] font-bold">VCO 02</span> // DUAL-PULSE
          </div>
        </div>

        {/* Right Side: Solid State Capacitors */}
        <div className="relative z-10 flex flex-col justify-around h-full py-4 text-[8px] font-mono">
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-full bg-[#1b251f] border border-[#00F59B] flex items-center justify-center text-[7px] text-[#00F59B]">
              C1
            </div>
            <span className="text-zinc-400">POLYSTYRENE CAP</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-full bg-[#1b251f] border border-[#00F59B] flex items-center justify-center text-[7px] text-[#00F59B]">
              C2
            </div>
            <span className="text-zinc-400">LOW-NOISE OPAMP</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function BottomChassis({ isExploded = false }) {
  return (
    <div
      className={`relative w-full max-w-[640px] aspect-[16/8] rounded-xl bg-gradient-to-b from-[#14161e] to-[#0c0d12] border border-white/10 p-5 select-none shadow-2xl transition-all duration-300 ${
        isExploded ? 'shadow-[0_25px_60px_rgba(0,0,0,0.9)]' : ''
      }`}
    >
      {/* Aluminum CNC Milling Texture */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5 font-mono text-[9px] text-zinc-500">
        <div>CHASSIS BASE // UNIBODY CNC 6061 ALUMINUM</div>
        <div className="text-zinc-400">MASS: 480 GRAMS</div>
      </div>

      <div className="grid grid-cols-12 gap-4 pt-4 h-[calc(100%-28px)] items-center">
        {/* Battery Module */}
        <div className="col-span-7 rounded-lg bg-black/50 border border-white/10 p-3 flex flex-col justify-between h-full">
          <div className="flex justify-between items-center text-[9px] font-mono">
            <span className="text-zinc-300 font-semibold">HIGH-DENSITY LI-ION CELL</span>
            <span className="text-[#00F59B] font-bold">5000 mAh</span>
          </div>
          <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/10 my-2">
            <div className="bg-gradient-to-r from-[#00F59B] to-[#FF4D26] w-[88%] h-full rounded-full"></div>
          </div>
          <div className="flex justify-between text-[8px] font-mono text-zinc-500">
            <span>18 HOURS PLAYBACK</span>
            <span>45W FAST CHARGE</span>
          </div>
        </div>

        {/* Acoustic Resonance Chamber & Compliance Stamps */}
        <div className="col-span-5 flex flex-col justify-between h-full py-1 font-mono text-[8px] text-zinc-500">
          <div className="p-2 rounded bg-white/5 border border-white/5">
            <div className="text-zinc-300 font-bold mb-0.5">ACOUSTIC DAMPING</div>
            <div>SILICONE INTERNAL SUSPENSION</div>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-white/5 text-[7px] text-zinc-600">
            <span>CE • FCC • ROHS</span>
            <span className="text-zinc-400">SN: AGY-2026-B01</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AssembledHardware() {
  return (
    <div className="relative w-full max-w-[640px] mx-auto filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]">
      <TopChassis isExploded={false} />
    </div>
  )
}
