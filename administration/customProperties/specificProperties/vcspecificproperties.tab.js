(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcSpecificPropertiesTab', vcSpecificPropertiesTabDirective);

    function vcSpecificPropertiesTabDirective() {
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
            scope.tabId = 'spec_prop_group_show_one';
            scope.isDefaultEnabled = true;
            scope.options = {
                isFav: true
            };
            scope.tabs = [
                {
                    id: 1,
                    title: 'specificprop.tabs.specificprop',
                    url: 'app/specificproperties/tabviews/specificproperties.tab.html'
                }
            ];
        }
   
      
        function _postlinkfn(scope){
           
        }
    }
})();
