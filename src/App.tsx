import React, { ReactElement, useState } from 'react'
import { ReactComponent as Logo } from './logo.svg';
import './App.css';

import { ErrorBoundary } from 'react-app-error-boundary'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ErrorBoundaryDemo>
          {({ explode, allowOverlay, setAllowOverlay }) => (
            <>
              <div style={{ position: 'relative' }}>
                <Logo className="App-logo" />
                <button className="Explode-Btn" onClick={explode}>explode</button>
              </div>

              <p>
                <label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <input type="checkbox" checked={allowOverlay} onChange={e => setAllowOverlay(e.target.checked)} />Enable react-error-overlay
                </label>
              </p>
            </>
          )}
        </ErrorBoundaryDemo>
      </header>
    </div>
  );
}

interface DemoParams {
  explode: () => void
  allowOverlay: boolean
  setAllowOverlay: (state: boolean) => void
}

const ErrorBoundaryDemo = ({ children }: {
  children: (callbacks: DemoParams) => ReactElement
}) => {
  const [ allowOverlay, setAllowOverlay ] = useState(false)
  const [ shouldExplode, setShouldExplode ] = useState(false)
  return (
    <ErrorBoundary
      allowDevErrorOverlay={allowOverlay}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div
          onClick={() => {
            setShouldExplode(false)
            resetErrorBoundary()
          }}
          style={{
            cursor: 'pointer',
          }}
          title="Click to reset error"
        >
          <Logo className="App-logo explode" />
          <p>{error.message}</p>
        </div>
      )}
    >
      {shouldExplode && (
        <Bomb />
      )}

      {children({
        explode: () => setShouldExplode(true),
        allowOverlay,
        setAllowOverlay,
      })}
    </ErrorBoundary>
  )
}


function Bomb() {
  throw new Error('KABOOM')
  // eslint-disable-next-line no-unreachable
  return null
}

export default App;
