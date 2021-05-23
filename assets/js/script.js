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

//
// start quiz
startBtn.onclick = startQuiz;