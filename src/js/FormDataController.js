/*global mockForms2, mockInstances*/

define( [ 'enketo' ], function( enketo ) {

    /**
     * [FormDataController description]
     * @param {{instanceId: string, entityId: string}} params [description]
     * @constructor
     */
    function FormDataController( params ) {
        params = params || {};
        var originalInstanceId = params.instanceId || null;
        var formDataRepository = new enketo.FormDataRepository();
        var controller = new enketo.FormDataController(
            new enketo.EntityRelationshipLoader(),
            new enketo.FormDefinitionLoader(),
            new enketo.FormModelMapper( formDataRepository, new enketo.SQLQueryBuilder( formDataRepository ), new enketo.IdFactory( new enketo.IdFactoryBridge() ) ),
            formDataRepository, new enketo.FormSubmissionRouter() );

        /**
         * Gets instance as JSON from Dristhi DB - Should this be asynchronous?
         * @return {?*} Form Data JSON object
         */
        this.get = function() {
            return controller.get( params ) || null;
        };

        /**
         * Passes instance as JSON to store in Dristhi DB - Should this be asynchronous?
         * @param  {string} instanceId	the new instanceID of the record
         * @param  {*}		data		Form Data JSON object
         * @return {boolean}
         */
        this.save = function( instanceId, data ) {
            controller.save( params, data );
            androidContext.goBack();
        };

        this.remove = function( instanceId ) {

        };
    }

    return FormDataController;
} );
