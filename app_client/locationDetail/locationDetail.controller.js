(function () {

  angular
    .module('eatribApp')
    .controller('locationDetailCtrl', locationDetailCtrl);

    locationDetailCtrl.$inject = ['$routeParams', 'eatribData'];
    function locationDetailCtrl ($routeParams, eatribData) {
      var vm = this;
      vm.locationid = $routeParams.locationid;

      eatribData.locationById(vm.locationid)
        .success(function(data) {
          vm.data = { location: data };
          vm.pageHeader = {
            title : vm.data.location.name
          };
        })
        .error(function (e) {
          console.log(e);
        });
    }

}) ();
