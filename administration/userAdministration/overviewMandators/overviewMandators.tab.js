(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcShowMandatorsTab', vcshowmandatortabDirective);

    function vcshowmandatortabDirective() {
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
            scope.tabId = 'admin_mandator_show_one';
            scope.favState = false;
            //scope.isDefaultEnabled = true;
            scope.options = {
                isDefault: true,
                isFav: true
            };
            scope.tabs = [
                {
                    id: 1,
                    title: 'admin.mandators.tabs.overview',
                    url: 'app/administration/userAdministration/overviewMandators/tabs/overviewMandators.html'
                },
//                {
//                    id: 2,
//                    title: 'admin.mandators.tabs.assgn',
//                    url: 'app/administration/userAdministration/overviewMandators/tabs/overviewAssign.html'
//                },
                {
                    id: 2,
                    title: 'admin.mandators.tabs.distributn',
                    url: 'app/administration/userAdministration/overviewMandators/tabs/overviewDistribution.html'
                }
            ];
        }

        function _postlinkfn(scope) {
            scope.addUser = function () {
                scope.$broadcast('add_row_top');
            };
        }
    }
})();
