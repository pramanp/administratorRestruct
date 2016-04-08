
(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcShowUsergroupUserTab', vcshowusergroupusertabDirective);

    function vcshowusergroupusertabDirective(Catalogue) {
        return {
            restrict: 'E',
            scope: false,
            link: {
                pre: _prelinkfn,
                post: _postlinkfn
            },
            templateUrl: 'app/components/fields/vctab/base.html',
            controller: _controller
        };

        function _controller($scope) {
            $scope.saveCatalogueRights = function(){
                $scope.$broadcast('save_catalogue_rights');
            };

            $scope.onSaveFunctionRights = function(){
                $scope.$broadcast('save-functionright-ug');
            };
        }

        function _prelinkfn(scope, el, attrs) {
            scope.tabId = 'admin_user_group_show_one';
            scope.treeNode = 3;
            scope.favState = false;
            scope.options = {
                isDefault: true,
                isFav: true
            };
            scope.catalogueOptions = [];
            Catalogue.getList().then(function(response){
                _.each(response, function(val , key){
                    scope.catalogueOptions.push(val);
                });
            });
            scope.catalogueSelected = {
                value: null
            };

            scope.tabs = [
                {
                    id: 1,
                    title: 'admin.usergroups.user.tabs.masterdata',
                    url: 'app/administration/userAdministration/overviewUserGroup/user/tabs/masterData.html'
                },
                {
                    id: 2,
                    title: 'admin.usergroups.user.tabs.functionarights',
                    url: 'app/administration/userAdministration/overviewUserGroup/user/tabs/functionRights.html'
                },
                {
                    id: 3,
                    title: 'admin.usergroups.user.tabs.hierarchydatarights',
                    url: 'app/administration/userAdministration/overviewUserGroup/user/tabs/hierarchicalDataRights.html'
                },
                {
                    id: 4,
                    title: 'admin.usergroups.user.tabs.cataloguedatarights',
                    url: 'app/administration/userAdministration/overviewUserGroup/user/tabs/catalogueDataRights.html'
                }
            ];

            scope.initTab = function(){
                //scope.$broadcast('catalogue-dr-change', scope.catalogueSelected.value);
            };


        }

        function _postlinkfn(scope) {
            scope.$watch('catalogueSelected.value', function(newValue){
                scope.$broadcast('catalogue-dr-change', newValue);
            });

        }
    }
})();
