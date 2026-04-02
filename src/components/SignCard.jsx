import PropTypes from 'prop-types'

function SignCard({ type, title, description, children }) {
  var shapeClass = type === 'mandatory' ? 'sign-circle'
    : type === 'cautionary' ? 'sign-triangle'
    : 'sign-rectangle'

  return (
    <div className="sign-card" data-type={type}>
      <div className="sign-visual">
        <div className={shapeClass}>
          {children}
        </div>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

SignCard.propTypes = {
  type: PropTypes.oneOf(['mandatory', 'cautionary', 'informatory']).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default SignCard
