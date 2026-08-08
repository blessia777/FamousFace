const quizData = {

    music: [
        {
            question: "Who is known as the King of Pop?",
            answers: [
                "Michael Jackson",
                "Elvis Presley",
                "Bruno Mars",
                "Justin Bieber"
            ],
            correct: "Michael Jackson"
        },

        {
            question: "Which singer is known for the song 'Hello'?",
            answers: [
                "Adele",
                "Rihanna",
                "Beyoncé",
                "Lady Gaga"
            ],
            correct: "Adele"
        },

        {
            question: "Who was the lead singer of Queen?",
            answers: [
                "Freddie Mercury",
                "Elton John",
                "John Lennon",
                "Mick Jagger"
            ],
            correct: "Freddie Mercury"
        },

        {
            question: "Which instrument has black and white keys?",
            answers: [
                "Guitar",
                "Piano",
                "Drums",
                "Violin"
            ],
            correct: "Piano"
        },

        {
            question: "Which band recorded the song 'Yellow Submarine'?",
            answers: [
                "The Beatles",
                "Queen",
                "ABBA",
                "Coldplay"
            ],
            correct: "The Beatles"
        }
    ],


    movies: [

        {
            question: "Who played Jack in Titanic?",
            answers: [
                "Leonardo DiCaprio",
                "Brad Pitt",
                "Tom Cruise",
                "Matt Damon"
            ],
            correct: "Leonardo DiCaprio"
        },

        {
            question: "Which film features the character Harry Potter?",
            answers: [
                "Harry Potter",
                "The Matrix",
                "Avatar",
                "Titanic"
            ],
            correct: "Harry Potter"
        },

        {
            question: "Who played Iron Man in the Marvel films?",
            answers: [
                "Robert Downey Jr.",
                "Chris Evans",
                "Chris Hemsworth",
                "Mark Ruffalo"
            ],
            correct: "Robert Downey Jr."
        },

        {
            question: "Which movie won the Academy Award for Best Picture in 1998?",
            answers: [
                "Titanic",
                "The Matrix",
                "Saving Private Ryan",
                "Good Will Hunting"
            ],
            correct: "Titanic"
        },

        {
            question: "Who directed the movie Jurassic Park?",
            answers: [
                "Steven Spielberg",
                "James Cameron",
                "Christopher Nolan",
                "George Lucas"
            ],
            correct: "Steven Spielberg"
        }

    ],


    sports: [

        {
            question: "How many players are on a soccer team on the field?",
            answers: [
                "9",
                "10",
                "11",
                "12"
            ],
            correct: "11"
        },

        {
            question: "Which sport is associated with Wimbledon?",
            answers: [
                "Tennis",
                "Football",
                "Basketball",
                "Golf"
            ],
            correct: "Tennis"
        },

        {
            question: "Which country is famous for the Olympic sprinter Usain Bolt?",
            answers: [
                "Jamaica",
                "USA",
                "Kenya",
                "Nigeria"
            ],
            correct: "Jamaica"
        },

        {
            question: "How many rings are on the Olympic symbol?",
            answers: [
                "4",
                "5",
                "6",
                "7"
            ],
            correct: "5"
        },

        {
            question: "Which sport uses a racket and shuttlecock?",
            answers: [
                "Tennis",
                "Badminton",
                "Table tennis",
                "Squash"
            ],
            correct: "Badminton"
        }

    ],


    art: [

        {
            question: "Who painted the Mona Lisa?",
            answers: [
                "Leonardo da Vinci",
                "Pablo Picasso",
                "Vincent van Gogh",
                "Claude Monet"
            ],
            correct: "Leonardo da Vinci"
        },

        {
            question: "Who painted The Starry Night?",
            answers: [
                "Vincent van Gogh",
                "Leonardo da Vinci",
                "Michelangelo",
                "Pablo Picasso"
            ],
            correct: "Vincent van Gogh"
        },

        {
            question: "Which artist is associated with Cubism?",
            answers: [
                "Pablo Picasso",
                "Claude Monet",
                "Rembrandt",
                "Raphael"
            ],
            correct: "Pablo Picasso"
        },

        {
            question: "Who painted the ceiling of the Sistine Chapel?",
            answers: [
                "Michelangelo",
                "Leonardo da Vinci",
                "Raphael",
                "Donatello"
            ],
            correct: "Michelangelo"
        },

        {
            question: "Which movement is associated with Claude Monet?",
            answers: [
                "Impressionism",
                "Cubism",
                "Surrealism",
                "Pop Art"
            ],
            correct: "Impressionism"
        }

    ],


    history: [

        {
            question: "Who was the first person to walk on the Moon?",
            answers: [
                "Neil Armstrong",
                "Buzz Aldrin",
                "Yuri Gagarin",
                "John Glenn"
            ],
            correct: "Neil Armstrong"
        },

        {
            question: "Which ancient civilization built the pyramids at Giza?",
            answers: [
                "Ancient Egyptians",
                "Romans",
                "Greeks",
                "Vikings"
            ],
            correct: "Ancient Egyptians"
        },

        {
            question: "Who was known as the Maid of Orléans?",
            answers: [
                "Joan of Arc",
                "Cleopatra",
                "Marie Curie",
                "Queen Victoria"
            ],
            correct: "Joan of Arc"
        },

        {
            question: "Which city was buried by Mount Vesuvius?",
            answers: [
                "Pompeii",
                "Athens",
                "Rome",
                "Sparta"
            ],
            correct: "Pompeii"
        },

        {
            question: "Who was the first president of the United States?",
            answers: [
                "George Washington",
                "Abraham Lincoln",
                "Thomas Jefferson",
                "John Adams"
            ],
            correct: "George Washington"
        }

    ]

};


// Get selected category from the URL

const urlParams =
    new URLSearchParams(window.location.search);

const category =
    urlParams.get("category") || "music";


// Get questions for selected category

const questions =
    quizData[category] || quizData.music;


// Quiz variables

let currentQuestion = 0;

let score = 0;


// Page elements

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const resultElement =
    document.getElementById("result");


// Display category name

const categoryNames = {
    music: "🎵 Music",
    movies: "🎬 Movies",
    sports: "⚽ Sports",
    art: "🎨 Art",
    history: "🌍 History"
};


document.querySelector("header p").textContent =
    categoryNames[category] + " Quiz";


// Show question

function showQuestion() {

    const current =
        questions[currentQuestion];

    questionElement.textContent =
        current.question;

    answersElement.innerHTML = "";

    resultElement.innerHTML = "";


    current.answers.forEach(answer => {

        const button =
            document.createElement("button");

        button.textContent = answer;


        button.onclick = function () {

            checkAnswer(answer, button);

        };


        answersElement.appendChild(button);

    });

}


// Check answer

function checkAnswer(answer, clickedButton) {

    const correctAnswer =
        questions[currentQuestion].correct;


    const allButtons =
        answersElement.querySelectorAll("button");


    allButtons.forEach(button => {

        button.disabled = true;

    });


    if (answer === correctAnswer) {

        score++;

        clickedButton.textContent =
            "✅ " + clickedButton.textContent;

        resultElement.innerHTML =
            "<p>Correct! 🎉</p>";

    }

    else {

        clickedButton.textContent =
            "❌ " + clickedButton.textContent;

        resultElement.innerHTML =
            `<p>Not quite! The correct answer is <strong>${correctAnswer}</strong>.</p>`;

    }


    setTimeout(() => {

        currentQuestion++;


        if (currentQuestion < questions.length) {

            showQuestion();

        }

        else {

            showFinalResult();

        }

    }, 1200);

}


// Final result

function showFinalResult() {

    const percentage =
        Math.round(
            (score / questions.length) * 100
        );


    questionElement.textContent =
        "🏆 Quiz Complete!";


    answersElement.innerHTML = "";


    resultElement.innerHTML = `

        <h2>Your Score</h2>

        <p>
            ${score} out of ${questions.length}
        </p>

        <p>
            ${percentage}%
        </p>

        <button onclick="restartQuiz()">
            🔄 Play Again
        </button>

        <br><br>

        <a href="index.html">
            🏠 Back to Home
        </a>

    `;

}


// Restart quiz

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    showQuestion();

}


// Start quiz

showQuestion();