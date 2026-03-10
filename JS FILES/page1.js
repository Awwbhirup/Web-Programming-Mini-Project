
document.addEventListener('DOMContentLoaded', function () {

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
    handleStatsScroll(); // Check on load too

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
        bgMusic.pause(); // Don't autoplay until user interacts
        
        var musicBtn = document.createElement('button');
        musicBtn.className = 'music-toggle';
        musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        musicBtn.title = 'Toggle Background Music';
        document.body.appendChild(musicBtn);
        
        var isPlaying = false;
        musicBtn.addEventListener('click', function () {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                bgMusic.play();
                musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
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
