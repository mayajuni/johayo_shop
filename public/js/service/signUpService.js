/**
 * Created by 동준 on 2014-10-24.
 */
angular.module("johayo.service")
    .factory("signUpService", ['$http', '$q', 'ngDialog', '$resource', 'loginService',
        function($http, $q, ngDialog, $resource, loginService){
            // restful
            var restful = $resource('/api/signUp/:id', {id : '@id'}, {
                'checkEmail' : {method: 'GET'},
                'save' : {method: 'POST'}
            });

            // Login form dialog stuff
            var signUpDialog = null;
            function openSignUpDialog() {
                if ( signUpDialog ) {
                    throw new Error('Trying to open a dialog that is already open!');
                }
                signUpDialog = ngDialog.open({
                    template: '/html/signUp/signUp.html',
                    controller: 'signUpController',
                    className: 'ngdialog-theme-flat ngdialog-theme-custom'
                });

                return signUpDialog;
            }

            var service = {
                // Show the modal login dialog
                openSignUp: function() {
                    ngDialog.close();
                    openSignUpDialog().closePromise.then(function(){
                        signUpDialog = null;
                    });
                },
                doSignUp : function(info){
                    restful.save(info,
                        function(){
                            loginService.openLogin();
                            ngDialog.close();
                        });
                },
                checkEmail : function(email) {
                    var asy = $q.defer();
                    restful.checkEmail({email: email}, function(data){
                        asy.resolve(data);
                    });
                    return asy.promise;
                }
            };

            return service;
        }]);
