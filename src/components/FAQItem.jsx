import PropTypes from 'prop-types'
import { useState } from 'react'

function FAQItem({ id, title, content }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleToggle() {
    setIsOpen(!isOpen)
  }

  return (
    <div className="faq-item">
      <input type="checkbox" id={id} checked={isOpen} onChange={handleToggle} />
      <label className="faq-header" htmlFor={id} onClick={handleToggle}>
        <span>{title}</span>
        <i className="fas fa-chevron-down icon"></i>
      </label>
      <div className="faq-content">
        <p>{content}</p>
      </div>
    </div>
  )
}

FAQItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default FAQItem
