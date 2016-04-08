(function () {
    'use strict';

    angular.module('vitricon').
            controller('MandatorsController', mandatorController);

    function mandatorController($scope, $state, License, Customer, $timeout, Resources) {

        var vm = this;
        var clrTme;
        vm.error_message = '';
        vm.status = true;
        $scope.customerNameList = [];
        $scope.customerRSsList = [];
        $scope.allowedPackedRSsList = [];
        $scope.mandatorRSsList = [];
        $scope.customerNameValue = '';
          
        vm.init = function () {

            Customer.customGET().then(function (resp) {
                $scope.customerNameList = resp.data;
                $scope.customerName = '' + resp.data[0].id + '';
                $scope.customerNameValue = resp.data[0].designator;
            });

        };
        
        vm.getLicenseDataById = function () {

            License.customGET($scope.customerName).then(function (resp) {
                $scope.customerRSs = resp.data;

                $scope.maxMandator = vm.customerRSs.maxMandator;
                $scope.maxOperatorValue = vm.customerRSs.maxOperatorValue;
                $scope.maxConcurrentOperators = vm.customerRSs.maxConcurrentOperators;
                $scope.maxVitricadOperators = vm.customerRSs.maxVitricadOperators;
                $scope.mandatorRSsList = vm.customerRSs.mandatorRSs;
            });
        };

        $scope.addMandator = function () {

            //$scope.$broadcast('add_row_top');
            $state.go('main.addmandator');

        };

        $scope.getCustomerName = function (data) {
            $timeout.cancel(clrTme);
            $scope.customerName = data.id;
            $scope.customerNameValue = data.designator;
            clrTme = $timeout(function () {
                //vm.getLicenseDataById();
                 $scope.$broadcast('refresh_all');
            }, 1000);
           

        };
        
        $scope.saveOperatorData = function(str){
            var opData = [];
            var maxOp = 0 , maxConOp = 0, maxVitrOp = 0;
            if($scope.mandatorRSsList.length > 0){
                $scope.status = true;
                _.each($scope.mandatorRSsList, function (data, key) {
                    opData.push(data);
                });
                _.each(opData, function (data, key) {
                    maxOp += parseInt(data.maxOperatorValue);
                    maxConOp += parseInt(data.maxConcurrentOperators);
                    maxVitrOp += parseInt(data.maxVitricadOperators);
                    
                });
                if(maxOp <= parseInt($scope.maxOperatorValue) && maxConOp <= parseInt($scope.maxConcurrentOperators) && maxVitrOp <= parseInt($scope.maxVitricadOperators)){
                    License.one().customPUT(opData).then(function (resp) {
                        $scope.$broadcast('refresh_all');
                    });
                }
                else{
                    $scope.status = false;
                    if(maxOp > parseInt($scope.maxOperatorValue)){
                        $scope.error_message = Resources.getLabelForActionCode('mandators', '956');
                    }
                    else if(maxConOp > parseInt($scope.maxConcurrentOperators)){
                        $scope.error_message = Resources.getLabelForActionCode('mandators', '957');
                    }
                    else if(maxVitrOp > parseInt($scope.maxVitricadOperators)){
                        $scope.error_message = Resources.getLabelForActionCode('mandators', '958');
                    }
                }
            }
             
        };

    }
})();
