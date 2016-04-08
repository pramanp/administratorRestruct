(function() {
  'use strict';


  describe('Directive: vcAddNewConnectionTab', function(){
    var $compile,
        $rootScope,
        element;
    beforeEach(module('vitricon'));
    beforeEach(inject(function(_$rootScope_, _$compile_) {
      
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      
      element = $compile(
        '<vc-add-new-connection-tab></vc-add-new-connection-tab>'
      )($rootScope);
      
      $rootScope.$digest();


    }));
    
     it('check values for tabId and isDefaultEnabled', function() {
      expect(element.isolateScope().tabId).toBe('sys_config_show_one');
      expect(element.isolateScope().isDefaultEnabled).toBe(true);
    });
    
    it('check values for isDefault and isFav', function() {
      expect(element.isolateScope().options.isDefault).toBe(true);
      expect(element.isolateScope().options.isFav).toBe(true);
    });
  }); 

})();
