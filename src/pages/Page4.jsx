import { useState, useEffect, useRef } from 'react'

var questions = [
  { id: 'q1', text: '1. What does a red traffic light mean?', options: [{ id: 'q1a', text: 'Speed up' }, { id: 'q1b', text: 'Stop' }, { id: 'q1c', text: 'No entry' }, { id: 'q1d', text: 'Slow down' }], answer: 'q1b' },
  { id: 'q2', text: '2. What must you do at a zebra crossing?', options: [{ id: 'q2a', text: 'Speed up' }, { id: 'q2b', text: 'Honk continuously' }, { id: 'q2c', text: 'Stop and let pedestrians cross' }, { id: 'q2d', text: 'Ignore' }], answer: 'q2c' },
  { id: 'q3', text: '3. In India, vehicles drive on which side?', options: [{ id: 'q3a', text: 'Left side' }, { id: 'q3b', text: 'Right side' }, { id: 'q3c', text: 'Center' }, { id: 'q3d', text: 'Any side' }], answer: 'q3a' },
  { id: 'q4', text: '4. What does an amber/yellow light signal?', options: [{ id: 'q4a', text: 'Go fast' }, { id: 'q4b', text: 'Prepare to stop' }, { id: 'q4c', text: 'Stop immediately' }, { id: 'q4d', text: 'Reverse' }], answer: 'q4b' },
  { id: 'q5', text: '5. Who goes first at a roundabout?', options: [{ id: 'q5a', text: 'Vehicle entering' }, { id: 'q5b', text: 'Vehicle already inside' }, { id: 'q5c', text: 'Larger vehicle' }, { id: 'q5d', text: 'Smaller vehicle' }], answer: 'q5b' },
  { id: 'q6', text: '6. What is the legal blood alcohol limit for driving in India?', options: [{ id: 'q6a', text: '0.05%' }, { id: 'q6b', text: '0.03%' }, { id: 'q6c', text: '0.08%' }, { id: 'q6d', text: 'Zero' }], answer: 'q6b' },
  { id: 'q7', text: '7. What does a "No Parking" sign indicate?', options: [{ id: 'q7a', text: 'Park for 5 minutes' }, { id: 'q7b', text: 'No stopping at all' }, { id: 'q7c', text: 'No parking anytime' }, { id: 'q7d', text: 'Park only at night' }], answer: 'q7c' },
  { id: 'q8', text: '8. Minimum age for a driving license in India?', options: [{ id: 'q8a', text: '16' }, { id: 'q8b', text: '18' }, { id: 'q8c', text: '21' }, { id: 'q8d', text: '14' }], answer: 'q8b' },
  { id: 'q9', text: '9. What should you do when an ambulance approaches?', options: [{ id: 'q9a', text: 'Speed up' }, { id: 'q9b', text: 'Ignore' }, { id: 'q9c', text: 'Pull over and give way' }, { id: 'q9d', text: 'Sound horn and move' }], answer: 'q9c' }
]

function Page4() {
  const [selections, setSelections] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(600)
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawColor, setDrawColor] = useState('#ef4444')
  const lastPos = useRef({ x: 0, y: 0 })
  const timerRef = useRef(null)
  const selectionsRef = useRef({})

  useEffect(() => {
    document.title = 'Quiz | Traffic Rules Academy'
  }, [])

  useEffect(() => {
    if (submitted) return
    timerRef.current = setInterval(function () {
      setTimeLeft(function (prev) {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          doSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return function () { clearInterval(timerRef.current) }
  }, [submitted])

  useEffect(() => {
    var canvas = canvasRef.current
    if (!canvas) return
    var container = canvas.parentElement
    var w = container.offsetWidth - 40
    var h = Math.round(w * 0.45)
    var dpr = window.devicePixelRatio || 1
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    var ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    ctx.strokeStyle = '#ef4444'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [])

  function getCanvasPos(e) {
    var canvas = canvasRef.current
    var rect = canvas.getBoundingClientRect()
    var dpr = window.devicePixelRatio || 1
    var w = canvas.width / dpr
    var h = canvas.height / dpr
    var scaleX = w / rect.width
    var scaleY = h / rect.height
    var clientX = e.touches ? e.touches[0].clientX : e.clientX
    var clientY = e.touches ? e.touches[0].clientY : e.clientY
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY }
  }

  function startDraw(e) {
    e.preventDefault()
    setIsDrawing(true)
    var pos = getCanvasPos(e)
    lastPos.current = pos
  }

  function draw(e) {
    if (!isDrawing) return
    e.preventDefault()
    var pos = getCanvasPos(e)
    var ctx = canvasRef.current.getContext('2d')
    ctx.strokeStyle = drawColor
    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    lastPos.current = pos
  }

  function stopDraw() { setIsDrawing(false) }

  function clearCanvas() {
    var canvas = canvasRef.current
    var dpr = window.devicePixelRatio || 1
    var ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
  }

  function handleSelect(qId, optId) {
    if (submitted) return
    setSelections(function (prev) {
      var updated = { ...prev, [qId]: optId }
      selectionsRef.current = updated
      return updated
    })
  }

  function doSubmit() {
    clearInterval(timerRef.current)
    var correct = 0
    var currentSelections = selectionsRef.current
    questions.forEach(function (q) {
      if (currentSelections[q.id] === q.answer) correct++
    })
    setScore(correct)
    setSubmitted(true)

    function setCookie(name, value, days) {
      var date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + date.toUTCString() + '; path=/'
    }
    var percent = Math.round((correct / questions.length) * 100)
    setCookie('quizScore', correct + '/' + questions.length, 30)
    setCookie('quizPercent', percent.toString(), 30)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSubmit() {
    var answered = Object.keys(selections).length
    if (answered < 5) {
      alert('Please answer at least 5 questions before submitting!')
      return
    }
    doSubmit()
  }

  function handleRetry() {
    setSelections({})
    setSubmitted(false)
    setScore(0)
    setTimeLeft(600)
    clearCanvas()
  }

  var minutes = Math.floor(timeLeft / 60)
  var seconds = timeLeft % 60
  var timerText = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  var percent = Math.round((score / questions.length) * 100)
  var passed = percent >= 60
  var answeredCount = Object.keys(selections).length
  var progressPercent = Math.round((answeredCount / questions.length) * 100)
  var colors = ['#ef4444', '#3b82f6', '#22c55e', '#ffffff', '#eab308']

  return (
    <div className="quiz-container fade-in">
      <div className="quiz-header">
        <h2>{submitted ? '' : 'Module 1 Assessment'}</h2>
        <div className="quiz-timer" style={{ color: timeLeft <= 60 ? '#ef4444' : '', fontWeight: timeLeft <= 60 ? 'bold' : '' }}>
          <i className="fas fa-clock"></i> <span>{timerText}</span>
        </div>
        {!submitted && (
          <div className="progress-track">
            <div className="progress-fill" id="progressBar" style={{ width: progressPercent + '%', transition: 'width 0.5s ease' }}></div>
          </div>
        )}
      </div>

      {submitted && (
        <div className={'quiz-result ' + (passed ? 'result-pass' : 'result-fail')}>
          <div className="result-icon">{passed ? '🎉' : '📚'}</div>
          <h2>{passed ? 'Congratulations!' : 'Keep Practicing!'}</h2>
          <div className="result-score">{score}/{questions.length}</div>
          <p className="result-percent">{percent}% Score</p>
          <p>{passed ? 'You passed the assessment! Great job!' : 'You need 60% to pass. Review the highlighted answers and try again.'}</p>
          <button className="btn retry-btn" onClick={handleRetry}><i className="fas fa-redo"></i> Try Again</button>
        </div>
      )}

      {questions.map(function (q) {
        var isCorrectQ = submitted && selections[q.id] === q.answer
        var isWrongQ = submitted && selections[q.id] && selections[q.id] !== q.answer
        return (
          <div key={q.id} className={'question-card' + (isCorrectQ ? ' correct' : '') + (isWrongQ ? ' incorrect' : '')}>
            <p className="question-text">{q.text}</p>
            <div className="options-list">
              {q.options.map(function (opt) {
                var isSelected = selections[q.id] === opt.id
                var isCorrectOpt = submitted && opt.id === q.answer
                var isWrongOpt = submitted && isSelected && opt.id !== q.answer
                return (
                  <div key={opt.id}
                    className={'option-item' + (isSelected ? ' selected' : '') + (isCorrectOpt ? ' correct-answer' : '')}
                    onClick={() => handleSelect(q.id, opt.id)}
                    style={isWrongOpt ? { borderColor: '#ef4444' } : isCorrectOpt ? { borderColor: '#22c55e' } : {}}>
                    <input type="radio" name={q.id} checked={isSelected} readOnly disabled={submitted} />
                    <label>{opt.text}</label>
                    {submitted && isCorrectOpt && <i className="fas fa-check" style={{ color: '#22c55e', marginLeft: 'auto' }}></i>}
                    {submitted && isWrongOpt && <i className="fas fa-times" style={{ color: '#ef4444', marginLeft: 'auto' }}></i>}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      <div className="question-card">
        <p className="question-text">10. Draw the &quot;Stop&quot; sign shape below:</p>
        <div className="drawing-container">
          <canvas ref={canvasRef} id="drawingCanvas"
            onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
            onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw}
            style={{ cursor: 'crosshair', borderRadius: '8px', background: 'transparent' }}></canvas>
          <p className="canvas-note">(Use your mouse/finger to draw)</p>
          <div className="canvas-colors" style={{ display: 'flex', justifyContent: 'center', gap: '14px', margin: '10px 0' }}>
            {colors.map(function (c) {
              return (
                <span key={c} className={'color-dot' + (drawColor === c ? ' active' : '')}
                  onClick={() => setDrawColor(c)}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', background: c, cursor: 'pointer', border: drawColor === c ? '3px solid white' : '2px solid rgba(255,255,255,0.3)', display: 'inline-block', transition: 'all 0.2s' }}></span>
              )
            })}
          </div>
          <button className="btn-clear-canvas" onClick={clearCanvas}>
            <i className="fas fa-eraser"></i> Clear Drawing
          </button>
        </div>
      </div>

      {!submitted && (
        <button className="btn submit-btn" onClick={handleSubmit}>Submit Quiz</button>
      )}
    </div>
  )
}

export default Page4
