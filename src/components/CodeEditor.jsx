import { useRef, useCallback } from 'react'
import { useUiSoundApi } from '../contexts/UiSoundContext'

function CodeEditor({ code, onChange, onRun }) {
  const sounds = useUiSoundApi()
  const lastTypingTimeRef = useRef(0)

  const handleChange = useCallback((e) => {
    onChange(e.target.value)
    
    // Play subtle typing sound (throttled to avoid annoyance)
    const now = Date.now()
    if (now - lastTypingTimeRef.current > 150) {
      // Only play sound occasionally, not on every keystroke
      if (Math.random() > 0.8) {
        sounds.playHover()
      }
      lastTypingTimeRef.current = now
    }
  }, [onChange, sounds])

  return (
    <div className="code-editor-container">
      <div className="editor-header">
        <span className="editor-title">CODE EDITOR</span>
        <button 
          className="run-btn" 
          onClick={onRun}
          onMouseEnter={sounds.playHover}
          onFocus={sounds.playHover}
        >
          <span className="btn-text">RUN TESTS</span>
          <span className="btn-glow"></span>
        </button>
      </div>
      <textarea
        id="codeEditor"
        className="code-editor"
        value={code}
        onChange={handleChange}
        spellCheck={false}
        placeholder="// Write your code here..."
      />
    </div>
  )
}

export default CodeEditor

