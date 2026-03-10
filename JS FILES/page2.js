
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

    var form = document.querySelector('form');
    var nameInput = document.querySelector('input[type="text"]');
    var ageInput = document.querySelector('input[type="number"]');
    var emailInput = document.querySelector('input[type="email"]');
    var passwordInput = document.querySelector('input[type="password"]');

    function showValidation(input, message, isValid) {
        var existing = input.parentElement.querySelector('.validation-msg');
        if (!existing) {
            existing = document.createElement('span');
            existing.className = 'validation-msg';
            input.parentElement.appendChild(existing);
        }
        existing.textContent = message;
        existing.style.color = isValid ? '#22c55e' : '#ef4444';
        existing.style.fontSize = '0.8rem';
        existing.style.marginTop = '4px';
        existing.style.display = 'block';
        input.style.borderColor = isValid ? '#22c55e' : '#ef4444';
    }

    function clearValidation(input) {
        var existing = input.parentElement.querySelector('.validation-msg');
        if (existing) existing.remove();
        input.style.borderColor = '';
    }

    if (nameInput) {
        nameInput.addEventListener('input', function () {
            var val = this.value.trim();
            if (val.length === 0) { clearValidation(this); }
            else if (val.length < 2) { showValidation(this, 'Name must be at least 2 characters', false); }
            else if (!/^[a-zA-Z\s]+$/.test(val)) { showValidation(this, 'Name should only contain letters', false); }
            else { showValidation(this, '✓ Looks good!', true); }
        });
    }

    if (ageInput) {
        ageInput.addEventListener('input', function () {
            var val = parseInt(this.value);
            if (this.value === '') { clearValidation(this); }
            else if (isNaN(val) || val < 16) { showValidation(this, 'Must be at least 16 years old', false); }
            else if (val > 99) { showValidation(this, 'Please enter a valid age', false); }
            else { showValidation(this, '✓ Valid age', true); }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('input', function () {
            var val = this.value.trim();
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (val.length === 0) { clearValidation(this); }
            else if (!emailRegex.test(val)) { showValidation(this, 'Please enter a valid email address', false); }
            else { showValidation(this, '✓ Valid email', true); }
        });
    }

    if (passwordInput) {
        var strengthContainer = document.createElement('div');
        strengthContainer.className = 'password-strength';
        strengthContainer.innerHTML = '<div class="strength-bar"><div class="strength-fill"></div></div><span class="strength-text"></span>';
        passwordInput.parentElement.appendChild(strengthContainer);

        passwordInput.addEventListener('input', function () {
            var val = this.value;
            var fill = strengthContainer.querySelector('.strength-fill');
            var text = strengthContainer.querySelector('.strength-text');
            var score = 0;

            if (val.length === 0) {
                fill.style.width = '0%';
                text.textContent = '';
                clearValidation(this);
                return;
            }

            if (val.length >= 6) score++;
            if (val.length >= 10) score++;
            if (/[A-Z]/.test(val)) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[^A-Za-z0-9]/.test(val)) score++;

            var levels = [
                { width: '20%', color: '#ef4444', label: 'Very Weak' },
                { width: '40%', color: '#f97316', label: 'Weak' },
                { width: '60%', color: '#eab308', label: 'Fair' },
                { width: '80%', color: '#22c55e', label: 'Strong' },
                { width: '100%', color: '#16a34a', label: 'Very Strong' }
            ];

            var level = levels[Math.min(score, 4)];
            fill.style.width = level.width;
            fill.style.background = level.color;
            text.textContent = level.label;
            text.style.color = level.color;
        });
    }

    if (passwordInput) {
        var inputWrapper = document.createElement('div');
        inputWrapper.style.position = 'relative';
        passwordInput.parentElement.insertBefore(inputWrapper, passwordInput);
        inputWrapper.appendChild(passwordInput);

        var toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'password-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
        inputWrapper.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', function () {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                passwordInput.type = 'password';
                toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            var valid = true;
            var firstInvalid = null;

            if (nameInput && nameInput.value.trim().length < 2) {
                showValidation(nameInput, 'Please enter your full name', false);
                valid = false;
                if (!firstInvalid) firstInvalid = nameInput;
            }

            var age = ageInput ? parseInt(ageInput.value) : 0;
            if (ageInput && (isNaN(age) || age < 16 || age > 99)) {
                showValidation(ageInput, 'Please enter a valid age (16-99)', false);
                valid = false;
                if (!firstInvalid) firstInvalid = ageInput;
            }

            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput && !emailRegex.test(emailInput.value.trim())) {
                showValidation(emailInput, 'Please enter a valid email', false);
                valid = false;
                if (!firstInvalid) firstInvalid = emailInput;
            }

            if (passwordInput && passwordInput.value.length < 6) {
                showValidation(passwordInput, 'Password must be at least 6 characters', false);
                valid = false;
                if (!firstInvalid) firstInvalid = passwordInput;
            }

            if (!valid) {
                e.preventDefault();
                if (firstInvalid) firstInvalid.focus();
                
                var card = document.querySelector('.reg-card');
                if (card) {
                    card.style.animation = 'shake 0.5s ease';
                    setTimeout(function() { card.style.animation = ''; }, 500);
                }
            } else {
                e.preventDefault();
                var submitBtn = form.querySelector('.submit-btn');
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Registered!';
                submitBtn.style.background = '#22c55e';
                
                setTimeout(function() {
                    window.location.href = 'page3.html';
                }, 1200);
            }
        });
    }

});
