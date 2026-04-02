import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import FeatureCard from '../components/FeatureCard'
import StatItem from '../components/StatItem'

function Page1() {
  const { userName } = useContext(AppContext)
  const heroHeadingRef = useRef(null)
  const statsRef = useRef(null)
  const [statsAnimated, setStatsAnimated] = useState(false)
  const [featureVisible, setFeatureVisible] = useState(false)

  useEffect(() => {
    document.title = 'Traffic Rules Academy | Master the Road'

    var cancelled = false
    var heading = heroHeadingRef.current
    if (heading) {
      var fullText = 'Master the Rules of the Road'
      heading.textContent = ''
      heading.style.borderRight = '3px solid var(--accent)'
      var charIndex = 0
      function typeWriter() {
        if (cancelled) return
        if (charIndex < fullText.length) {
          heading.textContent = fullText.substring(0, charIndex + 1)
          charIndex++
          setTimeout(typeWriter, 60)
        } else {
          setTimeout(function () {
            if (!cancelled && heading) heading.style.borderRight = 'none'
          }, 1000)
        }
      }
      typeWriter()
    }
    return function () { cancelled = true }
  }, [])


  useEffect(() => {
    function animateCounter(element, target, suffix) {
      var current = 0
      var increment = Math.ceil(target / 60)
      var timer = setInterval(function () {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        element.textContent = current.toLocaleString() + suffix
      }, 30)
    }

    function handleStatsScroll() {
      if (statsAnimated) return
      var section = statsRef.current
      if (!section) return
      var rect = section.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setStatsAnimated(true)
        var statNumbers = section.querySelectorAll('.stat-number')
        statNumbers.forEach(function (el) {
          var text = el.textContent.trim()
          if (text.indexOf('k') !== -1) {
            animateCounter(el, parseFloat(text) * 1000 / 1000, 'k+')
          } else if (text.indexOf('%') !== -1) {
            animateCounter(el, parseInt(text), '%')
          } else {
            animateCounter(el, parseInt(text.replace(/[^0-9]/g, '')), '+')
          }
        })
      }
    }

    function handleFeatureScroll() {
      var cards = document.querySelectorAll('.feature-card, .section-title')
      cards.forEach(function (el) {
        var rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight - 50) {
          el.classList.add('visible')
        }
      })
    }

    window.addEventListener('scroll', handleStatsScroll)
    window.addEventListener('scroll', handleFeatureScroll)
    handleStatsScroll()
    handleFeatureScroll()
    return function () {
      window.removeEventListener('scroll', handleStatsScroll)
      window.removeEventListener('scroll', handleFeatureScroll)
    }
  }, [statsAnimated])

  function handleCardMouseMove(e) {
    var card = e.currentTarget
    var rect = card.getBoundingClientRect()
    var x = e.clientX - rect.left
    var y = e.clientY - rect.top
    var centerX = rect.width / 2
    var centerY = rect.height / 2
    var rotateX = (y - centerY) / 15
    var rotateY = (centerX - x) / 15
    card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)'
  }

  function handleCardMouseLeave(e) {
    e.currentTarget.style.transform = ''
  }

  return (
    <>
      <header className="hero">
        <div className="hero-content fade-in">
          {userName && (
            <div className="welcome-back-badge">
              <i className="fas fa-hand-sparkles"></i> Welcome back, {userName}!
            </div>
          )}
          <h1 ref={heroHeadingRef}></h1>
          <p>Join thousands of learners becoming safer, smarter drivers today. Comprehensive lessons, interactive quizzes, and real-time updates.</p>
          <div className="hero-btn-group">
            <Link to="/page2" className="hero-btn hero-btn-primary"
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = '' }}>
              Start Learning <i className="fas fa-arrow-right"></i>
            </Link>
            <Link to="/page6" className="hero-btn hero-btn-secondary"
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = '' }}>
              <i className="fas fa-search"></i> Explore Signs
            </Link>
          </div>
        </div>
      </header>

      <section className="stats-section" ref={statsRef}>
        <div className="container stats-container">
          <StatItem number="10k+" label="Active Learners" />
          <StatItem number="500+" label="Traffic Signs" />
          <StatItem number="98%" label="Pass Rate" />
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card" onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave}>
              <i className="fas fa-book-open feature-icon"></i>
              <h3>Comprehensive Curriculum</h3>
              <p>Covers everything from basic road etiquette to complex right-of-way scenarios and emergency procedures.</p>
            </div>
            <div className="feature-card" onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave}>
              <i className="fas fa-laptop-code feature-icon"></i>
              <h3>Interactive &amp; Modern</h3>
              <p>Learn through engaging videos, interactive quizzes, and 3D visualization of traffic scenarios.</p>
            </div>
            <div className="feature-card" onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave}>
              <i className="fas fa-certificate feature-icon"></i>
              <h3>Certified Knowledge</h3>
              <p>Track your progress and clear assessments to prove your understanding of traffic regulations.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Page1
