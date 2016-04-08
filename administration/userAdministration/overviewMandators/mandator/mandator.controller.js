(function () {
    'use strict';

    angular.module('vitricon').
            controller('MandatorController', mandatorController);

    function mandatorController($scope, $state, Customer, $stateParams, Session, Resources, Mandator, Messaging) {
        var vm = this;
        vm.showCstNameList = false;
        vm.customerNameList = [];
        vm.selectedMandator = {};
        vm.customerName = '0';
        $scope.submitted = false;
        vm.updateuser = {
            dbId: 0,
            designator: "",
            description: "",
            countOperator: "",
            countAdministration: "",
            countArticle: "",
            countInventory: "",
            countDocument: "",
            countDocumentLevel: "",
            countOrganisation: "",
            token: '',
            notes: '',
            customerDTO: {
                id: 0,
                designator: ""
              }
        };

        vm.mandant = [];
        vm.mandantusergroup = [];
        vm.defaultProfile = [];
 
        Customer.customGET().then(function (resp) {

                   vm.customerNameList = resp.data;
                   vm.customerName = vm.customerNameList[0].id;
                   vm.updateuser.customerDTO.id = vm.customerNameList[0].id;
                   vm.updateuser.customerDTO.designator = vm.customerNameList[0].designator;
            if(vm.customerNameList.length>1){
                vm.showCstNameList = true;
            }
            });
         
        Mandator.customGET().then(function (result) {
            vm.mandant = result.data;
        });

        $scope.getMandatorData = function () {

            return Mandator.one($stateParams.userdata).get().then(function (resp) {

                vm.updateuser = resp.data;
                vm.customerName = ''+vm.updateuser.customerDTO.id+'';
                vm.updateuser.createdBy = Session.getSessionData('first_name');
                vm.updateuser.editedBy = Session.getSessionData('first_name');
                vm.updateuser.dbId = vm.updateuser.id;

            });
        };
        
        /**
         * getCustomerName function to get the value of the customer name select box.
         * @private
         */
        $scope.getCustomerName = function (data) {

            vm.customerName = data.id;
           vm.updateuser.customerDTO.id = data.id;
           vm.updateuser.customerDTO.designator = data.designator;
        };

        $scope.onUpdateMandator = function () {
            
            if (!vm.updateuser.dbId) {
                delete vm.updateuser.dbId;
                vm.updateuser.customerDTO.id = parseInt(vm.updateuser.customerDTO.id); 
                Mandator.post(vm.updateuser).then(function (response) {
                    $state.go('main.mandators');
                    $scope.$emit('refresh_tree', {action: 'add', id: 'man', data: response.data});
                });
            } else {
                //vm.updateuser.designator = vm.selectedMandator.designator;
                Mandator.one(vm.updateuser.dbId).customPUT(vm.updateuser).then(function () {
                    $state.go('main.mandators');
                    $scope.$emit('refresh_tree', {action: 'delete', key: 'man/' + $stateParams.userdata});
                    $scope.$emit('refresh_tree', {action: 'add', id: 'man', data: vm.updateuser});
                });
            }
        };

        $scope.onDeleteMandator = function () {
            Messaging.confirm('Do you really want to delete this mandator?', function (val) {
                if (val === 'ok') {
                    Mandator.one($stateParams.userdata).customDELETE().then(function (response) {
                        if (response.status.code === '0')
                            $state.go('main.mandators');

                        $scope.$emit('refresh_tree', {action: 'delete', key: 'man/' + $stateParams.userdata});
                    });
                }

            });
        };

        $scope.onLinkMandator = function () {
            $state.go('main.linkmandator');
        };

        $scope.backToRoot = function () {
            $state.go('main.mandators');
        };

    }
})();
