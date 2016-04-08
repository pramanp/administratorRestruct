(function() {
  'use strict';

  describe('controllers: ConfigurationController', function(){
    var vm,
        $timeout,
        $scope,
        Session,
        $q, 
        deferred;

    beforeEach(module('vitricon'));
    beforeEach(inject(function(_$controller_, _$timeout_, _$rootScope_, _Session_, _$q_) {
      $scope = _$rootScope_.$new();
      $timeout = _$timeout_;
      Session = _Session_;
      $q = _$q_;

      vm = _$controller_('ConfigurationController', {
        $scope: $scope
      });

      deferred = _$q_.defer();
      spyOn(Session, 'getCompanyData').and.returnValue(deferred.promise);    
    }));

    it('getMandatorId should be function', function() {
       expect(typeof vm.getMandatorId).toBe('function');
    });

    it('check the get mandator response', function() {
        
        deferred.resolve();
        $scope.$apply();
        expect(vm.options).toBe($scope.result);
        // Session.getCompanyData().then(function (result) { 
        //   expect(vm.options).toBe(result);  
        //     //expect(result.options[0].dbId).toBeDefined();
        //     //expect(result.options[0].dbId).toEqual(jasmine.any(Number));
        // });
    });

    it('should call the getMandatorId', function() {
        vm.getMandatorId();
    });


  });
})();
