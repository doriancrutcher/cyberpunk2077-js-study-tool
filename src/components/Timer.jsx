import { useEffect, useState } from 'react'
import { useUiSoundApi } from '../contexts/UiSoundContext'

function Timer({ expectedMinutes, onTimeUp, isActive, hasFailed }) {
  const sounds = useUiSoundApi()
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [hasWarned, setHasWarned] = useState(false)

  const totalExpectedSeconds = (expectedMinutes + 3) * 60 // Add 3 minutes buffer for errors
  const remainingSeconds = Math.max(0, totalExpectedSeconds - elapsedSeconds)
  const isOverTime = elapsedSeconds > totalExpectedSeconds
  const isWarning = remainingSeconds < 60 && remainingSeconds > 0

  useEffect(() => {
    if (!isActive) {
      setElapsedSeconds(0)
      setHasWarned(false)
      return
    }

    const interval = setInterval(() => {
      setElapsedSeconds(prev => {
        const newTime = prev + 1
        
        // Play warning sound when under 1 minute
        if (newTime >= totalExpectedSeconds - 60 && !hasWarned) {
          setHasWarned(true)
          sounds.playTestFailure() // Use failure sound as warning
        }
        
        // Notify parent when time is up
        if (newTime >= totalExpectedSeconds && onTimeUp) {
          onTimeUp()
        }
        
        return newTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, totalExpectedSeconds, hasWarned, onTimeUp])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = Math.min(100, (elapsedSeconds / totalExpectedSeconds) * 100)

  return (
    <div className={`timer-container ${isOverTime ? 'overtime' : ''} ${isWarning ? 'warning' : ''} ${hasFailed ? 'failed' : ''}`}>
      <div className="timer-header">
        <span className="timer-label">TIME REMAINING</span>
        <span className={`timer-time ${isOverTime ? 'overtime-text' : ''} ${isWarning ? 'warning-text' : ''}`}>
          {formatTime(remainingSeconds)}
        </span>
      </div>
      <div className="timer-bar-container">
        <div 
          className={`timer-bar ${isOverTime ? 'overtime-bar' : ''} ${isWarning ? 'warning-bar' : ''}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="timer-info">
        <span>Expected: {expectedMinutes} min</span>
        <span>Elapsed: {formatTime(elapsedSeconds)}</span>
      </div>
    </div>
  )
}

export default Timer

