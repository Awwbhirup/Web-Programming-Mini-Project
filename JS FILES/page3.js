
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

    var userName = getCookie('userName');
    var lessonTitle = document.getElementById('lessonTitle');
    if (userName && lessonTitle) {
        var welcomeText = document.createElement('p');
        welcomeText.className = 'welcome-back-badge';
        welcomeText.innerHTML = '👋 Welcome, ' + userName + '! Ready to learn?';
        var lessonContent = document.querySelector('.lesson-content');
        if (lessonContent) {
            lessonContent.insertBefore(welcomeText, lessonContent.firstChild);
        }
    }

    var modules = [
        {
            title: '1. Introduction to Road Safety',
            desc: 'In this lesson, we will cover the fundamental principles of defensive driving, the importance of seatbelts, and how to maintain a safe following distance.',
            duration: '10 Mins',
            level: 'Beginner',
            video: '../MEDIA/video/videoplayback.mp4'
        },
        {
            title: '2. Understanding Rights of Way',
            desc: 'Learn about intersection priority rules, yielding protocols, and how to navigate complex traffic situations safely and confidently.',
            duration: '15 Mins',
            level: 'Beginner',
            video: '../MEDIA/video/videoplayback2.mp4'
        },
        {
            title: '3. Dashboard Symbols',
            desc: 'Decode every warning light and symbol on your vehicle dashboard. Know what each indicator means and how to respond effectively.',
            duration: '12 Mins',
            level: 'Intermediate',
            video: '../MEDIA/video/videoplayback3.mp4'
        },
        {
            title: '4. Preventing Road Accidents',
            desc: 'Explore common causes of road accidents and learn preventive measures including safe overtaking, night driving tips, and weather-related precautions.',
            duration: '20 Mins',
            level: 'Advanced',
            video: '../MEDIA/video/videoplayback4.mp4'
        }
    ];

    var moduleItems = document.querySelectorAll('.module-item');
    var lessonDesc = document.getElementById('lessonDesc');
    var badges = document.querySelectorAll('.badge');

    moduleItems.forEach(function (item, index) {
        item.style.cursor = 'pointer';

        item.addEventListener('click', function () {
            moduleItems.forEach(function (m) { m.classList.remove('active'); });
            item.classList.add('active');

            moduleItems.forEach(function (m, i) {
                var icon = m.querySelector('.status-icon');
                if (i === index) {
                    icon.className = 'fas fa-play-circle status-icon';
                } else if (i < index) {
                    icon.className = 'fas fa-check-circle status-icon';
                    icon.style.color = '#22c55e';
                } else {
                    icon.className = 'fas fa-lock status-icon';
                    icon.style.color = '';
                }
            });

            var mainContent = document.querySelector('.main-content');
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(10px)';

            setTimeout(function () {
                if (lessonTitle) lessonTitle.textContent = modules[index].title;
                if (lessonDesc) lessonDesc.textContent = modules[index].desc;
                if (badges[0]) badges[0].innerHTML = '<i class="fas fa-clock"></i> ' + modules[index].duration;
                if (badges[1]) badges[1].innerHTML = '<i class="fas fa-signal"></i> ' + modules[index].level;

                var video = document.getElementById('videoPlayer');
                if (video && modules[index].video) {
                    var source = video.querySelector('source');
                    if (source) {
                        source.src = modules[index].video;
                        video.load();
                    }
                }

                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }, 300);
        });
    });

    var video = document.getElementById('videoPlayer');
    if (video) {
        video.removeAttribute('autoplay');

        var progressDiv = document.createElement('div');
        progressDiv.className = 'video-progress-info';
        progressDiv.innerHTML = '<i class="fas fa-play-circle"></i> <span>Ready to play</span>';
        var videoWrapper = document.querySelector('.video-wrapper');
        if (videoWrapper) videoWrapper.appendChild(progressDiv);

        video.addEventListener('play', function () {
            progressDiv.innerHTML = '<i class="fas fa-play-circle" style="color:#22c55e;"></i> <span>Playing...</span>';
        });

        video.addEventListener('pause', function () {
            progressDiv.innerHTML = '<i class="fas fa-pause-circle" style="color:#eab308;"></i> <span>Paused</span>';
        });

        video.addEventListener('timeupdate', function () {
            if (video.duration) {
                var percent = Math.round((video.currentTime / video.duration) * 100);
                progressDiv.querySelector('span').textContent = 'Playing... ' + percent + '% complete';
            }
        });

        video.addEventListener('ended', function () {
            progressDiv.innerHTML = '<i class="fas fa-check-circle" style="color:#22c55e;"></i> <span>Lesson Complete! 🎉</span>';
        });
    }

    var lessonContentEl = document.querySelector('.lesson-content');
    if (lessonContentEl) {
        var notesSection = document.createElement('div');
        notesSection.className = 'notes-section';
        notesSection.innerHTML = 
            '<h4><i class="fas fa-sticky-note"></i> Your Notes</h4>' +
            '<textarea class="notes-textarea" placeholder="Take notes as you learn..." rows="4"></textarea>' +
            '<button class="save-notes-btn"><i class="fas fa-save"></i> Save Notes</button>';
        lessonContentEl.appendChild(notesSection);

        var notesTextarea = notesSection.querySelector('.notes-textarea');
        var saveBtn = notesSection.querySelector('.save-notes-btn');

        var savedNotes = localStorage.getItem('trafficAcademy_notes');
        if (savedNotes) notesTextarea.value = savedNotes;

        saveBtn.addEventListener('click', function () {
            localStorage.setItem('trafficAcademy_notes', notesTextarea.value);
            saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
            saveBtn.style.background = '#22c55e';
            setTimeout(function () {
                saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Notes';
                saveBtn.style.background = '';
            }, 2000);
        });
    }

});
