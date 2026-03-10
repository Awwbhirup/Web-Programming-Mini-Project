
document.addEventListener('DOMContentLoaded', function () {

    var header = document.querySelector('.header-content');
    var nav = document.querySelector('.nav-links');
    var hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    header.appendChild(hamburger);
    hamburger.addEventListener('click', function () {
        nav.classList.toggle('nav-open');
        var icon = hamburger.querySelector('i');
        icon.className = nav.classList.contains('nav-open') ? 'fas fa-times' : 'fas fa-bars';
    });

    var bgMusic = document.getElementById('bg-music');
    if (bgMusic) {
        bgMusic.pause();
        var musicBtn = document.createElement('button');
        musicBtn.className = 'music-toggle';
        musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        document.body.appendChild(musicBtn);
        var isPlaying = false;
        musicBtn.addEventListener('click', function () {
            if (isPlaying) { bgMusic.pause(); musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'; }
            else { bgMusic.play(); musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>'; }
            isPlaying = !isPlaying;
        });
    }

    var ticker = document.querySelector('.news-ticker');
    if (ticker) {
        var tickerText = ticker.textContent;
        ticker.innerHTML = '<span class="ticker-inner">' + tickerText + '&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;' + tickerText + '</span>';
        ticker.style.overflow = 'hidden';
        ticker.style.whiteSpace = 'nowrap';

        var inner = ticker.querySelector('.ticker-inner');
        inner.style.display = 'inline-block';
        inner.style.animation = 'tickerScroll 25s linear infinite';

        ticker.addEventListener('mouseenter', function () {
            inner.style.animationPlayState = 'paused';
        });
        ticker.addEventListener('mouseleave', function () {
            inner.style.animationPlayState = 'running';
        });

        var style = document.createElement('style');
        style.textContent = '@keyframes tickerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }';
        document.head.appendChild(style);
    }

    var newsGrid = document.querySelector('.news-grid');
    var newsCards = document.querySelectorAll('.news-card');
    var sectionTitle = document.querySelector('.section-title');

    if (sectionTitle && newsGrid) {
        var searchBar = document.createElement('div');
        searchBar.className = 'news-search-bar';
        searchBar.innerHTML = '<i class="fas fa-search"></i><input type="text" class="news-search-input" placeholder="Search news articles...">';
        sectionTitle.after(searchBar);

        var searchInput = searchBar.querySelector('.news-search-input');

        searchInput.addEventListener('input', function () {
            var query = this.value.toLowerCase().trim();

            newsCards.forEach(function (card) {
                var title = card.querySelector('.news-title').textContent.toLowerCase();
                var snippet = card.querySelector('.news-snippet').textContent.toLowerCase();
                if (title.indexOf(query) !== -1 || snippet.indexOf(query) !== -1) {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });

            var visible = 0;
            newsCards.forEach(function (c) { if (c.style.display !== 'none') visible++; });
            var noResults = document.querySelector('.no-results');
            if (visible === 0) {
                if (!noResults) {
                    noResults = document.createElement('p');
                    noResults.className = 'no-results';
                    noResults.textContent = 'No articles found matching "' + this.value + '"';
                    noResults.style.cssText = 'text-align:center;color:#94a3b8;padding:30px;font-size:1.1rem;';
                    newsGrid.after(noResults);
                } else {
                    noResults.textContent = 'No articles found matching "' + this.value + '"';
                }
            } else if (noResults) {
                noResults.remove();
            }
        });
    }

    var bookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]');

    newsCards.forEach(function (card, index) {
        var content = card.querySelector('.news-content');

        var bookmarkBtn = document.createElement('button');
        bookmarkBtn.className = 'bookmark-btn';
        bookmarkBtn.innerHTML = bookmarks.indexOf(index) !== -1 ?
            '<i class="fas fa-bookmark"></i>' :
            '<i class="far fa-bookmark"></i>';
        bookmarkBtn.title = 'Bookmark this article';

        bookmarkBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (bookmarks.indexOf(index) !== -1) {
                bookmarks = bookmarks.filter(function (b) { return b !== index; });
                bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
                showToast('Bookmark removed');
            } else {
                bookmarks.push(index);
                bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
                showToast('Article bookmarked!');
            }
            localStorage.setItem('newsBookmarks', JSON.stringify(bookmarks));
        });

        content.style.position = 'relative';
        content.appendChild(bookmarkBtn);
    });

    function showToast(message) {
        var existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(function () { toast.classList.add('show'); }, 10);
        setTimeout(function () {
            toast.classList.remove('show');
            setTimeout(function () { toast.remove(); }, 300);
        }, 2500);
    }

    newsCards.forEach(function (card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(function () {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + index * 150);
    });

    newsCards.forEach(function (card) {
        var snippet = card.querySelector('.news-snippet');
        if (snippet) {
            var words = snippet.textContent.split(/\s+/).length;
            var readTime = Math.max(1, Math.ceil(words / 200));
            var badge = document.createElement('span');
            badge.className = 'read-time-badge';
            badge.innerHTML = '<i class="fas fa-clock"></i> ' + readTime + ' min read';
            var dateSpan = card.querySelector('.news-date');
            if (dateSpan) dateSpan.after(badge);
        }
    });

});
