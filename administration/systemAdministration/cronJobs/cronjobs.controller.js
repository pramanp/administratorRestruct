(function () {
    'use strict';

    angular.module('vitricon').
            controller('CronJobsController', cronjobsController);

    function cronjobsController($scope, $state, DateTime) {

        var vm = this;
        vm.datetime = '';
        vm.favData = {
            designator: '',
            profile: "",
            navigationArea: "",
            node: "",
            nodeAssetName: "",
            tab: "",
            objectId: 0
        };


        $scope.refreshData = function(){
            $scope.$broadcast('refresh_all');

        };
        
        DateTime.customGET().then(function(resp){
                vm.datetime = resp.data;
            });
        
        vm.back = function () {
            $state.go('main.job');
        };
    }
})();
