(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcShowMobileDeviceTab', vcShowMobileDeviceTabDirective);

    function vcShowMobileDeviceTabDirective() {
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
                    title: 'sysadmin.mobiledevice.tabs.connectionconfiguration',
                    url: 'app/configurationmobiledevices/tabviews/mobiledevice.tab.html'
                }
            ];
        }
   
      
        function _postlinkfn(scope){
           
        }
    }
})();
