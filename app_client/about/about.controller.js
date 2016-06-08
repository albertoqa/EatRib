(function () {

  angular
    .module('eatribApp')
    .controller('aboutCtrl', aboutCtrl);

  function aboutCtrl() {
    var vm = this;
    vm.pageHeader = {
      title: 'About EatRib',
    };

    vm.main = {
      content: 'EatRib was created to help people find places to drink and eat in Ribadesella.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.'
    };
  }
  
})();
