(function () {
    'use strict';
    // Directive to show modal window

    angular.

            module('vitricon').

            directive('vcCrosstableEdit', vcCrosstableEditDirective);



    function vcCrosstableEditDirective($rootScope) {

        return {

            restrict: 'E',

            replace:true,

            // scope: true, 

            template: '<div class="modal fade bs-example-modal-sm" ng-click="closeWindow()" data-dismiss="modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">' +

                    '<div class="modal-dialog modal-sm" ng-click="onClickFavourite($event)"  style="position: initial; overflow: hidden; width: 800px;">' +

                    '<div class="modal-content" style="overflow: hidden;">' +

                    '<div class="modal-body">Start Object : <span ng-bind-html="crossFirstTable"></span><br> Start Table : <span ng-bind-html="crossTableStartTable"></span><br> Linked Table : <span ng-bind-html="crossTableLinkedTable"></span><vc-crosstable-editpopup></vc-crosstable-editpopup>' +



                    '</div>' +

                    '</div>' +

                    '</div>' +

                    '</div>'

        };

    }
    

})();
