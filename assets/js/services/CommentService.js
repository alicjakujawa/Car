carApp.service('CommentService', function($http, $q) {
  return {
    'getComments': function() {
      var defer = $q.defer();
      $http.get('/comment/getComments').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'addComment': function(comment) {
      var defer = $q.defer();
      $http.post('/comment/create?owner='+ comment.owner + '&comment=' + comment.comment + '&name=' + comment.name)
      .success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'removeComment': function(comment) {
      var defer = $q.defer();
      $http.delete('/comment/' + comment.id).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
}});
