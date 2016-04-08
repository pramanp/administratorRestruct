(function () {
    'use strict';
         /**
         * defining the controller : ConfigurationController
         */
    angular.module('vitricon').
            controller('ConfigurationController', configurationController);

    function configurationController($scope, Session) {

        var vm = this;
        
         /**
         * init function to get the list of mandators and load the grid initially
         * self calling function
         * @private
         */
        vm.init = function () {
            Session.getCompanyData().then(function (result) {
                vm.options = result;
                vm.selected_id = vm.options[0].dbId;
                Session.setMandatorId('mandatorId',vm.selected_id)
            }, function (response) {
            });
          }
          vm.init();
          
          /**
         * Get mandator id to load the grid
         * @param value
         * @private
         */
         vm.getMandatorId = function(value){
          Session.setMandatorId('mandatorId',value);
           $scope.$broadcast('refresh_all');
         }
         
    }
})();
