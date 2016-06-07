angular
  .module('eatribApp')
  .service('eatribData', eatribData);

function eatribData ($http) {
  var locationByCoords = function(lat, lng) {
    return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxdist=20');
  };
  return {
    locationByCoords : locationByCoords
  };
}
