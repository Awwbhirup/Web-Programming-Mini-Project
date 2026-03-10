
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

    var faqItems = document.querySelectorAll('.faq-item');
    var faqCheckboxes = document.querySelectorAll('.faq-item input[type="checkbox"]');

    faqCheckboxes.forEach(function (checkbox, index) {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                faqCheckboxes.forEach(function (cb, i) {
                    if (i !== index) cb.checked = false;
                });
            }
        });
    });

    var completedSteps = JSON.parse(localStorage.getItem('emergencyStepsCompleted') || '[]');

    faqItems.forEach(function (item, index) {
        var content = item.querySelector('.faq-content');
        if (content) {
            var markBtn = document.createElement('button');
            markBtn.className = 'mark-read-btn';
            
            if (completedSteps.indexOf(index) !== -1) {
                markBtn.innerHTML = '<i class="fas fa-check-circle"></i> Read ✓';
                markBtn.classList.add('completed');
                item.classList.add('step-completed');
            } else {
                markBtn.innerHTML = '<i class="far fa-circle"></i> Mark as Read';
            }

            markBtn.addEventListener('click', function (e) {
                e.preventDefault();
                if (completedSteps.indexOf(index) === -1) {
                    completedSteps.push(index);
                    localStorage.setItem('emergencyStepsCompleted', JSON.stringify(completedSteps));
                    markBtn.innerHTML = '<i class="fas fa-check-circle"></i> Read ✓';
                    markBtn.classList.add('completed');
                    item.classList.add('step-completed');
                } else {
                    completedSteps = completedSteps.filter(function (s) { return s !== index; });
                    localStorage.setItem('emergencyStepsCompleted', JSON.stringify(completedSteps));
                    markBtn.innerHTML = '<i class="far fa-circle"></i> Mark as Read';
                    markBtn.classList.remove('completed');
                    item.classList.remove('step-completed');
                }
                updateStepProgress();
            });

            content.appendChild(markBtn);
        }
    });

    var stepsContainer = document.querySelector('.steps-container');
    if (stepsContainer) {
        var progressTracker = document.createElement('div');
        progressTracker.className = 'step-progress-tracker';
        progressTracker.innerHTML =
            '<div class="step-progress-bar"><div class="step-progress-fill"></div></div>' +
            '<span class="step-progress-text">0 of ' + faqItems.length + ' steps reviewed</span>';
        
        var sectionTitle = stepsContainer.querySelector('.section-title');
        if (sectionTitle) {
            sectionTitle.after(progressTracker);
        }
    }

    function updateStepProgress() {
        var fill = document.querySelector('.step-progress-fill');
        var text = document.querySelector('.step-progress-text');
        var count = completedSteps.length;
        var total = faqItems.length;
        var percent = Math.round((count / total) * 100);

        if (fill) {
            fill.style.width = percent + '%';
            fill.style.transition = 'width 0.5s ease';
        }
        if (text) {
            text.textContent = count + ' of ' + total + ' steps reviewed';
            if (count === total) text.textContent += ' ✅ All Done!';
        }
    }
    updateStepProgress();

    var emergencyBtn = document.querySelector('.emergency-btn-pulse');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function () {
            var overlay = document.createElement('div');
            overlay.className = 'emergency-overlay';
            overlay.innerHTML =
                '<div class="emergency-dialog">' +
                    '<div class="emergency-dialog-icon"><i class="fas fa-phone-alt"></i></div>' +
                    '<h2>Emergency Call</h2>' +
                    '<p>You are about to call emergency number <strong>112</strong></p>' +
                    '<div class="emergency-dialog-btns">' +
                        '<a href="tel:112" class="dial-btn"><i class="fas fa-phone"></i> Dial 112</a>' +
                        '<button class="cancel-btn">Cancel</button>' +
                    '</div>' +
                '</div>';
            document.body.appendChild(overlay);

            setTimeout(function () { overlay.classList.add('active'); }, 10);

            overlay.querySelector('.cancel-btn').addEventListener('click', function () {
                overlay.classList.remove('active');
                setTimeout(function () { overlay.remove(); }, 300);
            });
        });
    }

    if (stepsContainer) {
        var toggleAllBtn = document.createElement('button');
        toggleAllBtn.className = 'toggle-all-btn';
        toggleAllBtn.innerHTML = '<i class="fas fa-expand-alt"></i> Expand All';
        var allExpanded = false;

        var progressTracker2 = document.querySelector('.step-progress-tracker');
        if (progressTracker2) {
            progressTracker2.after(toggleAllBtn);
        }

        toggleAllBtn.addEventListener('click', function () {
            allExpanded = !allExpanded;
            faqCheckboxes.forEach(function (cb) { cb.checked = allExpanded; });
            toggleAllBtn.innerHTML = allExpanded ?
                '<i class="fas fa-compress-alt"></i> Collapse All' :
                '<i class="fas fa-expand-alt"></i> Expand All';
        });
    }

    faqItems.forEach(function (item, index) {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(function () {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 200 + index * 120);
    });

});
