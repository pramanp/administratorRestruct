(function () {
    'use strict';

    angular.
            module('vitricon').
            directive('vcCustomPropertiesGrid', vcCustomPropertiesGridDirective);

    function vcCustomPropertiesGridDirective(Session, toastr, CustomProperties,
            $timeout, $state, $q, Messaging) {
        var ddo = {
            restrict: 'E',
            scope: false,
            templateUrl: 'app/components/grid/vcgrid.html',
            link: {
                pre: _prelinkfn,
                post: _postlinkfn
            }
        };

        return ddo;

        function _prelinkfn(scope, el) {
            var grid = null;
            var table = null;
            scope.options = {
                editable: true,
                exportable: true,
                filter: false,
                scrollX: true
            };
            scope.events = {
                all: 'admin.user.grid.js_grid_all',
                row: 'admin.user.grid.js_grid_row'
            };

            scope.init = function (api) {
                grid = api;
                table = grid.table().node();

                angular.element(table).find('tbody').on('click', 'input.group1[type=checkbox]', function (event) {
                    var tar = event.currentTarget;
                    var indexObject = grid.cell(angular.element(tar).parent('td')).index();
                    var row = grid.row(indexObject.row);
                    var column = grid.column(indexObject.column);

                    var dataSrc = column.dataSrc();

                    var data = row.data();

                    data[dataSrc] = angular.element(tar).is(':checked');
                });
            };
            scope.columns = [
                {title: "customproperties.customproperties.grid.name", data: "designator"},
                {title: "customproperties.customproperties.grid.mgmtdepartment", data: "visibleAdministration", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleAdministration = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.property", data: "visibleRealty", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleRealty = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.complex", data: "visibleConstruction", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleConstruction = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.building", data: "visibleBuilding", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleBuilding = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.facility", data: "visibleOutsideInstallation", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleOutsideInstallation = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.facilities", data: "visibleInstallation", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleInstallation = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.subunit", data: "visibleInstallationPart", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleInstallationPart = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.devices", data: "visibleDevice", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleDevice = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.mains", data: "visibleMains", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleMains = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.submain", data: "visibleMainsPart", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleMainsPart = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.floor", data: "visibleFloor", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleFloor = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.room", data: "visibleRoom", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleRoom = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.isp", data: "visibleISP", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleISP = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.controller", data: "visibleController", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleController = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.organization", data: "visibleOrganisation", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleOrganisation = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.division", data: "visibleDivision", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleDivision = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.department", data: "visibleDepartment", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleDepartment = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.person", data: "visiblePerson", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visiblePerson = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.article", data: "visibleArticle", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleArticle = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.inventory", data: "visibleInventory", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleInventory = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.project", data: "visibleProject", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleProject = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.work", data: "visibleTaskPacket", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleTaskPacket = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.lockmgmt", data: "visibleLockingAdministration", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleLockingAdministration = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.lockingsystem", data: "visibleLockingSystem", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleLockingSystem = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.lockgroup", data: "visibleLockingGroup", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleLockingGroup = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.lock", data: "visibleLock", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleLock = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.key", data: "visibleKey", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleKey = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                },
                {title: "customproperties.customproperties.grid.rental", data: "visibleLeaseUnit", editable: true,
                    render: function (data, type) {
                        if (type === 'display') {
                            if (data === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" disabled="disabled" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1" disabled="disabled" />';
                            }
                        } else {
                            return data;
                        }

                    },
                    vcedit: {
                        template: function (data) {
                            if (data.find('input.group1[type=checkbox]').is(':checked') === true)
                            {
                                return '<input type="checkbox" class="group1" checked="checked" />';
                            } else
                            {
                                return '<input type="checkbox" class="group1"  />';
                            }
                        },
                        extract: function (jqTd, rowData) {
                            rowData.visibleLeaseUnit = jqTd.find('input[type=checkbox]').is(':checked');
                            return rowData;
                        }
                    }
                }

            ];


            scope.read = function () {
                return CustomProperties.customGET();
            };

            scope.onSelect = function (data, index) {
                angular.element('.modal').modal('hide');
                $timeout(function () {
                    $state.go('main.customproperties');
                }, 800);

            };

            scope.update = function (data) {
                var request = [];
                request = [data];
                if (data.id === null) {
                    return CustomProperties.post(data);
                } else {
                    return CustomProperties.one().customPUT(request);
                }
            };

            scope.delete = function (data) {
                var deferment = $q.defer();
                $timeout(function () {
                    Messaging.confirm('Do you want to delete this category?', function (val) {
                        if (val === 'ok') {
                            CustomProperties.one(data.id).customDELETE().then(function (response) {
                                deferment.resolve(response);
                                scope.$broadcast('refresh_all');
                                toastr.success('Custom Category Deleted.');
                            });
                        }

                    });
                }, 1000);
            };

        }

        function _postlinkfn() {
        }
    }

})();
