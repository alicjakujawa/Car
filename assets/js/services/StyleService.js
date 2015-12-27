carApp.service('StyleService', function($http, $q) {

  getStyle().then(function(response) {
    if(!response.length) {
      createStyle();
    }
  });

  return {
    'getStyle': function() {
      return getStyle();
    }
  };

  function createStyle() {
    $http.post('/style/create?glass=0x101046&body=0x770000&engine=0x222222&interior=0x050505&wells=0x050505')
    .success(function(resp){
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

  function saveBody(modelStyle) {
    console.log("test");
    $http.put('/style/' + modelStyle.id, modelStyle).success(function(resp){
      console.log("zapisano");
    }).error( function(err) {

    });
  };

});
