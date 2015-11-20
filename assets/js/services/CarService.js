carApp.service('CarService', function($http, $q) {
  return {
    'getCars': function() {
      var defer = $q.defer();
      $http.get('/car').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'addCar': function(car) {
      var defer = $q.defer();
      $http.post('/car/addCar', car).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'removeCar': function(car) {
      var defer = $q.defer();
      $http.post('/car/removeCar', car).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
}});
