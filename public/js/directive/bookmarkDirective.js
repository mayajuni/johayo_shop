/**
 * Created by 동준 on 2015-03-24.
 */
angular.module('johayo.directive')
    .directive('bookmark', function($window){
        return {
            restrict: 'AE',
            templateUrl: "/mall/html/login/login.tpl.html",
            controller: "loginController"
        }
    });