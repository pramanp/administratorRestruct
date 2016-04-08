(function(){
    'use strict';
    angular.
        module('vitricon').
        directive('vcUploadFile', vcUploadFileDirective);

    function vcUploadFileDirective() {
        var ddo = {
            restrict: 'A',
            scope: false,
            link: linkFn
        };
        return ddo;

        function linkFn (scope, element, attr) {
            element.bind('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                var ev = angular.element(e.target).siblings('input[type="file"]').trigger('click');
            });
        }
    }
})();
