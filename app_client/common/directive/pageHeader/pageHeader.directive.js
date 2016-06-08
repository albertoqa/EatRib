(function () {

  angular
    .module('eatribApp')
    .directive('pageHeader', pageHeader);

  function pageHeader () {
    return {
      restrict: 'EA',
      scope: {
        content : '=content'
      },
      templateUrl: '/common/directive/pageHeader/pageHeader.template.html'
    };
  }

})();
