(function(){
    'use strict';
    angular.
        module('vitricon')
        .directive('vcFileModel', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: {
                    pre: _prelinkfn,
                    post: _postlinkfn
                }
            };
            
            function _prelinkfn(scope, element, attrs) {
                var model = $parse(attrs.vcFileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                        scope.$emit('myFile', element[0].files[0]); 
                    });
                });
            }
       
          
            function _postlinkfn(scope){
               
            }
        
        }]);
})();
