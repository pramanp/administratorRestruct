(function () {

    'use strict';



    angular.

            module('vitricon').

            factory('CrossTableEditModal', CrossTableEditFactory);



    function CrossTableEditFactory($compile, $rootScope) {



        var windowScope, windowElement;



        windowScope = $rootScope.$new();

        windowScope.closed = true;



        windowScope.openWindow = function () {

            windowElement.modal({backdrop: 'static', keyboard: false});

            //windowScope.closed = false;

        };

        windowScope.closeWindow = function () {

            windowElement.modal('hide');

            windowScope.closed = true;

            angular.element(document.getElementById('CatMgrCrossTbl')).scope().getTable();

        };



        windowScope.onClickFavourite = function(ev){

            ev.stopPropagation();

        }



        // windowElement = $compile('<vc-favourite-modal-window></vc-favourite-modal-window>')(windowScope);

        // windowElement = angular.element(windowElement);



        return {

            open: function () {

                 var template = $compile('<vc-crosstable-edit></vc-crosstable-edit>')(windowScope);
                windowElement = angular.element(template)
                // windowElement.find('.modal-body').html(template);

                windowScope.openWindow();

            },

            close: function () {

                windowScope.closeWindow();

            }

        };

    }

})();
