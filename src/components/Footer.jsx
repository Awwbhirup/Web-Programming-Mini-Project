import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer style={{ background: 'var(--dark-bg)', color: 'white', padding: '60px 0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '30px' }}>
          <Link to="/page7" style={{ color: '#cbd5e1', margin: '0 15px' }}>Emergency Guide</Link>
          <Link to="/page5" style={{ color: '#cbd5e1', margin: '0 15px' }}>Contact Support</Link>
          <Link to="/page3" style={{ color: '#cbd5e1', margin: '0 15px' }}>Learning Modules</Link>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>&copy; 2026 Traffic Rules Academy. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
