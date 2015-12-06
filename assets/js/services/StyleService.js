carApp.service('StyleService', function($http, $q) {

  var style; 
  getStyle().then(function(response) {
    style = response;
    if(!style.length) {
      createStyle();
    }
    console.log(style);
  });

  return {

    'getStyle': function() {
      console.log(style);
      return style;
    },

  };

  function createStyle() {
    $http.post('/style/create?glass=0x101046&body=0x770000&engine=0x222222&interior=0x050505&wells=0x050505')
    .success(function(resp){
      console.log("style create");
      style = resp.data;
    }).error( function(err) {
      console.log(err);
    });
  };

  function getStyle() {
    var defer = $q.defer();
    $http.get('/style/getStyles').success(function(resp){
      defer.resolve(resp);
    }).error( function(err) {
      defer.reject(err);
    });
    return defer.promise;
  };

});
