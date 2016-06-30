;(function() {
  'use strict';

  angular
    .module('sample-app')
    .controller('DynamicController', DynamicController);

  DynamicController.$inject = ['$state', '$rootScope'];

  function DynamicController($state, $rootScope){
  	document.addEventListener('keydown', function(event) {
        if(event.keyCode === 37) {
            $rootScope.changePage('main');
        }
    }, false);
  }

})();
