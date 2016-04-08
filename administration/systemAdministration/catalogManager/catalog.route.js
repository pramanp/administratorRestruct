(function () {
    'use strict';

    angular
            .module('vitricon')
            .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('main.catalog', {
                    url: '/catalog',
                    templateUrl: 'app/catalogmanager/catalog-manager.html',
                    controller: 'CatalogController',
                    controllerAs: 'catalog'
                });
    }
})();
