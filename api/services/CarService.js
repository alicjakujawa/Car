module.exports = {
  getCars: function(next) {
    Car.find().exec(function(err, cars) {
      if(err) throw err;
      next(cars);
    });
  },
  addCar: function(carVal, next) {
    Car.create({name: carVal.name, year: carVal.year}).exec(function(err, car) {
      if(err) throw err;
      next(car);
    });
  },
  removeCar: function(carVal, next) {
    Car.destroy({name: carVal.name}).exec(function(err, car) {
      if(err) throw err;
      next(car);
    });
  }
};
