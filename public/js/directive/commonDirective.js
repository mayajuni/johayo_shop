/**
 * Created by 동준 on 2014-10-13.
 */
angular.module('johayo.directive')
    .directive('headerMenuScrolly', function($window){
        return {
            restrict: 'A',
            scope : {
                scrollSize : "="
            },
            link: function (scope, element, attrs) {
                angular.element($window).bind("scroll", function() {
                    scope.scrollSize = this.pageYOffset;
                    console.log(this.pageYOffset);
                    scope.$apply();
                });
            }
        }
    });