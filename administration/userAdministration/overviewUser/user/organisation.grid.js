(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcOrganisationGrid', vcOrganisationGridDirective);

    function vcOrganisationGridDirective (SystemUser,$state,Messaging, $q, $timeout) {
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
                deleteable: false
            };
            scope.events = {
                all: 'admin.user.grid.js_grid_all',
                row: 'admin.user.grid.js_grid_row'
            };
            scope.columns = [
                {
                    title: "organisation.grid.organisation", data: "organisationLabel",
                    render: function (data) {
                        return '<a class="select-row" data-dismiss="modal">' + data + '</a>';
                    }
                },
                {title: "organisation.grid.division", data: "divisionLabel", 
                    render: function (data) {
                        return '<a class="select-row" data-dismiss="modal">' + data + '</a>';
                    },
                    editable: false
                },
                {
                    title: "organisation.grid.department", data: "departmentLabel",
                    render: function (data) {
                        return '<a class="select-row" data-dismiss="modal">' + data + '</a>';
                    },
                    editable: false
                },
                {
                    title: "organisation.grid.person", data: "personLabel",
                    render: function (data) {
                        return '<a class="select-row" data-dismiss="modal">' + data + '</a>';
                    },
                    editable: false
                }
            ];

            scope.read = function (data) {
                return SystemUser.one('organisation').customGET(scope.mandatorId);
            };

            scope.onSelect = function (data, cellData) {
                
                scope.selectedUnit = el.find('thead th').eq(cellData.columnVisible).text();
                var id = angular.lowercase(scope.selectedUnit)+'Id';
                var labl = angular.lowercase(scope.selectedUnit)+'Label';
                scope.orgData = {id:data[id],selectedUnit:scope.selectedUnit};
                scope.orgLabel = data[labl];
                scope.closeWindow();
            };

        }

        function _postlinkfn() {
        }
    }

})();
