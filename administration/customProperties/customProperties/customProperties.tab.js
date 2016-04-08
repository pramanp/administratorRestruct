(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcCustomPropertiesTab', vcCustomPropertiesTabDirective);

    function vcCustomPropertiesTabDirective() {
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
            scope.tabId = 'cust_prop_group_show_one';
            scope.isDefaultEnabled = true;
            scope.options = {
                isDefault: true,
                isFav: true
            };
            scope.tabs = [
                {
                    id: 1,
                    title: 'customproperties.customproperties.tabs.categories',
                    url: 'app/customProperties/tabviews/customproperties.tab.html'
                },
                {
                    id: 2,
                    title: 'customproperties.customproperties.tabs.properties',
                    url: 'app/customProperties/tabviews/properties.tab.html'
                }
            ]
        }
   
      
        function _postlinkfn(scope){
           
        }
    }
})();
