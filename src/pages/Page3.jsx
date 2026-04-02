import { useState, useEffect, useContext, useRef } from 'react'
import { AppContext } from '../context/AppContext'

var modules = [
  { id: 1, title: '1. Introduction to Road Safety', desc: 'In this lesson, we will cover the fundamental principles of defensive driving, the importance of seatbelts, and how to maintain a safe following distance.', video: '/MEDIA/video/videoplayback.mp4', duration: '10 Mins', level: 'Beginner' },
  { id: 2, title: '2. Understanding Rights of Way', desc: 'Learn about intersection priority rules, yielding protocols, and how to navigate complex traffic situations safely and confidently.', video: '/MEDIA/video/videoplayback2.mp4', duration: '15 Mins', level: 'Beginner' },
  { id: 3, title: '3. Dashboard Symbols', desc: 'Decode every warning light and symbol on your vehicle dashboard. Know what each indicator means and how to respond effectively.', video: '/MEDIA/video/videoplayback3.mp4', duration: '12 Mins', level: 'Intermediate' },
  { id: 4, title: '4. Preventing Road Accidents', desc: 'Explore common causes of road accidents and learn preventive measures including safe overtaking, night driving tips, and weather-related precautions.', video: '/MEDIA/video/videoplayback4.mp4', duration: '20 Mins', level: 'Advanced' }
]

function Page3() {
  const { userName } = useContext(AppContext)
  const [activeModule, setActiveModule] = useState(0)
  const [notes, setNotes] = useState(() => localStorage.getItem('trafficAcademy_notes') || '')
  const [saveStatus, setSaveStatus] = useState('')
  const [videoStatus, setVideoStatus] = useState('Ready to play')
  const [videoStatusIcon, setVideoStatusIcon] = useState('fa-play-circle')
  const [videoStatusColor, setVideoStatusColor] = useState('')
  const [contentAnim, setContentAnim] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    document.title = 'Course Dashboard | Traffic Rules Academy'
  }, [])

  function handleModuleClick(index) {
    setContentAnim(true)
    setTimeout(function () {
      setActiveModule(index)
      setContentAnim(false)
      setVideoStatus('Ready to play')
      setVideoStatusIcon('fa-play-circle')
      setVideoStatusColor('')
    }, 300)
  }

  function saveNotes() {
    localStorage.setItem('trafficAcademy_notes', notes)
    setSaveStatus('saved')
    setTimeout(function () { setSaveStatus('') }, 2000)
  }

  function handleVideoPlay() {
    setVideoStatusIcon('fa-play-circle')
    setVideoStatusColor('#22c55e')
    setVideoStatus('Playing...')
  }

  function handleVideoPause() {
    setVideoStatusIcon('fa-pause-circle')
    setVideoStatusColor('#eab308')
    setVideoStatus('Paused')
  }

  function handleVideoTimeUpdate() {
    var video = videoRef.current
    if (video && video.duration) {
      var percent = Math.round((video.currentTime / video.duration) * 100)
      setVideoStatus('Playing... ' + percent + '% complete')
    }
  }

  function handleVideoEnded() {
    setVideoStatusIcon('fa-check-circle')
    setVideoStatusColor('#22c55e')
    setVideoStatus('Lesson Complete! 🎉')
  }

  var currentModule = modules[activeModule]

  return (
    <div className="dashboard-container fade-in">
      <div className="sidebar glass-panel">
        <h3 className="sidebar-title">Curriculum</h3>
        <div className="module-list">
          {modules.map(function (mod, index) {
            var isActive = index === activeModule
            var isCompleted = index < activeModule
            return (
              <div key={mod.id}
                className={'module-item' + (isActive ? ' active' : '') + (index <= activeModule ? ' pop-in' : '')}
                onClick={() => handleModuleClick(index)}
                style={{ cursor: 'pointer' }}>
                <span className="module-text">{mod.title}</span>
                <i className={'fas ' + (isActive ? 'fa-play-circle' : isCompleted ? 'fa-check-circle' : 'fa-lock') + ' status-icon'}
                  style={isCompleted ? { color: '#22c55e' } : {}}></i>
              </div>
            )
          })}
        </div>
      </div>

      <div className="main-content" style={{
        opacity: contentAnim ? 0 : 1,
        transform: contentAnim ? 'translateY(10px)' : 'translateY(0)',
        transition: 'opacity 0.3s, transform 0.3s'
      }}>
        <div className="video-wrapper">
          <div className="video-container">
            <video key={currentModule.video} ref={videoRef} id="videoPlayer" controls
              onPlay={handleVideoPlay} onPause={handleVideoPause}
              onTimeUpdate={handleVideoTimeUpdate} onEnded={handleVideoEnded}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
              <source src={currentModule.video} type="video/mp4" />
            </video>
          </div>
          <div className="video-progress-info">
            <i className={'fas ' + videoStatusIcon} style={{ color: videoStatusColor }}></i>
            <span> {videoStatus}</span>
          </div>
        </div>

        <div className="lesson-content glass-panel fade-in">
          {userName && (
            <p className="welcome-back-badge">👋 Welcome, {userName}! Ready to learn?</p>
          )}
          <h2 className="lesson-title">{currentModule.title}</h2>
          <div className="lesson-meta">
            <span className="badge"><i className="fas fa-clock"></i> {currentModule.duration}</span>
            <span className="badge"><i className="fas fa-signal"></i> {currentModule.level}</span>
          </div>
          <p className="lesson-desc">{currentModule.desc}</p>

          <div className="audio-section">
            <h4><i className="fas fa-headphones"></i> Audio Guide: Signal Sounds</h4>
            <div className="audio-controls">
              <audio controls style={{ height: '40px', maxWidth: '250px' }}>
                <source src="/MEDIA/audio/timvenu-traffic-sound-426901.mp3" type="audio/mp3" />
              </audio>
              <div className="audio-wave">
                <span></span><span></span><span></span><span></span>
              </div>
            </div>
          </div>

          <div className="notes-section">
            <h4><i className="fas fa-sticky-note"></i> Your Notes</h4>
            <textarea className="notes-textarea" placeholder="Take notes as you learn..." rows="4"
              value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
            <button className="save-notes-btn" onClick={saveNotes}
              style={saveStatus === 'saved' ? { background: '#22c55e' } : {}}>
              <i className={saveStatus === 'saved' ? 'fas fa-check' : 'fas fa-save'}></i>
              {saveStatus === 'saved' ? ' Saved!' : ' Save Notes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page3
