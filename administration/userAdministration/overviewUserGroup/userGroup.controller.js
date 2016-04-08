(function () {
    'use strict';

    angular.module('vitricon').
            controller('UserGroupController', usergroupController);

    function usergroupController($scope, $state, Session, Resources, Favorite) {

        var vm = this;
        vm.favData = {
            designator: '',
            profile: "",
            navigationArea: "",
            node: "",
            nodeAssetName: "",
            tab: "",
            objectId: 0
        };


        $scope.addUserGroup = function(){
            $scope.$broadcast('add_row_top');

        };
        
        

    }
})();
