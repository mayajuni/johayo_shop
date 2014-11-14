/**
 * Created by 동준 on 2014-10-12.
 */
angular.module('johayo', [
    "ngRoute",
    "ngDialog",
    'ngResource',
    "loginRetryQueue",
    "errorHandler",
    "interceptor",
    "johayo.controller",
    "johayo.service",
    "johayo.directive"
])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.responseInterceptors.push('securityInterceptor');
    }])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/html/main/main.html',
                controller: 'mainController'
            })
            .when('/items', {
                templateUrl: '/html/item/itemList.html',
                controller: 'itemController'
            });
    }]);

angular.module('johayo.controller', []);

angular.module('johayo.service', []);

angular.module('johayo.directive', []);
