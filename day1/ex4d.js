const votes = [ "Biden","Trump","Biden","Biden","Trump","Trump","Biden","None"];

const votesCounts = votes.reduce(function(obj, vote) {
    if (!obj[vote]) {
      // if the vote doesn't yet exist as a property of the accumulator object,
      //   add it as a property and set its count to 1
      obj[vote] = 1;
    } else {
      // vote exists, so increment its count
      obj[vote]++;
    }
    return obj; // return the modified object to be used as accumulator in the next iteration
}, {}); // initialize the accumulator as an empty object

console.log(votesCounts);