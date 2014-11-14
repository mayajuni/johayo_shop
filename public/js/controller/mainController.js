/**
 * Created by 동준 on 2014-10-13.
 */
angular.module('johayo.controller')
    .controller('mainController', ['$scope', '$timeout',
        function($scope, $timeout){
            $scope.scrollToNew = function(){
                $("html, body").stop().animate({ scrollTop: 600 }, 500);
            };

            /* indexcontroller에 있는 scrollSize의 변경을 catch해서 이벤트를 준다. */
            $scope.$parent.$watch('scrollSize', function(val){
                /* 메뉴관련 */
                if(val > 570){
                    angular.element('header').addClass('is-small');
                    angular.element('#subMenu').addClass('sub-is-small');
                }else{
                    angular.element('header').removeClass();
                    angular.element('#subMenu').removeClass('sub-is-small');
                }

                if(val > 550){
                    angular.element("#content1").removeClass('opacity0');
                    angular.element("#content1").addClass('opacity1');
                }
                if(val < 550){
                    angular.element("#content1").removeClass('opacity1');
                    angular.element("#content1").addClass('opacity0');
                }
            });
        }]);