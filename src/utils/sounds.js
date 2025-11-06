// Cyberpunk Sound Effects using Web Audio API

class SoundManager {
  constructor() {
    this.audioContext = null
    this.init()
  }

  init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    } catch (e) {
      console.warn('Web Audio API not supported')
    }
  }

  // Ensure audio context is running (required for user interaction)
  ensureContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume()
    }
  }

  // Generate a beep sound with optional distortion
  beep(frequency = 440, duration = 100, type = 'sine', volume = 0.3, distortion = false) {
    if (!this.audioContext) return
    this.ensureContext()

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    
    let destination = this.audioContext.destination

    // Add distortion for gritty sounds
    if (distortion) {
      const distortionNode = this.audioContext.createWaveShaper()
      distortionNode.curve = this.makeDistortionCurve(400)
      distortionNode.oversample = '4x'
      
      const distortionGain = this.audioContext.createGain()
      distortionGain.gain.value = 0.5
      
      oscillator.connect(distortionNode)
      distortionNode.connect(distortionGain)
      distortionGain.connect(gainNode)
    } else {
      oscillator.connect(gainNode)
    }
    
    gainNode.connect(destination)

    oscillator.frequency.value = frequency
    oscillator.type = type

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + duration / 1000)
  }

  // Create distortion curve for gritty sounds
  makeDistortionCurve(amount) {
    const samples = 44100
    const curve = new Float32Array(samples)
    const deg = Math.PI / 180
    
    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1
      curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x))
    }
    
    return curve
  }

  // Create a blunt digital bass sound
  digitalBass(frequency = 60, duration = 200, intensity = 0.4) {
    if (!this.audioContext) return
    this.ensureContext()

    // Low frequency bass with sharp attack
    const osc = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()
    
    // Use square wave for blunt, digital sound
    osc.type = 'square'
    osc.frequency.value = frequency
    
    // Sharp attack, quick decay
    gain.gain.setValueAtTime(0, this.audioContext.currentTime)
    gain.gain.linearRampToValueAtTime(intensity * 0.3, this.audioContext.currentTime + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000)
    
    osc.connect(gain)
    gain.connect(this.audioContext.destination)
    
    osc.start(this.audioContext.currentTime)
    osc.stop(this.audioContext.currentTime + duration / 1000)
  }

  // Create a harsh, gritty sound with multiple oscillators
  harshBeep(frequency = 200, duration = 150, intensity = 0.5) {
    if (!this.audioContext) return
    this.ensureContext()

    // Create multiple oscillators for layered, gritty sound
    for (let i = 0; i < 3; i++) {
      const osc = this.audioContext.createOscillator()
      const gain = this.audioContext.createGain()
      const distortion = this.audioContext.createWaveShaper()
      
      distortion.curve = this.makeDistortionCurve(300 + i * 100)
      distortion.oversample = '4x'
      
      osc.type = i === 0 ? 'sawtooth' : 'square'
      osc.frequency.value = frequency + (i * 50) - 50
      
      osc.connect(distortion)
      distortion.connect(gain)
      gain.connect(this.audioContext.destination)
      
      gain.gain.setValueAtTime(intensity * 0.2, this.audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000)
      
      osc.start(this.audioContext.currentTime)
      osc.stop(this.audioContext.currentTime + duration / 1000)
    }
  }

  // Cyberpunk button click sound - blunt digital bass
  buttonClick() {
    this.digitalBass(80, 100, 0.5)
    setTimeout(() => this.digitalBass(100, 80, 0.3), 50)
  }

  // Test pass sound - blunt bass sequence
  testPass() {
    if (!this.audioContext) return
    this.ensureContext()

    // Simple, blunt bass hits
    const frequencies = [60, 80, 100, 120]
    frequencies.forEach((freq, i) => {
      setTimeout(() => {
        this.digitalBass(freq, 150, 0.5)
      }, i * 120)
    })
  }

  // Test fail sound - blunt, heavy bass
  testFail() {
    if (!this.audioContext) return
    this.ensureContext()

    // Heavy, descending bass hits
    const frequencies = [100, 80, 60, 50]
    frequencies.forEach((freq, i) => {
      setTimeout(() => {
        this.digitalBass(freq, 200, 0.6)
      }, i * 150)
    })
  }

  // Glitch error sound - blunt bass stabs
  glitchError() {
    if (!this.audioContext) return
    this.ensureContext()

    const frequencies = [50, 70, 60, 80]
    frequencies.forEach((freq, i) => {
      setTimeout(() => {
        this.digitalBass(freq, 80, 0.7)
      }, i * 60)
    })
  }

  // Terminal animation sound - blunt bass sequence
  terminalAnimation() {
    if (!this.audioContext) return
    this.ensureContext()

    // Simple, blunt bass hits
    const sequence = [
      { freq: 60, dur: 200, intensity: 0.5 },
      { freq: 80, dur: 180, intensity: 0.5 },
      { freq: 100, dur: 160, intensity: 0.6 },
      { freq: 120, dur: 200, intensity: 0.6 },
      { freq: 140, dur: 250, intensity: 0.7 }
    ]

    sequence.forEach((sound, i) => {
      setTimeout(() => {
        this.digitalBass(sound.freq, sound.dur, sound.intensity)
      }, i * 200)
    })
  }

  // Problem select sound - blunt bass click
  problemSelect() {
    this.digitalBass(70, 100, 0.4)
    setTimeout(() => this.digitalBass(90, 80, 0.3), 40)
  }

  // Glitch sound effect - blunt bass stabs
  glitch() {
    if (!this.audioContext) return
    this.ensureContext()

    const frequencies = [60, 80, 70, 90, 75]
    frequencies.forEach((freq, i) => {
      setTimeout(() => {
        this.digitalBass(freq, 60, 0.4)
      }, i * 50)
    })
  }

  // Success fanfare - blunt bass hits
  successFanfare() {
    if (!this.audioContext) return
    this.ensureContext()

    // Simple, blunt ascending bass
    const notes = [
      { freq: 60, time: 0, intensity: 0.5 },
      { freq: 80, time: 200, intensity: 0.5 },
      { freq: 100, time: 400, intensity: 0.6 },
      { freq: 120, time: 600, intensity: 0.6 },
      { freq: 140, time: 800, intensity: 0.7 }
    ]

    notes.forEach(note => {
      setTimeout(() => {
        this.digitalBass(note.freq, 200, note.intensity)
      }, note.time)
    })
  }

  // Ambient background hum (optional, can be toggled)
  startAmbient() {
    if (!this.audioContext) return
    this.ensureContext()

    if (this.ambientOscillator) {
      this.stopAmbient()
    }

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.value = 60
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime)

    oscillator.start()
    this.ambientOscillator = oscillator
    this.ambientGain = gainNode
  }

  stopAmbient() {
    if (this.ambientOscillator) {
      this.ambientOscillator.stop()
      this.ambientOscillator = null
      this.ambientGain = null
    }
  }

  // Typewriter sound for code editor - subtle bass click
  typewriter() {
    if (!this.audioContext) return
    this.ensureContext()

    const freq = 80 + Math.random() * 40
    this.digitalBass(freq, 30, 0.2)
  }

  // Warning sound - blunt bass alert
  warning() {
    if (!this.audioContext) return
    this.ensureContext()

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.digitalBass(70, 150, 0.6)
      }, i * 200)
    }
  }

  // Time warning - urgent blunt bass
  timeWarning() {
    if (!this.audioContext) return
    this.ensureContext()

    this.digitalBass(60, 250, 0.6)
    setTimeout(() => this.digitalBass(50, 250, 0.6), 150)
  }
}

// Create singleton instance
const soundManager = new SoundManager()

export default soundManager

