(function (window, cordova, angular, undefined) {

  angular.module('selfystic', ['ionic', 'ionic.contrib.ui.cards'])

    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })

    .directive('noScroll', function ($document) {
      return {
        restrict: 'A',
        link: function ($scope, $element, $attr) {

          $document.on('touchmove', function (e) {
            e.preventDefault();
          });
        }
      }
    })

    .controller('Cards', function ($scope, $ionicSwipeCardDelegate) {
      var cardTypes = [{
        title: 'Swipe down to clear the card',
        image: 'img/pic.png'
      }, {
          title: 'Where is this?',
          image: 'img/pic.png'
        }, {
          title: 'What kind of grass is this?',
          image: 'img/pic2.png'
        }, {
          title: 'What beach is this?',
          image: 'img/pic3.png'
        }, {
          title: 'What kind of clouds are these?',
          image: 'img/pic4.png'
        }];

      $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

      $scope.cardSwiped = function (index) {
        $scope.addCard();
      };

      $scope.cardDestroyed = function (index) {
        $scope.cards.splice(index, 1);
      };

      $scope.addCard = function () {
        var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
        newCard.id = Math.random();
        $scope.cards.push(angular.extend({}, newCard));
      };
    })

    .controller('Card', function ($scope, $ionicSwipeCardDelegate) {
      $scope.goAway = function () {
        var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
        card.swipe();
      };
    });

})(window, window.angular)