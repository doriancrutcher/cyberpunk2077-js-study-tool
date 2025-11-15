import { useState, useRef } from 'react'
import Draggable from 'react-draggable'
import brainAsset from '../assets/images/neural-brain-holo.png'

const motivationalCopy = [
  'Micro-challenges forge macro-connections.',
  'Short rests consolidate the circuit you just built.',
  'Novel problem types keep the hippocampus engaged.',
  'Teaching a concept right after solving it doubles retention.',
  'Sleep is the ultimate background compiler for memory.'
]

const particleSeeds = [
  { top: '18%', left: '32%' },
  { top: '25%', left: '58%' },
  { top: '48%', left: '70%' },
  { top: '60%', left: '42%' },
  { top: '68%', left: '30%' },
  { top: '35%', left: '74%' },
  { top: '42%', left: '18%' },
  { top: '57%', left: '58%' },
  { top: '30%', left: '44%' },
  { top: '65%', left: '66%' },
  { top: '52%', left: '24%' },
  { top: '40%', left: '80%' }
]

function NeuralPanel({ isVisible, onClose, stats }) {
  const defaultPosition = { x: 0, y: 0 }
  const [dragPosition, setDragPosition] = useState(defaultPosition)
  const panelRef = useRef(null)

  if (!isVisible) {
    if (dragPosition.x !== defaultPosition.x || dragPosition.y !== defaultPosition.y) {
      setDragPosition(defaultPosition)
    }
    return null
  }

  const tip =
    motivationalCopy[Math.floor(Math.random() * motivationalCopy.length)]

  const {
    sessions,
    totalConnections,
    challengeIndex,
    lastSession,
    difficultyHistory
  } = stats

  const connectionDensity = Math.min(
    100,
    Math.round((totalConnections / Math.max(sessions, 1)) * 0.8)
  )

  const challengeState =
    challengeIndex < 0.75
      ? 'Need more friction'
      : challengeIndex > 1.6
      ? 'High strain — consolidate'
      : 'Optimal challenge window'

  const last = lastSession || {}

  return (
    <Draggable
      nodeRef={panelRef}
      handle=".neural-panel__header"
      position={dragPosition}
      onDrag={(_, data) => setDragPosition({ x: data.x, y: data.y })}
      onStop={(_, data) => setDragPosition({ x: data.x, y: data.y })}
    >
    <aside className="neural-panel" ref={panelRef}>
      <div className="neural-panel__header">
        <div className="neural-panel__title">
          <span className="terminal-prompt">></span>
          <span className="terminal-text">NEURAL FORGE</span>
        </div>
        <button className="neural-close-btn" onClick={onClose}>
          HIDE
        </button>
      </div>

      <div className="neural-brain-visual">
        <img
          src={brainAsset}
          alt="Neural brain hologram"
          className="neural-brain-image"
          loading="lazy"
        />
        <div className="neural-brain-overlay core"></div>
        <div className="neural-brain-overlay halo"></div>
        <div className="neural-brain-overlay static-grid"></div>
        <div className="neural-scan-line primary"></div>
        <div className="neural-scan-line secondary"></div>
        <div className="neural-synapse-pulse pulse-a"></div>
        <div className="neural-synapse-pulse pulse-b"></div>
        <div className="neural-particle-field">
          {particleSeeds.map((seed, idx) => (
            <span
              key={`particle-${idx}`}
              className="neural-particle"
              style={{ top: seed.top, left: seed.left, animationDelay: `${idx * 0.35}s` }}
            ></span>
          ))}
        </div>
        <div className="neural-focus focus-prefrontal"></div>
        <div className="neural-focus focus-parietal"></div>
        <div className="neural-focus focus-cerebellum"></div>
        <div className="neural-brain-label top-left">PREFRONTAL GROWTH</div>
        <div className="neural-brain-label mid-right">HABIT LOOP</div>
        <div className="neural-brain-label bottom">CEREBELLAR PRECISION</div>
      </div>

      <div className="neural-metrics">
        <div className="metric-card">
          <div className="metric-label">Neural Uplift</div>
          <div className="metric-value">
            {totalConnections.toLocaleString()} synapses
          </div>
          <div className="metric-sub">
            Sessions logged: <strong>{sessions}</strong>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Connection Density</div>
          <div className="metric-value">{connectionDensity}%</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${connectionDensity}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="neural-difficulty">
        <div className="difficulty-header">
          <span>Challenge Index</span>
          <strong>{challengeIndex}</strong>
        </div>
        <div className="difficulty-status">{challengeState}</div>
        <div className="difficulty-sparkline">
          {difficultyHistory.map((score, idx) => (
            <div
              key={`spark-${idx}-${score}`}
              className="sparkline-bar"
              style={{
                height: `${Math.min(100, score * 60 + 20)}%`,
                background:
                  score < 0.8
                    ? 'var(--neon-cyan)'
                    : score > 1.5
                    ? 'var(--neon-pink)'
                    : 'var(--neon-green)'
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="session-readout">
        <div>
          <span className="readout-label">Last Session</span>
          <div className="readout-value">
            {last.connectionsGained || 0} synapses forged
          </div>
        </div>
        <div>
          <span className="readout-label">Focus Resonance</span>
          <div className="readout-value">{last.focusScore || '--'}%</div>
        </div>
        <div>
          <span className="readout-label">Plasticity Surge</span>
          <div className="readout-value">{last.plasticity || '--'}%</div>
        </div>
      </div>

      <div className="neural-tip">
        <span className="tip-label">// Cognitive Briefing</span>
        <p>{tip}</p>
        {last.adaptiveDifficulty && (
          <div className="tip-status">{last.adaptiveDifficulty}</div>
        )}
      </div>
    </aside>
    </Draggable>
  )
}

export default NeuralPanel

