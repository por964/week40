const names = ["Peter", "Hans", "Ole","Lars", "Jan", "Bo", "Frederik"];

function myCallback(param) {
    let str2 = param;
    return str2.split("").reverse().join("");
}

function myMap(names, callback) {
    const list = [];
    for(i in names) {        
            list.push(myCallback(names[i]))
            }
    return list;
}
console.log(myMap(names,myCallback));