import PropTypes from 'prop-types'

function StatItem({ number, label }) {
  return (
    <div className="stat-item">
      <span className="stat-number">{number}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

StatItem.propTypes = {
  number: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default StatItem
