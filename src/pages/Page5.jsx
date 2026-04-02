import { useState, useEffect, useRef } from 'react'

function Page5() {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [submitState, setSubmitState] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [ratingLabel, setRatingLabel] = useState('')
  const [regexMsg, setRegexMsg] = useState({ text: '', color: '', borderColor: '' })
  const btnRef = useRef(null)

  var feedbackRegex = /^[A-Za-z0-9\s.,!?'"\\-]{10,500}$/
  var maxChars = 500

  useEffect(() => {
    document.title = 'Contact Us | Traffic Rules Academy'
  }, [])

  function getCookie(name) {
    var nameEQ = name + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length))
    }
    return null
  }

  var userName = getCookie('userName') || ''
  var userEmail = getCookie('userEmail') || ''

  function handleMessageChange(e) {
    var val = e.target.value
    if (val.length > maxChars) val = val.substring(0, maxChars)
    setMessage(val)
    setCharCount(val.length)

    if (val.length === 0) {
      setRegexMsg({ text: '', color: '', borderColor: '' })
    } else if (val.length < 10) {
      setRegexMsg({ text: '✗ Message must be at least 10 characters', color: '#ef4444', borderColor: '#ef4444' })
    } else if (!feedbackRegex.test(val)) {
      setRegexMsg({ text: '✗ Only letters, numbers, and basic punctuation (.,!?\'-") allowed', color: '#ef4444', borderColor: '#ef4444' })
    } else {
      setRegexMsg({ text: '✓ Valid message', color: '#22c55e', borderColor: '#22c55e' })
    }
  }

  function handleRatingClick(star) {
    setRating(star)
    var messages = ['', 'Poor 😞', 'Fair 😐', 'Good 😊', 'Great 😄', 'Excellent 🤩']
    setRatingLabel(messages[star] || '')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (rating === 0) {
      alert('Please select a rating before submitting!')
      return
    }
    if (message.trim().length < 10) {
      alert('Please write at least 10 characters in your message.')
      return
    }
    if (!feedbackRegex.test(message.trim())) {
      alert('Your message contains invalid characters.')
      return
    }

    function setCookie(name, value, days) {
      var date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + date.toUTCString() + '; path=/'
    }
    setCookie('feedbackSent', 'true', 1)

    setSubmitState('sent')

    var btn = btnRef.current
    if (btn) {
      var rect = btn.getBoundingClientRect()
      var cx = rect.left + rect.width / 2
      var cy = rect.top + rect.height / 2
      for (var i = 0; i < 20; i++) {
        var dot = document.createElement('div')
        var size = 6 + Math.random() * 6
        var hue = Math.floor(Math.random() * 360)
        var angle = (Math.PI * 2 / 20) * i + (Math.random() - 0.5)
        var dist = 60 + Math.random() * 100
        var dx = Math.cos(angle) * dist
        var dy = Math.sin(angle) * dist - 80
        dot.style.cssText = 'position:fixed;width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:hsl(' + hue + ',85%,60%);z-index:9999;pointer-events:none;left:' + cx + 'px;top:' + cy + 'px;transition:all 0.9s cubic-bezier(0.25,0.46,0.45,0.94);opacity:1;'
        document.body.appendChild(dot);
        (function (d, x, y) {
          requestAnimationFrame(function () {
            d.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(0.3)'
            d.style.opacity = '0'
          })
        })(dot, dx, dy)
        setTimeout((function (d) { return function () { d.remove() } })(dot), 1000)
      }
    }

    setTimeout(function () {
      setMessage('')
      setRating(0)
      setHoverRating(0)
      setCharCount(0)
      setRatingLabel('')
      setRegexMsg({ text: '', color: '', borderColor: '' })
      setSubmitState('')
    }, 3000)
  }

  function handleInfoHover(e, enter) {
    var icon = e.currentTarget.querySelector('.info-icon')
    if (icon) {
      icon.style.transform = enter ? 'scale(1.15) rotate(5deg)' : ''
      icon.style.transition = 'transform 0.3s ease'
    }
  }

  function getCharColor() {
    if (charCount > maxChars * 0.8) return '#eab308'
    return '#94a3b8'
  }

  return (
    <div className="contact-container fade-in">
      <div className="contact-info">
        <div className="card-hero" style={{ backgroundImage: "url('/MEDIA/images/news-highway.png')" }}></div>
        <h2 style={{ marginBottom: '25px', marginTop: '15px' }}>Get in Touch</h2>

        <div className="info-item" onMouseEnter={(e) => handleInfoHover(e, true)} onMouseLeave={(e) => handleInfoHover(e, false)}>
          <div className="info-icon"><i className="fas fa-map-marker-alt"></i></div>
          <div className="info-text">
            <h4>Visit Us</h4>
            <p>123 Safety Lane, Knowledge City,<br />Road Safety District, 400001</p>
          </div>
        </div>
        <div className="info-item" onMouseEnter={(e) => handleInfoHover(e, true)} onMouseLeave={(e) => handleInfoHover(e, false)}>
          <div className="info-icon"><i className="fas fa-envelope"></i></div>
          <div className="info-text">
            <h4>Email Support</h4>
            <p>help@trafficacademy.com<br />support@trafficacademy.com</p>
          </div>
        </div>
        <div className="info-item" onMouseEnter={(e) => handleInfoHover(e, true)} onMouseLeave={(e) => handleInfoHover(e, false)}>
          <div className="info-icon"><i className="fas fa-phone-alt"></i></div>
          <div className="info-text">
            <h4>Call Us</h4>
            <p>+91 98765 43210<br />(Mon-Fri, 9am - 6pm)</p>
          </div>
        </div>

        <div className="map-container">
          <img src="/MEDIA/images/map-styled.png" alt="Location Map" className="map-image" />
          <div className="map-overlay">
            <button className="btn-map" onClick={() => window.open('https://maps.google.com/?q=19.0760,72.8777', '_blank')}>
              <i className="fas fa-directions"></i> Get Directions
            </button>
          </div>
        </div>
      </div>

      <div className="contact-form-section">
        <h3 style={{ marginBottom: '20px', color: 'var(--dark-bg)' }}>Send Feedback</h3>
        {userName && (
          <div style={{ padding: '12px 16px', background: 'rgba(59,130,246,0.08)', borderRadius: '8px', marginBottom: '15px', fontSize: '0.9rem', color: '#64748b' }}>
            <i className="fas fa-user-check" style={{ color: '#3b82f6', marginRight: '8px' }}></i>
            Sending as <strong style={{ color: '#1e293b' }}>{userName}</strong> ({userEmail || 'no email'})
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Rate your experience</label>
            <div className="rating-group">
              {[5, 4, 3, 2, 1].map(function (star) {
                return (
                  <span key={star} className="rating-star"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    style={{
                      fontSize: '1.8rem', cursor: 'pointer', transition: 'all 0.2s',
                      color: star <= (hoverRating || rating) ? '#f59e0b' : '#cbd5e1',
                      transform: star <= (hoverRating || rating) ? 'scale(1.2)' : 'scale(1)'
                    }}>★</span>
                )
              })}
            </div>
            {ratingLabel && <div className="rating-feedback" style={{ color: '#f59e0b', fontSize: '0.9rem', marginTop: '8px' }}>{ratingLabel}</div>}
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Your Message</label>
            <textarea className="form-control" value={message} onChange={handleMessageChange}
              placeholder="How can we help you?"
              style={{ width: '100%', padding: '10px', border: '2px solid ' + (regexMsg.borderColor || '#e2e8f0'), borderRadius: '8px', minHeight: '120px' }}></textarea>
            <div style={{ fontSize: '0.8rem', color: getCharColor(), textAlign: 'right', marginTop: '5px' }}>
              {charCount} / {maxChars} characters{charCount >= maxChars ? ' (max reached)' : ''}
            </div>
            {regexMsg.text && <div style={{ fontSize: '0.8rem', color: regexMsg.color, marginTop: '4px' }}>{regexMsg.text}</div>}
          </div>

          <button ref={btnRef} type="submit" className="btn" style={{
            width: '100%',
            background: submitState === 'sent' ? '#22c55e' : '',
            color: submitState === 'sent' ? 'white' : ''
          }} disabled={submitState === 'sent'}>
            {submitState === 'sent' ? <><i className="fas fa-check"></i> Feedback Sent!</> : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page5
