/*
function displayDirection() {
    let dir = event.target.id;
    console.log(dir);
    let output = '';

    if (dir == 'path2820' || dir == 'path2822' || dir == 'rect2816') {
        output = 'You are going north';
    } else if (dir == 'path2873' || dir == 'path2871' || dir == 'rect2869') {
        output = 'You are going west';
    } else if (dir == 'path2863' || dir == 'path2865' || dir == 'rect2861') {
        output = 'You are going east';
    } else if (dir == 'path2843' || dir == 'path2845' || dir == 'rect2841' ){
        output = 'You are going south';
    }
    alert (output);
    return output;
};

var svg2 = document.getElementById("svg2");
        svg2.addEventListener("click", displayDirection); 
 
 */
        
        
;document.getElementById("north").addEventListener("click", function() {
   document.getElementById("direction").innerHTML = "North";
});

document.getElementById("south").addEventListener("click", function() {
    document.getElementById("direction").innerHTML = "South";
});

document.getElementById("west").addEventListener("click", function() {
    document.getElementById("direction").innerHTML = "West";
});

document.getElementById("east").addEventListener("click", function() {
    document.getElementById("direction").innerHTML = "East";
});





let gs = document.getElementsByTagName("g");
console.log(gs);

let paths = document.getElementsByTagName("path");
console.log(paths);

let rects = document.getElementsByTagName("rect");
console.log(rects);


