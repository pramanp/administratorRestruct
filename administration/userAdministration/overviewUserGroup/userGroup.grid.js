(function () {
    'use strict';
    //jfkadsfkjhaksdjhfk
    angular.
            module('vitricon').
            directive('vcAdminUserGrid', adminUserGridDirective);

    function adminUserGridDirective($state, User, Mandator, $q, toastr, 
         Messaging, $timeout, $filter) {
        var ddo = {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/components/grid/vcgrid.html',
            link: {
                pre: _prelinkfn,
                post: _postlinkfn
            }
        };

        return ddo;

        function _prelinkfn(scope, el) {
            var grid = null;
            var table = null;
            scope.options = {
                editable: true,
                exportable: true,
                filter: false,
                scrollX: true
            };

            scope.init = function (api) {

                grid = api;
                table = grid.table().node();
                angular.element(table).find('tbody').on('click', 'input.group1[type=checkbox]', function (event) {
                    var tar = event.currentTarget;
                    var indexObject = grid.cell($(tar).parent('td')).index();
                    var row = grid.row(indexObject.row);
                    var column = grid.column(indexObject.column);

                    var dataSrc = column.dataSrc();

                    var data = row.data();
                    data[dataSrc] = angular.element(tar).is(':checked');
                });
                
                angular.element(table).find('tbody').on('dblclick', 'tr', function (event) {
                    var row = grid.row(this);
                    if(row.data().isAdminGroup){
                        event.stopImmediatePropagation();
                        toastr.error("Can't edit admin user group");
                    }
                });
            };
            scope.events = {
                all: 'admin.user.grid.js_grid_all',
                row: 'admin.user.grid.js_grid_row'
            };
            scope.columns = [
                {title: "admin.usergroups.grid.name", data: "designator",
                    render: function (data, type) {
                        if (type === 'display')
                            return '<a class="select-row">' + data + '</a>';
                        else {
                            return data;
                        }
                    }, editable: true
                },
                {title: "admin.usergroups.grid.note", data: "note"},
                {title: "admin.usergroups.grid.createddate", data: "createdDate",
                    render: function (data) {
                        return $filter("DateTime")(data, "ll");
                    },
                    editable: false
                },
                {title: "admin.usergroups.grid.description", data: "description", editable: true,
                    render: function (data, type) {
                        if ((data !== null || data === "") && data.length > 75) {
                            return '<span title="' + data + '">' + data.substr(0, 75) + '...</span>';
                        } else {
                            return data;
                        }
                    }
                },
                {
                    title: "admin.usergroups.grid.mandator", data: "mandantDTO.designator",
                    vcedit: {
                        template: function () {
                            var deferment = $q.defer();
                            Mandator.getList().then(function (response) {
                                scope.mandatorList = [];
                                scope.mandatorList = response;

                                var temp = '<select>';
                                _.each(response, function (obj) {
                                    temp += '<option value="' + obj.dbId + '">' + obj.designator + '</option>';
                                });

                                temp += '</select>';
                                deferment.resolve(temp);
                            });
                            return deferment.promise;
                        },
                        extract: function (jqTd, rowData) {
                            //rowData.id = 0;
                            rowData.mandantDTO.id = parseInt(jqTd.find('select').val());
                            rowData.mandantDTO.designator = jqTd.find('select option:selected').text();
                            return rowData;
                        }
                    }
                },
                {title: "admin.usergroups.grid.adminCheckbox", data: "isAdminGroup",
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" readonly="readonly" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" readonly="readonly" />';
                            }
                        } else {
                            return data;
                        }

                    }, editable: true,
                    vcedit: {
                        template: function () {
                            return '<input type="checkbox" class="group1"/>';
                        },
                        extract: function (jqTd, rowData) {
                            rowData.isAdminGroup = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                }
            ];

            scope.read = function (data) {
                return User.getList();
            };

            scope.onSelect = function (data, index) {
                $state.go('main.usergroupsuser', {userdata: data.id});
            };

            scope.delete = function (data) {
                if (!data.isAdminGroup) {
                    var deferment = $q.defer();
                    User.one(data.id).customGET().then(function (resp) {
                        Messaging.confirm('Do you really want to delete this user group?', function (val) {
                            if (val === 'ok') {
                                $timeout(function () {
                                    if (resp.data.numberOfUser > 0) {
                                        Messaging.confirm('Also, Do you want to delete all associated users with this group?', function (val) {
                                            var deleteChildren = (val === 'ok');
                                            User.one(data.id).customDELETE('', {deleteChildrenUser: deleteChildren}).then(function (response) {
                                                deferment.resolve(response);
                                                scope.$broadcast('refresh_all');
                                                scope.$emit('refresh_tree', {action: 'delete', key: 'ugrp/' + data.id});
                                            },function(error){
                                                scope.$broadcast('refresh_all');
                                            });
                                        });
                                    }
                                    else{
                                        User.one(data.id).customDELETE('', {deleteChildrenUser: false}).then(function (response) {
                                                deferment.resolve(response);
                                                scope.$broadcast('refresh_all');
                                                scope.$emit('refresh_tree', {action: 'delete', key: 'ugrp/' + data.id});
                                            },function(error){
                                                scope.$broadcast('refresh_all');
                                            });
                                    }
                                }, 1000);

                            }
                            else{
                                scope.$broadcast('refresh_all');
                            }

                        });

                    });
                    return deferment.promise;
                } else {
                    toastr.error("Can't delete admin user group");
                }

            };

            scope.update = function (data) {
                if (data.id === null) {
                    delete data.id;
                    return User.post(data).then(function (resp) {
                        scope.$broadcast('refresh_all');
                        scope.$emit('refresh_tree', {action: 'add', id: 'ugrp', data: resp.data});
                    },function(error){
                        scope.$broadcast('refresh_all');
                    });
                } else {
                    return User.one(data.id).customPUT(data).then(function (resp) {
                        scope.$broadcast('refresh_all');
                        scope.$emit('refresh_tree', {action: 'delete', key: 'ugrp/' + data.id});
                        scope.$emit('refresh_tree', {action: 'add', id: 'ugrp', data: data});
                    },function(error){
                        scope.$broadcast('refresh_all');
                    });
                }
            };

            scope.editor = {
                defaultRow: function () {
                    return {
                        "id": null,
                        "designator": "",
                        "description": "",
                        "isAdminGroup": false,
                        "note": null,
                        "createdBy": "",
                        "createdDate": "",
                        "editedBy": "",
                        "mandantDTO": {
                            "token": null,
                            "description": null,
                            "designator": "",
                            "note": null,
                            "displayName": null
                        }
                    };
                }
            };
        }

        function _postlinkfn() {
        }
    }

})();
