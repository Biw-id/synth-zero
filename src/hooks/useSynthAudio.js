import { useRef, useState, useEffect, useCallback } from 'react'

export function useSynthAudio() {
  const audioCtxRef = useRef(null)
  const masterGainRef = useRef(null)
  const analyserRef = useRef(null)
  const filterRef = useRef(null)

  // Ambient Drone refs
  const ambientOsc1Ref = useRef(null)
  const ambientOsc2Ref = useRef(null)
  const ambientGainRef = useRef(null)
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false)

  // Playable Synth State
  const [cutoffFreq, setCutoffFreq] = useState(2400)
  const [resonance, setResonance] = useState(4)
  const [waveform, setWaveform] = useState('sawtooth')
  const [activeNotes, setActiveNotes] = useState(new Set())
  const activeVoicesRef = useRef(new Map())

  // Ensure AudioContext is initialized safely upon first user interaction
  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      const ctx = new AudioCtx()
      
      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0.8, ctx.currentTime)
      masterGain.connect(ctx.destination)

      const analyser = ctx.createAnalyser()
      analyser.fftSize = 512
      analyser.connect(masterGain)

      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(cutoffFreq, ctx.currentTime)
      filter.Q.setValueAtTime(resonance, ctx.currentTime)
      filter.connect(analyser)

      audioCtxRef.current = ctx
      masterGainRef.current = masterGain
      analyserRef.current = analyser
      filterRef.current = filter
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }

    return audioCtxRef.current
  }, [cutoffFreq, resonance])

  // Update filter cutoff in realtime
  const setCutoff = useCallback((freq) => {
    setCutoffFreq(freq)
    if (filterRef.current && audioCtxRef.current) {
      filterRef.current.frequency.setTargetAtTime(freq, audioCtxRef.current.currentTime, 0.03)
    }
  }, [])

  // Update filter resonance in realtime
  const setFilterResonance = useCallback((q) => {
    setResonance(q)
    if (filterRef.current && audioCtxRef.current) {
      filterRef.current.Q.setTargetAtTime(q, audioCtxRef.current.currentTime, 0.03)
    }
  }, [])

  // Toggle Ambient Sub-Hum
  const toggleAmbient = useCallback(() => {
    const ctx = initAudio()

    if (isAmbientPlaying) {
      if (ambientGainRef.current) {
        ambientGainRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.2)
        setTimeout(() => {
          if (ambientOsc1Ref.current) {
            ambientOsc1Ref.current.stop()
            ambientOsc1Ref.current.disconnect()
            ambientOsc1Ref.current = null
          }
          if (ambientOsc2Ref.current) {
            ambientOsc2Ref.current.stop()
            ambientOsc2Ref.current.disconnect()
            ambientOsc2Ref.current = null
          }
        }, 250)
      }
      setIsAmbientPlaying(false)
    } else {
      const ambGain = ctx.createGain()
      ambGain.gain.setValueAtTime(0.0001, ctx.currentTime)
      ambGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.8)

      const ambFilter = ctx.createBiquadFilter()
      ambFilter.type = 'lowpass'
      ambFilter.frequency.setValueAtTime(140, ctx.currentTime)

      // Dual Sub Oscillators (A1 55Hz + A2 110Hz with slight detune)
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(55, ctx.currentTime)

      const osc2 = ctx.createOscillator()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(110.4, ctx.currentTime)

      osc1.connect(ambFilter)
      osc2.connect(ambFilter)
      ambFilter.connect(ambGain)
      ambGain.connect(masterGainRef.current)

      osc1.start()
      osc2.start()

      ambientOsc1Ref.current = osc1
      ambientOsc2Ref.current = osc2
      ambientGainRef.current = ambGain
      setIsAmbientPlaying(true)
    }
  }, [initAudio, isAmbientPlaying])

  // Play a Synth Note (frequency in Hz, id as key name)
  const triggerNoteOn = useCallback((noteId, frequency) => {
    const ctx = initAudio()

    // Stop existing voice if still ringing
    if (activeVoicesRef.current.has(noteId)) {
      const oldVoice = activeVoicesRef.current.get(noteId)
      try {
        oldVoice.gain.gain.cancelScheduledValues(ctx.currentTime)
        oldVoice.gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        oldVoice.osc.stop(ctx.currentTime + 0.05)
      } catch {
        // ignore
      }
      activeVoicesRef.current.delete(noteId)
    }

    const osc = ctx.createOscillator()
    const voiceGain = ctx.createGain()

    osc.type = waveform
    osc.frequency.setValueAtTime(frequency, ctx.currentTime)

    // Quick attack and smooth sustain
    const now = ctx.currentTime
    voiceGain.gain.setValueAtTime(0.0001, now)
    voiceGain.gain.exponentialRampToValueAtTime(0.35, now + 0.02)
    voiceGain.gain.exponentialRampToValueAtTime(0.25, now + 0.15)

    osc.connect(voiceGain)
    voiceGain.connect(filterRef.current)

    osc.start()

    activeVoicesRef.current.set(noteId, { osc, gain: voiceGain })
    setActiveNotes((prev) => new Set(prev).add(noteId))
  }, [initAudio, waveform])

  // Stop a Synth Note
  const triggerNoteOff = useCallback((noteId) => {
    if (!audioCtxRef.current) return
    const ctx = audioCtxRef.current
    const voice = activeVoicesRef.current.get(noteId)

    if (voice) {
      const now = ctx.currentTime
      voice.gain.gain.cancelScheduledValues(now)
      voice.gain.gain.setValueAtTime(voice.gain.gain.value, now)
      voice.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3)
      voice.osc.stop(now + 0.35)
      activeVoicesRef.current.delete(noteId)
    }

    setActiveNotes((prev) => {
      const next = new Set(prev)
      next.delete(noteId)
      return next
    })
  }, [])

  // Trigger one-shot note (useful for click/tap)
  const playOneShot = useCallback((noteId, frequency, durationMs = 380) => {
    triggerNoteOn(noteId, frequency)
    setTimeout(() => {
      triggerNoteOff(noteId)
    }, durationMs)
  }, [triggerNoteOn, triggerNoteOff])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close()
      }
    }
  }, [])

  return {
    isAmbientPlaying,
    toggleAmbient,
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
  }
}
