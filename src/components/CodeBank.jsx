import { useState, useEffect } from 'react'
import { useUiSoundApi } from '../contexts/UiSoundContext'

const STORAGE_KEY = 'cyberpunk-js-dojo-codebank'
const MAX_CHARS = 100000 // 100k character limit

const CodeBank = ({ isVisible, onClose }) => {
  const [codeBank, setCodeBank] = useState('')
  const [currentSize, setCurrentSize] = useState(0)
  const sounds = useUiSoundApi()

  useEffect(() => {
    // Load code bank from localStorage whenever modal opens
    if (isVisible) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          setCodeBank(stored)
          setCurrentSize(stored.length)
        } else {
          setCodeBank('')
          setCurrentSize(0)
        }
      } catch (error) {
        console.error('Error loading code bank:', error)
      }
    }
  }, [isVisible])

  const handleCopy = () => {
    if (codeBank) {
      navigator.clipboard.writeText(codeBank)
      sounds.playConfirm()
    }
  }

  const handleClear = () => {
    if (window.confirm('Clear entire code bank? This cannot be undone.')) {
      setCodeBank('')
      setCurrentSize(0)
      localStorage.removeItem(STORAGE_KEY)
      sounds.playCancel()
    }
  }

  if (!isVisible) return null

  return (
    <div className="codebank-overlay" onClick={onClose}>
      <div className="codebank-modal" onClick={(e) => e.stopPropagation()}>
        <div className="terminal-header">
          <span className="terminal-dot"></span>
          <span className="terminal-dot"></span>
          <span className="terminal-dot"></span>
          <span className="terminal-title">CODE BANK</span>
          <button className="codebank-close" onClick={onClose}>✕</button>
        </div>
        <div className="codebank-content">
          <div className="codebank-info">
            <span className="terminal-text">
              {currentSize.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
            </span>
            {currentSize >= MAX_CHARS * 0.9 && (
              <span className="codebank-warning">⚠ Approaching limit</span>
            )}
          </div>
          <textarea
            className="codebank-textarea"
            value={codeBank}
            readOnly
            placeholder="// No code stored yet..."
          />
          <div className="codebank-actions">
            <button className="codebank-btn copy-btn" onClick={handleCopy} disabled={!codeBank}>
              <span className="btn-text">COPY ALL</span>
              <span className="btn-glow"></span>
            </button>
            <button className="codebank-btn clear-btn" onClick={handleClear} disabled={!codeBank}>
              <span className="btn-text">CLEAR BANK</span>
              <span className="btn-glow"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeBank

