/**
 * Created by Kapil on 11/12/15.
 */

(function () {
    angular.
        module('vitricon').
        directive('vcSysAdminTree', vcSysAdminTreeDirective);

    function vcSysAdminTreeDirective($state, $timeout) {

         var ddo = {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/components/tree/tree.html',
            link: {
                pre: _prelinkfn,
                post: _postlinkfn
            },
            controller: 'vcTreeController'
        };

        return ddo;

        function _prelinkfn(scope, el, attrs) {

            scope.options = {
                checkbox: false
            };
            scope.ancestors = function(){
                return [
                    {
                        key: 1,
                        title: 'System Configuration',
                        lazy: false,
                        icon: '/assets/images/system-configuration-icon.png'
                    },
                    {
                        key: 2,
                        title: 'License',
                        lazy: false,
                        icon: '/assets/images/license-icon_1.png'
                    },
                    {
                        key: 3,
                        title: 'Calculation',
                        lazy: false,
                        icon: '/assets/images/calculation-icon_1.png'
                    },
                    {
                        key: 4,
                        title: 'Configuration Mobile Devices',
                        lazy: false,
                        icon: '/assets/images/config-mobile-devices-icon.png'
                    },
                    {
                        key: 5,
                        title: 'Cron Jobs',
                        lazy: false,
                        icon: '/assets/images/cron-jobs-icon.png'
                    },
                    {
                        key: 6,
                        title: 'Catalog Manager',
                        lazy: false,
                        icon: '/assets/images/catalog-manager-icon.png'
                    }
                ];
            };

            var tree;
            scope.init = function () {
                tree = el.find('.tree-menu').fancytree('getTree');
            };

            scope.$on('expand-tree', function (event, data) {
                var state = data.state;
                var params = data.params;
                var key = '';
                var accordianExpand = true;
                if (state === 'main.configuration') {
                    key = '1';
                } else if (state === 'main.cronjobs') {
                    key = '5';
                } else if (state === 'main.catalog') {
                    key = '6';
                } else if (state === 'main.mobiledevices') {
                    key = '4';
                } else if (state === 'main.calculation') {
                    key = '3';
                } else if (state === 'main.license') {
                    key = '2';
                }else {
                    accordianExpand = false;
                }

                $timeout(function () {
                    scope.activateNodeByKeyPath(tree, key);
                    if(accordianExpand) {
                        scope.$emit('accordian-reveal', {tree: 'tree.sys_admin'});
                    }
                }, 800);
            });

            scope.clickHandler = {
                expander: function(event, data){

                },
                title: function(event, data){

                    var id = data.node.key;
                    if (id === '1') {
                        $state.go('main.configuration');
                    }else if (id === '2') {
                        $state.go('main.license');
                    }else if (id === '3') {
                        $state.go('main.calculation');
                    }
                    else if (id === '4') {
                        $state.go('main.mobiledevices',{userdata:id});
                    } else if (id === '6') {
                        $state.go('main.catalog');
                    } else if (id === '5') {
                        $state.go('main.cronjobs');
                    }
                }

            };

        }
        function _postlinkfn(scope) {
            scope.showCheck = false;
        }
    }
})();
