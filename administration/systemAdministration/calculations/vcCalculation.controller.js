(function () {
    'use strict';
    /**
     * defining the controller : MobileDeviceController
     */
    angular.module('vitricon').
            controller('CalculationController', calculationController);

    function calculationController($timeout, Calculation, Interpolation, $q, 
              Messaging, Session, $scope) {

        var vm = this;
        /**
         * Init function for the controller
         * @private
         */
        vm.init = function () {
            $scope.showMessage = false;
            vm.startDate;
            vm.endDate;
            vm.interpolatedStartDate;
            vm.interpolatedEndDate;
            vm.startDateCheck = false;
            vm.endDateCheck = false;
            vm.vDateComparison = false;
            vm.checkedErrorMsg = false;
            vm.checkedAtLeastOne = false;
            vm.selectedRealtyId = '0';
            vm.interpolationRealtyId = '0';
            $scope.properties_Arr = [];
            $timeout(function () {
                $('.datepicker').datepicker({
                    dateFormat: "yy-mm-dd",
                    showOn: "button",
                    buttonImage: "../assets/images/calendar-icon.png",
                    buttonImageOnly: true
                });
            }, 1000);

            Calculation.customGET().then(function (resp) {
                vm.VirtualList = resp.data;
            });
            Interpolation.customGET().then(function (resp) {
                vm.InterpolationList = resp.data;
            });


        };
        vm.init();

        /**
         * getSelectedRealtyId function to get the SelectedRealtyId
         * @param data
         * @private
         */
        $scope.getSelectedRealtyId = function (data) {
            Session.setSelectedRealtyId('selectedRealtyId', data.id);
            $scope.$broadcast('refresh_all');

        };

        /**
         * getSelectedRealtyId function to get the SelectedRealtyId
         * @param data
         * @private
         */
        $scope.getInterpolationId = function (data) {
            Session.setSelectedRealtyId('interpolationRealtyId', data.id);
            $scope.$broadcast('refresh_all');

        };
        /**
         * virtualCheckBoxTest function to check the required fields for virtual data points
         * @private
         */

        vm.virtualCheckBoxTest = function () {
            vm.checkedAtLeastOne = false;
            vm.startDateCheck = false;
            vm.endDateCheck = false;
            vm.vDateComparison = false;
            if ((vm.startDate === '' || angular.isUndefined(vm.startDate)) &&
                (vm.endDate === '' || angular.isUndefined(vm.endDate))) {
                vm.startDateCheck = true;
                vm.endDateCheck = true;
            } else if (vm.endDate === '' || angular.isUndefined(vm.endDate)) {
                vm.endDateCheck = true;
                vm.startDateCheck = false;
            } else if (vm.startDate === '' || angular.isUndefined(vm.startDate)) {
                vm.startDateCheck = true;
                vm.endDateCheck = false;
            } else if ((vm.startDate !== '' || angular.isDefined(vm.startDate))
               && (vm.endDate !== '' || angular.isDefined(vm.endDate))) {
                if (vm.startDate > vm.endDate ) {
                        vm.vDateComparison = true;
                    }else{
                        vm.vDateComparison = false;
                    }
                $('input[type="checkbox"]').each(function () {
                    if ($(this).is(":checked")) {
                        vm.checkedAtLeastOne = true;
                    }

                    if (vm.checkedAtLeastOne === true && vm.vDateComparison === true) {
                        vm.checkedErrorMsg = false;
                        vm.startDateCheck = false;
                        vm.endDateCheck = false;
                        vm.vDateComparison = true;
                    } else if(vm.checkedAtLeastOne === false && 
                            vm.vDateComparison === true) {
                        vm.checkedErrorMsg = true;
                        vm.startDateCheck = false;
                        vm.endDateCheck = false;
                        vm.vDateComparison = true;
                    }else if(vm.checkedAtLeastOne === false 
                            && vm.vDateComparison === false) {
                        vm.checkedErrorMsg = true;
                        vm.startDateCheck = false;
                        vm.endDateCheck = false;
                        vm.vDateComparison = false;
                    }else{
                       vm.checkedErrorMsg = false;
                        vm.startDateCheck = false;
                        vm.endDateCheck = false;
                        vm.vDateComparison = false; 
                    }
                });
            }


        };

        /**
         * interpolatedCheckBoxTest function to check the required fields for interpolated data points
         * @private
         */

        vm.interpolatedCheckBoxTest = function () {
            vm.checkedAtLeastOne = false;
            vm.startDateCheck = false;
            vm.endDateCheck = false;
            if ((vm.interpolatedStartDate === '' || angular.isUndefined(vm.interpolatedStartDate))
                    && (vm.interpolatedEndDate === '' || 
                    angular.isUndefined(vm.interpolatedEndDate))) {
                vm.startDateCheck = true;
                vm.endDateCheck = true;
            } else if (vm.interpolatedEndDate === '' || 
                    angular.isUndefined(vm.interpolatedEndDate)) {
                vm.endDateCheck = true;
                vm.startDateCheck = false;
            } else if (vm.interpolatedStartDate === '' || 
                    angular.isUndefined(vm.interpolatedStartDate)) {
                vm.startDateCheck = true;
                vm.endDateCheck = false;
            } else if ((vm.interpolatedStartDate !== '' || 
              angular.isDefined(vm.interpolatedStartDate)) &&
              (vm.interpolatedEndDate !== '' || angular.isDefined(vm.interpolatedEndDate))) {
                if (vm.interpolatedStartDate > vm.interpolatedEndDate ) {
                        vm.vDateComparison = true;
                    }else{
                        vm.vDateComparison = false;
                    }
                angular.element('input[type="checkbox"]').each(function () {
                    if (angular.element(this).is(":checked")) {
                        vm.checkedAtLeastOne = true;
                    }

                    if (vm.checkedAtLeastOne === true && vm.vDateComparison === true) {
                        vm.checkedErrorMsg = false;
                        vm.startDateCheck = false;
                        vm.endDateCheck = false;
                        vm.vDateComparison = true;
                    } else if(vm.checkedAtLeastOne === false && vm.vDateComparison === true) {
                        vm.checkedErrorMsg = true;
                        vm.startDateCheck = false;
                        vm.endDateCheck = false;
                        vm.vDateComparison = true;
                    }else if(vm.checkedAtLeastOne === false && vm.vDateComparison === false) {
                        vm.checkedErrorMsg = true;
                        vm.startDateCheck = false;
                        vm.endDateCheck = false;
                        vm.vDateComparison = false;
                    }else{
                       vm.checkedErrorMsg = false;
                        vm.startDateCheck = false;
                        vm.endDateCheck = false;
                        vm.vDateComparison = false; 
                    }
                });
            }


        };

        /**
         * reCalculation function to POST the reCalculation request
         * @private
         */
        vm.reCalculation = function () {
            var arr = [];
            _.each($scope.properties_Arr, function (obj) {
                    arr.push(obj.datapointID);
            });
            vm.reCalulationData = {
                "selectedRealtyId": Session.getSelectedRealtyId('selectedRealtyId'),
                "startDate": vm.startDate,
                "endDate": vm.endDate,
                "selectedDataPoints": arr
            };
            if ((vm.startDate !== '' || angular.isDefined(vm.startDate)) &&
                    (vm.endDate !== '' || angular.isDefined(vm.endDate))
                    && (vm.checkedAtLeastOne === true)&& (vm.vDateComparison === false)) {
                var deferment = $q.defer();
                $timeout(function () {
                    Messaging.confirm('Do you really want to recalculate the \n\
        values? The existing values will be removed before!', function (val) {
                        if (val === 'ok') {
                            Calculation.customPOST(vm.reCalulationData).then(function (resp) {
                                deferment.resolve(resp);
                                $scope.properties_Arr = [];
                                vm.checkedErrorMsg = false;
                                vm.startDateCheck = false;
                                vm.endDateCheck = false;
                                $scope.$broadcast('refresh_all');

                            }, function (resp) {
                                deferment.resolve(resp);
                                $scope.properties_Arr = [];
                                $scope.$broadcast('refresh_all');
                            });
                        }

                    });
                }, 1000);
            }
        };

        vm.reCalculationInterpolate = function () {
            var arr = [];
            _.each($scope.properties_Arr, function (obj) {
                    arr.push(obj.datapointID.toString());
            });
            vm.reCalulationData = {
                "selectedRealtyId": Session.getSelectedRealtyId('interpolationRealtyId'),
                "startDate": vm.interpolatedStartDate,
                "endDate": vm.interpolatedEndDate,
                "selectedDataPoints": arr
            };
            if ((vm.interpolatedStartDate !== '' || angular.isDefined(vm.interpolatedStartDate)) && 
                    (vm.interpolatedEndDate !== '' || angular.isDefined(vm.interpolatedEndDate)) &&
                    (vm.checkedAtLeastOne === true) && (vm.vDateComparison === false)) {
                var deferment = $q.defer();
                $timeout(function () {
                    Messaging.confirm('Do you really want to recalculate the values?\n\
      Existing interpolated values will first be deleted!', function (val) {
                        if (val === 'ok') {
                            Interpolation.customPOST(vm.reCalulationData).then(function (resp) {
                                deferment.resolve(resp);
                    $scope.properties_Arr = [];
                    vm.checkedErrorMsg = false;
                    vm.startDateCheck = false;
                    vm.endDateCheck = false;
                    $scope.$broadcast('refresh_all');

                }, function (resp) {
                    deferment.resolve(resp);
                    $scope.properties_Arr = [];
                    $scope.$broadcast('refresh_all');
                });
                        }

                    });
                }, 1000);
            }
        };

    }
})();
