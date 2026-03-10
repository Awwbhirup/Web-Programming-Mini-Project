
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

    var lastScore = getCookie('quizScore');
    var lastPercent = getCookie('quizPercent');
    var quizHeader = document.querySelector('.quiz-header');
    if (lastScore && lastPercent && quizHeader) {
        var scoreBadge = document.createElement('div');
        scoreBadge.className = 'last-score-badge';
        scoreBadge.innerHTML = '<i class="fas fa-trophy"></i> Last Score: ' + lastScore + ' (' + lastPercent + '%)';
        quizHeader.appendChild(scoreBadge);
    }

    var answers = {
        q1: 'q1b',
        q2: 'q2c',
        q3: 'q3a',
        q4: 'q4b',
        q5: 'q5b',
        q6: 'q6b',
        q7: 'q7c',
        q8: 'q8b',
        q9: 'q9c'
    };

    var progressBar = document.getElementById('progressBar');
    var totalQuestions = Object.keys(answers).length;

    function updateProgress() {
        var answered = 0;
        for (var q in answers) {
            if (document.querySelector('input[name="' + q + '"]:checked')) {
                answered++;
            }
        }
        var percent = Math.round((answered / totalQuestions) * 100);
        if (progressBar) {
            progressBar.style.width = percent + '%';
            progressBar.style.transition = 'width 0.5s ease';
        }
    }

    document.querySelectorAll('input[type="radio"]').forEach(function (radio) {
        radio.addEventListener('change', updateProgress);
    });

    var timerDiv = document.createElement('div');
    timerDiv.className = 'quiz-timer';
    timerDiv.innerHTML = '<i class="fas fa-clock"></i> <span id="timerDisplay">10:00</span>';
    if (quizHeader) quizHeader.appendChild(timerDiv);

    var timeLeft = 600;
    var timerDisplay = document.getElementById('timerDisplay');

    var timerInterval = setInterval(function () {
        timeLeft--;
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;
        timerDisplay.textContent = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

        if (timeLeft <= 60) {
            timerDiv.style.color = '#ef4444';
            timerDiv.style.fontWeight = 'bold';
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);

    document.querySelectorAll('.option-item').forEach(function (item) {
        item.addEventListener('click', function () {
            var radio = item.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;

            var siblings = item.parentElement.querySelectorAll('.option-item');
            siblings.forEach(function (s) { s.classList.remove('selected'); });
            item.classList.add('selected');

            updateProgress();
        });
    });

    var canvas = document.getElementById('drawingCanvas');
    if (canvas) {
        var container = canvas.parentElement;
        var canvasWidth = container.offsetWidth - 40;
        var canvasHeight = Math.round(canvasWidth * 0.45);
        
        var dpr = window.devicePixelRatio || 1;
        canvas.width = canvasWidth * dpr;
        canvas.height = canvasHeight * dpr;
        
        var ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        var drawing = false;
        var lastX = 0;
        var lastY = 0;

        function getCanvasPos(e) {
            var rect = canvas.getBoundingClientRect();
            var scaleX = canvasWidth / rect.width;
            var scaleY = canvasHeight / rect.height;
            var clientX = e.touches ? e.touches[0].clientX : e.clientX;
            var clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: (clientX - rect.left) * scaleX,
                y: (clientY - rect.top) * scaleY
            };
        }

        canvas.addEventListener('mousedown', function (e) {
            drawing = true;
            var pos = getCanvasPos(e);
            lastX = pos.x; lastY = pos.y;
        });

        canvas.addEventListener('mousemove', function (e) {
            if (!drawing) return;
            var pos = getCanvasPos(e);
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            lastX = pos.x; lastY = pos.y;
        });

        canvas.addEventListener('mouseup', function () { drawing = false; });
        canvas.addEventListener('mouseleave', function () { drawing = false; });

        canvas.addEventListener('touchstart', function (e) {
            e.preventDefault();
            drawing = true;
            var pos = getCanvasPos(e);
            lastX = pos.x; lastY = pos.y;
        }, { passive: false });
        canvas.addEventListener('touchmove', function (e) {
            e.preventDefault();
            if (!drawing) return;
            var pos = getCanvasPos(e);
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            lastX = pos.x; lastY = pos.y;
        }, { passive: false });
        canvas.addEventListener('touchend', function () { drawing = false; });

        var clearBtn = document.createElement('button');
        clearBtn.className = 'btn-clear-canvas';
        clearBtn.innerHTML = '<i class="fas fa-eraser"></i> Clear Drawing';
        canvas.parentElement.appendChild(clearBtn);

        clearBtn.addEventListener('click', function () {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        });

        var colorPicker = document.createElement('div');
        colorPicker.className = 'canvas-colors';
        var colors = ['#ef4444', '#3b82f6', '#22c55e', '#ffffff', '#eab308'];
        colors.forEach(function (color) {
            var dot = document.createElement('span');
            dot.className = 'color-dot';
            dot.style.background = color;
            if (color === '#ef4444') dot.classList.add('active');
            dot.addEventListener('click', function () {
                ctx.strokeStyle = color;
                colorPicker.querySelectorAll('.color-dot').forEach(function (d) { d.classList.remove('active'); });
                dot.classList.add('active');
            });
            colorPicker.appendChild(dot);
        });
        canvas.parentElement.insertBefore(colorPicker, clearBtn);
    }

    var submitBtn = document.querySelector('.submit-btn');

    function submitQuiz() {
        clearInterval(timerInterval);

        var score = 0;
        var total = Object.keys(answers).length;
        var results = [];

        for (var q in answers) {
            var selected = document.querySelector('input[name="' + q + '"]:checked');
            var correctId = answers[q];
            var questionCard = document.querySelector('input[name="' + q + '"]').closest('.question-card');

            if (selected && selected.id === correctId) {
                score++;
                questionCard.classList.add('correct');
                results.push({ question: q, correct: true });
            } else {
                questionCard.classList.add('incorrect');
                results.push({ question: q, correct: false });

                var correctLabel = document.querySelector('label[for="' + correctId + '"]');
                if (correctLabel) correctLabel.parentElement.classList.add('correct-answer');
            }
        }

        document.querySelectorAll('input[type="radio"]').forEach(function (r) { r.disabled = true; });

        var percent = Math.round((score / total) * 100);
        var passed = percent >= 60;

        setCookie('quizScore', score + '/' + total, 30);
        setCookie('quizPercent', percent, 30);

        var resultDiv = document.createElement('div');
        resultDiv.className = 'quiz-result ' + (passed ? 'result-pass' : 'result-fail');
        resultDiv.innerHTML =
            '<div class="result-icon">' + (passed ? '🎉' : '📚') + '</div>' +
            '<h2>' + (passed ? 'Congratulations!' : 'Keep Practicing!') + '</h2>' +
            '<div class="result-score">' + score + '/' + total + '</div>' +
            '<p class="result-percent">' + percent + '% Score</p>' +
            '<p>' + (passed ? 'You passed the assessment! Great job!' : 'You need 60% to pass. Review the highlighted answers and try again.') + '</p>' +
            '<button class="btn retry-btn" onclick="location.reload()"><i class="fas fa-redo"></i> Try Again</button>';

        var quizContainer = document.querySelector('.quiz-container');
        quizContainer.insertBefore(resultDiv, quizContainer.firstChild.nextSibling);

        if (submitBtn) submitBtn.style.display = 'none';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', function () {
            var answered = 0;
            for (var q in answers) {
                if (document.querySelector('input[name="' + q + '"]:checked')) answered++;
            }

            if (answered < 5) {
                alert('Please answer at least 5 questions before submitting!');
                return;
            }

            submitQuiz();
        });
    }

});
