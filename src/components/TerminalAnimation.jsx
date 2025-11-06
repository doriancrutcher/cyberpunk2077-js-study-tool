import { useEffect } from 'react'
import { useUiSoundApi } from '../contexts/UiSoundContext'

function TerminalAnimation() {
  const sounds = useUiSoundApi()
  
  useEffect(() => {
    // Play success sound - the test success sound already plays when tests pass
    // This is just for the terminal animation visual
    // The sound was already triggered in App.jsx
  }, [])

  return (
    <div className="terminal-overlay active">
      <div className="terminal-animation">
        <div className="terminal-line">
          <span className="prompt">></span>
          <span className="command">SYSTEM_CHECK.exe</span>
        </div>
        <div className="terminal-line">
          <span className="output">[████████████████████] 100%</span>
        </div>
        <div className="terminal-line">
          <span className="output success">✓ ALL TESTS PASSED</span>
        </div>
        <div className="terminal-line">
          <span className="output">ACCESS GRANTED</span>
        </div>
        <div className="terminal-line">
          <span className="output">LOADING NEXT CHALLENGE...</span>
        </div>
      </div>
    </div>
  )
}

export default TerminalAnimation

