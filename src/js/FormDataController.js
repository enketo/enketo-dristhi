/*global mockForms2, mockInstances*/

define( [ 'ziggy/FormDataController', 'mockInstances' ],
    function( formDataController, mockInstances ) {

        /**
         * [FormDataController description]
         * @param {{instanceId: string, entityId: string}} params [description]
         * @constructor
         */
        function FormDataController( params ) {
            params = params || {};
            var androidContext = window.androidContext;
            /**
             * Gets instance as JSON from Dristhi DB - Should this be asynchronous?
             * @return {?*} Form Data JSON object
             */
            this.get = function() {
                if ( !androidContext ) {
                    return mockInstances[ params.instanceId ] || null;
                }
                return formDataController.get( params ) || null;
            };

            /**
             * Passes instance as JSON to store in Dristhi DB - Should this be asynchronous?
             * @param  {string} instanceId	the new instanceID of the record
             * @param  {*}		data		Form Data JSON object
             * @return {boolean}
             */
            this.save = function( instanceId, data ) {
                if ( !androidContext ) {
                    console.log( 'saving...', data );
                } else {
                    formDataController.save( params, data );
                    androidContext.goBack();
                }
            };

            this.remove = function( instanceId ) {};
        }

        return FormDataController;
    } );
