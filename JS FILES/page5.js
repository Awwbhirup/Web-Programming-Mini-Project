
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

    var ratingStars = document.querySelectorAll('.rating-star');
    var ratingInputs = document.querySelectorAll('input[name="rating"]');
    var selectedRating = 0;

    ratingStars.forEach(function (star, index) {
        star.addEventListener('mouseenter', function () {
            var starIndex = ratingStars.length - 1 - index;
            ratingStars.forEach(function (s, i) {
                var si = ratingStars.length - 1 - i;
                if (si <= starIndex) {
                    s.style.color = '#f59e0b';
                    s.style.transform = 'scale(1.2)';
                } else {
                    s.style.color = '#cbd5e1';
                    s.style.transform = 'scale(1)';
                }
            });
        });

        star.addEventListener('click', function () {
            selectedRating = ratingStars.length - index;
            ratingInputs[index].checked = true;

            var existing = document.querySelector('.rating-feedback');
            if (!existing) {
                existing = document.createElement('div');
                existing.className = 'rating-feedback';
                star.parentElement.parentElement.appendChild(existing);
            }
            var messages = ['', 'Poor 😞', 'Fair 😐', 'Good 😊', 'Great 😄', 'Excellent 🤩'];
            existing.textContent = messages[selectedRating] || '';
            existing.style.color = '#f59e0b';
            existing.style.fontSize = '0.9rem';
            existing.style.marginTop = '8px';
        });
    });

    var ratingGroup = document.querySelector('.rating-group');
    if (ratingGroup) {
        ratingGroup.addEventListener('mouseleave', function () {
            ratingStars.forEach(function (s, i) {
                var si = ratingStars.length - 1 - i;
                if (si < selectedRating) {
                    s.style.color = '#f59e0b';
                    s.style.transform = 'scale(1)';
                } else {
                    s.style.color = '#cbd5e1';
                    s.style.transform = 'scale(1)';
                }
            });
        });
    }

    var textarea = document.querySelector('textarea');
    if (textarea) {
        var maxChars = 500;
        var counterDiv = document.createElement('div');
        counterDiv.className = 'char-counter';
        counterDiv.textContent = '0 / ' + maxChars + ' characters';
        counterDiv.style.cssText = 'font-size: 0.8rem; color: #94a3b8; text-align: right; margin-top: 5px;';
        textarea.parentElement.appendChild(counterDiv);

        textarea.addEventListener('input', function () {
            var len = textarea.value.length;
            counterDiv.textContent = len + ' / ' + maxChars + ' characters';

            if (len > maxChars) {
                counterDiv.style.color = '#ef4444';
                textarea.value = textarea.value.substring(0, maxChars);
                counterDiv.textContent = maxChars + ' / ' + maxChars + ' characters (max reached)';
            } else if (len > maxChars * 0.8) {
                counterDiv.style.color = '#eab308';
            } else {
                counterDiv.style.color = '#94a3b8';
            }
        });
    }

    var form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (selectedRating === 0) {
                alert('Please select a rating before submitting!');
                return;
            }

            if (textarea && textarea.value.trim().length < 10) {
                alert('Please write at least 10 characters in your message.');
                textarea.focus();
                return;
            }

            var btn = form.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="fas fa-check"></i> Feedback Sent!';
            btn.style.background = '#22c55e';
            btn.style.color = 'white';
            btn.disabled = true;

            var btnRect = btn.getBoundingClientRect();
            var centerX = btnRect.left + btnRect.width / 2;
            var centerY = btnRect.top + btnRect.height / 2;
            
            for (var i = 0; i < 20; i++) {
                var dot = document.createElement('div');
                dot.className = 'confetti-dot';
                var size = 6 + Math.random() * 6;
                var hue = Math.floor(Math.random() * 360);
                var angle = (Math.PI * 2 / 20) * i + (Math.random() - 0.5);
                var dist = 60 + Math.random() * 100;
                var dx = Math.cos(angle) * dist;
                var dy = Math.sin(angle) * dist - 80;
                
                dot.style.cssText = 'position:fixed;width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:hsl(' + hue + ',85%,60%);z-index:9999;pointer-events:none;left:' + centerX + 'px;top:' + centerY + 'px;transition:all 0.9s cubic-bezier(0.25,0.46,0.45,0.94);opacity:1;';
                document.body.appendChild(dot);

                (function(d, x, y) {
                    requestAnimationFrame(function() {
                        d.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(0.3)';
                        d.style.opacity = '0';
                    });
                })(dot, dx, dy);

                setTimeout(function(d) { return function() { d.remove(); }; }(dot), 1000);
            }

            setTimeout(function () {
                form.reset();
                selectedRating = 0;
                ratingStars.forEach(function (s) { s.style.color = '#cbd5e1'; });
                btn.innerHTML = 'Submit Feedback';
                btn.style.background = '';
                btn.style.color = '';
                btn.disabled = false;
                if (counterDiv) counterDiv.textContent = '0 / ' + maxChars + ' characters';
                var rf = document.querySelector('.rating-feedback');
                if (rf) rf.textContent = '';
            }, 3000);
        });
    }

    var mapBtn = document.querySelector('.btn-map');
    if (mapBtn) {
        mapBtn.addEventListener('click', function () {
            window.open('https://maps.google.com/?q=19.0760,72.8777', '_blank');
        });
    }

    document.querySelectorAll('.info-item').forEach(function (item) {
        item.addEventListener('mouseenter', function () {
            var icon = item.querySelector('.info-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        item.addEventListener('mouseleave', function () {
            var icon = item.querySelector('.info-icon');
            if (icon) icon.style.transform = '';
        });
    });

});
