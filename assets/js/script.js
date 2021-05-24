// DOM elements
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// quiz states variables 
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


// hide the start screen as quiz starts 
// show questions section
// start the timer for the clock
// show starting time on clock
// start the getQuestion function
function startQuiz() {
    // hide start screen
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");

    // un-hide questions section
    questionsEl.removeAttribute("class");

    // start timer 
    timerId = setInterval(clockTick, 1000);

    // show starting time 
    timerEl.textContent = time;

    getQuestion();
}


// find the question object from the array (in questions.js)
// update the title with the current question 
// clear out the old choices, hence the blank "" for innerHTML
// loop over the choices, variable creates button
// set attributes of class choice and value to mynewChoice
// attach click event listener to each choice with .onclick
// append mynewChoice to the page so it displays
function getQuestion() {
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex];

    // update title with current question
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    // clear out any old question choices
    choicesEl.innerHTML = "";

    // loop over choices 
    currentQuestion.choices.forEach(function(choice, i) {
        // create new button for each choice 
        var mynewChoice = document.createElement("button");
        mynewChoice.setAttribute("class", "choice");
        mynewChoice.setAttribute("value", choice);

        mynewChoice.textContent = i + 1 + ". " + choice;

        // attach click event listener to each choice
        // define questionClick next 
        mynewChoice.onclick = questionClick;

        // append child to the page 
        choicesEl.appendChild(mynewChoice);
    })
}

// check if the player got the wrong answer
// IF they got it wrong make time = -15 (time -= 15;)
// show the new (penalized) time on the page 
// go to the next question with i++ 
// if we are at the last question end the quiz : else get the next question
function questionClick() {
    // check if user guessed wrong
    if (this.value !== questions[currentQuestionIndex].answer) {
        // penalize time
        time -= 15;

        if (time < 0) {
            time = 0;
        }
        // display new time on page 
        timerEl.textContent = time;
    }

    // next question
    currentQuestionIndex++;

    // time checker 
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

// stop the timer with clearInterval of the timerId variable
// show the end screen by removing the "class" which hides it from view 
// show the final score by setting the finalscoreEl variable (which we just created) to display in its textContent the time variable, which is defined above
// hide the questions by giving it the same "class" that we just took off of the end screen
function quizEnd() {
    // stop timer 
    clearInterval(timerId);

    // show end screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    // show final score
    var finalscoreEl = document.getElementById("final-score");
    finalscoreEl.textContent = time;

    // hide questions section 
    questionsEl.setAttribute("class", "hide");
}

// update the time on the clock with time--; and then set the textContent of the timerEl variable to display the time variable
// if the time is less than or equal to 0 it will return as true and run quizEnd, effectively ending the quiz if the timer ever reaches 0.
function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;

    // check if user ran out of time
    if (time <= 0) {
        quizEnd();
    }
}

// get the value of the input box using .trim which just removes whitespace from both ends of the string.
// get the saved scores from the localstorage using JSON which is just converting the string into an object
// set the variable of newScore to equal the time and initials
// save the newScore variable to localstorage by using .push and making use of JSON again but this way from object to string so it can go in
// go to the new page of scores.html to see the score leaderboard
function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();

    if (initials !== "") {
        // get saved scores from the localstorage
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        // format new score object for current user
        var newScore = {
            score: time, initials: initials
        };

        // save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        // redirect to next page
        window.location.href = "scores.html";
    }
}



// submit initials
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;