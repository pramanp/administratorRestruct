(function () {
    'use strict';
         /**
         * defining the controller : MobileDeviceController
         */
    angular.module('vitricon').
            controller('MobileDeviceController',mobileDeviceController);

    function mobileDeviceController($state, ConfigurationMobileDevice, 
              $stateParams, Session) {

        var vm = this;
        vm.init = function() {
         ConfigurationMobileDevice.one('type').customGET().then(function (resp){
                   vm.options = resp.data;
                   vm.addDevice.connectionTpye = vm.options[0];
                }); 
            vm.showDelete = false;
            vm.showDeleteMsg = false;
            vm.connectionAdded = false;
            
            vm.addDevice = {
            designator: '',
            connectionTpye: '',
            host: '',
            port: 0,
            username: '',
            password: '',
            dataExchange: '',
            note : ''
        };
          if($stateParams.addDevice){
               ConfigurationMobileDevice.customGET($stateParams.addDevice).then(function (resp){
                    vm.addDevice.id = resp.data.id;
                    vm.addDevice.designator = resp.data.designator;
                    vm.addDevice.connectionTpye = resp.data.connectionTpye;
                    vm.addDevice.host = resp.data.host;
                    vm.addDevice.port = resp.data.port;
                    vm.addDevice.username = resp.data.username;
                    vm.addDevice.password = resp.data.password;
                     vm.addDevice.dataExchange = resp.data.dataExchange;
                      vm.addDevice.note = resp.data.note;
                      vm.showDelete = true;
                });
          }
       };
  
      vm.init();
        
      /**
         * onAddConnection function to add new connection
         * @private
         */  
     vm.onAddConnection = function(){
         Session.setNewConnection('newConnection',true);
         $state.go('main.addnewconnection');
     };
     
     /**
         * back function to get back to mobile device grid screen
         * @private
         */
     vm.back = function(){
         $state.go('main.mobiledevices');
     };
     
     /**
         * save function save new connection details
         * @private
         */
        vm.save = function(){
            if(Session.getNewConnection('newConnection')==='true'){
                Session.setNewConnection('newConnection',false);
                if(vm.addDevice.designator !== '' && vm.addDevice.connectionTpye !== '' && vm.addDevice.dataExchange !== ''){
                ConfigurationMobileDevice.post(vm.addDevice).then(function (){
                    vm.connectionAdded = true;
                     $state.go('main.mobiledevices');
                    
                },function(){
                    Session.setNewConnection('newConnection',true);
                });
            }
            }else{
                Session.setNewConnection('newConnection',false);
               ConfigurationMobileDevice.one().customPUT(vm.addDevice).then(function (){
                   Session.setNewConnection('newConnection',false);
                   $state.go('main.mobiledevices');
                },function (){
                    Session.setNewConnection('newConnection',false);
                }); 
            }   
        };
        
         vm.delete = function(){
           ConfigurationMobileDevice.one($stateParams.addDevice).customDELETE().then(function (){
               vm.showDeleteMsg = true;     
               $state.go('main.mobiledevices');
                });
        };
        
    }
})();
