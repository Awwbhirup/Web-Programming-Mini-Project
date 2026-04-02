import { createContext, useState, useEffect, useRef } from 'react'

export const AppContext = createContext()

export function AppProvider({ children }) {
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [userName, setUserName] = useState(() => {
    return getCookie('userName') || ''
  })
  const [visitCount, setVisitCount] = useState(0)
  const [cookieConsent, setCookieConsent] = useState(() => {
    return getCookie('cookieConsent') === 'accepted' || getCookie('cookieConsent') === 'declined'
  })
  const audioRef = useRef(null)

  useEffect(() => {
    var count = parseInt(getCookie('visitCount') || '0') + 1
    setCookie('visitCount', count.toString(), 365)
    setVisitCount(count)
    setCookie('lastVisit', new Date().toISOString(), 365)
  }, [])

  useEffect(() => {
    var musicPref = getCookie('musicPref')
    if (musicPref === 'on' && audioRef.current) {
      audioRef.current.play().catch(function () {})
      setMusicPlaying(true)
    }
  }, [])

  function toggleMusic() {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause()
        setCookie('musicPref', 'off', 30)
      } else {
        audioRef.current.play().catch(function () {})
        setCookie('musicPref', 'on', 30)
      }
      setMusicPlaying(!musicPlaying)
    }
  }

  function acceptCookies() {
    setCookie('cookieConsent', 'accepted', 365)
    setCookieConsent(true)
  }

  function declineCookies() {
    setCookie('cookieConsent', 'declined', 30)
    setCookieConsent(true)
  }

  function registerUser(name) {
    setUserName(name)
    setCookie('userName', name, 365)
  }

  var value = {
    musicPlaying, toggleMusic, audioRef,
    userName, registerUser,
    visitCount, cookieConsent, acceptCookies, declineCookies
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

function setCookie(name, value, days) {
  var expires = ''
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/; SameSite=Lax'
}

function getCookie(name) {
  var nameEQ = name + '='
  var cookies = document.cookie.split(';')
  for (var i = 0; i < cookies.length; i++) {
    var c = cookies[i].trim()
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length))
    }
  }
  return null
}
