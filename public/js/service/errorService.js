/**
 * Created by Administrator on 2014-08-04.
 */
angular.module("johayo.service")
    .factory("errorService", ['$modal', 'errorQueue', function($modal, queue){

        function openErrDialog(msg) {
            $modal({title: 'Error', content: msg, show: true});
        }

        // Register a handler for when an item is added to the retry queue
        queue.errorCallbacks.push(function(params) {
            if ( queue.hasMore() ) {
                service.openErrorModal(params);
            }
        });

         var service = {
            openErrorModal : function(res){
                openErrDialog(res.msg);
            }
        };
        return service;
    }]);
