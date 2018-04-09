
window.onload = function () {

    // Object array of triviaQuestions
    const triviaQuestions = [
        {
            question: "What is the national animal of Canada?",
            answers: {
                a: "Beaver",
                b: "Goose",
                c: "Bigfoot",
                d: "Moose"
            },
            correctAnswer: "a",
            correctImage: "./assets/images/beaver.gif"
        },
        {
            question: "Wild turkeys can run 12 MPH.  How fast can they fly?",
            answers: {
                a: "10 MPH",
                b: "25 MPH",
                c: "55 MPH",
                d: "35 MPH"
            },
            correctAnswer: "c",
            correctImage: "./assets/images/turkey.gif"
        }
    ];

    const secondsPerQuestion = 15;
    var gameOver = false;
    var questionOver = false;
    var currQuestionNum = -1;
    var secondsLeft = secondsPerQuestion;
    var countdownTimer;
    var domQuizPanel = document.getElementById("quiz-dynamic");
    var currentQuestion;
    var screenPauseTimer;
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;

    // Create html timer div in DOM #quiz-dynamic element
    // Note: Use string-template as Josh demonstrated in class (cool!!)
    function addDomTimer(sec) {
        $("#quiz-dynamic").html(`<h2>Time Remaining: <span id="timer">${sec}</span> seconds</h2>`);
    }

    function countdown() {
        if (secondsLeft < 0) {
            clearTimeout(countdownTimer);
            // Timeout, GoNext Question
            console.log('TooSlow, NEXT!')
            questionOver = true;
            numUnanswered++;
            $("#quiz-dynamic").append(`<br>
                <p>Out of Time! (Correct answer is: ${currentQuestion.answers[currentQuestion.correctAnswer]})<p>`);
       
            // Display the correct answer image
            $("#quiz-dynamic").append(`<br>
                <div class="winner-image">
                    <img src="${currentQuestion.correctImage}" width="200" height="200">
                </div>`);
            // Pause a few seconds before moving on
            screenPauseTimer = setInterval(moveToNextQuestion,3000);
        } else {
            $("#timer").text(secondsLeft);
            secondsLeft--;
        }
    }

 
    // Append DOM with Question (and answer set as bootstrap button list group)
    // Note: Use data-* attribute to store letter for each answer (i.e. 'a', 'b', 'c' or 'd')
    var showQuestion = function (questionNumber) {
        // $("#quiz-dynamic").append("<br><p>QUESTION HERE</p><br>");
        $("#quiz-dynamic").append(`<div class="list-group">
            <a href="#" class="list-group-item list-group-item-action active">
                ${triviaQuestions[questionNumber].question}
            </a>
            <a href="#" class="list-group-item list-group-item-action question-choice" data-letter="a">${triviaQuestions[questionNumber].answers['a']}</a>
            <a href="#" class="list-group-item list-group-item-action question-choice" data-letter="b">${triviaQuestions[questionNumber].answers['b']}</a>
            <a href="#" class="list-group-item list-group-item-action question-choice" data-letter="c">${triviaQuestions[questionNumber].answers['c']}</a>
            <a href="#" class="list-group-item list-group-item-action question-choice" data-letter="d">${triviaQuestions[questionNumber].answers['d']}</a>
            </div>`);
    }

    // Check answer (question-choice button has been clicked)
    var checkAnswer = function (chosenLetter, chosenAnswer) {
        //Halt timer
        clearTimeout(countdownTimer);

        // Compare chosenLetter to correctAnswer, append DOM accordingly
        if (chosenLetter == currentQuestion.correctAnswer) {
            console.log('CORRECT!');
            numCorrect++;
            $("#quiz-dynamic").append(`<br>
                <p>CORRECT! (${currentQuestion.answers[currentQuestion.correctAnswer]})<p>`);
        }
        else {
            console.log('WRONG!');
            numIncorrect++;
            $("#quiz-dynamic").append(`<br>
                <p>NOPE, not ${chosenAnswer}! (Correct answer is: ${currentQuestion.answers[currentQuestion.correctAnswer]})<p>`);
        }

        // In either case, we are displaying the correct answer image
        $("#quiz-dynamic").append(`<br>
                <div class="winner-image">
                    <img src="${currentQuestion.correctImage}" width="200" height="200">
                </div>`);

        // Pause a few seconds before moving on
        screenPauseTimer = setInterval(moveToNextQuestion,3000);
    }

    var moveToNextQuestion = function () {
        console.log('MoveNext: ' + currQuestionNum);
        secondsLeft = secondsPerQuestion;
        if (currQuestionNum < triviaQuestions.length - 1) {
            currQuestionNum++;
            questionOver = false;
            addDomTimer(secondsLeft);
            countdownTimer = setInterval(countdown, 1000);
            currentQuestion = triviaQuestions[currQuestionNum];
            showQuestion(currQuestionNum);
        }
        else {
            console.log('Game Over!');
            gameOver = true;
            showFinalScore();
        }
        if (screenPauseTimer)
            clearTimeout(screenPauseTimer);
    }

    var showFinalScore = function () {
        $("#quiz-dynamic").html("<h2>Quiz over, here's how you did!</h2>");
        $("#quiz-dynamic").append(`<h3>Correct Answers: ${numCorrect}</h3>`);
        $("#quiz-dynamic").append(`<h3>Incorrect Answers: ${numIncorrect}</h3>`);
        $("#quiz-dynamic").append(`<h3>Unanswered: ${numUnanswered}</h3>`);
        $("#quiz-dynamic").append('<br><div class="text-center"> <button id="playTrivia" type="button" class="btn btn-outline-success center-block">Replay Nature Trivia!</button> </div>');
    }

    // Answer choice on-click
    $('body').on('click', 'a.question-choice', function() {
    // $(".question-choice")[0].dataset.letter
    if (!questionOver) {
        console.log(this.dataset.letter);
        checkAnswer(this.dataset.letter, this.text);
        questionOver = true;
    }
    })


    // On playTrivia click
    $("#playTrivia").click(function () {
        moveToNextQuestion();
    });



} // window.onload