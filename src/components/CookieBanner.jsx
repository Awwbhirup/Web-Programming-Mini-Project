import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function CookieBanner() {
  const { cookieConsent, acceptCookies, declineCookies } = useContext(AppContext)

  if (cookieConsent) return null

  return (
    <div className="cookie-banner visible">
      <div className="cookie-banner-content">
        <div className="cookie-banner-text">
          <i className="fas fa-cookie-bite cookie-icon"></i>
          <div>
            <strong>We use cookies</strong>
            <p>This site uses cookies to remember your preferences and improve your experience.</p>
          </div>
        </div>
        <div className="cookie-banner-actions">
          <button className="cookie-btn cookie-btn-accept" onClick={acceptCookies}>Accept All</button>
          <button className="cookie-btn cookie-btn-decline" onClick={declineCookies}>Decline</button>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner
