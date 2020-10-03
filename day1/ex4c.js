const members = [
 {name : "Peter", age: 18},
 {name : "Jan", age: 35},
 {name : "Janne", age: 25},
 {name : "Martin", age: 22}]

 var avgScore = members.reduce(function (sum, member) {
    return sum + member.age;
  }, 0) / members.length;

  console.log(avgScore);