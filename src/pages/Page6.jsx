
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

var signsData = [
  { type: 'mandatory', title: 'Stop', desc: 'Mandatory: Stop vehicle completely.', shape: 'sign-circle', inner: <span>STOP</span> },
  { type: 'cautionary', title: 'Give Way', desc: 'Caution: Yield to other traffic.', shape: 'sign-triangle', inner: <span><i className="fas fa-exclamation" style={{ fontSize: '1.5rem', color: 'black' }}></i></span> },
  { type: 'mandatory', title: 'No Entry', desc: 'Mandatory: No vehicles allowed.', shape: 'sign-circle', inner: <div style={{ width: '50px', height: '10px', background: 'black' }}></div> },
  { type: 'mandatory', title: 'Speed Limit', desc: 'Mandatory: Maximum speed 50 kph.', shape: 'sign-circle', inner: <span style={{ fontSize: '1.5rem' }}>50</span> },
  { type: 'cautionary', title: 'School Ahead', desc: 'Caution: Drive slow, children near.', shape: 'sign-triangle', inner: <span><i className="fas fa-school" style={{ fontSize: '1.2rem', color: 'black' }}></i></span> },
  { type: 'cautionary', title: 'Accident Prone', desc: 'Caution: High risk area ahead.', shape: 'sign-triangle', inner: <span><i className="fas fa-car-crash" style={{ fontSize: '1.2rem', color: 'black' }}></i></span> },
  { type: 'cautionary', title: 'Level Crossing', desc: 'Caution: Railway crossing ahead.', shape: 'sign-triangle', inner: <span><i className="fas fa-train" style={{ fontSize: '1.2rem', color: 'black' }}></i></span> },
  { type: 'cautionary', title: 'Bumps Ahead', desc: 'Caution: Reduce speed.', shape: 'sign-triangle', inner: <span><i className="fas fa-road" style={{ fontSize: '1.2rem', color: 'black' }}></i></span> },
  { type: 'informatory', title: 'Parking', desc: 'Info: Parking zone available.', shape: 'sign-rectangle', inner: <i className="fas fa-parking" style={{ fontSize: '2rem' }}></i> },
  { type: 'informatory', title: 'Hospital', desc: 'Info: Medical assistance nearby.', shape: 'sign-rectangle', inner: <i className="fas fa-hospital" style={{ fontSize: '2rem' }}></i> },
  { type: 'informatory', title: 'Restaurant', desc: 'Info: Food and refreshments.', shape: 'sign-rectangle', inner: <i className="fas fa-utensils" style={{ fontSize: '2rem' }}></i> },
  { type: 'informatory', title: 'Fuel Station', desc: 'Info: Refuel station ahead.', shape: 'sign-rectangle', inner: <i className="fas fa-gas-pump" style={{ fontSize: '2rem' }}></i> }
]

function Page6() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [modal, setModal] = useState(null)
  const [modalActive, setModalActive] = useState(false)
  const closingRef = useRef(false)

  useEffect(function () {
    document.title = 'Traffic Signs Library | Traffic Rules Academy'
  }, [])

  var filters = [
    { key: 'all', label: 'All Signs' },
    { key: 'mandatory', label: 'Mandatory' },
    { key: 'cautionary', label: 'Cautionary' },
    { key: 'informatory', label: 'Informatory' }
  ]

  function handleFilterClick(key) {
    setActiveFilter(key)
    setSearchTerm('')
  }

  function handleSearch(e) {
    setSearchTerm(e.target.value)
    setActiveFilter('all')
  }

  var filtered = signsData.filter(function (s) {
    var matchFilter = activeFilter === 'all' || s.type === activeFilter
    var query = searchTerm.toLowerCase().trim()
    var matchSearch = !query || s.title.toLowerCase().indexOf(query) !== -1 || s.desc.toLowerCase().indexOf(query) !== -1
    return matchFilter && matchSearch
  })

  var categoryColors = { mandatory: '#ef4444', cautionary: '#eab308', informatory: '#3b82f6' }

  function openModal(sign) {
    setModal(sign)
    setTimeout(function () {
      setModalActive(true)
    }, 10)
  }

  function closeModal() {
    if (closingRef.current) return
    closingRef.current = true
    setModalActive(false)
    setTimeout(function () {
      setModal(null)
      closingRef.current = false
    }, 300)
  }

  return (
    <div className="container fade-in">
      <div className="filter-bar">
        {filters.map(function (f) {
          return (
            <button key={f.key} className={'filter-btn' + (activeFilter === f.key ? ' active' : '')}
              onClick={function () { handleFilterClick(f.key) }}>{f.label}</button>
          )
        })}
        <div className="sign-search-container">
          <i className="fas fa-search search-icon"></i>
          <input type="text" className="sign-search" placeholder="Search signs..."
            value={searchTerm} onChange={handleSearch} />
        </div>
      </div>

      <h2 className="section-title" style={{ marginTop: '20px' }}>
        Visual Sign Library ({filtered.length} signs)
      </h2>

      <div className="signs-grid">
        {filtered.map(function (sign, index) {
          return (
            <div key={index} className="sign-card" data-category={sign.type}
              onClick={function () { openModal(sign) }}
              style={{ cursor: 'pointer', opacity: 0, transform: 'translateY(20px)', animation: 'fadeInUp 0.5s ease ' + (index * 80) + 'ms forwards' }}>
              <div className="sign-visual">
                <div className={sign.shape}>{sign.inner}</div>
              </div>
              <h3>{sign.title}</h3>
              <p>{sign.desc}</p>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: '#94a3b8', padding: '30px', fontSize: '1.1rem' }}>
          No signs found matching &quot;{searchTerm}&quot;
        </p>
      )}

      {modal && createPortal(
        <div className={'sign-modal-overlay' + (modalActive ? ' active' : '')}
          onClick={function (e) { if (e.target === e.currentTarget) closeModal() }}>
          <div className="sign-modal">
            <button className="modal-close" onClick={closeModal}><i className="fas fa-times"></i></button>
            <div className="modal-sign-preview">
              <div className={modal.shape}>{modal.inner}</div>
            </div>
            <h2>{modal.title}</h2>
            <span className="modal-category" style={{ background: categoryColors[modal.type] || '#6b7280' }}>
              {modal.type.charAt(0).toUpperCase() + modal.type.slice(1)}
            </span>
            <p style={{ marginTop: '15px', color: '#64748b' }}>{modal.desc}</p>
            <div className="modal-details">
              <p><strong>When you see this sign:</strong></p>
              <ul>
                <li>Slow down and observe</li>
                <li>Follow the indicated instruction</li>
                <li>Ensure passenger safety</li>
              </ul>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default Page6
