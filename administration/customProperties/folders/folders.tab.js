(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcFoldersTab', vcFoldersTabDirective);

    function vcFoldersTabDirective() {
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
                    title: 'customproperties.folders.name.folders',
                    url: 'app/folders/tabviews/folders.tab.html'
                }
            ]
        }
   
      
        function _postlinkfn(scope){
           
        }
    }
})();
