var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var startBtn = document.getElementById('start');

// Timer that counts down from 10
function countdown() {
    var timeLeft = 10;
    
    // Use the setInterval() method to call this function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function() {
        // as long as the "timeLeft" is greater than 1 
        if (timeLeft > 1) {
            // set the 'textContent' of 'timerEl' to show the remaining seconds
            timerEl.textContent = timeLeft + ' seconds remaining ';
            // Decrement 'timeLeft' by 1
            timeLeft--;
        } else if (timeLeft === 1) {
            // When 'timeLeft' is equal to 1, rename to second' instead of 'seconds'
            timerEl.textContent = timeLeft + 'second remaining';
            timeLeft--;
        } else {
            // once 'timeLeft' gets to 0, set 'timerEl' to an empty string
            timerEl.textContent = '';
            // Use 'clearInterval() to stop the timer
            clearInterval(timeInterval);
            // Call the 'displayMessage()' function
            displayMessage();
        }
    }, 1000);
}
startBtn.onclick = countdown;