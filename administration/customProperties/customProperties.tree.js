/**
 * Created by Alok on 24/12/15.
 */

(function () {
    angular.
        module('vitricon').
        directive('vcCustomPropertiesTree', vcCustomPropertiesTreeDirective);

    function vcCustomPropertiesTreeDirective($state, $timeout) {
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
                        title: 'Custom Properties',
                        lazy: false,
                        icon: '/assets/images/custom-properties-icon.png'
                    },

                    {
                        key: 3,
                        title: 'Folders',
                        lazy: false,
                        icon: '/assets/images/custom-properties-icon.png'
                    },

                    {
                        key: 2,
                        title: 'Specific Properties',
                        lazy: false,
                        icon: '/assets/images/custom-properties-icon.png'
                    }
                ];
            };

            var tree;
            scope.init = function () {
                tree = el.find('.tree-menu').fancytree('getTree');
            }

            scope.$on('expand-tree', function (event, data) {
                var state = data.state;
                var key = '';
                var accordianExpand = true;
                if (state === 'main.customproperties') {
                    key = '1';
                } else if (state === 'main.specificproperties') {
                    key = '2';
                } else if (state === 'main.folders') {
                    key = '3';
                } else {
                    accordianExpand = false;
                }

                $timeout(function () {
                    scope.activateNodeByKeyPath(tree, key);
                    if(accordianExpand) {
                        scope.$emit('accordian-reveal', {tree: 'tree.custom_properties'});
                    }
                }, 800);
            });

            scope.clickHandler = {
                expander: function(event, data){

                },
                title: function(event, data){

                    var id = data.node.key;
                    if (id == 1) {
                        scope.$emit('click-custom');
                        $state.go('main.customproperties');
                    }
                    else if (id == 2) {
                        $state.go('main.specificproperties');
                    }
                    else if (id == 3) {
                        $state.go('main.folders');
                    }
                }

            };

            scope.getUsergroupById = function (id) {

            };

        }
        function _postlinkfn(scope) {
          scope.showCheck = false;
        }
    }
})();
