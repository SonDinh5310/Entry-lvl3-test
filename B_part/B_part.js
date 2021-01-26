let quizContainer = document.getElementById("quiz-container");

async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();
    //   console.log(data);
    return data;
}

async function createQuizzes() {
    let currentData = await fetchData(
        "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
    );

    console.log(currentData);

    for (let i = 0; i < currentData.results.length; i++) {
        let currentQuestion = currentData.results[i].question;
        let currentQuizz = [
            currentData.results[i].correct_answer,
            ...currentData.results[i].incorrect_answers,
        ];
        console.log(currentQuizz);

        quizContainer.innerHTML += /*html */ `
          <h3 class="question question${i}">${currentQuestion}</h3>
          <div class="answers-container">
          <div class="answers">
            <input type="radio" id="question${i}-answer1" name="question${i}-answers"/>
            <label for="question${i}-answer1">${currentQuizz[0]}</label>
          </div>
          <div class="answers">
            <input type="radio" id="question${i}-answer2" name="question${i}-answers"/>
            <label for="question${i}-answer1">${currentQuizz[1]}</label>
          </div>
          <div class="answers">
            <input type="radio" id="question${i}-answer3" name="question${i}-answers"/>
            <label for="question${i}-answer1">${currentQuizz[2]}</label>
          </div>
          <div class="answers">
            <input type="radio" id="question${i}-answer4" name="question${i}-answers"/>
            <label for="question${i}-answer1">${currentQuizz[3]}</label>
          </div>
            
          </div>
          
        `;
    }
}

createQuizzes();
