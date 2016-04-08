  (function () {

 'use strict';
    /**
     * defining the controller : MobileDeviceController
     */
    angular.module('vitricon').
            controller('LicenseController', licenseController);

    function licenseController(License, $scope, Session) {
        
        var vm = this;
        
        /**
         * init function for the controller
         * @private
         */
        vm.init = function(){
            vm.customerNameList = [];
            vm.customerRSsList = [];
            vm.allowedPackedRSsList = [];
            vm.mandatorRSsList = [];
            vm.customerNameValue = '';
            vm.getLicenseData();
        };
        vm.getLicenseData = function(){
            License.customGET().then(function (resp) {
                vm.licenseInfo = resp.data;
                vm.status = vm.licenseInfo.status;
                vm.version = vm.licenseInfo.version;
                vm.customerRSs = vm.licenseInfo.customerRSs;
                vm.customerNameList = [];
                 _.each(vm.customerRSs, function (value) {
                     vm.customerRSsList.push(value);
                   vm.customerNameList.push(value.customerName);
            });
            
            vm.customerName = '0';
            vm.customerNameValue = vm.customerNameList[0];
             _.each(vm.customerRSsList, function (value) {
                 if(vm.customerNameValue === value.customerName){
                     vm.allowedPackedRSs = value.allowedPackedRSs;
                     vm.mandatorRSs = value.mandatorRSs;
                     vm.maxMandator = value.maxMandator;
                     vm.maxOperatorValue = value.maxOperatorValue;
                     vm.maxConcurrentOperators = value.maxConcurrentOperators;
                     vm.maxVitricadOperators = value.maxVitricadOperators;
                 }
                   
            });
            _.each(vm.allowedPackedRSs, function (value) {
                 vm.allowedPackedRSsList.push(value.packageName);
            });
             _.each(vm.mandatorRSs, function (value) {
                 vm.mandatorRSsList.push(value);
            });
            Session.setGridData(vm.mandatorRSsList);
            
            });
        };
        
        vm.init();
        
        /**
         * uploadFile function to upload the license
         * @private
         */
        
        $scope.uploadFile = function(files){
            var licenseFile = new FormData();
            licenseFile.append("file", files[0]);
             License.post(licenseFile).then(function(){
                 $('input[type="file"]').val(null);
                 vm.customerNameList = [];
                 vm.allowedPackedRSsList= [];
                 vm.mandatorRSsList = [];
                 vm.getLicenseData();
        });
        };
        /**
         * getCustomerName function to get the value from the License customer select box
         * @private
         */
        $scope.getCustomerName = function (data) {
            vm.allowedPackedRSsList= [];
            vm.mandatorRSsList = [];
            _.each(vm.customerRSsList, function (value) {
                 if(data.designator === value.customerName){
                     vm.allowedPackedRSs = value.allowedPackedRSs;
                     vm.mandatorRSs = value.mandatorRSs;
                     vm.maxMandator = value.maxMandator;
                     vm.maxOperatorValue = value.maxOperatorValue;
                     vm.maxConcurrentOperators = value.maxConcurrentOperators;
                     vm.maxVitricadOperators = value.maxVitricadOperators;
                 }
                   
            });
            _.each(vm.allowedPackedRSs, function (value) {
                 vm.allowedPackedRSsList.push(value.packageName);
            });
             _.each(vm.mandatorRSs, function (value) {
                 vm.mandatorRSsList.push(value);
            });
            Session.setGridData(vm.mandatorRSsList);
            $scope.$broadcast('refresh_all');
        };
    }
})();