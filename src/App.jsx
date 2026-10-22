import React from 'react'
import { useLenis } from './hooks/useLenis'
import { useSynthAudio } from './hooks/useSynthAudio'
import Navbar from './components/Navbar'
import HeroUnit from './components/HeroUnit'
import ExplodedView from './components/ExplodedView'
import PinnedDeck from './components/PinnedDeck'
import SoundLab from './components/SoundLab'
import TechSpecs from './components/TechSpecs'
import FinalCTA from './components/FinalCTA'

export default function App() {
  // Initialize Lenis smooth scroll
  useLenis()

  // Initialize Web Audio API synth engine
  const audio = useSynthAudio()

  const handleReserveClick = () => {
    const el = document.getElementById('reserve')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0A0B0E] text-[#F4F4F6] selection:bg-[#FF4D26] selection:text-white">
      {/* Global Navbar */}
      <Navbar
        isAmbientPlaying={audio.isAmbientPlaying}
        toggleAmbient={audio.toggleAmbient}
        onReserveClick={handleReserveClick}
      />

      {/* Main Narrative Flow */}
      <main>
        {/* Act 1: The Reveal (Hero Section) */}
        <HeroUnit />

        {/* Act 2: The Exploded Parallax View (Chassis Deconstruction) */}
        <ExplodedView />

        {/* Act 3: The Pinned Designer Presentation Deck */}
        <PinnedDeck />

        {/* Act 4: The Playable Sound Lab (Web Audio Synthesizer) */}
        <SoundLab
          cutoffFreq={audio.cutoffFreq}
          setCutoff={audio.setCutoff}
          resonance={audio.resonance}
          setFilterResonance={audio.setFilterResonance}
          waveform={audio.waveform}
          setWaveform={audio.setWaveform}
          activeNotes={audio.activeNotes}
          triggerNoteOn={audio.triggerNoteOn}
          triggerNoteOff={audio.triggerNoteOff}
          playOneShot={audio.playOneShot}
          analyserRef={audio.analyserRef}
        />

        {/* Act 5: Technical Telemetry Specifications */}
        <TechSpecs />
      </main>

      {/* Act 5: Batch 01 Reservation Card & Agency Footer */}
      <FinalCTA />
    </div>
  )
}
