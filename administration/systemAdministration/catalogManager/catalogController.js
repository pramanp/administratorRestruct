(function () {
    'use strict';

    angular.module('vitricon').
            controller('CatalogController', catalogController);

    function catalogController() {

        var vm = this;
 angular.element('.left-Tree').ntm();

        $('.slideArrow').on('click', function () {
            if ($('.sidebar').is(':visible')) {
                $('.sidebar').hide();
                $('.content-wrapper').css('margin-left', '0px');
                $(this).css('left', '0');
                $(this).addClass('rightMov');
            } else {
                $('.content-wrapper').css('margin-left', '300px')
                $('.sidebar').fadeIn();
                setTimeout(function () {
                    $('.slideArrow').css('left', '279px');
                    $('.slideArrow').removeClass('rightMov');
                }, 200)
            }
        });
        $(".nav-tabs a").on('click', function () {
            $(this).tab('show');
        });
    }
})();


