const numbers = [2, 3, 67, 33];

function myFunc(total, num) {
    return total + num;
  }

  const reduced_numbers = numbers.reduce(myFunc);

  console.log(reduced_numbers);