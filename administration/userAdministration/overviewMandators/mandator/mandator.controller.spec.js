(function() {
  'use strict';

  describe('controllers: MandatorController', function(){
    var vm,
        $timeout,
        $scope,
        Mandator;

    beforeEach(module('vitricon'));
    beforeEach(inject(function(_$controller_, _$timeout_, _$rootScope_, _Mandator_) {
      $scope = _$rootScope_.$new();
      $timeout = _$timeout_;
      Mandator = _Mandator_;

      vm = _$controller_('MandatorController', {
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
       expect(typeof $scope.getMandatorData).toBe('function');
       expect(typeof $scope.onUpdateMandator).toBe('function');
       expect(typeof $scope.onDeleteMandator).toBe('function');
    });

    it('check the get mandator response', function() {
        Mandator.customGET().then(function (result) {
          angular.forEach(result.data, function(obj, index){
            expect(obj.dbId).toBeDefined();
            expect(obj.dbId).toEqual(jasmine.any(Number));
            expect(obj.designator).toBeDefined();
            expect(obj.description).toBeDefined();
          });
        });
    });

  });
})();
