function filterDiff(arr1, arr2) {
  let result = [];

  arr1.filter((input) => {
    if (arr2.indexOf(input) === -1) {
      result.push(input);
    }
  });
  arr2.filter((input) => {
    if (arr1.indexOf(input) === -1) {
      result.push(input);
    }
  });
  return result;
}
let a1 = [1, 2, "a"],
  a2 = [1, 3, "b"];

console.log(filterDiff(a1, a2));
