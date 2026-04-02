import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { AppContext } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MusicToggle from './components/MusicToggle'
import CookieBanner from './components/CookieBanner'
import ErrorBoundary from './components/ErrorBoundary'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import Page5 from './pages/Page5'
import Page6 from './pages/Page6'
import Page7 from './pages/Page7'
import Page8 from './pages/Page8'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const { audioRef } = useContext(AppContext)

  return (
    <ErrorBoundary>
      <audio ref={audioRef} loop style={{ display: 'none' }}>
        <source src="/MEDIA/audio/BACKGROUND.mp3" type="audio/mp3" />
      </audio>

      <Navbar />
      <ScrollToTop />
      <MusicToggle />
      <CookieBanner />

      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/page4" element={<Page4 />} />
        <Route path="/page5" element={<Page5 />} />
        <Route path="/page6" element={<Page6 />} />
        <Route path="/page7" element={<Page7 />} />
        <Route path="/page8" element={<Page8 />} />
      </Routes>

      <Footer />
    </ErrorBoundary>
  )
}

export default App
