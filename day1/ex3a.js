const numbers = [1,3,5,10,11];

var result = numbers.map((x, i, arr) => x + (arr[i + 1] || 0));

console.log(result);
