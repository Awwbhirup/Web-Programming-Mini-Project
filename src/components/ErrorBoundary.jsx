import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          background: 'var(--main-bg)',
          color: 'var(--text-main)',
          textAlign: 'center',
          padding: '40px'
        }}>
          <i className="fas fa-exclamation-triangle" style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '20px' }}></i>
          <h2>Something went wrong</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Please refresh the page to try again.</p>
          <button
            className="btn"
            onClick={() => window.location.reload()}
            style={{ marginTop: '20px', background: 'var(--primary-color)', color: 'white' }}
          >
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
