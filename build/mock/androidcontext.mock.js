if ( !window.androidContext ) {
    var getURLParameter, loadScript;

    console.log( 'loading the things' );

    loadScript = function( filename ) {
        //var fileref = document.createElement( 'script' );
        //fileref.setAttribute( "type", "text/javascript" );
        //fileref.setAttribute( "src", filename );
        //document.getElementsByTagName( "head" )[ 0 ].appendChild( fileref )
        // get some kind of XMLHttpRequest
        var xhrObj = new XMLHttpRequest();
        // open and send a synchronous request
        xhrObj.open( 'GET', filename, false );
        xhrObj.send( '' );
        // add the returned content to a newly created script tag
        var se = document.createElement( 'script' );
        se.type = "text/javascript";
        se.text = xhrObj.responseText;
        document.getElementsByTagName( 'head' )[ 0 ].appendChild( se );
    };

    getURLParameter = function( name ) {
        return decodeURI(
            ( RegExp( name + '=' + '(.+?)(&|$)' ).exec( location.search ) || [ , null ] )[ 1 ]
        );
    };

    loadScript( '../build/mock/transforms.mock.js' );
    loadScript( '../build/mock/instances.mock.js' );

    window.ENVIRONMENT = 'web';

    window.androidContext = {
        //formName: 'ANC_Registration_24_5_12',
        //formName: 'EC_Registration_24_5_12',
        formName: getURLParameter( 'formName' ),

        getForm: function() {
            return mockForms[ this.formName ].html_form;
        },

        getModel: function() {
            return mockForms[ this.formName ].xml_model;
        },

        goBack: function() {
            console.log( 'Wut?' );
        }
    };

    String.prototype.format = function( a, b, c ) {
        return a + b + c;
    };

} else {
    window.ENVIROMENT = 'dristhi';
}
