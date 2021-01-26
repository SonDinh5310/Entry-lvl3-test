async function fetchData(url) {
  let response = await fetch(url);
  let data = await response.json();
  //   console.log(data);
  return data;
}

let quizz;

async function getData() {
  let data = await fetchData(
    "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
  );

  quizz = data;
}

console.log(quizz);
