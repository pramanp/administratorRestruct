(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcCreateSpecficSectionTab', vcCreateSpecficSectionTabDirective);

    function vcCreateSpecficSectionTabDirective() {
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
            
            scope.tabs = [
                {
                    id: 1,
                    title: 'specificprop.tabs.specificprop',
                    url: 'app/specificproperties/tabviews/createspecificsection.tab.html'
                }
            ]
        }
   
      
        function _postlinkfn(scope){
           
        }
    }
})();
