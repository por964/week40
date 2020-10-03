var car = {
  brand: "Nissan",
  getBrand: function(){
    console.log(this.brand);
  }
};

var car2 = {
    brand: "Ford",
    getBrand2: function(){
      return this.brand;
    }
  };

var getCarBrand = car.getBrand;

getCarBrand();   // output: undefined

console.log(car2.getBrand2());
