angular.module('eatribApp', []);

var locationListCtrl = function ($scope) {
  $scope.data = {
    locations: [{
      name:'la guia',
      address:'aaa',
      rating: 3,
      facilities: ['aa', 'bb'],
      distance: '0.123412341234',
      _id: '57514918f7f54b967e1fe1b4'
    }]
  };
};

angular
  .module('eatribApp')
  .controller('locationListCtrl', locationListCtrl)
