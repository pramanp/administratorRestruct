(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcShowAddUserTab', vcshowaddusergrouptabDirective);

    function vcshowaddusergrouptabDirective() {
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
            scope.tabId = 'admin_sys_user_show_one';
            scope.treeNode = 2;
            scope.favState = false;
            scope.tabs = [
                {
                    id: 1,
                    title: 'admin.usergroups.tabs.overview',
                    url: 'app/administration/userAdministration/overviewUser/addUser/tabs/overview.html'
                }

            ]
        }

        function _postlinkfn() {

        }
    }
})();
