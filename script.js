let countdown;
const timerDispaly = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
    //clear any existing timer data
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    // we are using this functon because we want to show the immediate time at the starting but set interval function will run after 1s
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        // here we are continiouslt checking the time left in timer
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // to stop the timer at exact time we add a condition so that we can stop the interval at 0 seconds
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
    const time = seconds * 1000;
    //we can add further stuff when the timer is completed
    setTimeout(() => console.log("we are done"), time);
}

function displayTimeLeft(secs) {
    const minutes = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    const display = `${minutes}:${
        remainderSecs < 10 ? "0" : ""
    }${remainderSecs}`;
    //we are adding the title proprty of the document so that the countdown should visible on the title of the document
    document.title = display;
    timerDispaly.textContent = display;
    console.log(secs);
}
function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${
        hours > 12 ? hours - 12 : hours
    }:${minutes}`;
}
function startTimer() {
    const seconds = parseInt(this.dataset.time);
    //here we run the timer function so that we can run with the button attached second values in that timer function
    timer(seconds);
}
buttons.forEach((button) => {
    button.addEventListener("click", startTimer);
});
//if an element has a name attribute on it than we can select that element directly from
document.customForm.addEventListener("submit", function (e) {
    e.preventDefault();
    //here we are again selecting the element by their name property
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});
