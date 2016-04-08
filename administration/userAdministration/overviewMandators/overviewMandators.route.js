(function () {
    'use strict';

    angular
            .module('vitricon')
            .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('main.mandators', {
                    url: '/mandators',
                    templateUrl: 'app/administrator/userAdministration/overviewMandators/overviewMandarors.html',
                    controller: 'MandatorsController',
                    controllerAs: 'mndatrCntrller'
                })
                .state('main.mandator', {
                    url: '/mandator/{userdata}?tab&tree',
                    templateUrl: 'app/administrator/userAdministration/overviewMandators/mandator/tabs/mandator.html',
                    controller: 'MandatorController',
                    controllerAs: 'mandatorCntrller'
                })
                .state('main.addmandator', {
                    url: '/addmandator',
                    templateUrl: 'app/administrator/userAdministration/overviewMandators/addMandator/addMandator.html',
                    controller: 'MandatorController',
                    controllerAs: 'mandatorCntrller'
                })
                .state('main.linkmandator', {
                    url: '/linkmandator',
                    templateUrl: 'app/administrator/userAdministration/overviewMandators/linkMandator/linkMandator.html',
                    controller: 'LinkMandatorController',
                    controllerAs: 'linkmandatorCntrller'
                })
    }
})();
