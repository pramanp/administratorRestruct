(function () {
    'use strict';

    angular
            .module('vitricon')
            .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
                .state('main.mobiledevices', {
                    url: '/administrationsystemconfigurationmobiledevice',
                    templateUrl: 'app/configurationmobiledevices/configurationmobiledevice.html',
                    controller: 'MobileDeviceController',
                    controllerAs: 'mobileDevice'
                })
                .state('main.addnewconnection', {
                url: '/addnewconnection/{addDevice}',
                templateUrl: 'app/configurationmobiledevices/addnewconnection.html',
                controller: 'MobileDeviceController',
                controllerAs: 'mobileDevice'
            });
    }
})();
