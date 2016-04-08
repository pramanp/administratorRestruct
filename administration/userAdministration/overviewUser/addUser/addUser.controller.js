(function () {
    'use strict';

    angular.module('vitricon').
            controller('AddUserController', adduserController);

    function adduserController($scope, $state, $stateParams, Customer, User, 
     SystemUser, Messaging, SystemUserLock, SystemUserUnlock, 
      AssignOrgToUserModal, Mandator) {

        var vm = this;
        $scope.submitted = false;
        vm.customerName = '0';
        vm.orgLabel = '';
        //vm.selectedMandator = {};
        vm.selectedMandator = '';
        //vm.selectedUsergroup = {};
        //vm.profiles = {};
        vm.selectedUsergroup = '';
        vm.profiles = '';
        vm.isAssignOrg = true;
        vm.operatorgrpDesignator = '';
        vm.updateuser = {
            id: 0,
            login: "",
            lastLogin: "",
            lockReason: "",
            mandator: {
                id: 0,
                token: "",
                description: "",
                designator: "",
                note: "",
                displayName: "",
                license: "",
                customerDTO: {
                  id: 0,
                  designator: ""
                }
              },
            organisationUnit: {
                id: 0,
                selectedUnit: "",
                designation: ""
            },
            operatorGroup: {
                id: 0,
                designator: "",
                description: "",
                    isAdminGroup: false,
                    note: "",
                    createdBy: "",
                    createdDate: "",
                    editedBy: "",
                    numberOfUser: 0,
               mandantDTO: {
                    id: 0,
                    token: "",
                    description: "",
                    designator: "",
                    note: "",
                    displayName: "",
                    license: "",
                    customerDTO: {
                      id: 0,
                      designator: ""
                    }
                  }
            },
            notes: "",
            password: "",
            confirmPassword: "",
            role: "",
            defaultProfile: "",
            locked: false,
            ldap: false,
            systemAdmin: false
        }

        vm.mandant = [];
        vm.mandantusergroup = [];
        vm.defaultProfile = [];
         
        Customer.customGET().then(function (resp) {
                   vm.customerNameList = resp.data;
                   vm.customerName = vm.customerNameList[0].id;
                   vm.updateuser.operatorGroup.mandantDTO.customerDTO.id = vm.customerNameList[0].id;
                   vm.updateuser.operatorGroup.mandantDTO.customerDTO.designator = vm.customerNameList[0].designator;
            if(vm.customerNameList.length>1){
                vm.showCstNameList = true;
            }
            }); 
         
        Mandator.customGET().then(function (result) {
            vm.mandant = result.data;
        });

        $scope.onUpdateUser = function () {
            if (vm.updateuser.id == null || vm.updateuser.id == 0) {
                delete vm.updateuser.id;
                SystemUser.post(vm.updateuser).then(function (resp) {
                    $state.go('main.sysusers');
                    $scope.$emit('refresh_tree', {action: 'add', id: 'usr', data: resp.data});
                });
            } else {
                vm.updateuser.operatorGroup.mandantDTO = {};
                SystemUser.one(vm.updateuser.id).customPUT(vm.updateuser).then(function(resp){
                    $scope.$emit('refresh_tree', {action: 'delete', key: 'usr/' + vm.updateuser.id});
                    $scope.$emit('refresh_tree', {action: 'add', id: 'usr', data: vm.updateuser});
                });
            }


        };
        
        /**
         * getCustomerName function to get the value of the customer name select box.
         * @private
         */
        $scope.getCustomerName = function (data) {
            vm.customerName = data.id;
           vm.updateuser.operatorGroup.mandantDTO.customerDTO.id = data.id;
           vm.updateuser.operatorGroup.mandantDTO.customerDTO.designator = data.designator;
        };
        

        $scope.onDeleteUser = function () {
            Messaging.confirm('Are you sure?', function (val) {
                var deleteChildren = (val === 'ok');
                SystemUser.one($stateParams.userdata).customDELETE('', {deleteChildrenUser: deleteChildren}).then(function (response) {
                    if (response.status.code === '0')
                        $state.go('main.sysusers');

                    $scope.$emit('refresh_tree', {action: 'delete', key: 'usr/' + $stateParams.userdata});
                });
            });
        }


        $scope.onlockAcc = function () {
            var reason = vm.lockReason;
            SystemUserLock.one($stateParams.userdata).customPUT({id: $stateParams.userdata, lockReason: reason});
        }

        $scope.onUnlockAcc = function () {
            SystemUserUnlock.one($stateParams.userdata).customPUT();
        }

        $scope.openOrganisation = function () {
            var dbId;

            if (vm.selectedMandator) {
                dbId = vm.selectedMandator;
            } else {
                dbId = 0;
            }
            AssignOrgToUserModal.open(dbId, function (resp, orgData) {
                $scope.$apply(function (){
                    vm.orgLabel = resp;
                })
                vm.updateuser.organisationUnit = orgData;
            });


        }

        $scope.getUserGroupBymId = function (data) {
            if (data && data.id) {
                vm.updateuser.mandator = data;
                if (data.id != 0) {

                    Mandator.one(data.id).customGET('user_groups').then(function (resp) {
                        vm.mandantusergroup = resp.data;
                        vm.selectedUsergroup = '' + resp.data[0].id + '';
                        vm.updateuser.operatorGroup.id = resp.data[0].id;
                        vm.updateuser.operatorGroup.designator = resp.data[0].designator;

                    });
                } else {
                    User.customGET('', {is_admin_group: true}).then(function (resp) {
                        if(resp.data[0]){
                            vm.mandantusergroup = resp.data;
                            vm.selectedUsergroup = '' + resp.data[0].id + '';
                            vm.updateuser.operatorGroup.id = resp.data[0].id;
                            vm.updateuser.operatorGroup.designator = resp.data[0].designator;
                        }
                    });
                }

            }
        }

        $scope.getProfileByuId = function (data) {
            var userId;
            if ($stateParams.userdata)
                userId = $stateParams.userdata;
            else
                userId = 0;
            if (data && data.id) {
                if (data.designator) {
                    vm.updateuser.operatorGroup.id = data.id;
                    vm.updateuser.operatorGroup.designator = data.designator;
                }
                SystemUser.one('profile').customGET(data.id + '/' + userId).then(function (resp) {
                    vm.defaultProfile = resp.data;
                    vm.profiles = '0';
                    vm.updateuser.defaultProfile = resp.data[0];
                });
            }

        }

        $scope.getSelectedProfile = function (data) {
            if (data.designator)
                vm.updateuser.defaultProfile = data.designator;
        }

        $scope.backToRoot = function () {
            $state.go('main.sysusers');
        }
        
        $scope.bottomToolTip = {
            "adminadduser" : [
                {
                    "heading":"sysadmin.help.adduser.Note",
                    "content":"sysadmin.help.adduser.Note_Text"
                }
               
            ]
        };

    }
})();