(function () {
    'use strict';
    /**
     * defining the controller : MobileDeviceController
     */
    angular.module('vitricon').
            controller('CustomPropertiesController', customPropertiesController);

    function customPropertiesController($scope, $state, CustomProperties,
        Messaging, $timeout, Properties, $stateParams) {

        var vm = this;
        $scope.$on('clickOnTree', function () {
            $scope.$apply(function () {
                $scope.createCat = false;
                $scope.createProp = false;
                $scope.getDefaultTab();
            });

        });
        vm.init = function () {
            
            $scope.createCat = false;
            $scope.createProp = false;
            vm.isCheckbox = false;
            vm.isTextBox = false;
            vm.isNumber = false;
            vm.listErrorMore = false;
            vm.listErrorLess = false;
            vm.isTextArea = false;
            vm.checkedErrorMsg = false;
            vm.notSelected = false;
            vm.notSelectedForDelete = false;
            vm.checkedAtLeastOne = false;

            vm.createPropertyData = {
                "pId": 0,
                "designator": "",
                "cId": 0,
                "dataType": {
                    "index": 0,
                    "displayName": "",
                    "sorting": 0,
                    "sortBy": 0,
                    "instance": "object"
                },
                "defaultValue": ""
            };

            Properties.one('data_type').customGET().then(function (resp) {
                vm.dataTypeList = resp.data;
                vm.createPropertyData.dataType.index = vm.dataTypeList[0].index;

            });

            Properties.customGET().then(function (resp) {
                vm.categoryList = resp.data;
                vm.createPropertyData.cId = vm.categoryList[0].categoryId;
            });
            vm.designatorReq = false;
            vm.createCategory = {};
            vm.createCategory.designator = '';
            vm.createCategory.visibleAdministration = false;
            vm.createCategory.visibleRealty = false;
            vm.createCategory.visibleConstruction = false;
            vm.createCategory.visibleBuilding = false;
            vm.createCategory.visibleOutsideInstallation = false;
            vm.createCategory.visibleInstallation = false;
            vm.createCategory.visibleInstallationPart = false;
            vm.createCategory.visibleDevice = false;
            vm.createCategory.visibleMains = false;
            vm.createCategory.visibleMainsPart = false;
            vm.createCategory.visibleFloor = false;
            vm.createCategory.visibleRoom = false;
            vm.createCategory.visibleISP = false;
            vm.createCategory.visibleController = false;
            vm.createCategory.visibleOrganisation = false;
            vm.createCategory.visibleDivision = false;
            vm.createCategory.visibleDepartment = false;
            vm.createCategory.visiblePerson = false;
            vm.createCategory.visibleArticle = false;
            vm.createCategory.visibleInventory = false;
            vm.createCategory.visibleProject = false;
            vm.createCategory.visibleTaskPacket = false;
            vm.createCategory.visibleLockingAdministration = false;
            vm.createCategory.visibleLockingSystem = false;
            vm.createCategory.visibleLockingGroup = false;
            vm.createCategory.visibleLock = false;
            vm.createCategory.visibleKey = false;
            vm.createCategory.visibleLeaseUnit = false;

            if ($stateParams.editCategory) {

            }
        };

        vm.init();

        $scope.properties_Arr = [];
        /**
         * back function to get back to overview category grid screen
         * @private
         */
        vm.back = function () {
            $scope.createCat = false;
            $state.go('main.customproperties');
        };
        $scope.getDefaultvalueById = function (data) {
            if ((data && data.id === '4') || (data && data.id === '5')) {
                vm.isCheckbox = false;
                vm.isTextBox = false;
                vm.isTextArea = false;
                vm.isNumber = false;
                vm.isTable = false;                
            } else if (data && data.id === '1') {
                vm.isTextBox = true;
                vm.isNumber = false;
                vm.isCheckbox = false;
                vm.isTextArea = false;
                vm.isTable = false;
            } else if (data && data.id === '2') {
                vm.isNumber = true;
                vm.isTextArea = false;
                vm.isCheckbox = false;
                vm.isTextBox = false;
                vm.isTable = false;
            } else if (data && data.id === '6') {
                vm.isTextArea = true;
                vm.isTextBox = false;
                vm.isNumber = false;
                vm.isCheckbox = false;
                vm.isTable = false;
            } else if (data && data.id === '3') {
                vm.isCheckbox = true;
                vm.isNumber = false;
                vm.isTextBox = false;
                vm.isTextArea = false;
                vm.isTable = false;
            }else if((data && data.id === '8') || (data && data.id === '7')){
                 vm.isCheckbox = false;
                vm.isNumber = false;
                vm.isTextBox = false;
                vm.isTextArea = false;
                vm.isTable = true;
            }

        };
        /**
         * back function to get back to overview property grid screen
         * @private
         */
        vm.backToProperties = function () {
            $scope.createProp = false;
            $state.go('main.customproperties');
        };


        /**
         * create function to go to create category screen
         * @private
         */
        vm.create = function () {
            vm.checkedErrorMsg = false;
            vm.createPropertyData.designator = '';
            $scope.createCat = true;
        };

        /**
         * create function to go to create category screen
         * @private
         */
        vm.createProperty = function () {
            vm.notSelected = false;
            vm.notSelectedForDelete = false;
            $scope.createProp = true;
        };

        /**
         * save function to save new property or update old property details
         * @private
         */
        vm.saveProperty = function () {
            if(vm.createPropertyData.dataType.index === '7'){
              var count = ((vm.createPropertyData.defaultValue.split('!').length) -1);
                 if(count === 0){
                     vm.listErrorLess = true;
                     vm.listErrorMore = false;
                 }else if(count>1){
                     vm.listErrorMore = true;
                     vm.listErrorLess = false;
                    }else{
                     vm.listErrorMore = false;
                     vm.listErrorLess = false;
                     Properties.post(vm.createPropertyData).then(function (resp) {
                        $scope.createProp = false;
                        vm.createPropertyData.designator = '';
                        vm.createPropertyData.defaultValue = '';
                        $state.go('main.customproperties');

                    });
                 }
                
            }else{
                Properties.post(vm.createPropertyData).then(function (resp) {
                $scope.createProp = false;
                vm.createPropertyData.designator = '';
                vm.createPropertyData.defaultValue = '';
                $state.go('main.customproperties');

            });
            }
            
        };

        /**
         * save function to save the edited properties details
         * @private
         */
        vm.editProperty = function () {
            var arr = [];
            _.each($scope.properties_Arr, function (obj) {
                if (obj && obj.active) {
                    var createPropertyData = {
                        "pId": 0,
                        "designator": "",
                        "cId": 0,
                        "dataType": {
                            "index": 0,
                            "displayName": "",
                            "sorting": 0,
                            "sortBy": 0,
                            "instance": "object"
                        },
                        "defaultValue": ""
                    };
                    createPropertyData.pId = obj.id;
                    createPropertyData.designator = obj.designator;
                    createPropertyData.cId = obj.categoryId;
                    createPropertyData.dataType.index = obj.specialMaskDataTypeId;
                    createPropertyData.defaultValue = obj.defaultValue;
                    arr.push(createPropertyData);
                }
                ;
            });
            if (arr.length !== 0) {
                vm.notSelected = false;
                vm.notSelectedForDelete = false;
                Properties.one().customPUT(arr).then(function () {
                    $scope.properties_Arr = [];
                    $scope.$broadcast('refresh_all');
                }, function () {
                    $scope.properties_Arr = [];
                    $scope.$broadcast('refresh_all');
                });
            } else {
                vm.notSelectedForDelete = false;
                vm.notSelected = true;
            }

        };
        /**
         * delete function to delete multiple properties
         * @private
         */
        vm.deleteProperty = function () {
            var arr = [];
            _.each($scope.properties_Arr, function (obj) {
                if (obj && obj.active) {
                    arr.push(obj.id);
                }
            });
            if (arr.length !== 0) {
                vm.notSelectedForDelete = false;
                vm.notSelected = false;
                $timeout(function () {
                    Messaging.confirm('Do you want to delete these properties?', function (val) {
                        if (val === 'ok') {
                            Properties.one().customDELETE('', {property_ids: arr.join(',')}).then(function () {
                                $scope.$broadcast('refresh_all');
                                $scope.properties_Arr = [];
                            }, function () {
                                $scope.$broadcast('refresh_all');
                            });

                        }
                    });
                }, 1000);
            } else {
                vm.notSelected = false;
                vm.notSelectedForDelete = true;

            }
        };

        /**
         * save function to save new category
         * @private
         */
        
        vm.checkBoxTest = function(){
             vm.checkedAtLeastOne = false;
             vm.checkedErrorMsg = false;
             if((vm.createCategory.designator !== '') && (vm.createCategory.designator !== undefined)){
                        $('input[type="checkbox"]').each(function () {
                       if ($(this).is(":checked")) {
                           vm.checkedAtLeastOne = true;
                       }
                      });
                        if(vm.checkedAtLeastOne === true){
                            vm.checkedErrorMsg = false;
                        }else{
                            vm.checkedErrorMsg = true;
                        };
             }
        };
        vm.save = function () {
            if ((vm.createCategory.designator !== '') && (vm.checkedAtLeastOne === true)) {
                CustomProperties.post(vm.createCategory).then(function (resp) {
                    $scope.createCat = false;
                    vm.checkedErrorMsg = false;
                    vm.createCategory.designator = '';
                    vm.createCategory = '';
                    Properties.customGET().then(function (resp) {
                        vm.categoryList = resp.data;
                        vm.createPropertyData.cId = vm.categoryList[0].categoryId;
                    });
                    $state.go('main.customproperties');

                });
            } 
            ;
        };

    }
})();
