import PropTypes from 'prop-types'

function NewsCard({ image, date, title, snippet, link }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="news-card">
      <div className="news-image" style={{ background: `url('${image}') center/cover no-repeat` }}></div>
      <div className="news-content">
        <span className="news-date">{date}</span>
        <h3 className="news-title">{title}</h3>
        <p className="news-snippet">{snippet}</p>
        <span className="read-more">Read Full Story &rarr;</span>
      </div>
    </a>
  )
}

NewsCard.propTypes = {
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  snippet: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
}

export default NewsCard
