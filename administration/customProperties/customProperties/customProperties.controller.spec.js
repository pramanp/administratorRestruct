(function() {
  'use strict';

  describe('controllers: CustomPropertiesController', function(){
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

      vm = _$controller_('CustomPropertiesController', {
        $scope: $scope
      });

      deferred = _$q_.defer();
      
    }));

    


  });
})();
