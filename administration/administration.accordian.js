(function () {
    'use strict';

    angular.module('vitricon').directive('vcShowAdminAccor', vcShowAdminAccorDirective);

    function vcShowAdminAccorDirective($window, Session) {
        return {
            restrict: 'E',
            scope: false,
            link: {
                pre: _prelinkfn,
                post: _postlinkfn
            },
            templateUrl: 'app/components/fields/vcAccordion/base.html'
        }

        function _prelinkfn(scope, el, attrs) {
            
            scope.accorHeading = [
                {
                    id: 0,
                    title: 'admin.accordion.useradmin',
                    url: 'app/administration/userAdministration/userAdministration.accordian.html',
                    breadcrumb: 'admin.accordion.useradmin',
                },
                {
                    id: 1,
                    title: 'admin.accordion.systemadmin',
                    breadcrumb: 'admin.accordion.systemadmin',
                    url: 'app/administration/systemAdministration/systemAdministration.accordian.html'
                },
                {
                    id: 2,
                    title: 'admin.accordion.customprop',
                    breadcrumb: 'admin.accordion.customprop',
                    url: 'app/administration/customProperties/customProperties.accordian.html'
                }
                

            ]
        }

        function _postlinkfn(scope) {
            scope.$emit('module-view');
            scope.collapseTree = function () {
                scope.$broadcast('expandTreeSignal');
            }
            scope.expandTree = function () {
                scope.$broadcast('collapseTreeSignal');
            }

            scope.clipboard = function (op) {
                scope.$broadcast('clipboardAction', op);
            }
            var currentAccordianId = parseInt(Session.getSessionData('current-accordian')) || 0;

            _.each(scope.accorHeading, function (acc) {
                if (acc.id === currentAccordianId) {
                    scope.currentAccor = (acc);
                }
            });

            $($window).unload(function(){
                Session.setSessionData('current-accordian', scope.currentAccorId);
            });
            
            scope.$on('accordian-expand', function(event, data){
                var toOpen = null;
                if(data.tree) {
                    switch (data.tree){
                        case 'tree.user_admin':
                            toOpen = 0;
                            break;
                        case 'tree.sys_admin':
                            toOpen = 1;
                            break;
                        case 'tree.custom_properties':
                            toOpen = 2;
                            break;
                        default:
                            toOpen = 0;
                            break;
                    }
                    scope.changeCurrentById(toOpen);
                }
            })
        }
    }
})();
