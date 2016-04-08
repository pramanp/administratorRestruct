(function() {
  'use strict';

  describe('controllers: MobileDeviceController', function(){
    var vm,
        $timeout,
        $scope,
        ConfigurationMobileDevice,
        Session,
        $q,
        $stateParams;

    beforeEach(module('vitricon'));
    beforeEach(inject(function(_$controller_, _$timeout_, _$rootScope_, _ConfigurationMobileDevice_, _Session_, _$q_, _$stateParams_) {
      $scope = _$rootScope_.$new();
      $timeout = _$timeout_;
      ConfigurationMobileDevice = _ConfigurationMobileDevice_;
      $q = _$q_;
      $stateParams = _$stateParams_;

      vm = _$controller_('MobileDeviceController', {
        $scope: $scope
      });


    }));

    it('addDevice should be object', function() {
        expect(typeof vm.addDevice).toBeDefined();
        expect(typeof vm.addDevice).toBe('object');
    }); 

    it('save, delete, onAddConnection should be function', function() {
       expect(typeof vm.save).toBe('function');
       expect(typeof vm.delete).toBe('function');
       expect(typeof vm.onAddConnection).toBe('function');
    });


    it('showDelete, showDeleteMsg, connectionAdded values', function() {
       expect(vm.showDelete).toBe(false);
       expect(vm.showDeleteMsg).toBe(false);
       expect(vm.connectionAdded).toBe(false);
    });


    it('check the get mandator response', function() {
        ConfigurationMobileDevice.customGET().then(function (result) {
            expect(result.data.id).toBeDefined();
            expect(result.data.id).toEqual(jasmine.any(Number));
            expect(result.data.username).toBeDefined();
            expect(result.data.password).toBeDefined();
        });
    });

    it('check the get mandator response for single record', function() {
         expect(vm.options).toBeDefined();
         expect(vm.addDevice.connectionTpye).toBeDefined();
    });

    it('check onAddConnection function', function() {
         vm.onAddConnection();
         vm.back();
         vm.save();
         vm.delete();
    });

    it('check configurationMobileDevice function', function() {
        var response = {data:{}};
        spyOn(ConfigurationMobileDevice.one('type'), 'init').and.callFake(function() {
          var deferred = $q.defer();
          deferred.resolve(response);
          return deferred.promise;
        });

        $scope.$apply(function() {
          $scope.init();
        });

        expect(ConfigurationMobileDevice.one('type').customGET).toHaveBeenCalled();
    });


  });
})();
