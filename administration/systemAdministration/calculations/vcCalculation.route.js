(function () {
    'use strict';

    angular
            .module('vitricon')
            .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('main.calculation', {
                    url: '/calculation',
                    templateUrl: 'app/administrator/calculations/vcCalculation.html',
                    controller: 'CalculationController',
                    controllerAs: 'calculation'
                });
    }
})();
