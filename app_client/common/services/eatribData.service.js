(function () {

  angular
    .module('eatribApp')
    .service('eatribData', eatribData);

  eatribData.$inject = ['$http', 'authentication'];
  function eatribData ($http, authentication) {
    var locationByCoords = function(lat, lng) {
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxdist=2000000');
    };

    var locationById = function(locationid) {
      return $http.get('/api/locations/' + locationid);
    };

    var addReviewById = function (locationid, data) {
      return $http.post('/api/locations/' + locationid + '/reviews', data, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    return {
      locationByCoords : locationByCoords,
      locationById : locationById,
      addReviewById : addReviewById
    };
  }

})();
