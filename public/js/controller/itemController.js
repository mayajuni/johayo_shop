/**
 * Created by 동준 on 2014-10-16.
 */
angular.module('johayo.controller')
    .controller('itemController', ['$scope', '$timeout',
        function($scope, $timeout){
            $scope.$parent.isSub = true;

            /* indexcontroller에 있는 scrollSize의 변경을 catch해서 이벤트를 준다. */
            $scope.$parent.$watch('scrollSize', function(val){
                /* 메뉴관련 */
                if(val > 10){
                    angular.element('header').addClass('is-small');
                    angular.element('#subMenu').addClass('sub-is-small');
                }else{
                    angular.element('header').removeClass();
                    angular.element('#subMenu').removeClass('sub-is-small');
                }
            });
        }]);