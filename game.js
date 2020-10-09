const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const startingMinutes = 1;
var currentTime = startingMinutes * 60;

let time = startingMinutes * 60;
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [{
        question: "inside wich HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "what is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World')",
        choice2: "alertBox('Hello World')",
        choice3: "msg('Hello World')",
        choice4: "alert('Hello World')",
        answer: 4
    },
    {
        question: "Which built-in method removes the last element from an array and returns that element?",
        choice1: "last()",
        choice2: "get()",
        choice3: "pop()",
        choice4: "None of the above",
        answer: 3
    },
    {
        question: "Which of the following function of Boolean object returns the primitive value of the Boolean object?",
        choice1: "toSource()",
        choice2: "valueOf()",
        choice3: "toString()",
        choice4: "None of the above.",
        answer: 2
    },
    {
        question: "Which of the following function of String object is used to match a regular expression against a string?",
        choice1: "concat()",
        choice2: "match()",
        choice3: "search()",
        choice4: "replace()",
        answer: 2
    },
    {
        question: "Which of the following function of String object creates a string to be displayed in a big font as if it were in a <big> tag?",
        choice1: "anchor()",
        choice2: "big()",
        choice3: "blink()",
        choice4: "italics()",
        answer: 2
    },
    {
        question: "Which of the following function of String object causes a string to be displayed in fixed=pitch font as if it were in a <tt> tag?",
        choice1: "fixed()",
        choice2: "big()",
        choice3: "blink()",
        choice4: "bold()",
        answer: 1
    },
    {
        question: "Which of the follwing function of Array object adds one or more elements to the end of an array and returns the new length of the array?",
        choice1: "pop()",
        choice2: "push()",
        choice3: "join()",
        choice4: "map()",
        answer: 2
    },
    {
        question: "Which of the following function of Array object reverses the order of the elements of an array?",
        choice1: "reverse()",
        choice2: "push()",
        choice3: "reduce()",
        choice4: "reduceRight()",
        answer: 1
    },

];
// Timer function
const countdownEl = document.getElementById('countdown');

setInterval(updateCountdown, 1000);

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.innerHTML = `${minutes}:${seconds}`;
    time--;
    if (minutes <= 0 && seconds <= 0) {
        return window.location.assign("/end.html");

    };
    // if (!correct) {
    //     time = time - 10;
    //     console.log("asdf")
    // }
    // console.log("endOfCountdown")
}
// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {

    if (availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;


    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })
    availableQuestion.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;

        // startingMinutes = startingMinutes - 10;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =

            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        };
        // else(classToApply !== "correct") {
        //     currentTime = currentTime - 10;
        // };
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000)
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};


startGame();