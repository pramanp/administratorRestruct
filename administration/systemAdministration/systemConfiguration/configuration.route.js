(function () {
    'use strict';

    angular
            .module('vitricon')
            .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('main.configuration', {
                    url: '/administrationsystemconfigurationparameter',
                    templateUrl: 'app/systemconfiguration/systemconfiguration.html',
                    controller: 'ConfigurationController',
                    controllerAs: 'configuration'
                });
    }
})();
