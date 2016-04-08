(function () {
    'use strict';

    angular
            .module('vitricon')
            .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('main.license', {
                    url: '/administrationlicenseinformation',
                    templateUrl: 'app/license/license.html',
                    controller: 'LicenseController',
                    controllerAs: 'license'
                });
    }
})();
