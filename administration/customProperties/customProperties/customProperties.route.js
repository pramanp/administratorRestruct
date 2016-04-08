(function () {
    'use strict';

    angular
            .module('vitricon')
            .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('main.customproperties', {
                    url: '/administrationspecialmaskcategories/{userdata}?tab&tree',
                    templateUrl: 'app/customProperties/customproperties.html',
                    controller: 'CustomPropertiesController',
                    controllerAs: 'customProperties'
                });
    }
})();
