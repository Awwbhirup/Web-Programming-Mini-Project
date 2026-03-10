
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

    var regexPatterns = {
        name: /^[A-Za-z]{2,}(\s[A-Za-z]{2,})+$/,
        email: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
        phone: /^(\+91[\-\s]?)?[6-9]\d{9}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        age: /^(1[6-9]|[2-8]\d|9[0-9])$/
    };

    var form = document.querySelector('form');
    var nameInput = document.getElementById('regName');
    var ageInput = document.getElementById('regAge');
    var emailInput = document.getElementById('regEmail');
    var phoneInput = document.getElementById('regPhone');
    var passwordInput = document.getElementById('regPassword');

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
            if (val.length === 0) {
                clearValidation(this);
            } else if (!/^[A-Za-z\s]+$/.test(val)) {
                showValidation(this, '✗ Only letters and spaces allowed', false);
            } else if (!regexPatterns.name.test(val)) {
                showValidation(this, '✗ Enter full name (first & last name)', false);
            } else {
                showValidation(this, '✓ Valid name', true);
            }
        });
    }

    if (ageInput) {
        ageInput.addEventListener('input', function () {
            var val = this.value.trim();
            if (val.length === 0) {
                clearValidation(this);
            } else if (!regexPatterns.age.test(val)) {
                showValidation(this, '✗ Age must be between 16 and 99', false);
            } else {
                showValidation(this, '✓ Valid age', true);
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('input', function () {
            var val = this.value.trim();
            if (val.length === 0) {
                clearValidation(this);
            } else if (!regexPatterns.email.test(val)) {
                showValidation(this, '✗ Enter a valid email (e.g. john@example.com)', false);
            } else {
                showValidation(this, '✓ Valid email', true);
            }
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', function () {
            var val = this.value.trim();
            if (val.length === 0) {
                clearValidation(this);
            } else if (!regexPatterns.phone.test(val)) {
                showValidation(this, '✗ Enter valid Indian mobile (e.g. 9876543210 or +91 9876543210)', false);
            } else {
                showValidation(this, '✓ Valid phone number', true);
            }
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

            if (/[a-z]/.test(val)) score++;
            if (/[A-Z]/.test(val)) score++;
            if (/\d/.test(val)) score++;
            if (/[@$!%*?&]/.test(val)) score++;
            if (val.length >= 8) score++;

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

            if (!regexPatterns.password.test(val)) {
                var missing = [];
                if (!/[a-z]/.test(val)) missing.push('lowercase');
                if (!/[A-Z]/.test(val)) missing.push('uppercase');
                if (!/\d/.test(val)) missing.push('digit');
                if (!/[@$!%*?&]/.test(val)) missing.push('special char (@$!%*?&)');
                if (val.length < 8) missing.push('min 8 characters');
                showValidation(this, '✗ Needs: ' + missing.join(', '), false);
            } else {
                showValidation(this, '✓ Strong password!', true);
            }
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

            if (nameInput && !regexPatterns.name.test(nameInput.value.trim())) {
                showValidation(nameInput, '✗ Enter full name (first & last name, letters only)', false);
                valid = false;
                if (!firstInvalid) firstInvalid = nameInput;
            }

            if (ageInput && !regexPatterns.age.test(ageInput.value.trim())) {
                showValidation(ageInput, '✗ Age must be between 16 and 99', false);
                valid = false;
                if (!firstInvalid) firstInvalid = ageInput;
            }

            if (emailInput && !regexPatterns.email.test(emailInput.value.trim())) {
                showValidation(emailInput, '✗ Enter a valid email address', false);
                valid = false;
                if (!firstInvalid) firstInvalid = emailInput;
            }

            if (phoneInput && !regexPatterns.phone.test(phoneInput.value.trim())) {
                showValidation(phoneInput, '✗ Enter a valid Indian mobile number', false);
                valid = false;
                if (!firstInvalid) firstInvalid = phoneInput;
            }

            if (passwordInput && !regexPatterns.password.test(passwordInput.value)) {
                showValidation(passwordInput, '✗ Password needs: 8+ chars, upper, lower, digit, special char', false);
                valid = false;
                if (!firstInvalid) firstInvalid = passwordInput;
            }

            if (!valid) {
                e.preventDefault();
                if (firstInvalid) firstInvalid.focus();

                var card = document.querySelector('.reg-card');
                if (card) {
                    card.style.animation = 'shake 0.5s ease';
                    setTimeout(function () { card.style.animation = ''; }, 500);
                }
            } else {
                e.preventDefault();

                setCookie('userName', nameInput.value.trim(), 7);
                setCookie('userEmail', emailInput.value.trim(), 7);
                setCookie('userAge', ageInput.value.trim(), 7);
                setCookie('userPhone', phoneInput.value.trim(), 7);
                var licenseRadio = document.querySelector('input[name="license"]:checked');
                if (licenseRadio) {
                    var licenseLabel = licenseRadio.parentElement.textContent.trim();
                    setCookie('userLicense', licenseLabel, 7);
                }

                var submitBtn = form.querySelector('.submit-btn');
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Registered!';
                submitBtn.style.background = '#22c55e';

                setTimeout(function () {
                    window.location.href = 'page3.html';
                }, 1200);
            }
        });
    }

});
