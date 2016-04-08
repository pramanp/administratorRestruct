(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcShowMandatorTab', vcshowmandatorDirective);

    function vcshowmandatorDirective() {
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
            scope.tabId = 'admin_mandator_show_one';
            scope.treeNode = 1;
            scope.favState = false;
            scope.options = {
                isDefault: true,
                isFav: true
            };
            scope.tabs = [
                {
                    id: 1,
                    title: 'admin.usergroups.user.tabs.masterdata',
                    url: 'app/administrator/userAdministration/overviewMandators/mandator/tabs/masterData.html'
                }

            ]
        }

        function _postlinkfn() {

        }
    }
})();
