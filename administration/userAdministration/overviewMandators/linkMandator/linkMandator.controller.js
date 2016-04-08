(function () {
    'use strict';

    angular.module('vitricon').
            controller('LinkMandatorController', linkmandatorController);

    function linkmandatorController($scope, $state, $stateParams, Session, Resources,User, Mandator, $timeout) {

        var vm = this;
        vm.init = function(){
            $scope.oId = [];
        };
        vm.init();
        vm.selectedMandator = '';
        $scope.selectedUserGroup = '';
        $scope.showLink = false;
        vm.mandant = [];
        $scope.usergroup = [];
        $scope.oId = [];
        
        Mandator.customGET().then(function (result) {
            vm.mandant = result.data;
        });
        
        $scope.saveLink = function (){
            Mandator.one('mapUserWithMandant').customPUT({mId:parseInt(vm.selectedMandator),userGroupId:parseInt($scope.selectedUserGroup),oId:$scope.oId}).then(function (result) {
                $timeout(function () {
                    $scope.showLink = false;
                    $scope.$broadcast('refresh_all');
                    $scope.oId = [];
                }, 1000);
                
            });
        }
        
        $scope.getmId = function (data) {
            $scope.selectedUserGroup = '';
            if (data && data.id) {
                vm.selectedMandator = data.id;
                Mandator.one(data.id).customGET('user_groups').then(function (resp) {
                    $scope.usergroup = resp.data; 
                },function(){
                    $scope.usergroup = [];
                });
            }
        }
        
        $scope.getUserGroupId = function (data) {
            if (data && data.id) {
                $scope.selectedUserGroup = data.id;
            }
        }
        
    }
})();
