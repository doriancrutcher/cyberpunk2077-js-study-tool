import { useState, useEffect } from 'react'
import { problems } from './data/problems'
import ProblemList from './components/ProblemList'
import CodeEditor from './components/CodeEditor'
import TestResults from './components/TestResults'
import TerminalAnimation from './components/TerminalAnimation'
import BreachProtocol from './components/BreachProtocol'
import Timer from './components/Timer'
import CodeBank from './components/CodeBank'
import NeuralPanel from './components/NeuralPanel'
import { UiSoundProvider, useUiSoundApi } from './contexts/UiSoundContext'
import './styles.css'

const deepClone = (obj, visited = new WeakMap()) => {
  if (obj === null || typeof obj !== 'object') return obj
  
  // Handle circular references
  if (visited.has(obj)) return visited.get(obj)
  
  if (Array.isArray(obj)) {
    const cloned = []
    visited.set(obj, cloned)
    for (let i = 0; i < obj.length; i++) {
      cloned[i] = deepClone(obj[i], visited)
    }
    return cloned
  }
  
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof RegExp) return new RegExp(obj)
  
  const cloned = {}
  visited.set(obj, cloned)
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key], visited)
    }
  }
  return cloned
}

const deepEqual = (a, b, visited = new WeakMap()) => {
  if (Object.is(a, b)) return true

  if (typeof a !== typeof b) return false

  if (a === null || b === null) return a === b

  if (typeof a !== 'object') return false

  if (visited.has(a)) {
    return visited.get(a) === b
  }
  visited.set(a, b)

  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i], visited)) return false
    }
    return true
  }

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false
    if (!deepEqual(a[key], b[key], visited)) return false
  }

  return true
}

const evaluateExpectation = (actual, expected) => {
  if (typeof expected === 'function') {
    try {
      const outcome = expected(actual)
      if (typeof outcome === 'object' && outcome !== null && 'passed' in outcome) {
        const passed = Boolean(outcome.passed)
        return {
          passed,
          message: passed ? undefined : outcome.message || 'Custom validator returned false.'
        }
      }
      const passed = Boolean(outcome)
      return {
        passed,
        message: passed ? undefined : 'Custom validator returned false.'
      }
    } catch (error) {
      return {
        passed: false,
        message: error.message || 'Custom validator threw an error.'
      }
    }
  }

  try {
    return { passed: deepEqual(actual, expected) }
  } catch (error) {
    return {
      passed: false,
      message: error.message || 'Unable to compare actual and expected values.'
    }
  }
}

// LocalStorage keys
const STORAGE_KEY_COMPLETED = 'cyberpunk-js-dojo-completed'
const STORAGE_KEY_CODEBANK = 'cyberpunk-js-dojo-codebank'
const CODEBANK_MAX_CHARS = 100000 // 100k character limit

// Load completed problems from localStorage
const loadCompletedProblems = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_COMPLETED)
    if (stored) {
      const indices = JSON.parse(stored)
      return new Set(indices)
    }
  } catch (error) {
    console.error('Error loading completed problems:', error)
  }
  return new Set()
}

// Save completed problems to localStorage
const saveCompletedProblems = (completedSet) => {
  try {
    const indices = Array.from(completedSet)
    localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(indices))
  } catch (error) {
    console.error('Error saving completed problems:', error)
  }
}

// Load code bank from localStorage
const loadCodeBank = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_CODEBANK)
    return stored || ''
  } catch (error) {
    console.error('Error loading code bank:', error)
    return ''
  }
}

// Save code to code bank with character limit
const saveToCodeBank = (problemId, problemTitle, code) => {
  try {
    const existing = loadCodeBank()
    const entry = `\n// Problem #${problemId}: ${problemTitle}\n${code}\n${'='.repeat(80)}\n`
    const newBank = existing + entry
    
    if (newBank.length > CODEBANK_MAX_CHARS) {
      // If it would exceed limit, truncate from the beginning (keep most recent)
      const truncated = newBank.slice(-CODEBANK_MAX_CHARS + entry.length)
      localStorage.setItem(STORAGE_KEY_CODEBANK, truncated + entry)
      return { success: true, warning: 'Code bank limit reached. Oldest entries removed.' }
    }
    
    localStorage.setItem(STORAGE_KEY_CODEBANK, newBank)
    return { success: true }
  } catch (error) {
    console.error('Error saving to code bank:', error)
    return { success: false, error: error.message }
  }
}

function AppContent() {
  const [currentProblem, setCurrentProblem] = useState(0)
  const [userCode, setUserCode] = useState('')
  const [testResults, setTestResults] = useState(null)
  const [completedProblems, setCompletedProblems] = useState(() => loadCompletedProblems())
  const [showTerminal, setShowTerminal] = useState(false)
  const [showBreachProtocol, setShowBreachProtocol] = useState(false)
  const [isDangerMode, setIsDangerMode] = useState(false)
  const [timerActive, setTimerActive] = useState(false)
  const [hasBreached, setHasBreached] = useState(false)
  const [showCodeBank, setShowCodeBank] = useState(false)
  const [showNeuralPanel, setShowNeuralPanel] = useState(true)
  const [problemStartTime, setProblemStartTime] = useState(null)
  const [neuralStats, setNeuralStats] = useState({
    sessions: 0,
    totalConnections: 0,
    challengeIndex: 1,
    difficultyHistory: [],
    lastSession: null
  })
  const sounds = useUiSoundApi()

  // Load from localStorage on mount
  useEffect(() => {
    const loaded = loadCompletedProblems()
    setCompletedProblems(loaded)
  }, [])

  // Save to localStorage whenever completedProblems changes
  useEffect(() => {
    saveCompletedProblems(completedProblems)
  }, [completedProblems])

  useEffect(() => {
    if (problems[currentProblem]) {
      setUserCode(problems[currentProblem].starterCode)
      setTestResults(null)
      setIsDangerMode(false)
      setTimerActive(false)
      setHasBreached(false)
      // Remove danger mode class from body
      document.body.classList.remove('danger-mode')
    }
  }, [currentProblem])

  // Manage danger mode class on body
  useEffect(() => {
    if (isDangerMode) {
      document.body.classList.add('danger-mode')
    } else {
      document.body.classList.remove('danger-mode')
    }
  }, [isDangerMode])

  // Start ambient sound on mount
  useEffect(() => {
    sounds.startAmbient()
    return () => {
      sounds.stopAmbient()
    }
  }, [sounds])

  const runTests = () => {
    sounds.playConfirm()
    const problem = problems[currentProblem]
    if (!problem) return
    if (!hasBreached) return

    try {
      // Get the function name from the starter code
      const functionMatch = problem.starterCode.match(/function\s+(\w+)/)
      if (!functionMatch) {
        setTestResults({
          passed: false,
          error: "Could not find function definition. Make sure your function matches the expected name."
        })
        return
      }

      const functionName = functionMatch[1]
      
      // Create a safe execution context and extract the function
      let userFunction
      try {
        // Execute user code in a new function scope
        const executeCode = new Function(userCode + `\nreturn ${functionName};`)
        userFunction = executeCode()
      } catch (error) {
        setTestResults({
          passed: false,
          error: `Syntax Error: ${error.message}`
        })
        return
      }

      if (typeof userFunction !== 'function') {
        setTestResults({
          passed: false,
          error: `Expected a function named '${functionName}', but got ${typeof userFunction}. Make sure your function is defined correctly.`
        })
        return
      }

      const results = []
      let allPassed = true

      for (let i = 0; i < problem.tests.length; i++) {
        const test = problem.tests[i]
        try {
          // Deep clone inputs to prevent mutation from affecting subsequent tests
          const clonedInput = deepClone(test.input)
          const result = userFunction(...clonedInput)
          const { passed, message: validatorMessage } = evaluateExpectation(result, test.expected)

          results.push({
            testNumber: i + 1,
            input: test.input,
            expected: test.expected,
            actual: result,
            passed,
            validatorMessage
          })

          if (!passed) {
            allPassed = false
          }
        } catch (error) {
          results.push({
            testNumber: i + 1,
            input: test.input,
            expected: test.expected,
            error: error.message,
            passed: false
          })
          allPassed = false
        }
      }

      setTestResults({
        passed: allPassed,
        results,
        totalTests: problem.tests.length,
        passedTests: results.filter(r => r.passed).length
      })

      // Play sound based on test results
      if (allPassed) {
        sounds.playTestSuccess()
        setIsDangerMode(false)
        setTimerActive(false)
        // If all tests passed, show breach protocol animation and mark as completed
        setCompletedProblems(prev => new Set([...prev, currentProblem]))
        const difficultyWeights = { easy: 0.9, medium: 1.2, hard: 1.6 }
        const expectedSeconds = (problem.expectedMinutes || 5) * 60
        const runtimeSeconds = problemStartTime
          ? Math.max(20, (Date.now() - problemStartTime) / 1000)
          : expectedSeconds
        const diffWeight = difficultyWeights[problem.difficulty] || 1
        const challengeRatio = Number((runtimeSeconds / expectedSeconds).toFixed(2))
        const connectionsGained = Math.max(
          6,
          Math.round((diffWeight * 1200) / Math.max(challengeRatio, 0.55) / 10)
        )
        const focusScore = Math.max(
          35,
          Math.min(99, Math.round((diffWeight * 80) / (challengeRatio + 0.4)))
        )
        const plasticity = Math.min(
          100,
          Math.round(diffWeight * 40 + (1 / Math.max(challengeRatio, 0.3)) * 25)
        )

        setNeuralStats(prev => {
          const sessions = prev.sessions + 1
          const totalConnections = prev.totalConnections + connectionsGained
          const history = [...prev.difficultyHistory, challengeRatio].slice(-6)
          const challengeIndex = Number(
            (
              history.reduce((acc, val) => acc + val, 0) / (history.length || 1)
            ).toFixed(2)
          )

          return {
            sessions,
            totalConnections,
            difficultyHistory: history,
            challengeIndex,
            lastSession: {
              durationSeconds: Math.round(runtimeSeconds),
              expectedSeconds: Math.round(expectedSeconds),
              difficulty: problem.difficulty,
              connectionsGained,
              focusScore,
              challengeRatio,
              plasticity,
              adaptiveDifficulty:
                challengeRatio < 0.75
                  ? 'Increase complexity'
                  : challengeRatio > 1.6
                  ? 'Stabilize focus'
                  : 'Optimal strain'
            }
          }
        })
        setProblemStartTime(null)
        // Save code to code bank
        const result = saveToCodeBank(problem.id, problem.title, userCode)
        if (result.warning) {
          console.warn(result.warning)
        }
        setShowBreachProtocol(true)
      } else {
        sounds.playTestFailure()
        setIsDangerMode(true)
        // Keep danger mode for 3 seconds, then fade
        setTimeout(() => {
          setIsDangerMode(false)
        }, 3000)
      }
    } catch (error) {
      sounds.playTestFailure()
      setIsDangerMode(true)
      setTimeout(() => {
        setIsDangerMode(false)
      }, 3000)
      setTestResults({
        passed: false,
        error: error.message
      })
    }
  }

  const selectProblem = (index) => {
    sounds.playHover()
    setCurrentProblem(index)
    setTestResults(null)
    setIsDangerMode(false)
    setTimerActive(false)
    setHasBreached(false)
    setProblemStartTime(null)
  }

  const handleTimeUp = () => {
    sounds.playTestFailure()
    setIsDangerMode(true)
  }

  const handleBreach = () => {
    sounds.playConfirm()
    setHasBreached(true)
    setTimerActive(true)
    setProblemStartTime(Date.now())
  }

  const problem = problems[currentProblem]
  const expectedMinutes = problem?.expectedMinutes || 5

  return (
    <div className="app">
      <div className="scanlines"></div>
      <div className="noise"></div>
      
      <header className="header">
        <div className="glitch" data-text="CYBERPUNK JS DOJO">CYBERPUNK JS DOJO</div>
        <div className="subtitle">// NEON CITY CODING CHALLENGES //</div>
        <div className="header-actions">
          <div className="header-controls">
            <button 
              className="codebank-header-btn run-btn" 
              onClick={() => setShowCodeBank(true)}
              style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem' }}
            >
              <span className="btn-text">CODE BANK</span>
              <span className="btn-glow"></span>
            </button>
          </div>
          
          <div className="datamine-tracker center-stage">
            <span className="terminal-prompt">></span>
            <span className="terminal-text">DATAMINES ACQUIRED: {completedProblems.size}/{problems.length}</span>
            <div className="datamine-progress">
              <div 
                className="datamine-progress-bar" 
                style={{ width: `${(completedProblems.size / problems.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="header-controls">
            <button 
              className="neural-toggle-btn run-btn" 
              onClick={() => setShowNeuralPanel(prev => !prev)}
              style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem' }}
            >
              <span className="btn-text">{showNeuralPanel ? 'HIDE NEURAL HUD' : 'NEURAL HUD'}</span>
              <span className="btn-glow"></span>
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        <ProblemList
          problems={problems}
          currentProblem={currentProblem}
          completedProblems={completedProblems}
          onSelectProblem={selectProblem}
        />

        <main className="main-content">
          {problem && (
            <>
              {!hasBreached ? (
                <div className="breach-initiation">
                  <div className="terminal-window">
                    <div className="terminal-header">
                      <span className="terminal-dot"></span>
                      <span className="terminal-dot"></span>
                      <span className="terminal-dot"></span>
                      <span className="terminal-title">BREACH PROTOCOL</span>
                    </div>
                    <div className="terminal-content">
                      <p>// Breach authorization required.</p>
                      <p>// Press BREACH to reveal the objective and start the timer.</p>
                    </div>
                  </div>
                  <button className="breach-button run-btn" onClick={handleBreach}>
                    <span className="btn-text">BREACH</span>
                    <span className="btn-glow"></span>
                  </button>
                </div>
              ) : (
                <>
                  <Timer 
                    expectedMinutes={expectedMinutes}
                    onTimeUp={handleTimeUp}
                    isActive={timerActive}
                    hasFailed={testResults && !testResults.passed}
                  />
                  
                  <div className="problem-header">
                    <div className="problem-info">
                      <span className="problem-number">#{String(problem.id).padStart(3, '0')}</span>
                      <span className="problem-title">{problem.title}</span>
                    </div>
                    <div className={`difficulty-badge ${problem.difficulty}`}>
                      {problem.difficulty.toUpperCase()}
                    </div>
                  </div>

                  <div className="problem-description">
                    <div className="terminal-window">
                      <div className="terminal-header">
                        <span className="terminal-dot"></span>
                        <span className="terminal-dot"></span>
                        <span className="terminal-dot"></span>
                        <span className="terminal-title">BRIEFING</span>
                      </div>
                      <div className="terminal-content">
                        {problem.description}
                      </div>
                    </div>
                  </div>

                  <CodeEditor
                    code={userCode}
                    onChange={setUserCode}
                    onRun={runTests}
                  />

                  <TestResults results={testResults} />
                </>
              )}
            </>
          )}
        </main>
      </div>

      {showTerminal && <TerminalAnimation />}
      {showBreachProtocol && (
        <BreachProtocol 
          onComplete={() => {
            setShowBreachProtocol(false)
            // Auto-advance to next problem after animation
            if (currentProblem < problems.length - 1) {
              setCurrentProblem(currentProblem + 1)
            }
          }}
        />
      )}
      <NeuralPanel 
        isVisible={showNeuralPanel}
        onClose={() => setShowNeuralPanel(false)}
        stats={neuralStats}
      />
      <CodeBank 
        isVisible={showCodeBank}
        onClose={() => setShowCodeBank(false)}
      />
    </div>
  )
}

function App() {
  return (
    <UiSoundProvider>
      <AppContent />
    </UiSoundProvider>
  )
}

export default App

