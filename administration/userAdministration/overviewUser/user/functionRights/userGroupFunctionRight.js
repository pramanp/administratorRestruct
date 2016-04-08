/**
 * Created by Kapil on 11/12/15.
 */

(function () {
    angular.module('vitricon').directive('vcSysuserGroupFunctionRightsTree', ddoDirective);

    function ddoDirective($q, $stateParams, User, SystemUser, Mandator, $state) {
        var ddo = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/components/tree/tree.html',
            link: {
                pre: _prelinkfn,
                post: _postlinkfn
            },
            controller: 'vcTreeController'
        };

        return ddo;

        function _prelinkfn(scope, el, attr) {

            var modified = [];
            scope.options = {
                checkbox: true,
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
                SystemUser.getFunctionRightChildren($stateParams.userdata, 0, {'is-for-group': true}).then(function (response) {
                    deferment.resolve(scope.covertToTreeData(response.data, {title: 'name', key: 'id', lazy: '.hasChild', selected : '.status'}));
                });
                return deferment.promise;
            };

            scope.load = function (event, data) {
                var deferment = $q.defer();
                var id = data.node.key;
                SystemUser.getFunctionRightChildren($stateParams.userdata, id, {'is-for-group': true}).then(function (response) {
                    deferment.resolve(scope.covertToTreeData(response.data, {title: 'name', key: 'id', lazy: '.hasChild', selected : '.status'}));
                });
                return deferment.promise;
            };

            scope.clickHandler = {
                expander: function (event, data) {

                },
                title: function (event, data) {
                },
                checkbox: function(event, data){
                    if(!_.contains(modified, data.node)) {
                        modified.push(data.node);
                    }
                }
            };

            var __getSelectedNodes = function () {
                tree = $(el.find('.tree-menu')).fancytree('getTree');
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
                return selRootNodes;
            }

            scope.$on('group-to-user-save', function () {
                var dataObj = [];
                var nodes = __getSelectedNodes();
                var nodeColletion = [];
                _.each(nodes, function (node) {
                    var temp = node.data;
                    temp.status = true;
                    dataObj.push(temp);
                    nodeColletion.push(node.getKeyPath(!node.getParent().isRootNode()));
                });
                scope.$emit('transfer-nodes-to-user', nodeColletion);
                //User.deleteFunctionRights(dataObj).then(function(){
                //
                //});

            });

            var __mergeNode = function(data){
                tree.loadKeyPath(data, function(node, status){
                    if(status === 'ok'){
                        node.setExpanded('true');
                    }
                });
            }

            scope.$on('node-to-group', function (event, nodes) {
                _.each(nodes, function(node){
                    __mergeNode(node);
                });
            });

            scope.$on('save-functionright-su', function(){
                var dataObj = [];
                _.each(modified, function (node) {
                    var temp = node.data;
                    temp.status = node.selected;
                    dataObj.push(temp);
                });
                if(dataObj.length > 0){
                    SystemUser.saveFunctionRight(dataObj).then(function(){
                        modified = null;
                        modified = [];
                        scope.$emit('refresh_functionsu_grid');
                    });
                }
            });

        }

        function _postlinkfn(scope) {
            scope.showCheck = false;
        }
    }
})();
