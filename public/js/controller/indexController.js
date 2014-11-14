/**
 * Created by 동준 on 2014-10-13.
 */
angular.module('johayo.controller')
    .controller('indexController', ['$scope', '$rootScope', '$timeout', 'loginService', 'signUpService',
        function($scope, $rootScope, $timeout, loginService, signUpService){
            $scope.isSub = false;

            $scope.openLogin = function() {
                loginService.openLogin();
            };

            $scope.openSignUp = function() {
                signUpService.openSignUp();
            };

            $rootScope.$on("$routeChangeStart", function(){
                $scope.loading = true;
                $scope.showItem = true;
            });

            $rootScope.$on("$routeChangeSuccess", function() {
                $scope.loading = false;
                $scope.isSub = false;
                /* 시간이 지나서 class 변경 */
                $timeout(function(){
                    $scope.showItem = false;
                }, 80);
            });

            /* 어디서 로그인하든 로그인정보가 변경하는지 체크후 로그인정도를 넣어둔다. */
            $scope.$watch(loginService.currentUser, function(){
                $scope.loginInfo = loginService.requestCurrentUser();
            });
        }]);