(function() {
  'use strict';


  describe('Directive: vcConfigurationMobileDeviceGrid', function(){
    var $compile,
        $rootScope,
        element;
    beforeEach(module('vitricon'));
    beforeEach(inject(function(_$rootScope_, _$compile_) {
      
      $compile = _$compile_;
      $rootScope = _$rootScope_;

      element = $compile(
        '<vc-configuration-mobile-device-grid></vc-configuration-mobile-device-grid>'
      )($rootScope);
      
      $rootScope.$digest();


    }));

    it('has a columns and events object', function() {
      expect(element.isolateScope().columns).toBeDefined();
      expect(typeof element.isolateScope().columns).toBe('object');
    });



    it('has title, data, and editable properties for each column', function() {
      angular.forEach(element.isolateScope().columns, function(obj, index) {
          expect(obj.title).toBeDefined();
          expect(obj.data).toBeDefined();
          expect(obj.editable).toBeDefined();
    });
  });

    it('check values for editable, exportable and filter', function() {
      expect(element.isolateScope().options.editable).toBe(true);
      expect(element.isolateScope().options.exportable).toBe(true);
      expect(element.isolateScope().options.filter).toBe(false);
    });


  }); 

})();
