import { useState, useEffect } from 'react'

var newsData = [
  { image: '/MEDIA/images/news-cam.png', date: 'Jan 18, 2026', title: 'Smart Traffic Fines 2026', snippet: 'New AI-driven challan system implemented nationwide. Check the updated penalty list for signal jumps and speeding.', link: 'https://parkplus.io/blog/challan/updated-new-traffic-rules-2025' },
  { image: '/MEDIA/images/news-highway.png', date: 'Jan 12, 2026', title: 'New Urban Expressways Open', snippet: 'Government inaugurates key sections of the Dwarka Expressway to decongest NCR traffic flow.', link: 'https://www.hindustantimes.com/india-news/pm-modi-to-inaugurate-dwarka-expressway-uer-ii-today-what-to-know-about-the-mega-highway-projects-101755392569085.html' },
  { image: '/MEDIA/images/news-helmet.png', date: 'Jan 05, 2026', title: '"Wear It, Don\'t Carry It"', snippet: 'New nationwide campaign targets the habit of hanging helmets on handlebars instead of wearing them.', link: 'https://www.adgully.com/post/11300/vega-autos-pehnoge-toh-bachoge-calls-out-indias-dangerous-helmet-carrying-habit' },
  { image: '/MEDIA/images/reg-bg.png', date: 'Dec 28, 2025', title: 'National EV Grid Expansion', snippet: 'Fast-charging network now covers 500+ new locations. View the live map for your next road trip.', link: 'https://www.tatapower.com/ezcharge' }
]

function Page8() {
  const [searchTerm, setSearchTerm] = useState('')
  const [bookmarks, setBookmarks] = useState(function () {
    return JSON.parse(localStorage.getItem('newsBookmarks') || '[]')
  })
  const [toast, setToast] = useState('')

  useEffect(function () {
    document.title = 'Latest News | Traffic Rules Academy'

    var style = document.createElement('style')
    style.textContent = '@keyframes tickerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }'
    document.head.appendChild(style)
    return function () { document.head.removeChild(style) }
  }, [])

  function showToast(message) {
    setToast(message)
    setTimeout(function () { setToast('') }, 2500)
  }

  function toggleBookmark(index, e) {
    e.preventDefault()
    e.stopPropagation()
    var updated
    if (bookmarks.indexOf(index) !== -1) {
      updated = bookmarks.filter(function (b) { return b !== index })
      showToast('Bookmark removed')
    } else {
      updated = [...bookmarks, index]
      showToast('Article bookmarked!')
    }
    setBookmarks(updated)
    localStorage.setItem('newsBookmarks', JSON.stringify(updated))
  }

  var filtered = newsData.filter(function (n) {
    var term = searchTerm.toLowerCase().trim()
    return !term || n.title.toLowerCase().indexOf(term) !== -1 || n.snippet.toLowerCase().indexOf(term) !== -1
  })

  var tickerText = 'New Motor Vehicle Act Update 2026: Fines for blocking emergency vehicles increased to ₹10,000 • AI Cameras now live on 12 major expressways.'

  function getReadTime(snippet) {
    var words = snippet.split(/\s+/).length
    return Math.max(1, Math.ceil(words / 200))
  }

  return (
    <div className="news-container fade-in">
      <div className="breaking-news">
        <span className="breaking-label">Breaking</span>
        <div className="news-ticker" style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <span className="ticker-inner" style={{ display: 'inline-block', animation: 'tickerScroll 25s linear infinite' }}>
            {tickerText}&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;{tickerText}
          </span>
        </div>
      </div>

      <h2 className="section-title">Latest Updates</h2>

      <div className="news-search-bar">
        <i className="fas fa-search"></i>
        <input type="text" className="news-search-input" placeholder="Search news articles..."
          value={searchTerm} onChange={function (e) { setSearchTerm(e.target.value) }} />
      </div>

      <div className="news-grid">
        {filtered.map(function (article, index) {
          var readTime = getReadTime(article.snippet)
          var isBookmarked = bookmarks.indexOf(index) !== -1
          return (
            <a key={index} href={article.link} target="_blank" rel="noopener noreferrer" className="news-card"
              style={{ opacity: 0, transform: 'translateY(30px)', animation: 'fadeInUp 0.6s ease ' + (300 + index * 150) + 'ms forwards' }}>
              <div className="news-image" style={{ background: 'url(' + article.image + ') center/cover no-repeat' }}></div>
              <div className="news-content" style={{ position: 'relative' }}>
                <span className="news-date">{article.date}</span>
                <span className="read-time-badge"><i className="fas fa-clock"></i> {readTime} min read</span>
                <h3 className="news-title">{article.title}</h3>
                <p className="news-snippet">{article.snippet}</p>
                <span className="read-more">Read Full Story &rarr;</span>
                <button className="bookmark-btn" title="Bookmark this article"
                  onClick={function (e) { toggleBookmark(index, e) }}>
                  <i className={isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'}></i>
                </button>
              </div>
            </a>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: '#94a3b8', padding: '30px', fontSize: '1.1rem' }}>
          No articles found matching &quot;{searchTerm}&quot;
        </p>
      )}

      {toast && (
        <div className="toast-notification show">{toast}</div>
      )}
    </div>
  )
}

export default Page8
