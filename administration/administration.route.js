(function () {
    'use strict';

    angular
            .module('vitricon')
            .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('main.admin', {
                    url: '/admin',
                    templateUrl: 'app/administration/administration.html',
                    controller: 'AdminController',
                    controllerAs: 'adminCnrtllr'
                });
    }
})();
