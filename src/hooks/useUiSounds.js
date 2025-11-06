import { useEffect, useMemo, useRef, useCallback } from "react"
import * as Tone from "tone"

export function useUiSounds() {
  const startedRef = useRef(false)

  const {
    hoverSynth,
    confirmSynth,
    cancelSynth,
    arpSynth,
    noise,
    bitCrusher,
    reverb,
    pannerLeft,
    pannerRight,
    filterLow,
    ambientOsc,
    ambientGain,
    subKick,
  } = useMemo(() => {
    const reverb = new Tone.Reverb({ decay: 0.8, wet: 0.15 }).toDestination()
    const bitCrusher = new Tone.BitCrusher({ bits: 6 }).toDestination()
    const pannerLeft = new Tone.Panner(-0.12).toDestination()
    const pannerRight = new Tone.Panner(0.12).toDestination()

    const hoverSynth = new Tone.Synth({
      oscillator: { type: "triangle" },
      envelope: { attack: 0.001, decay: 0.06, sustain: 0.0, release: 0.04 },
    }).connect(pannerRight)

    const confirmSynth = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.001, decay: 0.12, sustain: 0.0, release: 0.15 },
    }).connect(reverb)

    const cancelSynth = new Tone.Synth({
      oscillator: { type: "square" },
      envelope: { attack: 0.001, decay: 0.05, sustain: 0.0, release: 0.08 },
    }).connect(bitCrusher)

    const arpSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 0.002, decay: 0.15, sustain: 0.0, release: 0.2 },
    }).connect(reverb)

    const noise = new Tone.Noise("white").start(0)
    const filterLow = new Tone.Filter({ type: "lowpass", frequency: 1200, Q: 0.8 })
    noise.connect(filterLow)
    const noiseGain = new Tone.Gain(0.0).toDestination()
    filterLow.connect(noiseGain)

    const ambientOsc = new Tone.Oscillator({
      type: "sine",
      frequency: 70,
    })

    const ambientGain = new Tone.Gain(0.0).toDestination()
    ambientOsc.connect(ambientGain)

    const subKick = new Tone.MembraneSynth({
      pitchDecay: 0.01,
      octaves: 6,
      oscillator: { type: "sine" },
      envelope: { attack: 0.001, decay: 0.25, sustain: 0.0, release: 0.1 },
    }).toDestination()

    return {
      hoverSynth,
      confirmSynth,
      cancelSynth,
      arpSynth,
      noise,
      bitCrusher,
      reverb,
      pannerLeft,
      pannerRight,
      filterLow,
      ambientOsc,
      ambientGain,
      subKick,
      noiseGain,
    }
  }, [])

  useEffect(() => {
    return () => {
      Tone.getTransport().cancel(0)
    }
  }, [])

  const resumeAudio = useCallback(async () => {
    if (!startedRef.current) {
      await Tone.start()
      startedRef.current = true
      ambientOsc.start()
    }
  }, [ambientOsc])

  const playHover = useCallback(async () => {
    await resumeAudio()
    // Short narrow band click with gentle pitch rise 1.2k to 1.6k
    const freq = 1200 + Math.random() * 400
    hoverSynth.triggerAttackRelease(freq, 0.06)
    
    // Add faint stereo flicker
    setTimeout(() => {
      hoverSynth.triggerAttackRelease(freq + 50, 0.04)
    }, 20)
  }, [hoverSynth, resumeAudio])

  const playConfirm = useCallback(async () => {
    await resumeAudio()
    // Clean data ping
    confirmSynth.triggerAttackRelease(1200, 0.08)
    
    // 150ms soft descending whoosh with static
    const shortNoise = new Tone.Noise("white")
    const filter = new Tone.Filter({ type: "lowpass", frequency: 1200, rolloff: -24 }).toDestination()
    const gain = new Tone.Gain(0.0).connect(filter)
    shortNoise.connect(gain)
    shortNoise.start()
    
    gain.gain.rampTo(0.08, 0.02)
    filter.frequency.rampTo(400, 0.15)
    
    setTimeout(() => {
      gain.gain.rampTo(0, 0.05)
      setTimeout(() => {
        shortNoise.stop()
        shortNoise.dispose()
        filter.dispose()
        gain.dispose()
      }, 60)
    }, 160)
  }, [confirmSynth, resumeAudio])

  const playCancel = useCallback(async () => {
    await resumeAudio()
    // Soft bitcrushed tick with low pass fade
    cancelSynth.triggerAttackRelease(600, 0.08)
    
    // Tiny reversed click
    setTimeout(() => {
      const revClick = new Tone.Synth({
        oscillator: { type: "square" },
        envelope: { attack: 0.05, decay: 0.0, sustain: 0.0, release: 0.01 },
      }).connect(bitCrusher)
      revClick.triggerAttackRelease(400, 0.03)
      setTimeout(() => revClick.dispose(), 50)
    }, 80)
  }, [cancelSynth, bitCrusher, resumeAudio])

  const playTestSuccess = useCallback(async () => {
    await resumeAudio()
    // Rising tri-tone arpeggio C5 E5 G5
    const now = Tone.now()
    arpSynth.triggerAttackRelease("C5", 0.12, now + 0.0)
    arpSynth.triggerAttackRelease("E5", 0.12, now + 0.12)
    arpSynth.triggerAttackRelease("G5", 0.18, now + 0.24)
    
    // Faint sparkle crackle and brighten background hum
    const brightener = new Tone.EQ3({ high: 3, mid: 0, low: 0 }).toDestination()
    const temp = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 }
    }).connect(brightener)
    temp.triggerAttackRelease(9000, 0.05, now + 0.3)
    
    setTimeout(() => {
      temp.dispose()
      brightener.dispose()
    }, 400)
  }, [arpSynth, resumeAudio])

  const playTestFailure = useCallback(async () => {
    await resumeAudio()
    // Descending glitch pulse 1.5k to 300Hz in 0.3s
    const osc = new Tone.Oscillator({ type: "triangle", frequency: 1500 }).start()
    const crusher = new Tone.BitCrusher({ bits: 5 })
    const dist = new Tone.Distortion(0.2)
    const gain = new Tone.Gain(0.08)
    
    osc.chain(crusher, dist, gain, Tone.getDestination())
    osc.frequency.rampTo(300, 0.3)
    
    // Metallic click distortion
    const click = new Tone.Synth({
      oscillator: { type: "square" },
      envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.05 }
    }).connect(crusher)
    click.triggerAttackRelease(800, 0.05, Tone.now() + 0.1)
    
    // Soft sub thump near 90Hz
    subKick.triggerAttackRelease("F2", 0.1, Tone.now() + 0.25)
    
    setTimeout(() => {
      osc.stop()
      osc.dispose()
      crusher.dispose()
      dist.dispose()
      gain.dispose()
      click.dispose()
    }, 320)
  }, [subKick, resumeAudio])

  const startAmbient = useCallback(async () => {
    await resumeAudio()
    ambientGain.gain.rampTo(0.03, 0.4)
    
    // Light amplitude modulation for breathing effect
    const lfo = new Tone.LFO({ frequency: 0.18, min: 0.02, max: 0.06 }).start()
    lfo.connect(ambientGain.gain)
    
    // Store LFO reference for cleanup if needed
    if (!ambientGain._lfo) {
      ambientGain._lfo = lfo
    }
  }, [ambientGain, resumeAudio])

  const stopAmbient = useCallback(async () => {
    ambientGain.gain.rampTo(0.0, 0.3)
  }, [ambientGain])

  return {
    playHover,
    playConfirm,
    playCancel,
    playTestSuccess,
    playTestFailure,
    startAmbient,
    stopAmbient,
  }
}

