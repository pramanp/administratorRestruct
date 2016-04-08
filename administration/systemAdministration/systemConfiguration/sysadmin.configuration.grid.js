(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcConfigurationParamterGrid', vcConfigurationParamterGridDirective);

    function vcConfigurationParamterGridDirective (ConfigurationParameter, Session) {
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
                {title: "sysadmin.configparameter.grid.name", data: "designator", editable:false},
                {title: "sysadmin.configparameter.grid.adjustedvalue", data: "value"
                },
                {title: "sysadmin.configparameter.grid.description", data: "description", editable:false,
                render: function (data) {
                        if ((data != null || data =="") && data.length>75) {
                            return '<span title=\"' + data + '\">' + data.substr(0, 75) + '...</span>';
                        }else{
                            return data;
                        }
                    }
                }
            ];
   
            scope.options ={
                deleteable: false,
            };
            
            scope.read = function () {
                var data = Session.getMandatorId('mandatorId');
                return ConfigurationParameter.customGET(data);
            };
         
            scope.onSelect = function (data, index) {

            };
            
             scope.update = function (data) {
                if (data.id === null) {
                    return ConfigurationParameter.post(data);
                } else {
                    return ConfigurationParameter.one().customPUT(data);
                }
            };
            
           
        }

        function _postlinkfn() {
        }
    }

})();
