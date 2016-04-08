(function() {
  'use strict';

  describe('controllers: SystemUserUserController', function(){
    var vm,
        $timeout,
        $scope,
        SystemUser;

    beforeEach(module('vitricon'));
    beforeEach(inject(function(_$controller_, _$timeout_, _$rootScope_, _SystemUser_) {
      $scope = _$rootScope_.$new();
      $timeout = _$timeout_;
      SystemUser = _SystemUser_;

      vm = _$controller_('SystemUserUserController', {
        $scope: $scope
      });

     
    }));

    it('submitted should be true', function() {
       expect($scope.submitted).toBe(false);
    });

    it('updateuser should be define', function() {
       expect(vm.updateuser).toBeDefined();
    });

     it('updateuser should be define', function() {
       expect(typeof $scope.getUserData).toBe('function');
       expect(typeof $scope.onUpdateUser).toBe('function');
       expect(typeof $scope.onDeleteUser).toBe('function');
    });

    it('check the get mandator response', function() {
        SystemUser.customGET().then(function (result) {
          angular.forEach(result.data, function(obj, index){
            expect(obj.id).toEqual(jasmine.any(Number));
            expect(obj.mandator).toBeDefined();
            expect(obj.operatorGroup).toBeDefined();
            expect(obj.systemAdmin).toBeDefined();
          });
        });
    });

  });
})();
