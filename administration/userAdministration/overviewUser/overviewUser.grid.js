(function () {
    'use strict';

    angular.
            module('vitricon').
            directive('vcAdminSysUserGrid', vcAdminSysUserGridDirective);

    function vcAdminSysUserGridDirective(SystemUser, $state, $timeout, $q, Messaging, $filter) {
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
            scope.options = {
                editable: true,
                exportable: true,
                filter: false,
                scrollX: true
            };
            scope.events = {
                all: 'admin.user.grid.js_grid_all',
                row: 'admin.user.grid.js_grid_row'
            };
            scope.columns = [
                {title: "admin.systemuser.grid.loginname", data: "login",
                    render: function (data) {
                        return '<a class="select-row">' + data + '</a>';
                    }, editable: false},
                {title: "admin.systemuser.grid.lastlogin", data: "lastLogin", 
                    render: function (data) {
                        return $filter("DateTime")(data, "ll");
                    }, 
                    editable: false},
                {
                    title: "admin.systemuser.grid.locked", data: "locked",
                    render: function (data) {
                        if (data === true)
                        {
                            return '<input type="checkbox" checked="checked" disabled="disabled" readonly="readonly" />';
                        } else
                        {
                            return '<input type="checkbox" readonly="readonly" disabled="disabled"/>';
                        }
                    }
                },
                {title: "admin.systemuser.grid.lockreason", data: "lockReason", editable: false,
                    render: function (data) {
                        if ((data != null || data == "") && data.length > 75) {
                            return '<span title=\"' + data + '\">' + data.substr(0, 75) + '...</span>';
                        } else {
                            return data;
                        }
                    }
                },
                {title: "admin.systemuser.grid.creationdate", data: "createdDate", 
                    render: function (data) {
                        return $filter("DateTime")(data, "ll");
                    }, 
                    editable: false},
            ];

            scope.read = function (data) {
                return SystemUser.getList();
            };

            scope.onSelect = function (data, index) {
                $state.go('main.systemuseruser', {userdata: data.id})
            }

            scope.delete = function (data) {

                var deferment = $q.defer();
                $timeout(function () {
                    Messaging.confirm('Do you really want to delete this user?', function (val) {
                        if (val == 'ok') {
                            SystemUser.one(data.id).customDELETE().then(function (response) {
                                deferment.resolve(response);
                                scope.$broadcast('refresh_all');
                                scope.$emit('refresh_tree', {action: 'delete', key: 'usr/'+data.id})
                            });
                        }

                    });
                }, 1000);
            };

            scope.update = function (data) {
                var str = data.login;
                var i = str.indexOf('>');
                var j = str.indexOf('<', i);
                data.login = str.substr(i + 1, j - i - 1);
                if (data.id === null) {
                    delete data.id;
                    SystemUser.post(data);
                } else {
                    SystemUser.one(data.id).customPUT(data);
                }
            };

            scope.editor = {
                defaultRow: function () {
                    return {
                        "id": null,
                        "login": "",
                        "lastLogin": "",
                        "lockReason": "",
                        "createdDate": "",
                        "createdBy": "",
                        "editedBy": "",
                        "mandator": {
                            "id": 1,
                            "token": null,
                            "description": null,
                            "designator": "",
                            "note": null,
                            "displayName": null
                        },
                        "organisationUnit": null,
                        "operatorGroup": {
                            "id": 130,
                            "designator": "",
                            "description": "",
                            "isAdminGroup": false,
                            "note": "",
                            "createdBy": "",
                            "createdDate": null,
                            "editedBy": "",
                            "mandantDTO": ""
                        },
                        "notes": null,
                        "password": "",
                        "confirmPassword": "",
                        "role": null,
                        "defaultProfile": "",
                        "locked": false,
                        "ldap": false,
                        "systemAdmin": false
                    }
                }
            }
        }

        function _postlinkfn() {
        }
    }

})();
