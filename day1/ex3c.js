var persons = [{name:"Hassan",phone:"1234567"}, {name: "Peter",phone: "675843"}, {name: "Jan", phone: "98547"},{name: "Boline", phone: "79345"}];

var html = persons.map(function (element) {
    return '<li>' + element.name + ', ' +
      element.phone + '</li>';  
  }).join('');
  
  
  function formatParams(params) {
    return params.map(function (param) {
      return param.param + ':' + param.childParam;
    }).join(', ');
  }
  console.log(html);