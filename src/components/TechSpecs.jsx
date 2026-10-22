import React from 'react'
import { Terminal, ShieldCheck, Cpu, HardDrive, Battery, Gauge } from 'lucide-react'

export default function TechSpecs() {
  const specs = [
    {
      category: 'ACOUSTIC & SYNTHESIS ENGINE',
      icon: Gauge,
      items: [
        { label: 'OSCILLATOR ARCHITECTURE', value: 'Dual Discrete Analog VCO (Saw, Triangle, Pulse) + Digital Noise' },
        { label: 'FILTER TOPOLOGY', value: '4-Pole 24dB/Octave Cascaded State-Variable OTA with Self-Oscillation' },
        { label: 'INTERNAL PROCESSING', value: '480 MHz 32-Bit ARM Cortex-M7 DSP Co-Processor' },
        { label: 'DIGITAL-TO-ANALOG (DAC)', value: 'Dual Burr-Brown 32-bit / 192 kHz Architecture' },
        { label: 'FREQUENCY RESPONSE', value: '10 Hz — 48,000 Hz (±0.25 dB Audio Bandwidth)' },
        { label: 'TOTAL HARMONIC DISTORTION', value: '< 0.003% @ 1 kHz Unity Gain' },
      ],
    },
    {
      category: 'HARDWARE & INDUSTRIAL DESIGN',
      icon: Cpu,
      items: [
        { label: 'CHASSIS MATERIAL', value: 'Unibody CNC-Machined 6061-T6 Anodized Aluminum' },
        { label: 'FINISH', value: 'Bead-Blasted Obsidian Matte with Laser-Etched Markings' },
        { label: 'DIMENSIONS', value: '210 mm (W) × 74 mm (D) × 18 mm (H)' },
        { label: 'TOTAL MASS', value: '480 grams (Precision Weighted Center-of-Gravity)' },
        { label: 'DISPLAY UNIT', value: '1.42" Monochrome Ultra-Bright OLED (128 × 64 pixels)' },
        { label: 'ROTARY ENCODERS', value: '3× ALPS Alpine Metal Shaft Continuous Encoders with Detents' },
      ],
    },
    {
      category: 'CONNECTIVITY & TELEMETRY',
      icon: HardDrive,
      items: [
        { label: 'AUDIO OUTPUT', value: '3.5 mm Stereo Gold-Plated Balanced TRS Line Out (2.0 Vrms)' },
        { label: 'HEADPHONE AMPLIFIER', value: 'High-Current Class-AB Driving up to 600Ω Studio Monitors' },
        { label: 'USB INTERFACE', value: 'USB Type-C (Compliant Class 2.0 Audio + Bi-directional MIDI)' },
        { label: 'CV / GATE CONTROL', value: 'Dual 1/8" Analog CV (1V/Oct) & 5V Gate In/Out Sync' },
        { label: 'BATTERY CELL', value: '5000 mAh High-Density Rechargeable Lithium-Polymer' },
        { label: 'ENDURANCE & CHARGING', value: '18 Hours Active Synthesis // 45W USB Power Delivery' },
      ],
    },
  ]

  return (
    <section
      id="tech-specs"
      className="relative py-24 px-4 md:px-8 bg-[#0D0F14] border-t border-white/10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-zinc-400 mb-3">
              <Terminal className="w-3.5 h-3.5 text-[#FF4D26]" />
              <span>DATASHEET TELEMETRY // ACT 05</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight"
              style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
            >
              TECHNICAL SPECIFICATIONS.
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 space-y-1">
            <div>DOC REF: SYNTH-01-DS-2026</div>
            <div className="text-[#00F59B] flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>TESTED & LAB-CERTIFIED HARMONICS</span>
            </div>
          </div>
        </div>

        {/* Spec Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {specs.map((group, gIdx) => {
            const Icon = group.icon
            return (
              <div
                key={gIdx}
                className="rounded-xl bg-[#12141A] border border-white/15 p-6 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-white/10 font-mono text-xs font-bold text-white tracking-wider">
                    <Icon className="w-4 h-4 text-[#FF4D26]" />
                    <span>{group.category}</span>
                  </div>

                  {/* Spec Rows */}
                  <div className="space-y-4">
                    {group.items.map((item, idx) => (
                      <div key={idx} className="font-mono text-xs">
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                          {item.label}
                        </div>
                        <div className="text-zinc-200 font-semibold mt-0.5">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 font-mono text-[10px] text-zinc-500 flex justify-between">
                  <span>SUBSYSTEM 0{gIdx + 1}</span>
                  <span className="text-[#00F59B]">100% QA VERIFIED</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
