angular.module('CarCtrl', [])

  .controller('CarCtrl', ['$scope', '$rootScope', 'CarService', 'CommentService', 'StyleService', function($scope, $rootScope, CarService, CommentService, StyleService) {
    $scope.cars = [];

    carsFetching = function () {
      CarService.getCars().then(function(response) {
        $scope.cars = response;
      });
    };

    carsFetching(); 

    $scope.addComment = function(car, formData) {
      formData.owner = car.id;
      CommentService.addComment(formData).then(function(response) {
        car.comments.push(formData);
        carsFetching(); 
      });
    };

    $scope.removeComment = function(comment, car) {
      CommentService.removeComment(comment).then(function(response) {
        car.comments.splice(car.comments.indexOf(comment), 1);
      });
    };

  }]);
