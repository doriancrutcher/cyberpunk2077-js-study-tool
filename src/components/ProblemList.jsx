import { useUiSoundApi } from '../contexts/UiSoundContext'

function ProblemList({ problems, currentProblem, completedProblems, onSelectProblem }) {
  const sounds = useUiSoundApi()
  
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="terminal-prompt">></span>
        <span className="terminal-text">PROBLEM SELECTOR</span>
      </div>
      <div className="problem-list">
        {problems.map((problem, index) => {
          const isActive = index === currentProblem
          const isCompleted = completedProblems.has(index)
          
          return (
            <div
              key={problem.id}
              className={`problem-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => onSelectProblem(index)}
              onMouseEnter={() => !isActive && sounds.playHover()}
              onFocus={() => !isActive && sounds.playHover()}
            >
              <div className="problem-item-number">
                #{String(problem.id).padStart(3, '0')}
              </div>
              <div className="problem-item-title">{problem.title}</div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}

export default ProblemList

