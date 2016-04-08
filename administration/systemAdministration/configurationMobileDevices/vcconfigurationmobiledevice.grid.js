(function () {
    'use strict';

    angular.
        module('vitricon').
        directive('vcConfigurationMobileDeviceGrid', vcConfigurationMobileDeviceGridDirective);

    function vcConfigurationMobileDeviceGridDirective (ConfigurationMobileDevice,
    toastr, $timeout, $state, $q, Messaging) {
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
                {title: "sysadmin.mobiledevice.grid.type", data: "connectionTpye", editable:false},
                {title: "sysadmin.mobiledevice.grid.name", data: "designator", editable:false,
                 render: function (data) {
                        return '<a class="select-row" data-dismiss="modal">' + data + '</a>';
                    }
                },
                {title: "sysadmin.mobiledevice.grid.detail", data: "dataExchange", editable:false}
                
            ];
   
       
            scope.read = function () {
                return ConfigurationMobileDevice.customGET();
            };
         
            scope.onSelect = function (data, index) {
                angular.element('.modal').modal('hide');
                $timeout(function(){
                   
                    var id = data.id;
                    $state.go('main.addnewconnection',{addDevice:id});
                }, 800);

            };
            
            scope.delete = function(data) {
                var deferment = $q.defer();
                 $timeout(function(){
                    Messaging.confirm('Do you want to delete this connection?', function(val){
                        if(val === 'ok'){
                            ConfigurationMobileDevice.one(data.id).customDELETE().then(function(response){
                            deferment.resolve(response);
                            scope.$broadcast('refresh_all');
                            toastr.success('Mobile Device Connection Deleted');
                        });
                        }
                    });
                }, 1000);
            };
            
        }

        function _postlinkfn() {
        }
    }

})();
