import { useState, useEffect } from 'react'
import { problems } from './data/problems'
import ProblemList from './components/ProblemList'
import CodeEditor from './components/CodeEditor'
import TestResults from './components/TestResults'
import TerminalAnimation from './components/TerminalAnimation'
import BreachProtocol from './components/BreachProtocol'
import Timer from './components/Timer'
import { UiSoundProvider, useUiSoundApi } from './contexts/UiSoundContext'
import './styles.css'

function AppContent() {
  const [currentProblem, setCurrentProblem] = useState(0)
  const [userCode, setUserCode] = useState('')
  const [testResults, setTestResults] = useState(null)
  const [completedProblems, setCompletedProblems] = useState(new Set())
  const [showTerminal, setShowTerminal] = useState(false)
  const [showBreachProtocol, setShowBreachProtocol] = useState(false)
  const [isDangerMode, setIsDangerMode] = useState(false)
  const [timerActive, setTimerActive] = useState(true)
  const sounds = useUiSoundApi()

  useEffect(() => {
    if (problems[currentProblem]) {
      setUserCode(problems[currentProblem].starterCode)
      setTestResults(null)
      setIsDangerMode(false)
      setTimerActive(true)
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
          const result = userFunction(...test.input)
          const passed = JSON.stringify(result) === JSON.stringify(test.expected)
          
          results.push({
            testNumber: i + 1,
            input: test.input,
            expected: test.expected,
            actual: result,
            passed
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
    setTimerActive(true)
  }

  const handleTimeUp = () => {
    sounds.playTestFailure()
    setIsDangerMode(true)
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

