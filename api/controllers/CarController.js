/**
 * CarController
 *
 * @description :: Server-side logic for managing Cars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getCars: function(req, res) {
    CarService.getCars(function(cars) {
       res.json(cars);
    });
  },
  addCar: function(req, res) {
    console.log(req.body);
    var carVal = (req.body.value) ? req.body.value : undefined
    CarService.addCar(carVal, function(success) {
       res.json(success);
    });
  },
  removeCar: function(req, res) {
  	var carVal = (req.body.value) ? req.body.value : undefined
  	CarService.removeCar(carVal, function(success) {
  		res.json(success);
  	})
  }
};

