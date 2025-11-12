const getCircularReplacer = () => {
  const seen = new WeakSet()
  return (_key, value) => {
    if (typeof value === 'function') {
      return `[Function${value.name ? ` ${value.name}` : ''}]`
    }
    if (typeof value === 'bigint') {
      return value.toString()
    }
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular]'
      }
      seen.add(value)
    }
    return value
  }
}

const safeStringify = (value) => {
  if (typeof value === 'function') {
    return `[Function${value.name ? ` ${value.name}` : ''}]`
  }
  try {
    return JSON.stringify(value, getCircularReplacer())
  } catch (error) {
    try {
      return String(value)
    } catch {
      return '[Unserializable]'
    }
  }
}

function TestResults({ results }) {
  if (!results) {
    return (
      <div className="test-results">
        <div className="results-header">
          <span className="terminal-prompt">{'>'}</span>
          <span className="terminal-text">TEST RESULTS</span>
        </div>
        <div className="results-content">
          <div className="waiting-message">// Awaiting test execution...</div>
        </div>
      </div>
    )
  }

  if (results.error) {
    return (
      <div className="test-results">
        <div className="results-header">
          <span className="terminal-prompt">{'>'}</span>
          <span className="terminal-text">TEST RESULTS</span>
        </div>
        <div className="results-content">
          <div className="test-case fail">
            <span className="terminal-prompt">✗</span> Error: {results.error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="test-results">
      <div className="results-header">
        <span className="terminal-prompt">{'>'}</span>
        <span className="terminal-text">TEST RESULTS</span>
      </div>
      <div className="results-content">
        {results.results.map((result, index) => (
          <div key={index} className={`test-case ${result.passed ? 'pass' : 'fail'}`}>
            <span className="terminal-prompt">{result.passed ? '✓' : '✗'}</span>
            {' '}Test {result.testNumber}: {result.passed ? 'PASSED' : 'FAILED'}
            {!result.passed && (
              <div style={{ marginLeft: '1.5rem', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                <div>Input: {safeStringify(result.input)}</div>
                <div>Expected: {typeof result.expected === 'function' ? '[Custom validator]' : safeStringify(result.expected)}</div>
                <div>Got: {safeStringify(result.actual)}</div>
                {result.validatorMessage && <div>Details: {result.validatorMessage}</div>}
                {result.error && <div>Error: {result.error}</div>}
              </div>
            )}
          </div>
        ))}
        <div className={`test-summary ${results.passed ? 'pass' : 'fail'}`}>
          {results.passed ? (
            <span>✓ ALL TESTS PASSED ({results.passedTests}/{results.totalTests})</span>
          ) : (
            <span>✗ TESTS FAILED ({results.passedTests}/{results.totalTests} passed)</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default TestResults

