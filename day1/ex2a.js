const names = ["Peter", "Hans", "Ole","Lars", "Jan", "Bo", "Frederik"];

function myCallback(param) {
    let str = param;
    if (str.includes('a')) {
        return true;
            } else {
                return false;
            }
}

function myFilter(names, callback) {
    const list = [];
    for(i in names) {
        if(callback(names[i])) {
            list.push(names[i])
        }
    }
    return list;
}

console.log(myFilter(names,myCallback));

