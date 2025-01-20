// Select elements
const timeDisplay = document.getElementById('time-display');
const startStopBtn = document.getElementById('start-stop-btn');
const presetList = document.getElementById('preset-list');

// Timer variables
let timerInterval;
let timerRunning = false;
let remainingTime;

// Function to get the chosen preset time
function getSelectedPresetTime() {
    const selectedPreset = document.querySelector('input[name="preset"]:checked');
    if (selectedPreset) {
        const presetDetails = selectedPreset.closest('li').querySelector('.preset-details');
        const workTime = parseInt(presetDetails.querySelector('input:nth-child(1)').value, 10) || 25;
        return workTime * 60; // Convert minutes to seconds
    }
    return 25 * 60; // Default: 25 minutes
}

// Function to format time as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Function to update the timer display
function updateDisplay() {
    timeDisplay.textContent = formatTime(remainingTime);
}

// Start the timer
function startTimer() {
    timerRunning = true;
    startStopBtn.textContent = 'Stop';

    timerInterval = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerRunning = false;
            startStopBtn.textContent = 'Start';
            alert('Time\'s up!');
        }
    }, 1000);
}

// Stop the timer
function stopTimer() {
    timerRunning = false;
    startStopBtn.textContent = 'Start';
    clearInterval(timerInterval);
}

// Toggle the timer
startStopBtn.addEventListener('click', () => {
    if (timerRunning) {
        stopTimer();
    } else {
        if (!timerInterval) {
            remainingTime = getSelectedPresetTime();
        }
        startTimer();
    }
});

// Initial setup
remainingTime = getSelectedPresetTime();
updateDisplay();
