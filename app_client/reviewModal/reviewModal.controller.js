(function () {

  angular
    .module('eatribApp')
    .controller('reviewModalCtrl', reviewModalCtrl);

  reviewModalCtrl.$inject = ['$uibModalInstance', 'eatribData', 'locationData'];
  function reviewModalCtrl ($uibModalInstance, eatribData, locationData) {
    var vm = this;
    vm.locationData = locationData;

    vm.modal = {
      close: function(result) {
        $uibModalInstance.close(result);
      },
      cancel: function() {
        $uibModalInstance.dismiss('cancel');
      }
    };

    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.formData || !vm.formData.rating || !vm.formData.reviewText) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doAddReview(vm.locationData.locationid, vm.formData);
      }
    };

    vm.doAddReview = function (locationid, formData) {
      eatribData
        .addReviewById(locationid, {
          rating : formData.rating,
          reviewText : formData.reviewText
        })
        .success(function (data) {
          vm.modal.close(data);
        })
        .error(function (data) {
          vm.formError = "Your review has not been saved, please try again";
        });

      return false;
    };
  }

})();
