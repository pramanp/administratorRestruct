(function () {
    'use strict';

    angular.module('vitricon').
            controller('UserGroupUserController', usergroupuserController);

    function usergroupuserController($scope, $state, $timeout, $stateParams, Session, Resources, User, Messaging, Mandator) {
        var vm = this;

        $scope.submitted = false;
        vm.deleteChildUser = false;
        vm.selectedMandator = '';
        vm.isAdminGroup = false;
        //vm.selectedMandator = {};
        vm.updateuser = {
            designator: '',
            mandantDTO: {},
            description: '',
            note: '',
            isAdminGroup: false,
            createdBy: Session.getSessionData('first_name'),
            editedBy: Session.getSessionData('first_name')
        };

        vm.mandant = [];

        Mandator.customGET().then(function (result) {
            vm.mandant = result.data;
        });

        $scope.getData = function () {

            return User.one($stateParams.userdata).get().then(function (resp) {
                vm.updateuser = resp.data;
                vm.selectedMandator = '' + vm.updateuser.mandantDTO.id + '';
                //vm.selectedMandator = vm.updateuser.mandantDTO;
                vm.updateuser.createdBy = Session.getSessionData('first_name');
                vm.updateuser.editedBy = Session.getSessionData('first_name');
                vm.isAdminGroup = vm.updateuser.isAdminGroup;
            });
        }


        $scope.onUpdateUsergroup = function () {
            if (vm.updateuser.designator != '') {
                User.one($stateParams.userdata).customPUT(vm.updateuser).then(function (resp) {
                    $state.go("main.adminusergroups");
                    $scope.$emit('refresh_tree', {action: 'delete', key: 'ugrp/' + $stateParams.userdata});
                    $scope.$emit('refresh_tree', {action: 'add', id: 'ugrp', data: vm.updateuser});
                });
            }
        }

        $scope.onDeleteUsergroup = function () {
         
            Messaging.confirm('Do you really want to delete this user group?', function (val) {
                if (val === 'ok') {
                    if (vm.deleteChildUser) {
                         vm.childError = false;
                        User.one($stateParams.userdata).customDELETE('', {deleteChildrenUser: true}).then(function (response) {
                            if (response.status.code === '0')
                                $state.go('main.adminusergroups');
                            $scope.$emit('refresh_tree', {action: 'delete', key: 'ugrp/' + $stateParams.userdata})
                        });

                    }
                    else{
                        vm.childError = true;
                    }
                }
            });
        }

        $scope.getMandantBymId = function (data) {
            if (data && data.id) {
                vm.updateuser.mandantDTO = data;
                vm.selectedMandator = data.id;
            }
        }
          $scope.bottomToolTip = {
             "groupmasterdata" : 
             [
                {
                    "heading":"sysadmin.help.adduser.Usergroupmasterdata",
                    "content":"sysadmin.help.adduser.Usergroupmasterdata_Text"
                }
            ]
                        
        };

    }
})();
