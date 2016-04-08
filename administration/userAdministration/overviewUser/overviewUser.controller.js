(function () {
    'use strict';

    angular.module('vitricon').
            controller('SystemUserController', systemUserController);

    function systemUserController($scope, $state, Session, Resources) {

        var vm = this;
        
        $scope.addSysUser = function(){

            //$scope.$broadcast('add_row_top');
            $state.go('main.adduser');

        }
        
        $scope.bottomToolTip = {
            "displayusers" : 
            [
                {
                   "heading":"sysadmin.help.adduser.General",
                   "content":"sysadmin.help.adduser.General_Text"
                }
               
            ]
        };

    }
})();
