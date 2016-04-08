(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcShowCatalogManagerTab', vcshowcatalogmanagertabDirective);

    function vcshowcatalogmanagertabDirective() {
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
            scope.tabId = 'sys_catalog_man_show_one';
            scope.isDefaultEnabled = true;
            scope.favState = false;
            scope.options = {
                isDefault: true,
                isFav: true
            };
            scope.tabs = [
                {
                    id: 1,
                    title: 'sysadmin.catalogmanager.tabs.systemtables',
                    url: 'app/catalogmanager/showTab/tabviews/systemtable.html'
                },
                {
                    id: 2,
                    title: 'sysadmin.catalogmanager.tabs.customtables',
                    url: 'app/catalogmanager/showTab/tabviews/customtable.html'
                },
                {
                    id: 3,
                    title: 'sysadmin.catalogmanager.tabs.crosstable',
                    url: 'app/catalogmanager/showTab/tabviews/crosstable.html'
                }
            ]
        }

        function _postlinkfn() {

        }
    }
})();
