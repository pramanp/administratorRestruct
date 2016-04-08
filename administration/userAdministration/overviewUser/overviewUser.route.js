(function () {
    'use strict';

    angular
            .module('vitricon')
            .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('main.sysusers', {
                    url: '/sysusers',
                    templateUrl: 'app/administration/userAdministration/overviewUser/user.html',
                    controller: 'SystemUserController',
                    controllerAs: 'sysUser'
                })
                .state('main.systemuseruser', {
                    url: '/systemuser/{userdata}?tab&tree',
                    templateUrl: 'app/administration/userAdministration/overviewUser/user/user.html',
                    controller: 'SystemUserUserController',
                    controllerAs: 'systemuseruserCnrtllr'
                })
                .state('main.adduser', {
                    url: '/adduser',
                    templateUrl: 'app/administration/userAdministration/overviewUser/addUser/addUser.html',
                    controller: 'AddUserController',
                    controllerAs: 'adduserCnrtllr'
                });
    }
})();
