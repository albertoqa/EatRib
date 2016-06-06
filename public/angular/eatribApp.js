angular.module('eatribApp', []);

var _isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function() {
  return function(d) {
    if (d >= 1000) {
      return (parseFloat(d / 1000).toFixed(1) + ' km').replace('.0', '');
    } else {
      return parseFloat(d).toFixed(0) + ' m';
    }
  };
};

var locationListCtrl = function ($scope, eatribData) {
  $scope.message = "Searching for nearby places";
  $scope.loading = true;
  eatribData
    .success(function(data) {
      $scope.message = data.length > 0 ? "" : "No locations found";
      $scope.data = { locations : data};
    })
    .error(function(e) {
      $scope.message = "Sorry, something's gone wrong";
      console.log(e);
    })
    .finally(function() {
      $scope.loading = false;
  });
};

var ratingStars = function() {
  return {
    scope: {
      thisRating : '=rating'
    },
    templateUrl : '/angular/rating-stars.html'
  };
};

var eatribData = function($http) {
  return $http.get('/api/locations?lng=-5.060585&lat=43.461806&maxdist=2');
};

angular
  .module('eatribApp')
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars)
  .service('eatribData', eatribData);
