(function () {

  angular
    .module('eatribApp')
    .controller('homeCtrl', homeCtrl);


  function homeCtrl ($scope, eatribData, geolocation) {
    var vm = this;
    vm.pageHeader = {
      title: 'EatRib',
      strapline: 'Find places to eat near you in Ribadesella!'
    };
    vm.sidebar = {
      content: "Looking for a place to drink and eat in Ribadesella? EatRib helps you find places to have fun and eat premium quality food. Perhaps with sider, beer or coffe? Let EatRib help you find the place you\'re looking for."
    };

    vm.message = "Checking your location";
    vm.loading = true;

    vm.getData = function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

      vm.message = "Searching for nearby places";

      eatribData.locationByCoords(lat, lng)
        .success(function(data) {
          vm.message = data.length > 0 ? "" : "No locations found nearby";
          vm.data = { locations : data};
        })
        .error(function(e) {
          vm.message = "Sorry, something's gone wrong";
          console.log(e);
        })
        .finally(function() {
          vm.loading = false;
      });
    };

    vm.showError = function(error) {
      $scope.$apply(function() {
        vm.message = error.message;
        vm.loading = false;
      });
    };

    vm.noGeo = function() {
      $scope.$apply(function() {
        vm.message = "Geolocation not supported by this browser.";
        vm.loading = false;
      });
    };

    geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
  }

})();
