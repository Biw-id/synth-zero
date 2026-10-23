# SYNTH-01: Tactile Kinetic Instrument

An interactive scrollytelling showcase and hardware product landing page for a fictional analog synthesizer, featuring interactive mechanical deconstruction and a playable Web Audio API synthesizer.

Repository: [https://github.com/Biw-id/synth-zero](https://github.com/Biw-id/synth-zero)

---

## Overview

SYNTH-01 explores interactive narrative design for hardware products. The site guides visitors through a five-act cinematic presentation combining smooth scrolling, parallax deconstruction, and embedded real-time audio synthesis.

### Narrative Acts

1. **Act 1: The Reveal (Hero)**: Full instrument floating in an obsidian matte environment (`#0A0B0E`) with telemetry HUD and ambient hum toggle.
2. **Act 2: Exploded Parallax View**: Scroll-driven mechanical deconstruction separating the top aluminum chassis, illuminated PCB core, and lower base plate in 3D parallax.
3. **Act 3: Pinned Presentation Deck**: Viewport locks while scrolling scrubs through 3 engineering feature cards (Dual Analog Filter, Tactile Encoders, 16-Step Sequencer).
4. **Act 4: Interactive Sound Lab**: Real-time synthesizer widget built on native Web Audio API with 4 trigger pads (`C3`, `E3`, `G3`, `B3` / keyboard keys `A`, `S`, `D`, `F`), cutoff frequency slider, waveform selector, and live canvas oscilloscope.
5. **Act 5: Technical Telemetry & Reserve Batch**: Monospaced specification matrix and reservation CTA with client-side serial number generator.

---

## Design System

- **Aesthetic**: Industrial hardware minimalism influenced by functionalist design principles.
- **Palette**: Obsidian Matte (`#0A0B0E`), Anodized Surface (`#12141A`), Signal Orange (`#FF4D26`), Phosphor Green (`#00F59B`), Pure White (`#F4F4F6`), Zinc Gray (`#71717A`).
- **Typography**: Syne (Display), Plus Jakarta Sans (Body), JetBrains Mono (Telemetry & Knobs).

---

## Tech Stack

- **Framework**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **Animation & Motion**: GSAP (ScrollTrigger), Lenis Smooth Scroll
- **Audio & Visualization**: Web Audio API (native), HTML5 Canvas

---

## Project Structure

```
synth-zero/
├── src/
│   ├── components/
│   │   ├── ExplodedView.jsx    # Act 2 scroll deconstruction
│   │   ├── Hero.jsx            # Act 1 introductory viewport
│   │   ├── Navigation.jsx      # Sticky telemetry HUD
│   │   ├── PresentationDeck.jsx# Act 3 pinned slide scrub
│   │   ├── SoundLab.jsx        # Act 4 Web Audio engine & oscilloscope
│   │   └── Telemetry.jsx       # Act 5 specifications & reservation
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone repository:
   ```bash
   git clone https://github.com/Biw-id/synth-zero.git
   cd synth-zero
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Build production bundle:
   ```bash
   npm run build
   ```

---

## Author

**Abiyyu Shiddiq As'ad (KaptenBiu)**  
- Portfolio: [abiyyu-portfolio.netlify.app](https://abiyyu-portfolio.netlify.app/)  
- GitHub: [@Biw-id](https://github.com/Biw-id)  
- Email: abiyyudedev@gmail.com
