(function () {
    'use strict';
    /**
     * defining the controller : FoldersController
     */
    angular.module('vitricon').
            controller('FoldersController', foldersController);

    function foldersController($rootScope,$scope, $state, Session, CustomProperties, $stateParams, FolderFactory,Restangular) {
        
        $scope.uploadFileName = '';
        var vm = this;
        // vm.init = function () {

        // };

        // vm.init();

        /**
         * importDoc function to import seleted file
         * @private
         */

        $scope.$on('myFile', function (event, myFile) {
            $scope.myFile = myFile;
            $scope.uploadFileName = myFile.name;
        });
        
        vm.importDoc = function () {
            if(! $scope.myFile){return false};
            var file = $scope.myFile;
            FolderFactory.uploadFileToUrl(file);
        };

        /**
         * exportDoc function to export folders/levels hierarchy
         * @private
         */
        vm.exportDoc = function () {

            FolderFactory.Export();

        };



    }
    
    // function getFileNameFromHeader(header: string): string {
      // if (!header) return null;
 
      // var result: string = header.split(";")[1].trim().split("=")[1];
 
      // return result.replace(/"/g, '');
  // }
})();
