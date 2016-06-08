(function () {

  angular
    .module('eatribApp')
    .service('authentication', authentication);

    authentication.$inject = ['$window'];
    function authentication ($window) {

      var saveToken = function(token) {
        $window.localStorage['eatrib-token'] = token;
      };

      var getToken = function() {
        return $window.localStorage['eatrib-token'];
      }

      register = function(user) {
        return $http.post('/api/register', user).success(function(data){
          saveToken(data.token);
        });
      };

      login = function(user) {
        return $http.post('/api/login', user).success(function(data) {
          saveToken(data.token);
        });
      };

      logout = function() {
        $window.localStorage.removeItem('eatrib-token');
      };

      var isLoggedIn = function() {
        var token = getToken();

        if(token){
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          return payload.exp > Date.now() / 1000;
        } else {
          return false;
        }
      };

      var currentUser = function() {
        if(isLoggedIn()){
          var token = getToken();
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          return {
            email : payload.email,
            name : payload.name
          };
        }
      };

      return {
        saveToken : saveToken,
        getToken : getToken,
        register : register,
        login : login,
        logout : logout,
        isLoggedIn : isLoggedIn,
        currentUser : currentUser
      };
    }

})();
