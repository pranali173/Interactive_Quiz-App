
var questions = [{
    question: "The two kinds of main memory are?",
    choices: [" CDs and DVDs", "RAM and ROM", "Primary and secondary", "Direct and sequential"],
    correctAnswer: 1
}, {
    question: " RAM is also called as",
    choices: ["Virtual memory", "Volatile memory", " Non volatile memory", "Cache memory"],
    correctAnswer: 1
}, {
    question: "What is HTML?",
    choices: ["HTML describes the structure of a webpage", "HTML is the standard markup language mainly used to create web pages", 
    "HTML consists of a set of elements that helps the browser how to view the content","All of the mentioned"],
    correctAnswer: 3
}, {
    question: " HTML stands for __________",
    choices: ["HyperText Machine Language", "HyperText Markup Language", "HyperText Marking Language", "HighText Marking Language"],
    correctAnswer: 1
}, {
    question: "In a case, where the value of the operator is NULL , the typeof returned by the unary operator is___.",
    choices: ["object", "undefined", "boolean", "string"],
    correctAnswer: 0
}, {
    question: "Which of the following is used to read an HTML page and render it?",
    choices: ["Web server", "Web network", "Web browser", " Web matrix"],
    correctAnswer: 2
}, {
    question: " Which type of JavaScript language is ___?",
    choices: ["Assembly-language", "Object-Based", "High-level", "Object-Oriented"],
    correctAnswer: 3
}, {
    question: "The function and var are known as:",
    choices: ["Keywords", "Declaration statements", "Data types", "Prototypes"],
    correctAnswer: 1
}, {
    question: "Which of the following variables takes precedence over the others if the names are the same?",
    choices: ["Global variable", "The local element", "The two of the above", "None of the above"],
    correctAnswer: 1
}, {
    question: " Which of the following type of a variable is volatile?",
    choices: ["Dynamic variable", "Mutable variable", "Volatile variable", "Immutable variable"],
    correctAnswer: 1
}, {
    question: " Which of the following option is used as hexadecimal literal beginning?",
    choices: ["00", "0x", "0X", "Both 0x and 0X"],
    correctAnswer: 3
	}, {
    question: "Which one of the following is an ternary operator:",
    choices: ["?", ":", "-", "+"],
    correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}