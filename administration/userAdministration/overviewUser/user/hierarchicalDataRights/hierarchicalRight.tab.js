 (function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcSysuserHeirarchyRightTab', vcheirarchyrighttabDirective);

    function vcheirarchyrighttabDirective() {
        return {
            restrict: 'E',
            scope: false,
            link: {
                pre: _prelinkfn,
                post: _postlinkfn
            },
            templateUrl: 'app/components/fields/vctab/base.html',
            controller: _heirarchyController
        }

        function _heirarchyController($scope) {
            $scope.saveSuBuildingRights = function() {
                $scope.$broadcast('save_buildingsu_rights');
            }

            $scope.saveSuPropertyRights = function() {
                $scope.$broadcast('save_propertysu_rights');
            }
        }

        function _prelinkfn(scope, el, attrs) {
            scope.tabId = 'admin_user_heirarchy_datarights';
            scope.isDefaultEnabled = true;
            scope.tabs = [
                {
                    id: 1,
                    title: 'admin.usergroups.user.nestedTabs.hierarchy.prop',
                    url: 'app/administration/userAdministration/overviewUser/user/hierarchicalDataRights/tabs/properties.html'
                },
                {
                    id: 2,
                    title: 'admin.usergroups.user.nestedTabs.hierarchy.outdoorfacility',
                    url: 'app/administration/userAdministration/overviewUser/user/hierarchicalDataRights/tabs/buildingOutdoorFacility.html'
                }

            ]
        }

        function _postlinkfn() {

        }
    }
})();
