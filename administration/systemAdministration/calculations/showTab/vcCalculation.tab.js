(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcCalculationTab', vcCalculationTabDirective);

    function vcCalculationTabDirective() {
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
            scope.tabId = 'calculation_group_show_one';
            scope.isDefaultEnabled = true;
            scope.favState = false;
            scope.options = {
                isDefault: true,
                isFav: true
            };
            scope.tabs = [
                {
                    id: 1,
                    title: 'calculation.tabs.virtual',
                    url: 'app/administrator/calculations/showTabs/tabviews/vcVirtualDatapoints.tab.html'
                },
                {
                    id: 2,
                    title: 'calculation.tabs.interpolated',
                    url: 'app/administrator/calculations/showTabs/tabviews/vcInterpolatedDatapoints.tab.html'
                }
            ]
        }
   
      
        function _postlinkfn(scope){
           
        }
    }
})();
