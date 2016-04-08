(function () {
    'use strict';

    angular.
        module('vitricon').
        controller('CatMgrCrossTbl', function($scope,vcGetCatMgrCrossTblDescFactory,CrossTableEditModal, $rootScope){
            
            $scope.SelectedTable = '219';
            $scope.firstTable = ''
            $scope.isTableSwitched = false;

            $scope.ColumnName = [{
                title   : '',
                data    : ''
            }];
            
            $scope.setTableSwitch =function(){
                
                $scope.isTableSwitched = ($scope.isTableSwitched) ? false : true;
                
                var systemTable = vcGetCatMgrCrossTblDescFactory.getSwitchTableDesc();
                var param = {'isTableSwitched' : $scope.isTableSwitched};
                systemTable.customGET($scope.SelectedTable,param).then(function (result) {
                    result.data.fields[0].render = function (data) {

                        return '<a class="select-row">' + data + '</a>';

                    };
                    $scope.$broadcast('recreateSysgrid',{'ColumnName':result.data.fields,'ColumnData':result.data.records});
                });
                
            };
            $scope.getTable = function(){
                
                // var systemTable = vcGetCatMgrSysTblDescFactory.data;
                var systemTable = vcGetCatMgrCrossTblDescFactory.getTableDesc();
                var param = {'isTableSwitched' : $scope.isTableSwitched};
                systemTable.customGET($scope.SelectedTable,param).then(function (result) {
                    
                    result.data.fields[0].render = function (data) {

                        return '<a class="select-row">' + data + '</a>';

                    };
                    $scope.$broadcast('recreateSysgrid',{'ColumnName':result.data.fields,'ColumnData':result.data.records});
                });

            };
            $scope.editPopUp = function(data){
                // alert(data.firstTable+' GOTCHA');
                $rootScope.crossFirstTable = data.firstTable;
                $rootScope.crossTableId = $scope.SelectedTable;
                $rootScope.crossTableIsTableSwitched = $scope.isTableSwitched;
                CrossTableEditModal.open();
            };
            // $scope.addSysTableRow = function(){
                // $scope.$broadcast('add_row_top');
            // };
            
            
            
        });
        
})();