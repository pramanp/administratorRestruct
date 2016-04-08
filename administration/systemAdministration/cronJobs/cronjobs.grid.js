(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcCronJobsGrid', CronJobsGridDirective);

    function CronJobsGridDirective($state, Cronjobs, $q, toastr, Messaging, $timeout, $filter) {
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
                {title: "cronjobs.grid.group", data: "jobGroup",editable: false},
                {title: "cronjobs.grid.job", data: "jobDesignator",
                    render: function (data) {
                        return '<a class="select-row">' + data + '</a>';
                    },editable: false
                },
                {title: "cronjobs.grid.exeInterval", data: "cronExpression", editable: false},
                {title: "cronjobs.grid.lstexe", data: "lastExecution", 
                    render: function (data) {
                        return $filter("DateTime")(data, "YYYY/MM/DD HH:mm:ss");
                    }, 
                    editable: false},
                {title: "cronjobs.grid.nextexe", data: "nextExecution", 
                    render: function (data) {
                        return $filter("DateTime")(data, "YYYY/MM/DD HH:mm:ss");
                    }, 
                    editable: false},
                {title: "cronjobs.grid.state", data: "status",editable: false},
                {title: "cronjobs.grid.actions", data: "",
                    render: function (data) {
                        return '<a class="select-row" ng-disabled="true">run</a>';
                    },editable: false
                }
            ];

            scope.read = function (data) {
                return Cronjobs.getList();
            };

            scope.onSelect = function (data, index) {
                $state.go('main.job');
            };

            scope.delete = function(data) {
//                var deferment = $q.defer();
//                $timeout(function(){
//                    Messaging.confirm('Do you want to delete user of this group?', function(val){
//                        var deleteChildren = (val === 'ok');
//                        User.one(data.id).customDELETE('',{deleteChildrenUser: deleteChildren}).then(function(response){
//                            deferment.resolve(response);
//                            scope.$broadcast('refresh_all');
//                        });
//                    });
//                }, 1000);
//                return deferment.promise;
            };

            scope.update = function (data) {
//                if (data.id === null) {
//                    return User.post(data).then(function (resp){
//                        scope.$broadcast('refresh_all');
//                    });
//                } else {
//                    return User.one(data.id).customPUT(data).then(function (resp){
//                        scope.$broadcast('refresh_all');
//                    });
//                }
            };

            scope.editor = {
//                defaultRow: function () {
//                    return {
//                        "id": null,
//                        "designator": "",
//                        "description": "",
//                        "isAdminGroup": false,
//                        "note": null,
//                        "createdBy": "",
//                        "createdDate": "",
//                        "editedBy": "",
//                        "mandantDTO": {
//                            "token": null,
//                            "description": null,
//                            "designator": "",
//                            "note": null,
//                            "displayName": null
//                        }
//                    }
//                }
            };
        }

        function _postlinkfn() {
        }
    }

})();
