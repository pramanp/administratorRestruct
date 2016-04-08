(function() {
  'use strict';

  describe('controllers: UserGroupUserController', function(){
    var vm,
        $timeout,
        $scope,
        Mandator;

    beforeEach(module('vitricon'));
    beforeEach(inject(function(_$controller_, _$timeout_, _$rootScope_, _Mandator_) {
      $scope = _$rootScope_.$new();
      $timeout = _$timeout_;
      Mandator = _Mandator_;

      vm = _$controller_('UserGroupUserController', {
        $scope: $scope
      });

     
    }));

    it('submitted should be true', function() {
       expect($scope.submitted).toBe(false);
    });

    it('updateuser should be define', function() {
       expect(vm.updateuser).toBeDefined();
    });

     it('getData, onUpdateUsergroup, onDeleteUsergroup should be define', function() {
       expect(typeof $scope.getData).toBe('function');
       expect(typeof $scope.onUpdateUsergroup).toBe('function');
       expect(typeof $scope.onDeleteUsergroup).toBe('function');
    });

    it('check the get mandator response', function() {
        Mandator.customGET().then(function (result) {
          angular.forEach(result.data, function(obj, index){
            expect(obj.dbId).toEqual(jasmine.any(Number));
            expect(obj.mandantDTO).toBeDefined();
            expect(obj.isAdminGroup).toBeDefined();
            expect(obj.designator).toBeDefined();
            expect(obj.description).toBeDefined();
          });
        });
    });

  });
})();
