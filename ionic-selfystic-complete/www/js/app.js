(function (window, cordova, angular, undefined) {

    angular.module('selfystic', ['ionic', 'ngCordova', 'ionic.contrib.ui.cards'])

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

    .controller('Cards', function ($scope, $cordovaCamera, $ionicSwipeCardDelegate, $cordovaSocialSharing) {


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

        var imageIndex;

        $scope.addCard = function () {
            imageIndex = Math.floor(Math.random() * cardTypes.length);
            var newCard = cardTypes[imageIndex];
            newCard.id = Math.random();
            $scope.cards.push(angular.extend({}, newCard));
        };

        $scope.share = function () {
            console.log(imageIndex);
            console.log(cardTypes[imageIndex].image);
            $cordovaSocialSharing.share(null, null, cardTypes[imageIndex].image, null);
        };

        $scope.capture = function () {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                $scope.cardDestroyed(0);

                imageIndex = Math.floor(Math.random() * cardTypes.length);
                var newCard = cardTypes[imageIndex];
                newCard.image = "data:image/jpeg;base64," + imageData;;
                newCard.id = Math.random();
                $scope.cards.push(angular.extend({}, newCard));
                $scope.$digest();

            }, function (err) {
                // error.
            }).always(function () {
                $cordovaCamera.cleanup();
            });
        };
    })

    .controller('Card', function ($scope, $ionicSwipeCardDelegate) {
        $scope.goAway = function () {
            var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
            card.swipe();
        };
    });

})(window, window.cordova, window.angular)
