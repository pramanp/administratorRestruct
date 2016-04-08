(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcShowCronJobsTab', vcshowcronjobstabDirective);

    function vcshowcronjobstabDirective() {
        return {
            restrict: 'E',
            scope: false,
            link: {
                pre: _prelinkfn,
                post: _postlinkfn
            },
            templateUrl: 'app/components/fields/vctab/base.html'
        }

        function _prelinkfn(scope, el, attrs) {
            scope.tabId = 'cron_jobs_show_one';
            scope.isDefaultEnabled = true;
            scope.favState = false;
            scope.tabs = [
                {
                    id: 1,
                    title: 'admin.usergroups.tabs.overview',
                    url: 'app/cronJobs/showTab/tabviews/tab1.html'
                }
            ]
        }

        function _postlinkfn() {

        }
    }
})();
