let milliseconds = 0, seconds = 0, minutes = 0;
let interval;
let isRunning = false;

const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const millisecondsElement = document.getElementById("milliseconds");
const lapsElement = document.getElementById("laps");

document.getElementById("start").addEventListener("click", startStopwatch);
document.getElementById("pause").addEventListener("click", pauseStopwatch);
document.getElementById("reset").addEventListener("click", resetStopwatch);
document.getElementById("lap").addEventListener("click", recordLap);

function startStopwatch() {
    if (isRunning) return;
    isRunning = true;
    interval = setInterval(updateTime, 10);
}

function pauseStopwatch() {
    isRunning = false;
    clearInterval(interval);
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(interval);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    updateDisplay();
    lapsElement.innerHTML = "";
}

function recordLap() {
    if (!isRunning) return;
    const lapTime = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap: ${lapTime}`;
    lapsElement.appendChild(lapItem);
}

function updateTime() {
    milliseconds += 1;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds += 1;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes += 1;
    }
    updateDisplay();
}

function updateDisplay() {
    millisecondsElement.textContent = pad(milliseconds);
    secondsElement.textContent = pad(seconds);
    minutesElement.textContent = pad(minutes);
}

function pad(number) {
    return number < 10 ? `0${number}` : number;
}
