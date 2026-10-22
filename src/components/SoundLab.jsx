import React, { useEffect, useRef } from 'react'
import { Play, Activity, Radio, Volume2, Music } from 'lucide-react'

export default function SoundLab({
  cutoffFreq,
  setCutoff,
  resonance,
  setFilterResonance,
  waveform,
  setWaveform,
  activeNotes,
  triggerNoteOn,
  triggerNoteOff,
  playOneShot,
  analyserRef,
}) {
  const canvasRef = useRef(null)

  // 4 Playable Pads configuration
  const pads = [
    { id: 'C3', label: 'C3', freq: 130.81, key: 'A', tag: 'ROOT' },
    { id: 'E3', label: 'E3', freq: 164.81, key: 'S', tag: 'MAJ 3RD' },
    { id: 'G3', label: 'G3', freq: 196.0, key: 'D', tag: 'PERF 5TH' },
    { id: 'B3', label: 'B3', freq: 246.94, key: 'F', tag: 'MAJ 7TH' },
  ]

  // Keyboard shortcut listener (A, S, D, F)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return
      const pad = pads.find((p) => p.key.toLowerCase() === e.key.toLowerCase())
      if (pad) {
        triggerNoteOn(pad.id, pad.freq)
      }
    }

    const handleKeyUp = (e) => {
      const pad = pads.find((p) => p.key.toLowerCase() === e.key.toLowerCase())
      if (pad) {
        triggerNoteOff(pad.id)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [triggerNoteOn, triggerNoteOff])

  // Real-time Canvas Oscilloscope render loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId

    const renderOscilloscope = () => {
      animationId = requestAnimationFrame(renderOscilloscope)

      const width = canvas.width
      const height = canvas.height

      ctx.fillStyle = '#080A0E'
      ctx.fillRect(0, 0, width, height)

      // Draw subtle phosphor grid
      ctx.strokeStyle = 'rgba(0, 245, 155, 0.08)'
      ctx.lineWidth = 1
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      if (!analyserRef.current) {
        // Flat resting line
        ctx.strokeStyle = '#00F59B'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, height / 2)
        ctx.lineTo(width, height / 2)
        ctx.stroke()
        return
      }

      const bufferLength = analyserRef.current.fftSize
      const dataArray = new Uint8Array(bufferLength)
      analyserRef.current.getByteTimeDomainData(dataArray)

      // Check if sound is active or resting
      let sum = 0
      for (let i = 0; i < bufferLength; i++) {
        sum += Math.abs(dataArray[i] - 128)
      }
      const isAudible = sum > 40

      ctx.lineWidth = isAudible ? 2.5 : 1.5
      ctx.strokeStyle = isAudible ? '#00F59B' : 'rgba(0, 245, 155, 0.5)'
      ctx.shadowBlur = isAudible ? 12 : 2
      ctx.shadowColor = '#00F59B'

      ctx.beginPath()
      const sliceWidth = width / bufferLength
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0
        const y = (v * height) / 2

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
        x += sliceWidth
      }

      ctx.lineTo(width, height / 2)
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    renderOscilloscope()

    return () => cancelAnimationFrame(animationId)
  }, [analyserRef])

  return (
    <section
      id="sound-lab"
      className="relative min-h-screen py-24 px-4 md:px-8 bg-[#0A0B0E] flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background Radial Ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[550px] bg-[#00F59B]/5 blur-[160px] pointer-events-none rounded-full"></div>

      <div className="max-w-5xl w-full z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F59B]/10 border border-[#00F59B]/30 font-mono text-[11px] text-[#00F59B]">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>INTERACTIVE REALTIME LAB // ACT 04</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight"
            style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
          >
            PLAY THE SOUND LAB.
          </h2>

          <p className="max-w-lg mx-auto text-sm text-zinc-400 font-sans">
            Touch or click the capacitive pads below, or trigger them via your computer keyboard{' '}
            <span className="font-mono text-zinc-200 bg-white/10 px-1.5 py-0.5 rounded text-xs">
              [A] [S] [D] [F]
            </span>
            .
          </p>
        </div>

        {/* Central Synthesizer Unit Container */}
        <div className="rounded-2xl bg-[#12141A] border border-white/15 p-6 md:p-8 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Top Telemetry & Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F59B] phosphor-glow-sm"></span>
              <span className="text-white font-bold tracking-wider">
                WEB AUDIO SYNTH VOICE ENGINE
              </span>
              <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-zinc-400 text-[10px]">
                ZERO EXTERNAL LIBRARIES
              </span>
            </div>

            {/* Waveform Selector */}
            <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-lg border border-white/10">
              {['sawtooth', 'square', 'triangle', 'sine'].map((wave) => (
                <button
                  key={wave}
                  onClick={() => setWaveform(wave)}
                  className={`px-3 py-1 rounded text-[10px] font-mono uppercase transition-all ${
                    waveform === wave
                      ? 'bg-[#FF4D26] text-white font-bold laser-glow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {wave}
                </button>
              ))}
            </div>
          </div>

          {/* Oscilloscope Canvas Screen */}
          <div className="rounded-xl bg-[#080A0E] border border-white/15 p-4 shadow-inner relative overflow-hidden">
            <div className="flex justify-between items-center pb-2 border-b border-white/10 font-mono text-[10px] text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#00F59B]" />
                REALTIME TIME-DOMAIN OSCILLOSCOPE
              </span>
              <span className="text-[#00F59B]">512 SAMPLES // 48.0 kHz</span>
            </div>

            <canvas
              ref={canvasRef}
              width={800}
              height={160}
              className="w-full h-36 md:h-44 rounded mt-2 block"
            ></canvas>

            {/* Screen Overlay Glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
          </div>

          {/* Realtime Filter Controls (Knobs & Sliders) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-mono text-xs">
            {/* Cutoff Slider */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">BIQUAD CUTOFF FREQUENCY:</span>
                <span className="text-[#FF4D26] font-bold text-sm">{cutoffFreq} Hz</span>
              </div>
              <input
                type="range"
                min="150"
                max="8000"
                step="50"
                value={cutoffFreq}
                onChange={(e) => setCutoff(Number(e.target.value))}
                className="w-full accent-[#FF4D26] h-2 bg-white/10 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>150 Hz (WARM MUD)</span>
                <span>8000 Hz (CRYSTAL OPEN)</span>
              </div>
            </div>

            {/* Resonance Slider */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">RESONANCE PEAK (Q-FACTOR):</span>
                <span className="text-[#00F59B] font-bold text-sm">{resonance}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="18"
                step="0.5"
                value={resonance}
                onChange={(e) => setFilterResonance(Number(e.target.value))}
                className="w-full accent-[#00F59B] h-2 bg-white/10 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>0.5 (FLAT)</span>
                <span>18.0 (SELF-OSCILLATION)</span>
              </div>
            </div>
          </div>

          {/* 4 Playable Capacitive Touch Keypads */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {pads.map((pad) => {
              const isActive = activeNotes.has(pad.id)
              return (
                <button
                  key={pad.id}
                  onMouseDown={() => triggerNoteOn(pad.id, pad.freq)}
                  onMouseUp={() => triggerNoteOff(pad.id)}
                  onMouseLeave={() => triggerNoteOff(pad.id)}
                  onTouchStart={(e) => {
                    e.preventDefault()
                    triggerNoteOn(pad.id, pad.freq)
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault()
                    triggerNoteOff(pad.id)
                  }}
                  className={`relative h-28 sm:h-36 rounded-xl border p-4 flex flex-col justify-between select-none transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-t from-[#FF4D26] to-[#ff7150] border-[#FF4D26] text-black shadow-[0_0_35px_rgba(255,77,38,0.6)] scale-[0.98]'
                      : 'bg-gradient-to-b from-[#181B24] to-[#101217] border-white/15 hover:border-white/30 text-white shadow-md'
                  }`}
                >
                  {/* Top Key Tag & LED */}
                  <div className="flex justify-between items-center w-full font-mono text-[10px]">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        isActive
                          ? 'bg-black text-white'
                          : 'bg-white/10 text-zinc-300 border border-white/10'
                      }`}
                    >
                      KEY [{pad.key}]
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? 'bg-white animate-ping' : 'bg-white/20'
                      }`}
                    ></span>
                  </div>

                  {/* Note Label */}
                  <div className="text-left">
                    <div
                      className="text-3xl sm:text-4xl font-black tracking-tight"
                      style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
                    >
                      {pad.label}
                    </div>
                    <div
                      className={`font-mono text-xs ${
                        isActive ? 'text-black/80 font-bold' : 'text-zinc-400'
                      }`}
                    >
                      {pad.freq} Hz
                    </div>
                  </div>

                  {/* Bottom Chord Function */}
                  <div
                    className={`font-mono text-[9px] border-t pt-1.5 flex justify-between ${
                      isActive ? 'border-black/20 text-black/80 font-bold' : 'border-white/10 text-zinc-500'
                    }`}
                  >
                    <span>{pad.tag}</span>
                    <span>ACTIVE</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
