/*global mockForms2, mockInstances*/

// in Dristhi app, do not load ziggy/FormDataController
if ( window.ENVIRONMENT === 'web' ) {
    define( 'ziggy/FormDataController', null );
}

define( [ 'ziggy/FormDataController' ], function( ziggyController ) {

    /**
     * [FormDataController description]
     * @param {{instanceId: string, entityId: string}} params [description]
     * @constructor
     */
    function FormDataController( params ) {
        params = params || {};

        /**
         * Gets instance as JSON from Dristhi DB - Should this be asynchronous?
         * @return {?*} Form Data JSON object
         */
        this.get = function() {
            if ( window.ENVIRONMENT === 'web' ) {
                return mockInstances[ params.instanceId ] || null;
            }
            return ziggyController.get( params ) || null;
        };

        /**
         * Passes instance as JSON to store in Dristhi DB - Should this be asynchronous?
         * @param  {string} instanceId	the new instanceID of the record
         * @param  {*}		data		Form Data JSON object
         * @return {boolean}
         */
        this.save = function( instanceId, data ) {
            if ( window.ENVIRONMENT === 'web' ) {
                console.log( 'saving...', data );
            } else {
                ziggyController.save( params, data );
                androidContext.goBack();
            }
        };

        this.remove = function( instanceId ) {};
    }

    return FormDataController;
} );
