
document.addEventListener('DOMContentLoaded', function () {

    function setCookie(name, value, days) {
        var expires = '';
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
    }

    function getCookie(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
        }
        return null;
    }

    function deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    }

    if (!getCookie('cookieConsent')) {
        var banner = document.createElement('div');
        banner.className = 'cookie-consent-banner';
        banner.innerHTML =
            '<div class="cookie-consent-text">' +
                '<i class="fas fa-cookie-bite"></i>' +
                'We use cookies to enhance your experience, remember your preferences, and personalize content. ' +
                'By clicking "Accept", you consent to our use of cookies.' +
            '</div>' +
            '<div class="cookie-consent-buttons">' +
                '<button class="cookie-accept-btn">Accept</button>' +
                '<button class="cookie-decline-btn">Decline</button>' +
            '</div>';
        document.body.appendChild(banner);

        banner.querySelector('.cookie-accept-btn').addEventListener('click', function () {
            setCookie('cookieConsent', 'accepted', 30);
            banner.classList.add('hidden');
            setTimeout(function () { banner.remove(); }, 400);
        });

        banner.querySelector('.cookie-decline-btn').addEventListener('click', function () {
            setCookie('cookieConsent', 'declined', 30);
            banner.classList.add('hidden');
            setTimeout(function () { banner.remove(); }, 400);
        });
    }

    const header = document.querySelector('.header-content');
    const nav = document.querySelector('.nav-links');

    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger.setAttribute('aria-label', 'Toggle navigation');
    header.appendChild(hamburger);

    hamburger.addEventListener('click', function () {
        nav.classList.toggle('nav-open');
        const icon = hamburger.querySelector('i');
        if (nav.classList.contains('nav-open')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            nav.classList.remove('nav-open');
            hamburger.querySelector('i').className = 'fas fa-bars';
        });
    });

    var userName = getCookie('userName');
    var heroContent = document.querySelector('.hero-content');
    if (userName && heroContent) {
        var welcomeBadge = document.createElement('div');
        welcomeBadge.className = 'welcome-back-badge';
        welcomeBadge.innerHTML = '<i class="fas fa-hand-sparkles"></i> Welcome back, ' + userName + '!';
        heroContent.insertBefore(welcomeBadge, heroContent.firstChild);
    }

    function animateCounter(element, target, suffix) {
        var current = 0;
        var increment = Math.ceil(target / 60);
        var timer = setInterval(function () {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current.toLocaleString() + suffix;
        }, 30);
    }

    var statsObserved = false;
    var statsSection = document.querySelector('.stats-section');

    function handleStatsScroll() {
        if (statsObserved) return;
        if (!statsSection) return;

        var rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsObserved = true;
            var statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(function (el) {
                var text = el.textContent.trim();
                if (text.indexOf('k') !== -1) {
                    var num = parseFloat(text) * 1000;
                    animateCounter(el, num / 1000, 'k+');
                } else if (text.indexOf('%') !== -1) {
                    var num = parseInt(text);
                    animateCounter(el, num, '%');
                } else {
                    var num = parseInt(text.replace(/[^0-9]/g, ''));
                    animateCounter(el, num, '+');
                }
            });
        }
    }

    window.addEventListener('scroll', handleStatsScroll);
    handleStatsScroll();

    var fadeElements = document.querySelectorAll('.feature-card, .section-title');
    
    function handleScrollAnimations() {
        fadeElements.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations();

    var bgMusic = document.getElementById('bg-music');
    if (bgMusic) {
        bgMusic.pause();
        
        var musicBtn = document.createElement('button');
        musicBtn.className = 'music-toggle';
        musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        musicBtn.title = 'Toggle Background Music';
        document.body.appendChild(musicBtn);
        
        var isPlaying = false;

        var musicPref = getCookie('musicPref');
        if (musicPref === 'on') {
            bgMusic.play().catch(function () { });
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            isPlaying = true;
        }

        musicBtn.addEventListener('click', function () {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                setCookie('musicPref', 'off', 30);
            } else {
                bgMusic.play();
                musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                setCookie('musicPref', 'on', 30);
            }
            isPlaying = !isPlaying;
        });
    }

    document.querySelectorAll('.hero-btn').forEach(function (btn) {
        btn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.03)';
        });
        btn.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    var topBtn = document.createElement('button');
    topBtn.className = 'back-to-top';
    topBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    topBtn.title = 'Back to Top';
    document.body.appendChild(topBtn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    });

    topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    var heroHeading = document.querySelector('.hero-content h1');
    if (heroHeading) {
        var fullText = heroHeading.textContent;
        heroHeading.textContent = '';
        heroHeading.style.borderRight = '3px solid var(--accent)';
        var charIndex = 0;

        function typeWriter() {
            if (charIndex < fullText.length) {
                heroHeading.textContent += fullText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 60);
            } else {
                setTimeout(function() {
                    heroHeading.style.borderRight = 'none';
                }, 1000);
            }
        }
        typeWriter();
    }

    document.querySelectorAll('.feature-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = (y - centerY) / 15;
            var rotateY = (centerX - x) / 15;
            card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });

});
