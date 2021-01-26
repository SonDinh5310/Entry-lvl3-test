function rankingTeams(data) {
  let result = data;

  for (let z = 0; z < result.length; z++) {
    result[z].position = z + 1;
  }

  for (let i = 0; i < result.length; i++) {
    for (let j = i + 1; j < result.length; j++) {
      if (result[i].points < result[j].points) {
        result[i].position++;
        result[j].position--;
      } else if (result[i].points === result[j].points) {
        if (result[i].GD > result[j].GD) {
          result[i].position++;
          result[j].position--;
        } else if (result[i].GD === result[j].GD) {
          if (alphabetCompare(result[i].name, result[j].name) < 0) {
            result[i].position++;
            result[j].position--;
          }
        }
      }
    }
  }

  return result;
}

function alphabetCompare(input1, input2) {
  if (input1 === input2) {
    return 0;
  }
  if (input1 > input2) {
    return 1;
  }
  return -1;
}

const data = [
  {
    name: "Arsenal",
    points: 99,
    GD: 45,
  },
  {
    name: "Chelsea",
    points: 75,
    GD: 39,
  },
  {
    name: "Manchester United",
    points: 60,
    GD: 29,
  },
  {
    name: "Liverpool",
    points: 88,
    GD: 39,
  },
];

console.log(rankingTeams(data));
