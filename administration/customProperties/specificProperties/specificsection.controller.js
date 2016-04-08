(function () {
    'use strict';
    /**
     * defining the controller : MobileDeviceController
     */
    angular.module('vitricon').
            controller('SpecificSectionController', specificSectionController);

    function specificSectionController(SpecificProperties, $state, Session, $scope, $stateParams) {

        var vm = this;
        $scope.submitted = false;
        
        vm.sectionData = {
            id: 0,
            designator: "",
            token: "",
            active: false
        }
        vm.categoryArr = [];
        vm.updateCategoryArr = [];
        vm.category_Arr = [];
        
        $scope.getCategory = function ( ){
            SpecificProperties.one('categories').customGET().then(function (resp) {
                vm.categoryArr = resp.data;
            });
        }
        
        $scope.getCheckedRow = function (index,data,isChecked){
            data.active = isChecked;
            vm.updateCategoryArr[index] = data;
            
        }

        /**
         * back function to get back to overview specific property grid screen
         * @private
         */
        vm.back = function () {
            $state.go('main.specificproperties');
        };

        /**
         * Get index of the property load the grid
         * @param value
         * @private
         */
        vm.getPropertiesIndex = function (value) {
            Session.setPropertiesIndex('properties_index', value);
            vm.featureData.index = value
            Session.setIsEditOnly('is_edit_only', vm.is_edit_only);
            $scope.$broadcast('refresh_all');
        }

        /**
         * function to save new section
         * @private
         */
        vm.saveSection = function () {
            vm.sectionData.id = Session.getPropertiesIndex('properties_index');
            SpecificProperties.one('category').customPOST(vm.sectionData).then(function (resp) {
                $state.go('main.specificproperties');
            });
       
        };
        
        /**
         * function to save categories
         * @private
         */
        vm.saveCategory = function () {
            vm.category_Arr = [];
            _.each(vm.updateCategoryArr, function (obj){
                if(obj && obj.active)
                    vm.category_Arr.push(obj);
            });
            SpecificProperties.one('categories').customPUT(vm.category_Arr).then(function (resp) {
                $state.go('main.specificproperties');
            });
       
        };
        
        /**
         * function to delete categories
         * @private
         */
        vm.deleteCategory = function () {
            vm.category_Arr = [];
            _.each(vm.updateCategoryArr, function (obj){
                if(obj && obj.active){
                    vm.category_Arr.push(obj.id);
                }
                    
            });
            SpecificProperties.one('categories').customDELETE('',{category_ids:vm.category_Arr.join(',')}).then(function (resp) {
                //$state.go('main.specificproperties');
                $scope.getCategory();
            });
       
        };

    }
})();
