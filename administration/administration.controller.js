(function() {
    'use strict';

    angular.module('vitricon').
    controller('AdminController', adminController);

    function adminController($timeout, $scope, $state, Session, Resources, todoDashboardFactory) {

        var vm = this;

        Session.setSessionData('current-module', "main.admin");
        // $('.content-wrapper').hide();
        // setTimeout(function() {
        //     if ($('.sidebar').is(':visible')) {
        //         $('.content-wrapper').css('margin-left', '300px');
        //     } else {
        //         $('.content-wrapper').css('margin-left', '0');
        //     }
        //     $('.content-wrapper').show();
        // }, 500);

        // $scope.administrationData = [];
    }
})();