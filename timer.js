let remainingTime;
let timerTimeout;
let isPaused = false;
let endTime;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateDisplay() {
    display.textContent = formatTime(remainingTime);
}

function calculateRemainingTime() {
    remainingTime = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
}

async function startTimer() {
    const hours = parseInt(document.getElementById('hours').value, 10) || 0;
    const minutes = parseInt(document.getElementById('minutes').value, 10) || 0;
    const seconds = parseInt(document.getElementById('seconds').value, 10) || 0;

    if (!isPaused) {
        remainingTime = hours * 3600 + minutes * 60 + seconds;
    }
    
    endTime = Date.now() + remainingTime * 1000;

    while (remainingTime > 0 && !isPaused) {
        updateDisplay();
        await new Promise(resolve => timerTimeout = setTimeout(resolve, 1000));
        calculateRemainingTime();
    }

    if (remainingTime <= 0) {
        updateDisplay();
    }
}

function pauseTimer() {
    isPaused = true;
    clearTimeout(timerTimeout);
}

function resetTimer() {
    clearTimeout(timerTimeout);
    remainingTime = 0;
    updateDisplay();
    isPaused = false;
}

startButton.addEventListener('click', () => {
    isPaused = false;
    startTimer();
});

pauseButton.addEventListener('click', pauseTimer);

resetButton.addEventListener('click', () => {
    resetTimer();
    document.getElementById('hours').value = 0;
    document.getElementById('minutes').value = 0;
    document.getElementById('seconds').value = 0;
});
