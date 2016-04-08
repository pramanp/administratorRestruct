(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcCrossTablesGrid', vcsystemtablesGridDirective);

    function vcsystemtablesGridDirective (SystemUser,vcGetCatMgrCrossTblDescFactory) {
        var ddo = {
            restrict: 'E',
            // scope: false,
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
                // exportable: true,
                // filter: false,
                updateable:true,
                deleteable: false,
                disableLocalization:true
            };
            scope.events = {
                all: 'admin.user.grid.js_grid_all',
                row: 'admin.user.grid.js_grid_row'
            };
            

            var systemTable = vcGetCatMgrCrossTblDescFactory.getTableDesc();
            var param = {'isTableSwitched' : scope.isTableSwitched};
            systemTable.customGET(scope.SelectedTable,param).then(function (result) {
                
                result.data.fields[0].render = function (data) {

                    return '<a class="select-row">' + data + '</a>';

                };
                scope.$broadcast('recreateSysgrid',{'ColumnName':result.data.fields,'ColumnData':result.data.records});
                
                // scope.sampleRecordObj = {};
                // angular.forEach(result.data.records[0], function(value, key) {
                  // if(key == "dbId"){scope.sampleRecordObj[key] = 0;}
                  // else if(key == "tableID"){scope.sampleRecordObj[key] = parseInt(scope.SelectedTable);}
                  // else{
                      // if(angular.isNumber(result.data.records[0][key])){
                        // scope.sampleRecordObj[key] = 0;
                      // } else {
                        // scope.sampleRecordObj[key]="";
                      // }
                      
                    // }
                // });
                
            });

            // scope.columns = [
                // {title: "LLLLLLLLLLL", data: "login"},
                // {title: "admin.systemuser.grid.lastlogin", data: "lastLogin"},
                // {title: "admin.systemuser.grid.locked", data: "locked",
                    // render: function(data) {
                        // return '<input type="checkbox" readonly="readonly" value="'+data+'"/>';
                    // }
                // },
                // {title: "admin.systemuser.grid.lockreason", data: "lockReason"},
                // {title: "admin.systemuser.grid.creationdate", data: "createdDate"},
            // ];
            scope.columns = scope.ColumnName;
            
            scope.events  = {recreate:'recreateSysgrid',addRow:'addROW'};
            // scope.events  = {addRow:'addROW'};
            
            // scope.read = function (data) {
                // return SystemUser.getList();
                // return 
            // };
            
            scope.update = function (data) {
             
                // var request = [];
                // request = data;
                // if(data){
                    if (data.dbId == 0) {
                        return systemTable.post(data);
                    } else {
                        return systemTable.one().customPUT(data);
                    }
                // }
            };
            
            
            
            scope.editor = {

                defaultRow: function () {

                    return  {
                      "tableID": parseInt(scope.SelectedTable),
                      "dbId": 0,
                      "number": 0,
                      "typNumber": "",
                      "costGroupNo": 0,
                      "costGroupNoBac": 0,
                      "checked": false,
                      "editable": false,
                      "index": 0,
                      "amount": 0,
                      "firstTable": "",
                      "token": "",
                      "designator": "",
                      "note": "",
                      "roomTypeNo": "",
                      "maintenanceGroup": "",
                      "costKind": "",
                      "areaUseGroup": "",
                      "dimension": "",
                      "costType": "",
                      "standardDimension": "",
                      "description": "",
                      "figureBWZK": "",
                      "baRelevant": false,
                      "storable": false,
                      "accumulating": false,
                      "manual": false,
                      "standardNND": 0,
                      "taxRate": 0,
                      "effectiveAreaMain": 0,
                      "effectiveArea": 0,
                      "baseAreaNetto": 0,
                      "baseAreaBrutto": 0,
                      "referenceValueHeat": 0,
                      "referenceValueElectricity": 0,
                      "lowerPrice": 0,
                      "middlePrice": 0,
                      "highPrice": 0,
                      "country": "",
                      "federalState": "",
                      "account": 0,
                      "date": "",
                      "validFrom": "",
                      "validUntil": "",
                      "createdBy": "",
                      "editedBy": "",
                      "referenceAdministration": false,
                      "referenceRealty": false,
                      "referenceBuilding": false,
                      "referenceOutsideInstallation": false,
                      "referenceInstallation": false,
                      "referenceInstallationPart": false,
                      "referenceDevice": false,
                      "referenceRoom": false,
                      "referenceProject": false,
                      "referenceTaskPacket": false,
                      "referenceOrganisation": false,
                      "referenceDivision": false,
                      "referenceDepartment": false,
                      "referencePerson": false,
                      "referenceArticle": false,
                      "referenceInventory": false,
                      "referenceKey": false,
                      "referenceLeaseUnit": false,
                      "active": false,
                      "category": "",
                      "subCategory": "",
                      "fixtures": false,
                      "stationNr": "",
                      "icao": "",
                      "stationName": "",
                      "geoHeight": "",
                      "geoLatitude": "",
                      "geoLongitude": "",
                      "kmCoordinates": "",
                      "longtimeAVGGTZ": 0,
                      "factor": 0,
                      "tableName": "",
                      "installationToken": "",
                      "installationPartToken": "",
                      "deviceToken": "",
                      "regisFacilityNo": "",
                      "shortDesignator": "",
                      "district": "",
                      "ownerNo": "",
                      "no": "",
                      "tableHeaders": 0
                    };

                }

            };

            scope.onSelect = function (data, index) {
                // alert(data.firstTable);
                scope.editPopUp(data);
            };
        }

        function _postlinkfn() {
        }
    }

})();
