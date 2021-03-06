(function () {

  angular
    .module('eatribApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location', 'authentication'];
  function navigationCtrl($location, authentication) {
    var vm = this;
    vm.currentPath = $location.path();
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentUser = authentication.currentUser();

    vm.logout = function() {
      authentication.logout();
      vm.isLoggedIn = authentication.isLoggedIn();
      $location.path('/');
    }
  }

}) ();
