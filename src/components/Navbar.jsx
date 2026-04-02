import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const location = useLocation()
  const [navOpen, setNavOpen] = useState(false)

  function toggleNav() {
    setNavOpen(!navOpen)
  }

  function closeNav() {
    setNavOpen(false)
  }

  return (
    <header className="glass-header fade-in-down">
      <div className="header-content">
        <NavLink to="/" className="logo-area" onClick={closeNav}>
          <div className="logo-icon">
            <i className="fas fa-traffic-light"></i>
          </div>
          <div className="logo-text">
            TRAFFIC<span>ACADEMY</span>
          </div>
        </NavLink>
        <button className="hamburger" onClick={toggleNav}>
          <i className={navOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
        <nav className={'nav-links' + (navOpen ? ' nav-open' : '')}>
          <NavLink to="/page1" className={location.pathname === '/' || location.pathname === '/page1' ? 'active' : ''} onClick={closeNav}>Home</NavLink>
          <NavLink to="/page6" className={function (props) { return props.isActive ? 'active' : '' }} onClick={closeNav}>Signs</NavLink>
          <NavLink to="/page3" className={function (props) { return props.isActive ? 'active' : '' }} onClick={closeNav}>Courses</NavLink>
          <NavLink to="/page4" className={function (props) { return props.isActive ? 'active' : '' }} onClick={closeNav}>Quiz</NavLink>
          <NavLink to="/page8" className={function (props) { return props.isActive ? 'active' : '' }} onClick={closeNav}>News</NavLink>
          <NavLink to="/page2" className="btn-register" onClick={closeNav}>Register</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
