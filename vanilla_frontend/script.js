// script.js

// Pre-hydrate animations for results page progress bars
document.addEventListener('DOMContentLoaded', () => {
    // If we're on result page, animate circular progress and bar widths
    const circle = document.querySelector('.progress-anim');
    if (circle) {
        // Animate from 0 to 82 (the circumference is ~100 with current r=15.9155 setup)
        setTimeout(() => {
            circle.setAttribute('stroke-dasharray', '82, 100');
            
            // Also animate progress bars
            const progressBars = document.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const target = bar.getAttribute('data-target');
                if (target) {
                    bar.style.width = target;
                }
            });
        }, 400); // slight delay plays better with fade-in
    }
});

// Camera Page Logic
let cameraTimeout;
let analysisInterval;
let aiFeedbackTimeout;
let angleDisplay;
let fpsDisplay;
let textElement;

const aiCorrections = [
    "Good chamber. Try to pivot your base foot slightly more.",
    "Extend the leg fully for maximum snap.",
    "Keep your guard up as you execute the roundhouse.",
    "Perfect execution! Power and speed look optimal.",
    "Focus on bringing the knee back fast after contact.",
    "Raise your knee higher before extending the kick.",
    "Breathe out when you strike to generate more power."
];

function startCamera() {
    const defaultPlaceholder = document.getElementById('video-feed');
    const loadingOverlay = document.getElementById('loading-overlay');
    const startBtn = document.getElementById('btn-start-camera');
    const stopBtn = document.getElementById('btn-stop-camera');
    const uiOverlay = document.getElementById('ai-ui-overlay');
    const statusBadge = document.getElementById('status-badge');
    
    // Check if these elements exist on the page
    if(!startBtn) return;

    // Hide start contents, show loading
    startBtn.classList.add('hidden');
    defaultPlaceholder.querySelector('.user-camera-icon').classList.add('hidden');
    defaultPlaceholder.querySelector('.instruction-text').classList.add('hidden');
    loadingOverlay.classList.remove('hidden');

    // Simulate Model Loading Time
    cameraTimeout = setTimeout(() => {
        // Hide loader
        loadingOverlay.classList.add('hidden');
        
        // Show AI HUD
        uiOverlay.classList.remove('hidden');
        
        // Change Status
        statusBadge.innerHTML = '<i class="fa-solid fa-circle fa-beat status-dot" style="color:var(--success)"></i> ' + "Live Analysis";
        statusBadge.className = 'badge success';
        statusBadge.classList.add('fade-in-up');

        // Show Stop Button
        stopBtn.classList.remove('hidden');

        // Initialize fake analysis values
        startFakeAnalysis();
    }, 2000); // 2 second fake load
}

function stopCamera() {
    clearTimeout(cameraTimeout);
    clearInterval(analysisInterval);
    clearTimeout(aiFeedbackTimeout);
    
    // Navigate to results page after stop
    window.location.href = 'result.html';
}

function startFakeAnalysis() {
    angleDisplay = document.getElementById('angle-display');
    fpsDisplay = document.getElementById('fps-counter');
    textElement = document.getElementById('ai-feedback-text');
    
    let isTyping = false;
    
    analysisInterval = setInterval(() => {
        // Fluctuate FPS slightly
        const baseFps = 28 + Math.random() * 4;
        if(fpsDisplay) fpsDisplay.innerText = baseFps.toFixed(1);

        // Fluctuate angle slightly
        // Simulate a kick happening every few seconds
        const kickHappening = Math.random() > 0.8;
        if(kickHappening && angleDisplay) {
            const angle = Math.floor(60 + Math.random() * 50);
            angleDisplay.innerText = angle + '°';
            angleDisplay.style.color = angle > 90 ? 'var(--success)' : 'var(--warning)';
            
            // Trigger feedback message typing
            if(!isTyping && textElement) {
                const message = aiCorrections[Math.floor(Math.random() * aiCorrections.length)];
                typeWriterEffect(message);
                isTyping = true;
                
                // Allow another message after some time
                aiFeedbackTimeout = setTimeout(() => { isTyping = false; }, 4000);
            }
        }

    }, 400); // Update every 400ms
}

function typeWriterEffect(text) {
    if (!textElement) return;
    textElement.innerText = '';
    let i = 0;
    const speed = 25; // ms typing speed
    
    function type() {
        if (i < text.length) {
            textElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}
