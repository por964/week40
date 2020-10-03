var names = ["Peter", "Hans", "Ole","Lars", "Jan", "Bo", "Frederik"];

var filtered = names.filter(name=> name.includes('a'));

console.log(filtered);

var mapped = names.map(wordBackwards);


 function wordBackwards(string) {
    return string.split("").reverse().join("");
 }
 
 console.log(mapped);