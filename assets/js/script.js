var homeEl = document.querySelector("#home");
var questionsEl = document.querySelector("#questions");
var doneEl = document.querySelector("#done");
var startEl = document.querySelector("#start");
var timerEl= document.querySelector("#timerDisplay");
var scoreEl= document.querySelector("#scoreDisplay");

var answerButtonEl = document.querySelectorAll(".answer-btn");
var answerContainerEl = document.querySelector("#answer-container");

var formEl = document.querySelector("#form");

var returnButtonEl = document.querySelector("#return");
var clearScoresButtonEl = document.querySelector("#clear-scores");


//set timer
var timer = 75;
let questionNumber = 0;
let score = 0;

const questions = [
    {
        question:"Commonly used data types do NOT include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers" ],
        answer: "3. alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed with ______",
        choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        answer: "2. curly brackets"
    },
    {
        question: "Arrays in JavaScript can be used to store ______",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "3. quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log"
    }
]



var questionEl = document.querySelector("#question");
var answerOneEl = document.querySelector("#answer-one");
var answerTwoEl = document.querySelector("#answer-two");
var answerThreeEl = document.querySelector("#answer-three");
var answerFourEl = document.querySelector("#answer-four");

//connecting arrays and display
var showQuestions = function(questionNumber) {
    var currentQuestion = questions[questionNumber].question;
    var answerOne = questions[questionNumber].choices[0];
    var answerTwo = questions[questionNumber].choices[1];
    var answerThree = questions[questionNumber].choices[2];
    var answerFour = questions[questionNumber].choices[3];

    questionEl.innerText = currentQuestion; 
    answerOneEl.innerText = answerOne;
    answerTwoEl.innerText = answerTwo;
    answerThreeEl.innerText = answerThree;
    answerFourEl.innerText = answerFour;

    answerButtonEl.forEach((answerButton => {
        answerButton.addEventListener("click", nextQuestion);
    }));

}


//starting the quiz and showing questions
var questionsHandler = function(event){
    $(".home-page").hide();
    $(".questions-page").show();
    $(".done-page").hide();
    $(".high-score-page").hide();


    var startTimer = setInterval(function() {
        timerEl.innerText = timer;

        timer--;

        //if timer reaches 0, game over
        if (timer === 0) {
            console.log("Game over");
            clearInterval(startTimer);
            gameOver();
        } 
        //if questions are done before timer is over
        else if (questionNumber >= questions.length) {
            alert("You have successfully completed the quiz. Click to see your score");
            clearInterval(startTimer);
            gameOver();
        }
    }, 1000);

    showQuestions(questionNumber);

};

//moving onto the next question
var nextQuestion = function(answer) {
    if (questions[questionNumber].answer === questions[questionNumber].choices[answer]) {
        score = score + 10;
        answerContainerEl.innerText = "Correct answer! Great job!"
    } else {
        answerContainerEl.innerText="Incorrect. The answer is <" +questions[questionNumber].answer+ "> . Your timer has been subtracted by 10!"
        timer = timer - 10;
    }
    questionNumber ++;

    console.log(score);

    scoreEl.innerText = score;
    showQuestions(questionNumber);

}

//gameover
var gameOver = function() {
    $(".home-page").hide();
    $(".questions-page").hide();
    $(".done-page").show();
    $(".high-score-page").hide();

    formEl.addEventListener("submit", formHandler);
};

var formHandler = function(event) {
    event.preventDefault();
    var formInput = document.querySelector("input[name='name']").value;
  

  // check if inputs are empty (validate)
  if (!formInput) {
    alert("You need to fill out your initials to access score board!");
    return false;
  } 
  highScoreBoard();
};

var highScoreBoard = function() {
    $(".home-page").hide();
    $(".questions-page").hide();
    $(".done-page").hide();
    $(".high-score-page").show();

    returnButtonEl.addEventListener("click", returnHandler);
    clearScoresButtonEl.addEventListener("click", clearScoresHandler);

    if (returnHandler) {
        questionsHandler;
    }
};


startEl.addEventListener("click", questionsHandler);