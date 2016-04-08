(function () {
    'use strict';

    angular.
        module('vitricon').
        controller('CatMgrCustTbl', function($scope,vcGetCatMgrSysTblDescFactory){
            
            $scope.SelectedTable = '217';

            $scope.ColumnName = [{
                title   : '',
                data    : ''
            }];
            
            $scope.getTable = function(){
                
                // var systemTable = vcGetCatMgrSysTblDescFactory.data;
                var systemTable = vcGetCatMgrSysTblDescFactory.getTableDesc();
                
                systemTable.customGET($scope.SelectedTable).then(function (result) {
                    angular.forEach(result.data.fields, function(value, key) {

                        if(value.dataType == "CheckBox"){

                          // scope.sampleRecordObj[key] = 0;
                            value.render = function (data, type) {

                                if (type === 'display') {

                                    if (data === true) {

                                        return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';

                                    } else {

                                        return '<input type="checkbox" class="group1" disabled="disabled" />';

                                    }

                                }else {

                                    return data;

                                }



                            };
                            
                            
                            value.vcedit= {

                                template: function (data) {

                                    if (data.find('input.group1[type=checkbox]').is(':checked') === true)

                                    {

                                        return '<input type="checkbox" class="group1" checked="checked" />';

                                    } else

                                    {

                                        return '<input type="checkbox" class="group1"  />';

                                    }

                                },

                                extract: function (jqTd, rowData) {

                                    //rowData.visibleAdministration = jqTd.find('input[type=checkbox]').is(':checked');

                                    return jqTd.find('input').is(':checked');

                                }

                            };

                            
                            
                            
                            
                        }
                    });
                    $scope.$broadcast('recreateSysgrid',{'ColumnName':result.data.fields,'ColumnData':result.data.records});
                });
                
                
 
            };
            $scope.addSysTableRow = function(){
                $scope.$broadcast('add_row_top');
            };
            
        });
        
})();