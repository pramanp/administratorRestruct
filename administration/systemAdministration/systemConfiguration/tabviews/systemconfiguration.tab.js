(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcShowSystemConfigurationTab', vcShowSystemConfigurationTabDirective);

    function vcShowSystemConfigurationTabDirective() {
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
            scope.tabId = 'sys_config_show_one';
            scope.isDefaultEnabled = true;
            scope.favState = false;
            scope.options = {
                isDefault: true,
                isFav: true
            };
            scope.tabs = [
                {
                    id: 1,
                    title: 'sysadmin.systemconfiguration.tabs.configurationparamters',
                    url: 'app/systemconfiguration/tabviews/configuration.tab.html'
                },
                {
                    id: 2,
                    title: 'sysadmin.systemconfiguration.tabs.reportparamter',
                    url: 'app/systemconfiguration/tabviews/reportparameter.tab.html'
                }
            ]
        }
   
      
        function _postlinkfn(scope){
           
        }
    }
})();
