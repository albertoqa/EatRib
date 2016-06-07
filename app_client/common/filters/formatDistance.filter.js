(function () {

  angular
    .module('eatribApp')
    .filter('formatDistance', formatDistance);

  var _isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  function formatDistance () {
    return function(d) {
      if (d >= 1000) {
        return (parseFloat(d / 1000).toFixed(1) + ' km').replace('.0', '');
      } else {
        return parseFloat(d).toFixed(0) + ' m';
      }
    };
  }

})();
