import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

function Page2() {
  const navigate = useNavigate()
  const { registerUser } = useContext(AppContext)

  const [formData, setFormData] = useState({
    name: '', age: '', email: '', phone: '', password: '', state: 'Maharashtra', license: '2-Wheeler'
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [passwordStrength, setPasswordStrength] = useState({ width: '0%', color: '', label: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [submitState, setSubmitState] = useState('')
  const [shake, setShake] = useState(false)

  useEffect(() => {
    document.title = 'Registration | Traffic Rules Academy'
  }, [])

  var regexPatterns = {
    name: /^[A-Za-z]{2,}(\s[A-Za-z]{2,})+$/,
    email: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
    phone: /^(\+91[\-\s]?)?[6-9]\d{9}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    age: /^(1[6-9]|[2-8]\d|9[0-9])$/
  }

  function validate(field, value) {
    switch (field) {
      case 'name':
        if (!value.trim()) return { msg: '', valid: null }
        if (!/^[A-Za-z\s]+$/.test(value)) return { msg: '✗ Only letters and spaces allowed', valid: false }
        if (!regexPatterns.name.test(value.trim())) return { msg: '✗ Enter full name (first & last name)', valid: false }
        return { msg: '✓ Valid name', valid: true }
      case 'age':
        if (!value) return { msg: '', valid: null }
        if (!regexPatterns.age.test(value)) return { msg: '✗ Age must be between 16 and 99', valid: false }
        return { msg: '✓ Valid age', valid: true }
      case 'email':
        if (!value.trim()) return { msg: '', valid: null }
        if (!regexPatterns.email.test(value.trim())) return { msg: '✗ Enter a valid email (e.g. john@example.com)', valid: false }
        return { msg: '✓ Valid email', valid: true }
      case 'phone':
        if (!value.trim()) return { msg: '', valid: null }
        if (!regexPatterns.phone.test(value.trim())) return { msg: '✗ Enter valid Indian mobile (e.g. 9876543210 or +91 9876543210)', valid: false }
        return { msg: '✓ Valid phone number', valid: true }
      case 'password':
        if (!value) return { msg: '', valid: null }
        if (!regexPatterns.password.test(value)) {
          var missing = []
          if (!/[a-z]/.test(value)) missing.push('lowercase')
          if (!/[A-Z]/.test(value)) missing.push('uppercase')
          if (!/\d/.test(value)) missing.push('digit')
          if (!/[@$!%*?&]/.test(value)) missing.push('special char (@$!%*?&)')
          if (value.length < 8) missing.push('min 8 characters')
          return { msg: '✗ Needs: ' + missing.join(', '), valid: false }
        }
        return { msg: '✓ Strong password!', valid: true }
      default:
        return { msg: '', valid: null }
    }
  }

  function handleChange(e) {
    var { name, value } = e.target
    setFormData(function (prev) { return { ...prev, [name]: value } })
    setTouched(function (prev) { return { ...prev, [name]: true } })
    var result = validate(name, value)
    setErrors(function (prev) { return { ...prev, [name]: result } })

    if (name === 'password') {
      var score = 0
      if (/[a-z]/.test(value)) score++
      if (/[A-Z]/.test(value)) score++
      if (/\d/.test(value)) score++
      if (/[@$!%*?&]/.test(value)) score++
      if (value.length >= 8) score++
      var levels = [
        { width: '20%', color: '#ef4444', label: 'Very Weak' },
        { width: '40%', color: '#f97316', label: 'Weak' },
        { width: '60%', color: '#eab308', label: 'Fair' },
        { width: '80%', color: '#22c55e', label: 'Strong' },
        { width: '100%', color: '#16a34a', label: 'Very Strong' }
      ]
      if (value.length === 0) {
        setPasswordStrength({ width: '0%', color: '', label: '' })
      } else {
        setPasswordStrength(levels[Math.min(score, 4)])
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    var allValid = true
    var newErrors = {}
    var fields = ['name', 'age', 'email', 'phone', 'password']
    fields.forEach(function (field) {
      var result = validate(field, formData[field])
      newErrors[field] = result
      if (!result.valid) allValid = false
    })
    setErrors(newErrors)
    setTouched({ name: true, age: true, email: true, phone: true, password: true })

    if (!allValid) {
      setShake(true)
      setTimeout(function () { setShake(false) }, 500)
      return
    }

    function setCookie(name, value, days) {
      var date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + date.toUTCString() + '; path=/; SameSite=Lax'
    }

    setCookie('userName', formData.name.trim(), 7)
    setCookie('userEmail', formData.email.trim(), 7)
    setCookie('userAge', formData.age.trim(), 7)
    setCookie('userPhone', formData.phone.trim(), 7)
    setCookie('userLicense', formData.license, 7)
    registerUser(formData.name.split(' ')[0])

    setSubmitState('success')
    setTimeout(function () {
      navigate('/page3')
    }, 1200)
  }

  function renderValidation(name) {
    var result = errors[name]
    if (!touched[name] || !result || result.valid === null) return null
    return (
      <span className="validation-msg" style={{
        color: result.valid ? '#22c55e' : '#ef4444',
        fontSize: '0.8rem', marginTop: '4px', display: 'block'
      }}>{result.msg}</span>
    )
  }

  function getBorderColor(name) {
    var result = errors[name]
    if (!touched[name] || !result || result.valid === null) return ''
    return result.valid ? '#22c55e' : '#ef4444'
  }

  return (
    <div className="reg-container fade-in">
      <div className={'reg-card' + (shake ? ' shake-anim' : '')}>
        <div className="reg-header">
          <h2>Create Student Account</h2>
          <p>Start your journey to becoming a pro driver.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" className="form-control" name="name" value={formData.name}
              onChange={handleChange} placeholder="John Doe" style={{ borderColor: getBorderColor('name') }} />
            {renderValidation('name')}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Age</label>
              <input type="number" className="form-control" name="age" value={formData.age}
                onChange={handleChange} placeholder="18" min="16" max="99" style={{ borderColor: getBorderColor('age') }} />
              {renderValidation('age')}
            </div>
            <div className="form-group">
              <label>State</label>
              <select className="form-control" name="state" value={formData.state} onChange={handleChange}>
                <option>Maharashtra</option>
                <option>Delhi</option>
                <option>Karnataka</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" className="form-control" name="email" value={formData.email}
              onChange={handleChange} placeholder="john@example.com" style={{ borderColor: getBorderColor('email') }} />
            {renderValidation('email')}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" className="form-control" name="phone" value={formData.phone}
              onChange={handleChange} placeholder="+91 9876543210" style={{ borderColor: getBorderColor('phone') }} />
            {renderValidation('phone')}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPassword ? 'text' : 'password'} className="form-control" name="password"
                value={formData.password} onChange={handleChange} placeholder="••••••••"
                style={{ borderColor: getBorderColor('password') }} />
              <button type="button" className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', background: 'none', border: 'none', fontSize: '1.1rem', color: '#64748b' }}>
                <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
              </button>
            </div>
            {renderValidation('password')}
            {formData.password && (
              <div className="password-strength" style={{ marginTop: '8px' }}>
                <div className="strength-bar" style={{ height: '4px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
                  <div className="strength-fill" style={{ width: passwordStrength.width, height: '100%', background: passwordStrength.color, transition: 'all 0.3s' }}></div>
                </div>
                <span className="strength-text" style={{ fontSize: '0.8rem', color: passwordStrength.color, marginTop: '4px', display: 'block' }}>{passwordStrength.label}</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>License Type Goal</label>
            <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
              <label style={{ fontWeight: 'normal', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="radio" name="license" value="2-Wheeler" checked={formData.license === '2-Wheeler'} onChange={handleChange} /> 2-Wheeler
              </label>
              <label style={{ fontWeight: 'normal', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="radio" name="license" value="4-Wheeler" checked={formData.license === '4-Wheeler'} onChange={handleChange} /> 4-Wheeler
              </label>
            </div>
          </div>

          <button type="submit" className="btn submit-btn" style={submitState === 'success' ? { background: '#22c55e' } : {}}>
            {submitState === 'success' ? <><i className="fas fa-check"></i> Registered!</> : 'Start Learning'}
          </button>
        </form>

        <div className="form-footer">
          Already have an account? <a href="#">Login here</a>
        </div>
      </div>
    </div>
  )
}

export default Page2
