'use strict';

var carApp = angular.module('carApp', ['ngRoute', 'ui.bootstrap', 'CarCtrl', 'duScroll', 'carModel', 'mp.colorPicker']);
carApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider

    .when('/', {
      templateUrl: '/templates/home.html',
      controller: 'CarCtrl'
    })
    .when('/about', {
      templateUrl: '/templates/about.html'
    })
    .when('/offer', {
      templateUrl: '/templates/offer.html'
    })
    .when('/model', {
      templateUrl: '/templates/model.html'
    })
    .otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    });

    $locationProvider.html5Mode(true);
  }]);

