(function () {
    'use strict';

    angular
            .module('vitricon')
            .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('main.folders', {
                    url: '/folders',
                    templateUrl: 'app/folders/folders.html',
                    controller: 'FoldersController',
                    controllerAs: 'folders'
                });
    }
})();
