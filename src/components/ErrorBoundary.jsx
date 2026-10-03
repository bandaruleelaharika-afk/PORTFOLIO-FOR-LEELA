import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const isDev = import.meta.env.DEV;
      return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
          <h1 style={{ color: '#ff4d4f' }}>Something went wrong.</h1>
          <p>The application encountered an unexpected error.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '10px 20px', backgroundColor: '#00df89', color: '#0b1120', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '20px' }}
          >
            Please try again (Reload)
          </button>
          
          {isDev && this.state.error && (
            <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f1f1f1', borderRadius: '8px', color: '#333' }}>
              <h3 style={{ marginTop: 0 }}>Developer Details:</h3>
              <p><strong>{this.state.error.toString()}</strong></p>
              <pre style={{ overflowX: 'auto', fontSize: '0.85rem' }}>
                {this.state.errorInfo.componentStack}
              </pre>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
