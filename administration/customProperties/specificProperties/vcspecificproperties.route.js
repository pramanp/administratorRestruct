(function () {
    'use strict';

    angular
            .module('vitricon')
            .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('main.specificproperties', {
                    url: '/specificproperties',
                    templateUrl: 'app/specificproperties/specificproperties.html',
                    controller: 'SpecificPropertyController',
                    controllerAs: 'specificProperties'
                })
                
            .state('main.specificproperty', {
                url: '/specificproperty/{fId}',
                templateUrl: 'app/specificproperties/createspecificproperties.html',
                controller: 'SpecificPropertyController',
                controllerAs: 'specificProperties'
            })
            
           .state('main.specificsection', {
                url: '/specificsection',
                templateUrl: 'app/specificproperties/createspecificsection.html',
                controller: 'SpecificSectionController',
                controllerAs: 'specificSection'
            })
            
            .state('main.manageproperty', {
                url: '/manageproperty',
                templateUrl: 'app/specificproperties/manageproperties.html',
                controller: 'SpecificSectionController',
                controllerAs: 'specificSection'
            });
    }
})();
