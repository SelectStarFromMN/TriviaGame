
window.onload = function () {

    // const Object array of triviaQuestions
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
            correctImage: "./assets/images/beaver.gif",
            correctTriva: "The beaver is Canada's national symbol, proudly representing the country for over 300 years!"
        },
        {
            question: "Wild turkeys can run 25 MPH.  How fast can they fly?",
            answers: {
                a: "0 MPH",
                b: "10 MPH",
                c: "35 MPH",
                d: "55 MPH"
            },
            correctAnswer: "d",
            correctImage: "./assets/images/turkey.gif",
            correctTriva: "It's a myth that turkeys can't fly, when in fact they can fly up to 55 MPH!"
        }
        ,
        {
            question: "Which animal puts on a light show?",
            answers: {
                a: "Indigo Snake",
                b: "Cuttlefish",
                c: "Hummingbird Moth",
                d: "Conger Eel"
            },
            correctAnswer: "b",
            correctImage: "./assets/images/cuttlefish.gif",
            correctTriva: 'Cuttlefish can change color in rapid rippling patterns which mesmerizes their prey. This ability is even more impressive when you consider that cuttlefish are colorblind!'
        },
        {
            question: "Which animal kills the most humans annually?",
            answers: {
                a: "Mosquitos",
                b: "Crocodiles",
                c: "Humans",
                d: "Sharks"
            },
            correctAnswer: "a",
            correctImage: "./assets/images/mosquito.gif",
            correctTriva: "The most deadly animal in the world is the mosquito. According to the World Health Organization mosquito bites result in the deaths of more than 1 million people every year!"
        },
        {
            question: "Which animal is the Linux mascot?",
            answers: {
                a: "Lynx",
                b: "Penguin",
                c: "Lion"
            },
            correctAnswer: "b",
            correctImage: "./assets/images/tux.gif",
            correctTriva: 'The familiar penguin ("Tux") was originally designed as a submission for a Linux logo contest.'
        },
        {
            question: "How can you tell an Aspen tree?",
            answers: {
                a: "by the attached sales tag",
                b: "by asking its mother",
                c: "by the skis leaning against it",
                d: "because the way it is"
            },
            correctAnswer: "d",
            correctImage: "./assets/images/aspen.gif",
            correctTriva: 'This phrase was made popular by the hilarious YouTube meme: "Neature Walk" (check it out -- pretty neat!)'
        }
    ];

    // Variables
    const secondsPerQuestion = 30;          // Time limit per question
    const pauseSeconds = 10;                // Time to pause before advancing next question
    var gameOver = false;                   // Boolean whether game has ended
    var questionOver = false;               // Boolean whether round has ended
    var currQuestionNum = -1;               // Index of current question
    var secondsLeft = secondsPerQuestion;   // Tracks remaining seconds
    var countdownTimer;                     // Timer object for question countdown timer
    var currentQuestion;                    // This is the actual question OBJECT
    var screenPauseTimer;                   // Timer object for between-question pauses
    var numCorrect = 0;                     // Track number of correct answers
    var numIncorrect = 0;                   // Track number of incorrect answers
    var numUnanswered = 0;                  // Track number of unanswered questions

    // Create html timer div in DOM #quiz-dynamic element
    // Note: Use string-template as Josh demonstrated in class (cool!!)
    function addDomTimer(sec) {
        $("#quiz-dynamic").html(`<h2>Time Remaining: <span id="timer">${sec}</span> seconds</h2>`);
    }

    // Question countdown timer
    function countdown() {
        if (secondsLeft < 0) {
            // Stop countdown timer
            clearTimeout(countdownTimer);
            // Timeout, GoNext Question
            console.log('TooSlow, NEXT!');
            questionOver = true;
            numUnanswered++;
            $("#quiz-dynamic").append(`
                <p>Out of Time! (Correct answer is: ${currentQuestion.answers[currentQuestion.correctAnswer]})<p>`);
       
            // Display the correct answer image
            showAnswer();
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
            </div>`);

        for (letter in triviaQuestions[questionNumber].answers) {
            // console.log(letter + `: ${triviaQuestions[questionNumber].answers[letter]}`);
            $("#quiz-dynamic").append(`<a href="#" class="list-group-item list-group-item-action question-choice" data-letter="${letter}">${triviaQuestions[questionNumber].answers[letter]}</a>`)
        }
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

        // In either case, we display the correct answer image
        showAnswer();
    }

    var showAnswer = function () {
        // Display the correct answer-image (regardless of guess)
        $("#quiz-dynamic").append(
                `<br>
                <div class="winner-image">
                    <img src="${currentQuestion.correctImage}" width="200" height="200">
                </div>`
            );

        // Display the correct answer trivia
        $(".winner-image").append(
            `<p class="winner-trivia">
                Trivia: ${currentQuestion.correctTriva}
            </p>`);

        // Pause a few seconds before moving on
        screenPauseTimer = setInterval(moveToNextQuestion,pauseSeconds * 1000);
    }

    // Advance to next question and reset countdown timer
    // If no more questions remain, end game and show summary
    var moveToNextQuestion = function () {
        // console.log('MoveNext: ' + currQuestionNum);
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
        // After moving to next question, stop the screenPause timer
        if (screenPauseTimer)
            clearTimeout(screenPauseTimer);
    }

    // Display final summary
    var showFinalScore = function () {
        $("#quiz-dynamic").html("<h2>Quiz over, here's how you did!</h2>");
        $("#quiz-dynamic").append(`<h3>Correct Answers: ${numCorrect} </h3>`);
        $("#quiz-dynamic").append(`<h3>Incorrect Answers: ${numIncorrect}</h3>`);
        $("#quiz-dynamic").append(`<h3>Unanswered: ${numUnanswered}</h3>`);
        $("#quiz-dynamic").append('<br><div class="text-center restart"> <button id="replayTrivia" type="button" class="btn btn-outline-success center-block">Replay Nature Trivia!</button> </div>');
    }

    // Answer choice on-click
    $('body').on('click', 'a.question-choice', function() {
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


    // Replay on-click
    $('body').on('click', '#replayTrivia', function() {
        console.log('Restart!')
        gameOver = false;
        questionOver = false;
        currQuestionNum = -1;
        secondsLeft = secondsPerQuestion;
        numCorrect = 0;
        numIncorrect = 0;
        numUnanswered = 0;
        moveToNextQuestion();
    })

} // window.onload