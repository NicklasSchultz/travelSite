;
(function() {
  'use strict';

  angular
    .module('sample-app')
    .controller('MainController', MainController);

  MainController.$inject = ['$state', '$compile', '$scope', '$rootScope'];

  function MainController($state, $compile, $scope, $rootScope) {

    var _this = this;
    var RIGHT_KEY = 39;

    var getActiveSection = function() {
      var activeElements = document.getElementsByClassName('active');
      return activeElements[0].id;
    }

    document.addEventListener('keydown', function(event) {
        console.error('downkey', event);
        if(event.keyCode === 13) {
            if(event.srcElement.id === 'dominikanskaSection' ) {
                $rootScope.changePage('dynamic');
            }
        } else if(event.keyCode === RIGHT_KEY) {
          if(getActiveSection() === 'dominikanskaSection' ) {
              $rootScope.changePage('dynamic');
          }
        }
    }, false);

    this.mainOptions = {
      sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
      anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
      menu: '#menu',
      slidesNavigation: true
    };

    this.moog = function(merg) {
      console.log(merg);
    };

    this.slides = [{
      title: 'Simple',
      description: 'Easy to use. Configurable and customizable.',
      src: 'images/1.png'
    }, {
      title: 'Cool',
      description: 'It just looks cool. Impress everybody with a simple and modern web design!',
      src: 'images/2.png'
    }, {
      title: 'Compatible',
      description: 'Working in modern and old browsers too!',
      src: 'images/3.png'
    }];

    this.addSlide = function() {
      _this.slides.push({
        title: 'New Slide',
        description: 'I made a new slide!',
        src: 'images/1.png'
      });

      //$compile(angular.element($('.slide')))($scope);
    };

  }

})();