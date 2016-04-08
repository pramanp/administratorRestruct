(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcShowLinkMandatorTab', vcshowlinkmandatortabDirective);

    function vcshowlinkmandatortabDirective() {
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
            scope.tabId = 'admin_sys_user_show_one';

            scope.treeNode = 2;
            scope.options = {
                isDefault: true,
                isFav: true
            };


            scope.tabs = [
                {
                    id: 1,
                    title: 'admin.usergroups.user.tabs.masterdata',
                    url: 'app/administrator/userAdministration/overviewMandators/linkMandator/tabs/masterData.html'
                }

            ];
        }

        function _postlinkfn() {

        }
    }
})();
