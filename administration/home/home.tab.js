(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcShowAdminTab', vcShowAdminTabDirective);

    function vcShowAdminTabDirective() {
        return {
            restrict: 'E',
            scope: false,
            link: {
                pre: _prelinkfn,
                post: _postlinkfn
            },
            templateUrl: 'app/components/fields/vctab/base.html'
        };

        function _prelinkfn(scope, el, attrs) {
            scope.tabs = [
                {
                    id: 1,
                    title: 'admin.tabs.welcome',
                    url: 'app/administrator/home/tabs/home.html'
                },
                // {
                //     id: 2,
                //     title: 'admin.tabs.calendar',
                //     url: 'app/admin/showTab/tabviews/calendar.tab.html'
                // },
                {
                   id: 3,
                   title: 'admin.tabs.tododashboard',
                   url: 'app/administrator/home/tabs/tododashboard.html'
               }
            ];
        }

        function _postlinkfn() {

        }
    }
})();
