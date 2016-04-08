(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcLicenseTab', vcLicenseTabDirective);

    function vcLicenseTabDirective() {
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
            scope.tabId = 'license_group_show_one';
            scope.isDefaultEnabled = true;
            scope.options = {
                isDefault: true,
                isFav: true
            };
            scope.tabs = [
                {
                    id: 1,
                    title: 'license.tabs.information',
                    url: 'app/license/tabviews/licenseinformation.tab.html'
                },
                {
                    id: 2,
                    title: 'license.tabs.upgrade',
                    url: 'app/license/tabviews/upgradelicense.tab.html'
                }
            ];
        }
   
      
        function _postlinkfn(scope){
           
        }
    }
})();
