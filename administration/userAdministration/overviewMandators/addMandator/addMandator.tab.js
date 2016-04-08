(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcShowAddMandatorTab', vcshowaddmandatortabDirective);

    function vcshowaddmandatortabDirective() {
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
            scope.favState = false;
            scope.tabId = 'admin_mandator_show_one';
            scope.treeNode = 1;
            scope.tabs = [
                {
                    id: 1,
                    title: 'admin.usergroups.tabs.overview',
                    url: 'app/administrator/userAdministration/overviewMandators/addMandator/tabs/overview.html'
                }

            ];
        }

        function _postlinkfn() {

        }
    }
})();
