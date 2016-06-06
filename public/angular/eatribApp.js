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

var locationListCtrl = function ($scope, eatribData, geolocation) {
  $scope.message = "Checking your location";
  $scope.loading = true;

  $scope.getData = function(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    $scope.message = "Searching for nearby places";

    eatribData.locationByCoords(lat, lng)
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

  $scope.showError = function(error) {
    $scope.$apply(function() {
      $scope.message = error.message;
      $scope.loading = false;
    });
  };

  $scope.noGeo = function() {
    $scope.$apply(function() {
      $scope.message = "Geolocation not supported by this browser.";
      $scope.loading = false;
    });
  };

  geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
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
  var locationByCoords = function(lat, lng) {
    return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxdist=2');
  };
  return {
    locationByCoords : locationByCoords
  };
};

var geolocation = function() {
  var getPosition = function (cbSuccess, cbError, cbNoGeo) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    } else {
      cbNoGeo();
    }
  };
  return {
    getPosition : getPosition
  };
}

angular
  .module('eatribApp')
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars)
  .service('eatribData', eatribData)
  .service('geolocation', geolocation);
