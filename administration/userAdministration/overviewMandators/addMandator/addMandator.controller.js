(function () {
    'use strict';

    angular.module('vitricon').
            controller('AddMandatorController', addmandatorController);

    function addmandatorController($scope, $state, $stateParams, Session, Resources, User, SystemUser, Messaging, SystemUserLock, SystemUserUnlock, OrganisationModal, Mandator) {

        var vm = this;
        $scope.submitted = false;
        vm.orgLabel = '';
        vm.selectedMandator = {};
        vm.selectedUsergroup = {};
        vm.profiles = {};

        vm.updateuser = {
            id: 0,
            login: "",
            lastLogin: "",
            lockReason: "",
            mandator: {
                id: 0
            },
            organisationUnit: {
                id: 0,
                selectedUnit: ""
            },
            operatorGroup: {
                id: 0

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
        
        $scope.onUpdateUser = function () {

            if (vm.updateuser.password != '' && vm.updateuser.confirmpassword != '') {
                vm.updateuser.mandator.id = vm.selectedMandator.dbId;
                if (vm.updateuser.id === null || vm.updateuser.id == 0) {
                    delete vm.updateuser.id;
                    SystemUser.post(vm.updateuser);
                } else {
                    SystemUser.one(vm.updateuser.id).customPUT(vm.updateuser).then(function (resp) {
                        $state.go("main.mandators");

                    });
                }
            }

        };

        $scope.openOrganisation = function () {
            OrganisationModal.open(vm.selectedMandator.dbId, function (resp, orgData) {
                vm.orgLabel = resp;
                vm.updateuser.organisationUnit = orgData;
            });
        };

        $scope.getUserGroupBymId = function (data) {
            if (data && data.dbId) {
                Mandator.one(data.dbId).customGET('user_groups').then(function (resp) {
                    vm.mandantusergroup = resp.data;                    
                });
            }
        };

        $scope.getProfileByuId = function (data) {
            var userId;
            if ($stateParams.userdata)
                userId = $stateParams.userdata;
            else
                userId = 0;
            if (data && data.id) {
                vm.updateuser.operatorGroup.id = data.id;
                SystemUser.one('profile').customGET(data.id + '/' + userId).then(function (resp) {
                    vm.profiles = resp.data;
                });
            }

        };

        $scope.getSelectedProfile = function (data) {
            vm.updateuser.defaultProfile = data;
        };

    }
})();
