import { useEffect, useState, useRef } from 'react'
import { useUiSoundApi } from '../contexts/UiSoundContext'
import * as Tone from 'tone'
import './BreachProtocol.css'

function BreachProtocol({ onComplete }) {
  const sounds = useUiSoundApi()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedPath, setSelectedPath] = useState([])
  const [buffer, setBuffer] = useState([])
  const [completedSequences, setCompletedSequences] = useState([])
  const [timeRemaining, setTimeRemaining] = useState(15.0)
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0)
  const [allPaths, setAllPaths] = useState([])
  const animationIntervalRef = useRef(null)
  const animationTimeoutsRef = useRef([])

  // Low frequency success buzz function
  const playSuccessBuzz = async () => {
    try {
      // Ensure Tone.js audio context is running
      if (Tone.context.state !== 'running') {
        await Tone.start()
      }
      
      // Use MembraneSynth for a deep, buzzy sound - similar to subKick but sustained
      const buzz = new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 4,
        oscillator: {
          type: 'sawtooth'
        },
        envelope: {
          attack: 0.1,
          decay: 0.2,
          sustain: 0.8,
          release: 1.5
        }
      })
      
      // Add distortion for grit
      const distortion = new Tone.Distortion(0.6)
      const filter = new Tone.Filter({
        type: 'lowpass',
        frequency: 200,
        Q: 1
      })
      
      const gain = new Tone.Gain(0.8)
      
      // Connect: buzz -> filter -> distortion -> gain -> destination
      buzz.connect(filter)
      filter.connect(distortion)
      distortion.connect(gain)
      gain.toDestination()
      
      const now = Tone.now()
      
      // Play a very low note (F1 = ~43Hz) for deep buzz
      buzz.triggerAttackRelease('F1', 2.0, now)
      
      // Cleanup after sound finishes
      setTimeout(() => {
        try {
          buzz.dispose()
          filter.dispose()
          distortion.dispose()
          gain.dispose()
        } catch (e) {
          // Ignore cleanup errors
        }
      }, 3000)
    } catch (error) {
      console.error('Error playing success buzz:', error)
    }
  }

  // Define sequences to complete (similar to breach protocol)
  const sequences = [
    { code: ['55', '1C'], reward: 'DATAMINE_V1', description: 'Components and/or quickhacks' },
    { code: ['55', '1C', '55'], reward: 'DATAMINE_V2', description: 'Components and/or quickhacks' },
    { code: ['1C', '55', 'BD'], reward: 'DATAMINE_V3', description: 'Components and/or quickhacks' },
  ]

  // Generate a 5x5 code matrix with hex values
  // Ensure all sequences can be found in the matrix
  const generateMatrix = () => {
    const hexValues = ['55', '1C', 'E9', 'BD', 'FF', 'AA', '7F', '3D']
    const matrix = []
    
    // Initialize matrix
    for (let i = 0; i < 5; i++) {
      const row = []
      for (let j = 0; j < 5; j++) {
        row.push(null)
      }
      matrix.push(row)
    }
    
    // Place all sequence codes in valid paths
    let currentRow = 0
    let currentCol = 0
    
    // Place first sequence
    for (const code of sequences[0].code) {
      if (currentRow < 5 && currentCol < 5) {
        matrix[currentRow][currentCol] = code
        if (Math.random() > 0.5 && currentCol < 4) {
          currentCol++
        } else if (currentRow < 4) {
          currentRow++
        } else if (currentCol < 4) {
          currentCol++
        }
      }
    }
    
    // Place second sequence (start from a different position)
    currentRow = 1
    currentCol = 2
    for (const code of sequences[1].code) {
      if (currentRow < 5 && currentCol < 5 && matrix[currentRow][currentCol] === null) {
        matrix[currentRow][currentCol] = code
        if (Math.random() > 0.5 && currentCol < 4) {
          currentCol++
        } else if (currentRow < 4) {
          currentRow++
        } else if (currentCol < 4) {
          currentCol++
        }
      } else {
        // Find next available spot
        for (let r = currentRow; r < 5; r++) {
          for (let c = currentCol; c < 5; c++) {
            if (matrix[r][c] === null) {
              matrix[r][c] = code
              currentRow = r
              currentCol = c
              break
            }
          }
        }
      }
    }
    
    // Place third sequence
    currentRow = 2
    currentCol = 0
    for (const code of sequences[2].code) {
      if (currentRow < 5 && currentCol < 5 && matrix[currentRow][currentCol] === null) {
        matrix[currentRow][currentCol] = code
        if (Math.random() > 0.5 && currentCol < 4) {
          currentCol++
        } else if (currentRow < 4) {
          currentRow++
        } else if (currentCol < 4) {
          currentCol++
        }
      } else {
        // Find next available spot
        for (let r = currentRow; r < 5; r++) {
          for (let c = currentCol; c < 5; c++) {
            if (matrix[r][c] === null) {
              matrix[r][c] = code
              currentRow = r
              currentCol = c
              break
            }
          }
        }
      }
    }
    
    // Fill remaining cells with random hex values
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (matrix[i][j] === null) {
          matrix[i][j] = hexValues[Math.floor(Math.random() * hexValues.length)]
        }
      }
    }
    
    return matrix
  }

  const [matrix] = useState(generateMatrix())

  // Find valid path through matrix for a sequence (can only move right or down)
  const findPath = (sequence) => {
    const path = []
    let currentRow = 0
    let currentCol = 0

    for (const code of sequence) {
      // Search from current position, moving right or down
      let found = false
      let bestRow = -1
      let bestCol = -1
      let minDistance = Infinity

      // Find closest valid cell (can only move right or down)
      for (let row = currentRow; row < 5; row++) {
        for (let col = currentCol; col < 5; col++) {
          if (matrix[row][col] === code) {
            const distance = (row - currentRow) + (col - currentCol)
            if (distance < minDistance) {
              minDistance = distance
              bestRow = row
              bestCol = col
              found = true
            }
          }
        }
      }

      if (found) {
        path.push({ row: bestRow, col: bestCol, code })
        currentRow = bestRow
        currentCol = bestCol
      } else {
        // If not found, try to find any valid path (allow going to any position)
        for (let row = 0; row < 5 && !found; row++) {
          for (let col = 0; col < 5 && !found; col++) {
            if (matrix[row][col] === code) {
              path.push({ row, col, code })
              currentRow = row
              currentCol = col
              found = true
            }
          }
        }
      }
    }
    return path
  }

  useEffect(() => {
    // Find paths for all sequences
    const paths = sequences.map(seq => findPath(seq.code))
    setAllPaths(paths)
    setSelectedPath(paths[0])
    setCurrentSequenceIndex(0)

    const runAnimation = () => {
      const animateSequence = (seqIdx) => {
        if (seqIdx >= sequences.length) {
          // All sequences completed
          const timeout = setTimeout(async () => {
            await sounds.playTestSuccess()
            
            // Play low frequency success buzz after a short delay
            const timeoutBuzz = setTimeout(async () => {
              console.log('Playing success buzz...')
              await playSuccessBuzz()
            }, 600)
            animationTimeoutsRef.current.push(timeoutBuzz)
            
            const timeout2 = setTimeout(() => {
              if (onComplete) onComplete()
            }, 2000)
            animationTimeoutsRef.current.push(timeout2)
          }, 300)
          animationTimeoutsRef.current.push(timeout)
          return
        }

        const path = paths[seqIdx]
        setSelectedPath(path)
        setCurrentSequenceIndex(seqIdx)
        
        let stepCount = 0

        animationIntervalRef.current = setInterval(() => {
          if (stepCount < path.length) {
            setCurrentStep(stepCount)
            setBuffer(path.slice(0, stepCount + 1).map(p => p.code))
            
            // Play sound for each step
            if (stepCount < path.length - 1) {
              sounds.playHover()
            }
            
            stepCount++
          } else {
            // Sequence completed
            if (animationIntervalRef.current) {
              clearInterval(animationIntervalRef.current)
              animationIntervalRef.current = null
            }
            
            // Mark this sequence as completed
            setCompletedSequences(prev => [...prev, sequences[seqIdx]])
            
            // Play subtle completion sound
            const timeout1 = setTimeout(() => {
              sounds.playHover()
            }, 100)
            animationTimeoutsRef.current.push(timeout1)
            
            // Move to next sequence after delay (faster)
            const timeout2 = setTimeout(() => {
              setCurrentStep(0)
              setBuffer([])
              animateSequence(seqIdx + 1)
            }, 300)
            animationTimeoutsRef.current.push(timeout2)
          }
        }, 200)
      }

      // Start with first sequence
      animateSequence(0)
    }

    // Start animation
    runAnimation()

    // Timer countdown
    const timerInterval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0.1) {
          clearInterval(timerInterval)
          return 0
        }
        return prev - 0.1
      })
    }, 100)

    return () => {
      clearInterval(timerInterval)
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current)
      }
      animationTimeoutsRef.current.forEach(timeout => clearTimeout(timeout))
      animationTimeoutsRef.current = []
    }
  }, [sounds, onComplete])

  const isCellSelected = (row, col) => {
    // Check if cell is in any completed sequence path
    const completedPaths = allPaths.slice(0, currentSequenceIndex)
    const isInCompleted = completedPaths.some(path => 
      path.some(p => p.row === row && p.col === col)
    )
    
    // Check if cell is in current path
    const isInCurrent = selectedPath.some((p, index) => 
      p.row === row && p.col === col && index <= currentStep
    )
    
    return isInCompleted || isInCurrent
  }

  const isCellActive = (row, col) => {
    const current = selectedPath[currentStep]
    return current && current.row === row && current.col === col
  }

  return (
    <div className="breach-protocol-overlay">
      <div className="breach-protocol-container">
        <div className="breach-header">
          <div className="breach-time">
            <span className="breach-label">BREACH TIME REMAINING</span>
            <span className="breach-timer">{timeRemaining.toFixed(2)}</span>
          </div>
          <div className="breach-buffer">
            <span className="breach-label">BUFFER</span>
            <div className="buffer-slots">
              {[0, 1, 2, 3].map((slot, index) => (
                <div 
                  key={slot} 
                  className={`buffer-slot ${buffer[index] ? 'filled' : ''} ${index === buffer.length - 1 ? 'active' : ''}`}
                >
                  {buffer[index] || ''}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="breach-content">
          <div className="code-matrix-panel">
            <div className="panel-header">CODE MATRIX</div>
            <div className="code-matrix">
              {matrix.map((row, rowIndex) => (
                <div key={rowIndex} className="matrix-row">
                  {row.map((cell, colIndex) => {
                    const selected = isCellSelected(rowIndex, colIndex)
                    const active = isCellActive(rowIndex, colIndex)
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`matrix-cell ${selected ? 'selected' : ''} ${active ? 'active' : ''}`}
                      >
                        {cell}
                        {active && <div className="cursor-arrow">▶</div>}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="sequence-panel">
            <div className="panel-header">SEQUENCE REQUIRED TO UPLOAD</div>
            <div className="sequences-list">
              {sequences.map((seq, index) => {
                const isCompleted = completedSequences.some(s => s.reward === seq.reward)
                const isCurrent = index === currentSequenceIndex
                const progress = isCurrent && selectedPath.length > 0
                  ? Math.min(currentStep + 1, seq.code.length)
                  : isCompleted
                  ? seq.code.length
                  : 0
                
                return (
                  <div key={index} className={`sequence-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                    <div className="sequence-code">
                      {seq.code.map((code, codeIndex) => {
                        const matched = codeIndex < progress
                        return (
                          <span 
                            key={codeIndex} 
                            className={`code-value ${matched ? 'matched' : ''}`}
                          >
                            {code}
                          </span>
                        )
                      })}
                    </div>
                    <div className="sequence-reward">
                      <div className="datamine-icon">▼</div>
                      <div className="reward-info">
                        <div className="reward-name">{seq.reward}</div>
                        <div className="reward-desc">{seq.description}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {completedSequences.length === sequences.length && (
          <div className="breach-success">
            <div className="success-text">BREACH COMPLETE</div>
            <div className="success-subtext">ALL DATAMINES ACQUIRED</div>
            <div className="success-subtext">ACCESS GRANTED</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BreachProtocol

