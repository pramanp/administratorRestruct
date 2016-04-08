(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcAdminTododashboardGrid', vcAdminTododashboardGridDirective);

    function vcAdminTododashboardGridDirective (Session,$q, $state, Messaging, $timeout,DocumentManagement,$stateParams) {

        var data = [];
            
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
                editable: false,
                // exportable: true,
                // filter: false,
                scrollX: true,
                visible: true,
                deleteable: true,
                disableLocalization:true
            };
            scope.events = {
                all: 'admin.user.grid.js_grid_all',
                row: 'admin.user.grid.js_grid_row'
            };
            scope.columns = [
                {title: "Pr.", data: "data1"},
                {title: "date/time", data: "data2"},
                {title: "unique ID", data: "data3"},
                {title: "Paar ID", data: "data4"},
                {title: "number", data: "data4"},
                {title: "Raum Nr.", data: "data4"},
                {title: "Interface", data: "data4"},
                {title: "BMS/fault key", data: "data4"},
                {title: "description", data: "data4"},
                {title: "number", data: "data4"},
                {title: "type", data: "data4"},
                {title: "state", data: "data4"},
                {title: "alive", data: "data4"},
                {title: "Termin Auftrag", data: "data4"},
                {title: "responsible person", data: "data4"}
    
            ];
           
            scope.read = function () {



                return null;
            };
            /*
            **Rhea
            **Get alert popup when we delete document from grid
            */
            scope.delete = function (data) {
                var deferment = $q.defer();
                $timeout(function () {
                    Messaging.confirm('Do you really want to delete this document?', function (val) {
                        if (val == 'ok') {
                           
                          
                        }
                    });
                }, 1000);
            };    
         
            scope.onSelect = function (data, index) {
                //$state.go('main.editdocumentfolders',{docId: data.dbId});
            };
            
            scope.update = function (data) {

            };
            
           
        }

        function _postlinkfn() {
        }
    }

})();

