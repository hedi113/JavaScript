const arr = [
  [1, 2, 1],
  [11, 9, 2],
  [1, 2, 3],
];
function count(arr) {
  const onedarr = [];
  arr.forEach((element) => {
    element.forEach((part) => {
      onedarr.push(part);
    });
  });

  if (
    onedarr[0] + onedarr[2] + onedarr[6] + onedarr[8] == onedarr[4] &&
    onedarr[0] + onedarr[2] == onedarr[1] &&
    onedarr[0] + onedarr[6] == onedarr[3] &&
    onedarr[6] + onedarr[8] == onedarr[7] &&
    onedarr[2] + onedarr[8] == onedarr[5]
  ) {
    const newArr = [[onedarr[0], onedarr[2], onedarr[6], onedarr[8]]];
    return newArr;
  } else {
    return [-1];
  }
}

console.log(count(arr));
