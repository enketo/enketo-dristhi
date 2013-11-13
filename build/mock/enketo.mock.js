define( [], function() {
    return {
        FormDataRepository: function() {},
        FormDataController: function( entityRelO, formDefO, formModelMapperO ) {
            this.get = function( params ) {
                return mockInstances[ params.instanceId ] || null;
            };
            this.save = function( instanceId, data ) {
                console.log( 'saving...' );
            };
        },
        EntityRelationshipLoader: function() {},
        FormDefinitionLoader: function() {},
        FormModelMapper: function( dataRepo, sqlBuilder, idFactory ) {},
        SQLQueryBuilder: function( dataRepo ) {},
        IdFactory: function( bridge ) {},
        IdFactoryBridge: function() {},
        FormSubmissionRouter: function() {}
    };
} );
