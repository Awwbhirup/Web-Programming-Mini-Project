
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

    var feedbackRegex = /^[A-Za-z0-9\s.,!?'"\-]{10,500}$/;

    var feedbackSent = getCookie('feedbackSent');
    var formSection = document.querySelector('.contact-form-section');

    if (feedbackSent === 'true' && formSection) {
        var thankYou = document.createElement('div');
        thankYou.className = 'feedback-thankyou';
        thankYou.innerHTML =
            '<i class="fas fa-check-circle"></i>' +
            '<h3>Thank You for Your Feedback!</h3>' +
            '<p>We received your feedback and appreciate your time. You can submit new feedback below.</p>' +
            '<button class="feedback-new-btn"><i class="fas fa-pen"></i> Send New Feedback</button>';

        var existingForm = formSection.querySelector('form');
        formSection.insertBefore(thankYou, existingForm);

        thankYou.querySelector('.feedback-new-btn').addEventListener('click', function () {
            deleteCookie('feedbackSent');
            thankYou.remove();
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

        var regexMsg = document.createElement('div');
        regexMsg.style.cssText = 'font-size: 0.8rem; margin-top: 4px;';
        textarea.parentElement.appendChild(regexMsg);

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

            var val = textarea.value;
            if (val.length === 0) {
                regexMsg.textContent = '';
                textarea.style.borderColor = '';
            } else if (val.length < 10) {
                regexMsg.textContent = '✗ Message must be at least 10 characters';
                regexMsg.style.color = '#ef4444';
                textarea.style.borderColor = '#ef4444';
            } else if (!feedbackRegex.test(val)) {
                regexMsg.textContent = '✗ Only letters, numbers, and basic punctuation (.,!?\'-") allowed';
                regexMsg.style.color = '#ef4444';
                textarea.style.borderColor = '#ef4444';
            } else {
                regexMsg.textContent = '✓ Valid message';
                regexMsg.style.color = '#22c55e';
                textarea.style.borderColor = '#22c55e';
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

            if (textarea) {
                var val = textarea.value.trim();
                if (val.length < 10) {
                    alert('Please write at least 10 characters in your message.');
                    textarea.focus();
                    return;
                }
                if (!feedbackRegex.test(val)) {
                    alert('Your message contains invalid characters. Only letters, numbers, and basic punctuation are allowed.');
                    textarea.focus();
                    return;
                }
            }

            setCookie('feedbackSent', 'true', 1);

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
                if (regexMsg) { regexMsg.textContent = ''; textarea.style.borderColor = ''; }
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
