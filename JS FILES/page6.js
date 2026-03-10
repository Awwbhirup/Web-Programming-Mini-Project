
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

    var filterBtns = document.querySelectorAll('.filter-btn');
    var signCards = document.querySelectorAll('.sign-card');

    signCards.forEach(function (card) {
        var desc = card.querySelector('p').textContent.toLowerCase();
        if (desc.indexOf('mandatory') !== -1) {
            card.setAttribute('data-category', 'mandatory');
        } else if (desc.indexOf('caution') !== -1) {
            card.setAttribute('data-category', 'cautionary');
        } else if (desc.indexOf('info') !== -1) {
            card.setAttribute('data-category', 'informatory');
        }
    });

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var category = btn.textContent.toLowerCase().trim();

            signCards.forEach(function (card) {
                var cardCategory = card.getAttribute('data-category');

                if (category === 'all signs') {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else if (cardCategory === category) {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });

            updateSignCounter();
        });
    });

    var filterBar = document.querySelector('.filter-bar');
    if (filterBar) {
        var searchContainer = document.createElement('div');
        searchContainer.className = 'sign-search-container';
        searchContainer.innerHTML = '<i class="fas fa-search search-icon"></i><input type="text" class="sign-search" placeholder="Search signs...">';
        filterBar.appendChild(searchContainer);

        var searchInput = searchContainer.querySelector('.sign-search');

        searchInput.addEventListener('input', function () {
            var query = this.value.toLowerCase().trim();
            
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            filterBtns[0].classList.add('active');

            signCards.forEach(function (card) {
                var name = card.querySelector('h3').textContent.toLowerCase();
                var desc = card.querySelector('p').textContent.toLowerCase();
                if (name.indexOf(query) !== -1 || desc.indexOf(query) !== -1) {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.3s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });

            updateSignCounter();
        });
    }

    var sectionTitle = document.querySelector('.section-title');
    
    function updateSignCounter() {
        var visible = 0;
        signCards.forEach(function (c) {
            if (c.style.display !== 'none') visible++;
        });
        if (sectionTitle) {
            sectionTitle.textContent = 'Visual Sign Library (' + visible + ' signs)';
        }
    }
    updateSignCounter();

    signCards.forEach(function (card) {
        card.style.cursor = 'pointer';

        card.addEventListener('click', function () {
            var name = card.querySelector('h3').textContent;
            var desc = card.querySelector('p').textContent;
            var category = card.getAttribute('data-category');
            var categoryColors = {
                'mandatory': '#ef4444',
                'cautionary': '#eab308',
                'informatory': '#3b82f6'
            };

            var overlay = document.createElement('div');
            overlay.className = 'sign-modal-overlay';
            overlay.innerHTML =
                '<div class="sign-modal">' +
                    '<button class="modal-close"><i class="fas fa-times"></i></button>' +
                    '<div class="modal-sign-preview">' + card.querySelector('.sign-visual').innerHTML + '</div>' +
                    '<h2>' + name + '</h2>' +
                    '<span class="modal-category" style="background:' + (categoryColors[category] || '#6b7280') + '">' + (category ? category.charAt(0).toUpperCase() + category.slice(1) : 'General') + '</span>' +
                    '<p style="margin-top:15px;color:#64748b;">' + desc + '</p>' +
                    '<div class="modal-details">' +
                        '<p><strong>When you see this sign:</strong></p>' +
                        '<ul>' +
                            '<li>Slow down and observe</li>' +
                            '<li>Follow the indicated instruction</li>' +
                            '<li>Ensure passenger safety</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>';
            document.body.appendChild(overlay);

            setTimeout(function () { overlay.classList.add('active'); }, 10);

            overlay.querySelector('.modal-close').addEventListener('click', function () {
                overlay.classList.remove('active');
                setTimeout(function () { overlay.remove(); }, 300);
            });
            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                    setTimeout(function () { overlay.remove(); }, 300);
                }
            });
        });
    });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 80);
            }
        });
    }, { threshold: 0.1 });

    signCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

});
