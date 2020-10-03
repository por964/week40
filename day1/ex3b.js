var all= ["Hassan", "Peter", "Carla", "Boline"];

let list = all.map(function(name){
    return "<a href=\"\">"+name+"</a>";
});
let listAsString = "<nav>" + list.join("") + "</nav>";

console.log(listAsString);