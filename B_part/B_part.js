let quizContainer = document.getElementById("quiz-container");
let submitBtn = document.getElementById("submit");
let resultsContainer = document.getElementById("results");

let database = [];

//*Get data from api
async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

//*Ranomly sort the answers array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function createDatabase() {
    let apiData = await fetchData(
        "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
    );

    for (let i = 0; i < apiData.results.length; i++) {
        let currentQuestion = apiData.results[i].question;
        let currentAnswers = [
            apiData.results[i].correct_answer,
            ...apiData.results[i].incorrect_answers,
        ];
        database.push({
            question: currentQuestion,
            answers: shuffleArray(currentAnswers),
            correctAnswer: apiData.results[i].correct_answer,
        });
    }
}

async function createQuizzes() {
    await createDatabase();
    console.log(database);
    for (let i = 0; i < database.length; i++) {
        let answers = "";
        for (let j = 0; j < database[i].answers.length; j++) {
            answers += /*html */ `
              <div class="answers">
                <input type="radio" id="question${i}-answer${
                j + 1
            }" name="question${i}-answers" value="${database[i].answers[j]}"/>
                <label for="question${i}-answer${j + 1}">${
                database[i].answers[j]
            }</label>
              </div>`;
        }
        quizContainer.innerHTML += /*html */ `
          <h3 class="question question${i}">${database[i].question}</h3>
          <div class="answers-container">${answers}</div>
        `;
    }
}

function checkAnswers() {
    const submitAnswers = quizContainer.querySelectorAll(".answers-container");

    let correctAnswersCount = 0;

    database.forEach((currentQuestion, questionNumber) => {
        console.log(currentQuestion);
        const submitAnswer = submitAnswers[questionNumber];
        const selector = `input[name=question${questionNumber}-answers]:checked`;
        const userAnswer = submitAnswer.querySelector(selector) || {};
        console.log(questionNumber + " " + userAnswer.value);

        if (userAnswer.value === currentQuestion.correctAnswer) {
            correctAnswersCount++;
            submitAnswer.style.color = "lightgreen";
        } else {
            submitAnswer.style.color = "red";
        }

        resultsContainer.innerHTML = `${correctAnswersCount} out of ${database.length}`;
    });
}

console.log(database);
createQuizzes();

submitBtn.addEventListener("click", () => {
    checkAnswers();
});
