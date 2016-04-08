/**
 * Created by Kapil on 11/12/15.
 */

(function () {
    angular.
    module('vitricon').
    directive('vcAdminUsergroupFunctionRightsTree', ddoDirective);

    function ddoDirective($q, $stateParams, User, SystemUser, Mandator, $state) {
        var ddo = {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/components/tree/tree.html',
            link: {
                pre: _prelinkfn,
                post: _postlinkfn
            },
            controller: 'vcTreeController'
        };

        return ddo;

        function _prelinkfn(scope, el, attrs) {
            scope.options = {
                slimscroll: {
                    height: '200px'
                }
            };

            var tree = null;

            scope.init = function (api) {
                //tree = api;
                tree = $(el.find('.tree-menu')).fancytree('getTree')
            };

            scope.ancestors = function () {
                var deferment = $q.defer();
                User.getFunctionRightChildren($stateParams.userdata, 0).then(function (response) {
                    deferment.resolve(scope.covertToTreeData(response.data, {title: 'name', key: 'id', lazy: true, selected: '.status'}));
                });
                return deferment.promise;
            };

            scope.load = function (event, data) {
                var deferment = $q.defer();
                var id = data.node.key;
                User.getFunctionRightChildren($stateParams.userdata, id).then(function (response) {
                    deferment.resolve(scope.covertToTreeData(response.data, {title: 'name', key: 'id', lazy: true, selected: '.status'}));
                });
                return deferment.promise;
            };

            scope.clickHandler = {
                expander: function (event, data) {

                },
                title: function (event, data) {
                    var id = data.node.key;

                    if (id == 'man') {
                        $state.go('main.mandators');
                    } else if (id == 'ugrp') {
                        $state.go('main.adminusergroups');
                    } else if (id == 'usr') {
                        $state.go('main.sysusers');
                    } else {
                        var parentKey = data.node.getParent().key;
                        if (parentKey == 'man') {
                            $state.go('main.mandator', {userdata: id});
                        }
                        if (parentKey == 'ugrp') {
                            $state.go('main.usergroupsuser', {userdata: id});
                        } else if (parentKey == 'usr') {
                            $state.go('main.systemuseruser', {userdata: id});
                        }
                    }
                }
            };

            scope.$on('save-functionright-ug', function () {
                var selKeys =
                    $.map(tree.getSelectedNodes(), function (node) {
                        if (node.key != 0) {
                            return node.key;
                        }
                    });

                var rootstructures =
                    $.map(selKeys, function (item) {
                        var tempnode = tree.getNodeByKey(item);
                        var tempstructure = [];
                        tempstructure.push(tree.getNodeByKey(item).title);
                        while (tempnode.getParent().getParent()) {
                            tempstructure.push(tempnode.getParent().title);
                            tempnode = tempnode.getParent();
                        }
                        tempstructure.reverse();
                        return tempstructure.join('/');
                    });

                // Get a list of all selected TOP nodes
                var selRootNodes = tree.getSelectedNodes(true);

                var dataObj = [];

                _.each(selRootNodes, function(val, key){
                    var temp = val.data;
                    temp.status = true;
                    dataObj.push(temp);
                });

                User.saveFunctionRight($stateParams.userdata, dataObj).then(function(){
                    scope.$broadcast('refresh_function_rights');
                });
            });
        }

        function _postlinkfn(scope) {
            scope.showCheck = false;
        }
    }
})();
