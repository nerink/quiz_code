let totalQuizQuestions = 5;
let currentQuizQuestion = 0;
let wrongAnswerPenalty = 10;
var timerInterval;
var gameRunning = true;
var highScores = {
    scores: [],
    add: function (name, score) {
        highScores.scores.push({
            place: 0,
            name: name, 
            score: score
        });
        LoadHighScores();
    }
}
//Timer Configuration 
var timer = {
    totalSeconds: 70,
    currentSeconds: 0,
    endingSeconds: 0,
//Timer Start
    start: function () {
        timer.currentSeconds = timer.totalSeconds;
        gameRunning = true;
        timerInterval = setInterval(function () {            
            if (gameRunning) {
                timer.currentSeconds = timer.currentSeconds - 1;
                if (timer.currentSeconds <= 0) timer.end();
                else document.getElementById("timer").innerHTML = timer.currentSeconds;
            }
        }, 1000);
    },
//Timer End 
    end: function () {
        gameRunning = false;
        clearInterval(timerInterval);
        if (timer.currentSeconds < 0) timer.currentSeconds = 0;
        timer.endingSeconds = timer.currentSeconds;
        
        timer.currentSeconds = 0;        
        document.getElementById("final-score").innerHTML = timer.endingSeconds;
        document.getElementById("timer").innerHTML = timer.endingSeconds;
        finalScore = timer.endingSeconds;
        if (timer.currentSeconds = 0) SetResultMessage("Better luck next time");
        else SetResultMessage("Congrats you made it!");
        ShowPage("quiz-complete");
    },

    clearup: function () {
        timerInterval = null;
        timer.currentSeconds = 0;
        timer.endingSeconds = 0;

    }
    
}
//Quiz Page
function ShowPage(pageId) {
    var pages = document.getElementsByClassName("quiz-page");
    for (var i = 0; i < pages.length; i++) pages[i].classList.add("hide");
    document.getElementById(pageId).classList.remove("hide");
    SetResultMessage("");
}

function SetResultMessage(message) {
    if (message == "") {
        document.getElementById("ResultMessage").classList.add("hide");
    } else {
        document.getElementById("ResultMessage").classList.remove("hide");
    }
    document.getElementById("ResultMessage").innerHTML = message;
}

//Adding event listeners 
var quizButtons = document.getElementsByClassName("quiz-button");
for (var i = 0; i < quizButtons.length; i++) {
    quizButtons[i].addEventListener('click', function (event) {
        if (this.getAttribute('correct') == "no") {
            timer.currentSeconds = timer.currentSeconds - wrongAnswerPenalty;
            SetResultMessage("Wrong!....sorry not sorry.");
        }
        else {
            SetResultMessage("");
            currentQuizQuestion = currentQuizQuestion + 1;
            if (currentQuizQuestion > totalQuizQuestions) {
                timer.end();

            } else {
                ShowPage("question" + currentQuizQuestion);
            }
        }
            

    });
}
function resetGame() {
    timer.end();
    ShowPage("quiz-intro");
}

function startGame() {
    finalScore = 0;
    currentQuizQuestion = 0;
    document.getElementById("initials").value = "";
    timer.clearup();
    timer.start();
    ShowPage("question1");
}

function LoadHighScores() {
    var highScoreHtml = "";
    for (var i = 0; i < highScores.scores.length; i++) {
        highScoreHtml = highScoreHtml + "<p class='high-score'>" + highScores.scores[i].name + " - " + highScores.scores[i].score + "</p>"; 
    }

    document.getElementById("high-scores").innerHTML = highScoreHtml;
}

function AddHighScore() {
    highScores.add(document.getElementById("initials").value, document.getElementById("final-score").innerHTML);
    ShowPage('quiz-high-score');
}
document.getElementById("button-add-score").addEventListener("click", AddHighScore);
document.getElementById("button-go-beginning").addEventListener("click", function () {
    ShowPage('quiz-intro');
    timer.clearup();
});
document.getElementById("button-start-quiz").addEventListener("click", function () {
    startGame();
});

document.getElementById("button-restart-quiz").addEventListener("click", function () {
    startGame();
});
 

