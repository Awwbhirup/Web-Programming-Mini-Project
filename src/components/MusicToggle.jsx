import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function MusicToggle() {
  const { musicPlaying, toggleMusic } = useContext(AppContext)

  return (
    <button className="music-toggle" onClick={toggleMusic}>
      <i className={musicPlaying ? 'fas fa-volume-up' : 'fas fa-volume-mute'}></i>
    </button>
  )
}

export default MusicToggle
