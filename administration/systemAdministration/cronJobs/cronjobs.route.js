(function () {
    'use strict';

    angular
        .module('vitricon')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main.cronjobs', {
                url: '/cronjobs',
                templateUrl: 'app/cronJobs/cronjobs.html',
                controller: 'CronJobsController',
                controllerAs: 'cronjobsCnrtllr'
            })
            .state('main.job', {
                url: '/job',
                templateUrl: 'app/cronJobs/job/jobs.html',
                controller: 'CronJobsController',
                controllerAs: 'cronjobsCnrtllr'
            })
            
    }
})();
