(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcShowSystemuserUserTab', vcshowsystemuserusertabDirective);

    function vcshowsystemuserusertabDirective(Catalogue) {
        return {
            restrict: 'E',
            scope: false,
            link: {
                pre: _prelinkfn,
                post: _postlinkfn
            },
            templateUrl: 'app/components/fields/vctab/base.html',
            controller: _controller
        }

        function _controller($scope) {
            $scope.saveSuCatalogueRights = function(){
                $scope.$broadcast('save_cataloguesu_rights');
            }

            $scope.onSaveFunctionRights = function(){
                $scope.$broadcast('save-functionright-ug');
            }

            $scope.saveFunctionRightsSysuser = function(){
                $scope.$broadcast('save-functionright-su');
            }

            $scope.userToGroupSave = function(){
                $scope.$broadcast('user-to-group-save');
            }

            $scope.$on('transfer-nodes-to-user', function(e,d){
                $scope.$broadcast('node-to-user', d);
            });
            $scope.$on('refresh_functionsu_grid', function(e,d){
                $scope.$broadcast('refresh_functionsu_rights');
            });

            $scope.$on('transfer-nodes-to-group', function(e,d){
                $scope.$broadcast('node-to-group', d);
            });

            $scope.groupToUserSave = function(){
                $scope.$broadcast('group-to-user-save');
            }
        }

        function _prelinkfn(scope, el, attrs) {
            scope.tabId = 'admin_sys_user_show_one';
            scope.treeNode = 2;
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
            scope.catalogueSelectedSu = {
                value: null
            };
            scope.tabs = [
                {
                    id: 1,
                    title: 'admin.usergroups.user.tabs.masterdata',
                    url: 'app/administration/userAdministration/overviewUser/user/tabs/masterData.html'
                },
                {
                    id: 2,
                    title: 'admin.usergroups.user.tabs.functionarights',
                    url: 'app/administration/userAdministration/overviewUser/user/tabs/functionRights.html'
                },
                {
                    id: 3,
                    title: 'admin.usergroups.user.tabs.hierarchydatarights',
                    url: 'app/administration/userAdministration/overviewUser/user/tabs/heirarchicalDataRights.html'
                },
                {
                    id: 4,
                    title: 'admin.usergroups.user.tabs.cataloguedatarights',
                    url: 'app/administration/userAdministration/overviewUser/user/tabs/catalogueDataRights.html'
                }

            ]
        }

        function _postlinkfn(scope) {
            scope.$watch('catalogueSelectedSu.value', function(newValue){
                scope.$broadcast('cataloguesu-dr-change', newValue);
            });
        }
    }
})();
