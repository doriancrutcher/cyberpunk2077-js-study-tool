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
  const [showProtocolModal, setShowProtocolModal] = useState(false)
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
          <span className="terminal-prompt">{'>'}</span>
          <span className="terminal-text">NEURAL FORGE</span>
        </div>
        <div className="neural-panel__actions">
          <button className="neural-btn neural-logs-btn" onClick={() => setShowProtocolModal(true)}>
            LOGS
          </button>
          <button className="neural-btn neural-close-btn" onClick={onClose}>
            HIDE
          </button>
        </div>
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

      {showProtocolModal && (
        <div className="protocol-modal-overlay" onClick={() => setShowProtocolModal(false)}>
          <div className="protocol-modal" onClick={(e) => e.stopPropagation()}>
            <div className="protocol-modal-header">
              <div className="protocol-header-content">
                <span className="protocol-prompt">//:</span>
                <span className="protocol-title">SYSTEM LOG: WETWARE OPTIMIZATION PROTOCOL</span>
              </div>
              <button 
                className="protocol-modal-close" 
                onClick={() => setShowProtocolModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="protocol-modal-content">
              <div className="protocol-section">
                <div className="protocol-section-header">ANALYSIS: FORCED EVOLUTION & SYNAPTIC HARDENING</div>
                <div className="protocol-content">
                  Your wetware—the organic processing unit of the cortex—is not static hardware. It is a living, neurochemical substrate designed for dynamic reconfiguration. To upgrade its computational capacity, you must induce controlled biological stress (challenge).
                  <br /><br />
                  Forcing the system to execute high-complexity subroutines (e.g., learning, problem-solving) triggers an adaptive response in the living tissue. This is not just a software update; it is a physical hardware fabrication. New dendritic connections are grown, and existing pathways are reinforced with myelin "shielding."
                  <br /><br />
                  Frequent diagnostic execution (self-testing) is the primary optimization protocol. This is an active bio-electric query, not passive data absorption. The act of "forcing" the retrieval triggers a neurochemical signal that a specific pathway is high-value. This targeted stress is the mechanism that strengthens and hardens the physical grid.
                </div>
              </div>

              <div className="protocol-section">
                <div className="protocol-section-header">THREAT: SYNAPTIC ATROPHY (FORGETTING) & COUNTER-PROTOCOLS</div>
                <div className="protocol-content">
                  Unused data pathways are marked for synaptic pruning—a biological resource-management protocol. The system will reclaim the energy from inefficient connections. Your defense is the Active Retrieval Protocol.
                  <br /><br />
                  <strong>Passive Data Ingestion (Passive Review):</strong>
                  <br />
                  Operation: A read-only data stream (re-reading, watching).
                  <br />
                  Vulnerability: This floods the sensory buffers, creating a temporary "ghost-echo" in the short-term memory. The data feels authenticated, but no long-term potentiation (the biological "write" command) has occurred. This is the "Illusion of Knowing"—a critical failure state.
                  <br /><br />
                  <strong>Active Retrieval Protocol (Active Recall):</strong>
                  <br />
                  Operation: A "fetch-execute" command without the source data. The neural processor must locate the engram (the physical memory trace) itself.
                  <br />
                  Result: The initial neuro-latency (the "struggle") is not a bug; it is the core feature. This act of forced retrieval pings the data packet for high-priority biological authentication. The system flags that pathway for survival, reinforcing it against the standard decay protocol.
                </div>
              </div>

              <div className="protocol-section">
                <div className="protocol-section-header">DIAGNOSTIC: SYSTEM-STATE SENSORS (WHAT YOU "FEEL")</div>
                <div className="protocol-content">
                  To confirm the optimization protocol is active, monitor your internal state for these sensory "haptics." The process is not meant to feel easy. Ease is a symptom of system stagnation.
                  <br /><br />
                  <strong>"Cognitive Burn" / Processor Strain:</strong>
                  <br />
                  You will experience a sensation of mental friction or fatigue. This is the "brain hurt" you feel. It is the literal metabolic cost of building new hardware. Your processor is running at 100% capacity, consuming glucose and generating bio-electrical "heat." This is a positive signal.
                  <br /><br />
                  <strong>Data-Latency (The "Struggle"):</strong>
                  <br />
                  When executing an Active Retrieval query, you will experience a delay. The data will not be instantaneous. This latency is the work. You are forcing the system to search, locate, and compile the data packet from deep storage. This is the "desirable difficulty." Do not abort the query.
                  <br /><br />
                  <strong>System "Fog" / Cache Overload:</strong>
                  <br />
                  As you push the limits of new data ingestion, your short-term buffers will feel "full" or "foggy." This is the sensation of cognitive overload. It is a sign you have reached the current boundary of your processing capacity. This is the boundary you must push.
                  <br /><br />
                  <div className="protocol-critical">
                    <strong>//: CRITICAL_NOTE</strong> Do not confuse productive strain with system failure (anxiety).
                    <br />
                    Strain is the feeling of effort as you focus on the task.
                    <br />
                    Failure is the feeling of helplessness and the desire to disengage.
                    <br />
                    The first is the catalyst for growth. The second is the affective filter engaging, which halts all new data fabrication. Trust the protocol. The "burn" means it's working.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
    </Draggable>
  )
}

export default NeuralPanel

