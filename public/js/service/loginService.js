/**
 * Created by 동준 on 2014-10-23.
 */
angular.module("johayo.service")
    .factory("loginService", ['$http', '$q', '$rootScope', 'securityRetryQueue', 'ngDialog', function($http, $q, $rootScope, queue, ngDialog){
        // Login form dialog stuff
        var loginDialog = null;
        function openLoginDialog() {
            if ( loginDialog ) {
                throw new Error('Trying to open a dialog that is already open!');
            }
            loginDialog = ngDialog.open({
                template: '/html/login/login.html',
                controller: 'loginController',
                className: 'ngdialog-theme-default ngdialog-theme-custom'
            });

            return loginDialog;
        }

        function onLoginDialogClose(success) {
            loginDialog = null;
            if ( success ) {
                queue.retryAll();
            } else {
                queue.cancelAll();
            }
        }

        // Register a handler for when an item is added to the retry queue
        queue.onItemAddedCallbacks.push(function() {
            if ( queue.hasMore() ) {
                service.showLogin();
            }
        });

        var service = {
            // Get the first reason for needing a login
            getLoginReason: function() {
                return queue.retryReason();
            },
            // Show the modal login dialog
            openLogin: function() {
                ngDialog.close();
                var asy = $q.defer();
                openLoginDialog().closePromise.then(function(loginInfo){
                    $rootScope.$broadcast('getLoginInfo');
                    onLoginDialogClose(loginInfo.result);
                    asy.resolve(loginInfo.result);
                });
                return asy.promise;
            },
            doLogin : function(login){
                var asy = $q.defer();
                $http.post('/api/login', login).success(function (data){
                    service.currentUser = data.info;
                    $rootScope.$broadcast('getLoginInfo');
                    asy.resolve(data);
                }).error(function(data){  asy.reject(data); });
                return asy.promise;
            },
            logout : function(){
                var asy = $q.defer();
                $http.post('/api/login/logout').then(function(){
                    service.currentUser = null;
                    asy.resolve();
                });
                return asy.promise;
            },
            // Ask the backend to see if a user is already authenticated - this may be from a previous session.
            requestCurrentUser: function() {
                var asy = $q.defer();
                if ( service.isAuthenticated() ) {
                    asy.resolve(service.currentUser);
                } else {
                    $http.post('/api/login/info').then(function(response) {
                        service.currentUser = response.data.info;
                        asy.resolve(service.currentUser);
                    });
                }
                return asy.promise;
            },
            isAuthenticated: function(){
                return !!service.currentUser;
            },

            currentUser: null
        };

        return service;
    }]);
