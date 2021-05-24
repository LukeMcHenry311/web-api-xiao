// set the variable to get the object from JSON.parse after it converts it from a string
// sort the highscores by the highest to lowest by b.score - a.score and it works because we called it earlier (a, b)
// create listed item tag for each high score and display it on the page with .appendChild (just appending it to the document)
// very bottom is just calling the function so it runs when the page loads
function printHighscores() {
    // either get scores from localstorage or set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // sort highscores by score property in descending order
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    highscores.forEach(function(score) {
        // create li tag for each high score
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;

        // display on page
        var olEl = document.getElementById("highscores");
        olEl.appendChild(liTag);
    });
}

// run function when page loads
printHighscores();