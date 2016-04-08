(function () {
    'use strict';

    angular.module('vitricon').
    controller('SystemUserUserController', systemuseruserController);

    function systemuseruserController($scope, $state,toastr, $stateParams, User,
    SystemUser, Messaging, SystemUserLock, SystemUserUnlock, AssignOrgToUserModal,
       Mandator) {

        var vm = this;
        $scope.submitted = false;
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
                designator: ""
            },
            organisationUnit: {
                id: 0,
                selectedUnit: ""
            },
            operatorGroup: {
                id: 0,
                designator: "",
                mandantDTO: {}

            },
            notes: "",
            password: "",
            confirmPassword: "",
            role: "",
            defaultProfile: "",
            locked: false,
            ldap: false,
            systemAdmin: false
        };

        vm.mandant = [];
        vm.mandantusergroup = [];
        vm.defaultProfile = [];

        Mandator.customGET().then(function (result) {
            vm.mandant = result.data;
//            User.one('user_groups').customGET().then(function (result) {
//
//            });
        });
        $scope.getUserData = function () {
            return SystemUser.one($stateParams.userdata).get().then(function (resp) {
                vm.updateuser = resp.data;
                vm.operatorgrpDesignator = vm.updateuser.operatorGroup.designator;
                if(vm.updateuser.mandator)
                    vm.selectedMandator = '' + vm.updateuser.mandator.id + '';
                else
                    vm.selectedMandator = '';
                vm.selectedUsergroup = '' + vm.updateuser.operatorGroup.id + '';
                $scope.usergroup = vm.selectedUsergroup;

                if(resp.data.organisationUnit)
                    vm.orgLabel = resp.data.organisationUnit.designation;

                $scope.lockedMsg = vm.updateuser.locked ? "Account is locked" : 'Account is unlocked';
            });
        };

        $scope.onUpdateUser = function () {

            if (vm.updateuser.id === null || vm.updateuser.id == 0) {

                delete vm.updateuser.id;
                SystemUser.post(vm.updateuser).then(function (response) {
                    $state.go('main.sysusers');
                    $scope.$emit('refresh_tree', {action: 'add', id: 'usr', data: response.data});
                });
            } else {
                if(vm.updateuser.systemAdmin == false){
                    vm.updateuser.operatorGroup.mandantDTO = {};
                    SystemUser.one(vm.updateuser.id).customPUT(vm.updateuser).then(function (response) {
                        $state.go('main.sysusers');
                        $scope.$emit('refresh_tree', {action: 'delete', key: 'usr/' + vm.updateuser.id});
                        $scope.$emit('refresh_tree', {action: 'add', id: 'usr', data: vm.updateuser});
                    });
                }
                else{
                    toastr.error("Can't edit admin user");
                }
                    
                
            }


        };

        $scope.onDeleteUser = function () {
            if(vm.updateuser.systemAdmin == false){
                Messaging.confirm('Do you really want to delete this user ?', function (val) {
                    var deleteChildren = (val === 'ok');
                    if (val == 'ok') {
                        SystemUser.one($stateParams.userdata).customDELETE('', {deleteChildrenUser: deleteChildren}).then(function (response) {
                            if (response.status.code === '0')
                                $state.go('main.sysusers');

                            $scope.$emit('refresh_tree', {action: 'delete', key: 'usr/' + $stateParams.userdata})
                        });
                    }

                });
            }
            else{
                    toastr.error("Can't delete admin user");
                }
        };


        $scope.onlockAcc = function () {
            var reason = vm.updateuser.lockReason;
            if(vm.updateuser.lockReason){
                SystemUserLock.one($stateParams.userdata).customPUT({
                    id: $stateParams.userdata,
                    lockReason: reason
                }).then(function (resp) {
                    $scope.lockedMsg = 'Account is locked';
                });
            }
        };

        $scope.onUnlockAcc = function () {
            SystemUserUnlock.one($stateParams.userdata).customPUT().then(function (resp) {
                $scope.lockedMsg = 'Account is unlocked';
                vm.updateuser.lockReason = '';
            });
        };

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
        };

        $scope.getUserGroupBymId = function (data) {
            if (data && data.id) {
                vm.updateuser.mandator = data;
                if (data.id != 0) {

                    Mandator.one(data.id).customGET('user_groups').then(function (resp) {
                        vm.mandantusergroup = resp.data;
                        vm.selectedUsergroup = '' + vm.updateuser.operatorGroup.id + '';
                        vm.updateuser.operatorGroup.id = vm.selectedUsergroup;
                        vm.updateuser.operatorGroup.designator = resp.data[0].designator;

                    });
                } else {
                    User.customGET('', {is_admin_group: true}).then(function (resp) {
                        if (resp.data[0]) {
                            vm.mandantusergroup = resp.data;
                            vm.selectedUsergroup = '' + vm.updateuser.operatorGroup.id + '';
                            vm.updateuser.operatorGroup.id = vm.selectedUsergroup;

                            vm.updateuser.operatorGroup.designator = resp.data[0].designator;
                        }

                    });
                }
            }
        };

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

        };

        $scope.getSelectedProfile = function (data) {
            vm.updateuser.defaultProfile = data.designator;
        };

        $scope.backToRoot = function () {
            $state.go('main.sysusers');
        };
        
           
        $scope.bottomToolTip = {
             "usermasterdata" : 
             [
                {
                    "heading":"sysadmin.help.adduser.Note",
                    "content":"sysadmin.help.adduser.Note_Text"
                }
            ],
            
             "Datarights" : 
             [
                {
                    "heading":"sysadmin.help.adduser.Operatorrights",
                    "content":"sysadmin.help.adduser.Operatorrights_Text"
                }
            ],
            
            
        };

    }
})();
