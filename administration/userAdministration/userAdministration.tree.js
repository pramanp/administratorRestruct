/**
 * Created by Kapil on 11/12/15.
 */

(function () {
    angular.module('vitricon').directive('vcAdminTree', vcAdminTreeDirective);

    function vcAdminTreeDirective($q, $timeout, User, SystemUser, Mandator, $state, Ancestors) {
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
                extensions: ['dnd'],
                checkbox: false
            };

            setTimeout(function () {
                var SlimscrollHeight = $('.slimScrollDiv').height()
                scope.options = {
                    slimscroll: {
                        height: SlimscrollHeight
                    }
                }

            }, 2000);
            scope.ancestors = function () {
               return Ancestors.ancestors();
            };
            var tree;
            scope.init = function () {
                tree = el.find('.tree-menu').fancytree('getTree');
            }

            scope.load = function (event, data) {
                var meta;
                //TODO: get meta from Ancestors model

                var deferment = $q.defer();
                var id = data.node.key;
                if (id == 'man') {

                    Mandator.getList().then(function (response) {
                        meta = {
                            title: 'designator',
                            key: 'dbId',
                            icon: '/assets/images/user-admin-icon.png'
                        };
                        var parentObject= 'main.mandators';
                            updateBreadcrumb(scope, response, meta, parentObject);
                        deferment.resolve(scope.covertToTreeData(response,meta));
                    });

                } else if (id == 'ugrp') {

                    User.getList().then(function (response) {
                        meta = {
                            title: 'designator',
                            key: 'id',
                            icon: '/assets/images/user-group-icon.png'
                        };
                        var parentObject= 'main.adminusergroups';
                        updateBreadcrumb(scope, response, meta, parentObject);
                        deferment.resolve(scope.covertToTreeData(response,meta));
                    });

                } else if (id == 'usr') {

                    SystemUser.getList().then(function (response) {
                        meta = {
                            title: 'login',
                            key: 'id',
                            icon: '/assets/images/user-admin-icon.png'
                        };
                        var parentObject= 'main.sysusers';
                        updateBreadcrumb(scope, response, meta, parentObject);
                        deferment.resolve(scope.covertToTreeData(response,meta));
                    });

                }

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


            scope.$on('expandTreeSignal', function () {
                tree.getRootNode().visit(function (node) {
                    node.setExpanded(true);
                });
            });

            scope.$on('collapseTreeSignal', function () {
                tree.getRootNode().visit(function (node) {
                    node.setExpanded(false);
                });
            });

            scope.$on('clipboardAction', function (event, op) {
                var activeNode = tree.getActiveNode();
                if (activeNode !== null) {
                    scope.clipboardActivity(op, activeNode);
                }
            });

            scope.extensions = {
                dnd: {
                    // Available options with their default:
                    autoExpandMS: 1000,   // Expand nodes after n milliseconds of hovering
                    focusOnClick: false,  // Focus, although draggable cancels mousedown event (#270)
                    preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
                    preventVoidMoves: true,      // Prevent dropping nodes 'before self', etc.
                    smartRevert: true,    // set draggable.revert = true if drop was rejected

                    // Events that make tree nodes draggable
                    dragStart: function (node, data) {
                        return true;
                    },
                    dragEnter: function (node, data) {
                        return true;
                    },
                    dragOver: function (node, data) {
                    },
                    dragLeave: function (node, data) {
                    },
                    dragStop: function (node, data) {
                    },
                    dragDrop: function (node, data) {
                        data.otherNode.moveTo(node, data.hitMode);
                    }
                },
            }

            scope.$on('refresh_all_tree', function (event, data) {
                if (data.action === 'delete') {
                    var toDelete = true;
                    var keyPath = data.key;
                    var nodeKeys = keyPath.split('/');
                    var node = null;
                    for (var i = 0; i < nodeKeys.length; i++) {
                        node = tree.getNodeByKey(nodeKeys[i]);
                        if (node === null) {
                            toDelete = false;
                            break;
                        }
                    }
                    if (toDelete)
                        node.remove();
                } else if (data.action === 'add') {
                    var meta = {};
                    if (data.id == 'man') {
                        meta = {
                            title: 'designator',
                            key: 'id',
                            icon: '/assets/images/user-admin-icon.png'
                        };
                    } else if (data.id == 'ugrp') {
                        meta = {
                            title: 'designator',
                            key: 'id',
                            icon: '/assets/images/user-group-icon.png'
                        };

                    } else if (data.id == 'usr') {
                        meta = {
                            title: 'login',
                            key: 'id',
                            icon: '/assets/images/user-admin-icon.png'
                        };
                    }
                    var node = tree.getNodeByKey(data.id);
                    if (node !== null && node.isLoaded()) {
                        var temp = [];
                        temp.push(data.data);
                        node.addNode(scope.covertToTreeData(temp, meta)[0]);
                    }
                }
            });

            scope.$on('expand-tree', function (event, data) {
                var state = data.state;
                var params = data.params;
                var key = '';
                var accordianExpand = true;
                if (state === 'main.usergroupsuser') {
                    key = 'ugrp/' + params.userdata;
                    tree.getNodeByKey('ugrp').setExpanded(true);
                } else if (state === 'main.systemuseruser') {
                    key = 'usr/' + params.userdata;
                    tree.getNodeByKey('usr').setExpanded(true);
                } else if (state === 'main.mandator') {
                    key = 'man/' + params.userdata;
                    tree.getNodeByKey('man').setExpanded(true);
                } else if (state === 'main.mandators' || state === 'main.addmandator' || state === 'main.linkmandator') {
                    tree.getNodeByKey('man').setActive(true);
                } else if (state === 'main.adminusergroups') {
                    tree.getNodeByKey('ugrp').setActive(true);
                } else if (state === 'main.sysusers' || state === 'main.adduser') {
                    tree.getNodeByKey('usr').setActive(true);
                }else {
                    accordianExpand = false;
                }

                $timeout(function () {
                    scope.activateNodeByKeyPath(tree, key);
                    if(accordianExpand) {
                        scope.$emit('accordian-reveal', {tree: 'tree.user_admin'});
                    }
                }, 800);


            });
        }

        function _postlinkfn(scope) {
            scope.showCheck = false;


        }

        function updateBreadcrumb(scope, response,meta, parentObject){
            var ret = scope.covertToTreeData(response, meta);

            if(ret instanceof Array){
                for (var i = 0; i < ret.length; i++) {
                    var tempHolder = ret[i];
                    //TODO: get parent from Ancestors Model
                    if (parentObject == 'main.mandators') {
                        var tempstate = 'main.mandator-{userdata: '+tempHolder.key+'}';
                    }
                    if (parentObject == 'main.adminusergroups') {
                        var tempstate = 'main.usergroupsuser-{userdata: '+tempHolder.key+'}';
                    } else if (parentObject == 'main.sysusers') {
                        var tempstate = 'main.systemuseruser-{userdata: '+tempHolder.key+'}';
                    }

                    var tempObject = {};
                    tempObject[tempstate] = {};

                    tempObject[tempstate].parent = parentObject;
                    tempObject[tempstate].active = false;
                    tempObject[tempstate].key = tempHolder.key;
                    tempObject[tempstate].title = tempHolder.title;
                    tempObject[tempstate].icon = tempHolder.icon;
                    tempObject[tempstate].lazy = true;
                    tempObject[tempstate].state = tempstate;
                    tempObject[tempstate].childAdded = 0;
                    tempObject[tempstate].children = [];
                    tempObject[tempstate].childAction= {factory: '',method: '',params: ''};
                    tempObject[tempstate].meta = {title: '',key: '',icon: '/assets/images/user-admin-icon.png'};
                    Ancestors.updateModel(tempObject);
                }
            }else{
            }
        }
    }
})();
