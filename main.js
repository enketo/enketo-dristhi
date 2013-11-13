requirejs.config( {
    baseUrl: '../../src/js/',
    paths: {
        'enketo-js': '../../lib/enketo-core/src/js',
        'enketo-widget': '../../lib/enketo-core/src/widget',
        'enketo-config': '../../config.json',
        text: '../../lib/enketo-core/lib/text/text',
        xpath: '../../lib/enketo-core/lib/xpath/build/xpathjs_javarosa',
        gmaps: 'http://maps.google.com/maps/api/js?v=3.exp&sensor=false&libraries=places&callback=gmapsLoaded', // add API key
        jquery: '../../lib/enketo-core/lib/jquery',
        bootstrap: '../../lib/enketo-core/lib/bootstrap',
        gmapsDone: '../../lib/enketo-core/lib/gmapsDone', //needs to be removed after https://github.com/MartijnR/enketo-core/issues/22
        enketo: '../../build/mocks/enketo.mock' //replace with real one in production
    },
    shim: {
        'xpath': {
            exports: 'XPathJS'
        },
        'bootstrap': {
            deps: [ 'jquery' ],
            exports: 'jQuery.fn.bootstrap'
        },
        'widget/date/bootstrap3-datepicker/js/bootstrap-datepicker': {
            deps: [ 'jquery' ],
            exports: 'jQuery.fn.datepicker'
        },
        'widget/time/bootstrap3-timepicker/js/bootstrap-timepicker': {
            deps: [ 'jquery' ],
            exports: 'jQuery.fn.timepicker'
        }
    }
} );

define( 'modernizr', [], Modernizr );

requirejs( [ 'jquery', 'modernizr', 'enketo-js/Form', 'FormDataController', 'FormModelJSON', 'gui', 'util' ],
    function( $, modernizr, Form, FormDataController, FormModelJSON, gui, util ) {
        'use strict';
        var existingInstanceJ, instanceToEdit, loadErrors, jDataO, form,
            queryParams = util.getAllQueryParams(),
            formDataController = new FormDataController( queryParams );

        existingInstanceJ = formDataController.get();

        if ( !existingInstanceJ ) {
            $( 'form.or' ).remove();
            return gui.alert( 'Instance with id "' + settings.instanceId + '" could not be found.' );
        }

        jDataO = new FormModelJSON( existingInstanceJ );
        instanceToEdit = jDataO.toXML();
        console.debug( 'instance to edit: ', instanceToEdit );
        form = new Form( 'form.or:eq(0)', modelStr, instanceToEdit );

        loadErrors = form.init();
        console.log( 'load errors', loadErrors );

        //controller for submission of data to drishti
        $( document ).on( 'click', 'button#submit-form:not(:disabled)', function( event ) {
            var jData, saveResult,
                $button = $( this );
            $( this ).btnBusyState( true );
            //without this weird timeout trick the button won't change until form.validateForm() is complete
            //something odd that seems to happen when adding things to DOM.
            setTimeout( function() {
                if ( typeof form !== 'undefined' ) {
                    form.validateForm();
                    if ( !form.isValid() ) {
                        gui.alert( 'Form contains errors <br/>(please see fields marked in red)' );
                        $button.btnBusyState( false );
                        return;
                    } else {
                        jData = jDataO.get();
                        delete jData.errors;
                        saveResult = formDataController.save( form.getInstanceID(), jData );
                        $button.btnBusyState( false );
                    }
                }
            }, 100 );
        } );

        //get query string parameter

        function getURLParameter( name ) {
            return decodeURI(
                ( new RegExp( name + '=' + '(.+?)(&|$)' ).exec( location.search ) || [ , null ] )[ 1 ]
            );
        }
    } );
