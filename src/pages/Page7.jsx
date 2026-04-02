import { useState, useEffect } from 'react'

var faqData = [
  { id: 'faq1', title: '1. Secure the Scene', content: 'Turn on hazard lights. If possible, move vehicles to the side of the road. Place warning triangles at least 45 meters behind the vehicle to warn oncoming traffic.' },
  { id: 'faq2', title: '2. Check for Injuries', content: 'Check yourself and passengers for injuries. Do not move anyone who is unconscious or has neck pain unless there is an immediate danger like fire.' },
  { id: 'faq3', title: '3. Call for Help', content: 'Call 112 or local emergency numbers immediately. Provide location, number of injured, and nature of injuries clearly.' },
  { id: 'faq4', title: '4. Exchange Information', content: 'Exchange names, contact details, and insurance information with other drivers involved. Take photos of the damage and the scene for documentation.' },
  { id: 'faq5', title: '5. Fire Safety', content: 'If you see smoke or fire, evacuate everyone to a safe distance (at least 30 meters). Do not attempt to extinguish a large fire yourself.' },
  { id: 'faq6', title: '6. Dealing with Shock', content: 'Keep injured persons warm and calm. Do not give them food or water. Talk to them reassuringly until help arrives.' }
]

function Page7() {
  const [openFaq, setOpenFaq] = useState(null)
  const [completedSteps, setCompletedSteps] = useState(() => {
    return JSON.parse(localStorage.getItem('emergencyStepsCompleted') || '[]')
  })
  const [allExpanded, setAllExpanded] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    document.title = 'Emergency Guidelines | Traffic Rules Academy'
  }, [])

  function toggleFaq(index) {
    if (allExpanded) return
    setOpenFaq(openFaq === index ? null : index)
  }

  function toggleMarkRead(index, e) {
    e.stopPropagation()
    var updated
    if (completedSteps.indexOf(index) !== -1) {
      updated = completedSteps.filter(function (s) { return s !== index })
    } else {
      updated = [...completedSteps, index]
    }
    setCompletedSteps(updated)
    localStorage.setItem('emergencyStepsCompleted', JSON.stringify(updated))
  }

  function toggleAll() {
    setAllExpanded(!allExpanded)
    if (!allExpanded) {
      setOpenFaq(null)
    }
  }

  var progressPercent = Math.round((completedSteps.length / faqData.length) * 100)

  return (
    <>
      <div className="emergency-header">
        <h1><i className="fas fa-ambulance"></i> Emergency &amp; First Aid</h1>
        <p style={{ marginTop: '10px', opacity: 0.9 }}>Immediate actions to take in case of an accident.</p>
        <button className="emergency-btn-pulse" onClick={() => setShowDialog(true)}>
          <i className="fas fa-phone"></i> Call Emergency: 112
        </button>
      </div>

      {showDialog && (
        <div className="emergency-overlay active" onClick={(e) => { if (e.target === e.currentTarget) setShowDialog(false) }}>
          <div className="emergency-dialog">
            <div className="emergency-dialog-icon"><i className="fas fa-phone-alt"></i></div>
            <h2>Emergency Call</h2>
            <p>You are about to call emergency number <strong>112</strong></p>
            <div className="emergency-dialog-btns">
              <a href="tel:112" className="dial-btn"><i className="fas fa-phone"></i> Dial 112</a>
              <button className="cancel-btn" onClick={() => setShowDialog(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="steps-container fade-in">
        <h2 className="section-title">What To Do?</h2>

        <div className="step-progress-tracker">
          <div className="step-progress-bar">
            <div className="step-progress-fill" style={{ width: progressPercent + '%', transition: 'width 0.5s ease' }}></div>
          </div>
          <span className="step-progress-text">
            {completedSteps.length} of {faqData.length} steps reviewed
            {completedSteps.length === faqData.length ? ' ✅ All Done!' : ''}
          </span>
        </div>

        <button className="toggle-all-btn" onClick={toggleAll}>
          <i className={'fas ' + (allExpanded ? 'fa-compress-alt' : 'fa-expand-alt')}></i>
          {allExpanded ? ' Collapse All' : ' Expand All'}
        </button>

        <div className="faq-list">
          {faqData.map(function (faq, index) {
            var isOpen = allExpanded || openFaq === index
            var isCompleted = completedSteps.indexOf(index) !== -1
            return (
              <div key={faq.id}
                className={'faq-item' + (isCompleted ? ' step-completed' : '')}
                style={{ opacity: 0, transform: 'translateX(-20px)', animation: 'slideInLeft 0.5s ease ' + (200 + index * 120) + 'ms forwards' }}>
                <input type="checkbox" id={faq.id} checked={isOpen} readOnly />
                <label className="faq-header" htmlFor={faq.id} onClick={() => toggleFaq(index)} style={{ cursor: 'pointer' }}>
                  <span>{faq.title}</span>
                  <i className="fas fa-chevron-down icon"></i>
                </label>
                <div className="faq-content">
                  <p>{faq.content}</p>
                  <button className={'mark-read-btn' + (isCompleted ? ' completed' : '')}
                    onClick={(e) => toggleMarkRead(index, e)}>
                    <i className={isCompleted ? 'fas fa-check-circle' : 'far fa-circle'}></i>
                    {isCompleted ? ' Read ✓' : ' Mark as Read'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Page7
