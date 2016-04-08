(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcAddNewConnectionTab', vcAddNewConnectionTabDirective);

    function vcAddNewConnectionTabDirective() {
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
                    url: 'app/configurationmobiledevices/tabviews/addconnection.tab.html'
                }
            ];
        }
   
      
        function _postlinkfn(scope){
           
        }
    }
})();
