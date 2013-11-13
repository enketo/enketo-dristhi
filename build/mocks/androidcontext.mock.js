var androidContext = {

    //formName: 'ANC_Registration_24_5_12',
    //formName: 'EC_Registration_24_5_12',
    formName: getURLParameter( 'formName' ),

    getForm: function() {
        return mockForms[ this.formName ].html_form;
    },

    getModel: function() {
        return mockForms[ this.formName ].xml_model;
    },

    goBack: function() {}
};

var logContext = {
    logError: function( e ) {
        console.log( e );
    }
};

String.prototype.format = function( a, b, c ) {
    return a + b + c;
}

function getURLParameter( name ) {
    return decodeURI(
        ( RegExp( name + '=' + '(.+?)(&|$)' ).exec( location.search ) || [ , null ] )[ 1 ]
    );
}
