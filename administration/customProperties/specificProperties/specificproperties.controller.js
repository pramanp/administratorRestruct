(function () {
    'use strict';
    /**
     * defining the controller : MobileDeviceController
     */
    angular.module('vitricon').
            controller('SpecificPropertyController', specificPropertiesController);

    function specificPropertiesController(SpecificProperties, $state, Messaging, $timeout, Session, $scope, $stateParams) {

        var vm = this;
        $scope.submitted = false;
        $scope.selectedToken = '0';
        vm.selectedDatatype = '0';
        vm.selectedCat = '0';
        vm.notSelectedForSave = false;
        vm.notSelectedForDelete = false;
        $scope.featureData = {
            index: 0,
            displayName: "",
            sorting: 0,
            sortBy: 0,
            instance: "object"
        };
        vm.propertyData = {
            id: 0,
            designator: "",
            dataTypeItem: {
                index: 0,
                displayName: "",
                sorting: 0,
                sortBy: 0,
                instance: "object"
            },
            active: false,
            categoryItem: {
                index: 0,
                displayName: "",
                sorting: 0,
                sortBy: 0,
                instance: "object"
            },
            tokenItem: {
                index: 0,
                displayName: "",
                sorting: 0,
                sortBy: 0,
                instance: "object"
            },
            description: "",
            order: null,
            editable: false
        };
        $scope.dataTypeList = [];
        $scope.categoryList = [];
        $scope.tokenList = [];
        $scope.properties_Arr = [];

        $scope.getTokens = function () {
            SpecificProperties.one('tokens').customPOST($scope.featureData).then(function (resp) {
                $scope.tokenList = resp.data;
                $scope.selectedToken = ''+resp.data[0].index+'';
                vm.propertyData.tokenItem.index = resp.data[0].index;
                vm.propertyData.tokenItem.displayName = resp.data[0].displayName;
            });
        };
        vm.init = function () {
            $scope.is_edit_only = false;

            if (!$stateParams.fId) {
                SpecificProperties.one('feature_table').customGET().then(function (resp) {
                    vm.options = resp.data;
                    vm.properties_index = parseInt(Session.getPropertiesIndex('properties_index')) || vm.options[0].index;
                    if(parseInt(Session.getPropertiesIndex('properties_index')) === 0)
                         vm.properties_index  = parseInt(Session.getPropertiesIndex('properties_index'));
                    $scope.featureData.index = parseInt(Session.getPropertiesIndex('properties_index')) || vm.options[0].index;
                });
            } else {
                vm.properties_index = $stateParams.fId;
                $scope.featureData.index = $stateParams.fId;
                $scope.getTokens();
                SpecificProperties.one('data_type').customGET().then(function (resp) {
                    $scope.dataTypeList = resp.data;
                    //vm.propertyData.dataTypeItem.index = vm.selectedDatatype;
                    //vm.propertyData.dataTypeItem.displayName = resp.data[0].displayName;
                });

                SpecificProperties.customGET('category').then(function (resp) {
                    $scope.categoryList = resp.data;
                    //vm.propertyData.categoryItem.index = vm.selectedDatatype;
                    //vm.propertyData.categoryItem.displayName = resp.data[0].displayName;

                });
            }
        };

        vm.init();

        /**
         * create function to go to create specific properties page
         * @private
         */
        vm.create = function () {
            Session.setPropertiesIndex('properties_index', vm.properties_index);
            $state.go('main.specificproperty', {fId: Session.getPropertiesIndex('properties_index')});
        };

        /**
         * create function to go to create specific section page
         * @private
         */
        vm.createSection = function () {
            $state.go('main.specificsection');
        };

        /**
         * back function to get back to overview specific property grid screen
         * @private
         */
        vm.back = function () {
            $state.go('main.specificproperties');
        };

        /**
         * manange property 
         * @param value
         * @private
         */
        vm.mangeCategories = function () {
            $state.go('main.manageproperty');
        };
        /**
         * reload grid on the check/uncheck of the checkbox
         * @param value
         * @private
         */
        vm.checkboxClick = function (value) {
            Session.setPropertiesIndex('properties_index', vm.properties_index);
            //Session.setIsEditOnly('is_edit_only', value);
            $scope.$broadcast('refresh_all');
        };

        /**
         * Get index of the property load the grid
         * @param value
         * @private
         */
        vm.getPropertiesIndex = function (value) {
            Session.setPropertiesIndex('properties_index', value);
            $scope.featureData.index = value
            //Session.setIsEditOnly('is_edit_only', $scope.is_edit_only);
            $scope.$broadcast('refresh_all');
        };

//        /**
//         * function to save new section
//         * @private
//         */
//        vm.saveSection = function () {
//            SpecificProperties.post(vm.identifier).then(function (resp) {
//                $state.go('main.specificproperties');
//            });
//
//        };

        /**
         * function to save new property
         * @private
         */
        vm.saveProperty = function () {
            SpecificProperties.one('save').customPOST(vm.propertyData, $stateParams.fId).then(function (resp) {
                $state.go('main.specificproperties');
            });
        };

        $scope.getTokenByIndex = function (data) {
            vm.propertyData.tokenItem.index = parseInt(data.id);
            vm.propertyData.tokenItem.displayName = data.designator;
        };
        
        $scope.getDatatypeByIndex = function (data) {
            vm.propertyData.dataTypeItem.index = parseInt(data.id);
            vm.propertyData.dataTypeItem.displayName = data.designator;

        };

        $scope.getCatByIndex = function (data) {
            vm.propertyData.categoryItem.index = parseInt(data.id);
            vm.propertyData.categoryItem.displayName = data.designator;
        };
        /**
         * function to update properties
         * @private
         */
        vm.saveProperties = function () {
            var arr = [];
            _.each($scope.properties_Arr, function (obj) {
                if (obj && obj.active) {
                    arr.push(obj);
                }
            });
            if(arr.length != 0){
                vm.notSelectedForSave = false;
                vm.notSelectedForDelete = false;
               SpecificProperties.one(Session.getPropertiesIndex('properties_index')).customPOST(arr).then(function (resp) {
                $scope.$broadcast('refresh_all');
                $scope.properties_Arr = [];
            },function(resp){
                        $scope.$broadcast('refresh_all');
                    });  
            }else{
                vm.notSelectedForDelete = false;
                vm.notSelectedForSave = true;
            }
        };


        vm.deleteProperties = function () {
            var arr = [];
            _.each($scope.properties_Arr, function (obj) {
                if (obj && obj.active) {
                    arr.push(obj.id);
                }
            });
            if(arr.length != 0){
                vm.notSelectedForDelete = false;
                vm.notSelectedForSave = false;
                $timeout(function(){
                    Messaging.confirm('Do you want to delete these properties?', function(val){
                        if(val === 'ok'){
                             SpecificProperties.one(Session.getPropertiesIndex('properties_index')).customDELETE('',{property_ids:arr.join(',')}).then(function (resp) {
                                $scope.$broadcast('refresh_all');
                                $scope.properties_Arr = [];
                                        },function(resp){
                                        $scope.$broadcast('refresh_all');
                                    });
                        
                        }
                    });
                }, 1000); 
            }else{
                vm.notSelectedForSave = false;    
                vm.notSelectedForDelete = true;
            }
            
            
        };

    }
})();
