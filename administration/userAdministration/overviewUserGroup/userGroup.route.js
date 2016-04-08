(function () {
    'use strict';

    angular
        .module('vitricon')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('main.adminusergroups', {
                url: '/adminusergroups',
                templateUrl: 'app/administration/userAdministration/overviewUserGroup/userGroup.html',
                controller: 'UserGroupController',
                controllerAs: 'usergroupCnrtllr'
            })
            .state('main.usergroupsuser', {
                url: '/usergroupsuser/{userdata}?tab&tree',
                templateUrl: 'app/administration/userAdministration/overviewUserGroup/user/user.html',
                controller: 'UserGroupUserController',
                controllerAs: 'usergroupuserCnrtllr'
            });
    }
})();
