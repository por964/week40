const originalArray = [1, 3, 5, 10, 11];
const newArray = [];
/* 
for (let i = 0; i < originalArray.length; i++) {
    var plus = i+1;
    if (plus > originalArray.length) {
        plus = originalArray.length;
    }
  newArray[i] = originalArray[i] + originalArray[plus]; 
}

originalArray.map((value, index, array) => {
    return value[index] + value[index+1];
  });*/

  console.log(originalArray.map(function(s,i){
    return s+s;
   }));


//console.log(originalArray);
//console.log(newArray);