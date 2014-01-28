requirejs.config( {
    baseUrl: '../../src/js/',
    paths: {
        'enketo-js': '../../lib/enketo-core/src/js',
        'enketo-widget': '../../lib/enketo-core/src/widget',
        'enketo-config': '../../config.json',
        'enketo-json': '../../lib/enketo-json/src',
        'jquery.xpath': '../../lib/enketo-core/lib/jquery-xpath/jquery.xpath',
        text: '../../lib/enketo-core/lib/text/text',
        xpath: '../../lib/enketo-core/lib/xpath/build/xpathjs_javarosa',
        gmaps: 'http://maps.google.com/maps/api/js?v=3.exp&sensor=false&libraries=places&callback=gmapsLoaded', // add API key?
        jquery: '../../lib/enketo-core/lib/jquery',
        bootstrap: '../../lib/enketo-core/lib/bootstrap',
        Modernizr: '../../lib/enketo-core/lib/Modernizr',
        androidContext: '../../build/mock/androidcontext.mock', //replace with real one in dristhi app
        mockForms: '../../build/mock/transforms.mock', //not required in dristhi app
        mockInstances: '../../build/mock/instances.mock', //not required in dristhi app
        ziggy: '../../lib/ziggy/ziggy/src'
    },
    shim: {
        'xpath': {
            exports: 'XPathJS'
        },
        'bootstrap': {
            deps: [ 'jquery' ],
            exports: 'jQuery.fn.popover'
        },
        'widget/date/bootstrap3-datepicker/js/bootstrap-datepicker': {
            deps: [ 'jquery' ],
            exports: 'jQuery.fn.datepicker'
        },
        'widget/time/bootstrap3-timepicker/js/bootstrap-timepicker': {
            deps: [ 'jquery' ],
            exports: 'jQuery.fn.timepicker'
        },
        'Modernizr': {
            exports: 'Modernizr'
        },
        // not required in dristhi app:
        'mockForms': {
            exports: 'mockForms'
        },
        // not required in dristhi app:
        'mockInstances': {
            exports: 'mockInstances'
        }
    }
} );

requirejs( [ 'enketo-js/Form', 'FormDataController', 'enketo-json/FormModelJSON', 'gui', 'util', 'androidContext', 'jquery', 'plugins' ],
    function( Form, FormDataController, FormModelJSON, gui, util, androidContext, $ ) {
        'use strict';
        var modelXMLStr, existingInstanceJSON, instanceToEditXMLStr, loadErrors, modelJSON, form, instanceId,
            queryParams = util.getAllQueryParams(),
            formDataController = new FormDataController( queryParams );

        window.onerror = function( m, u, l ) {
            console.error( "Javascript Error: , msg: {0}, url: {1}, line: {2}".format( m, u, l ) );
            return true;
        };

        $( 'form.or' ).replaceWith( androidContext.getForm() );

        //switches to touch=true, useful for desktop development, won't affect performance of production app.
        //if ( typeof setToMobileMode === 'function' ) {
        //    setToMobileMode();
        //}

        existingInstanceJSON = formDataController.get();

        if ( !existingInstanceJSON ) {
            $( 'form.or' ).remove();
            instanceId = queryParams.instanceId || undefined;
            return gui.alert( 'JSON Instance with id "' + instanceId + '" could not be found.' );
        }

        modelXMLStr = androidContext.getModel();
        modelJSON = new FormModelJSON( existingInstanceJSON );
        instanceToEditXMLStr = modelJSON.toXML();
        form = new Form( 'form.or:eq(0)', modelXMLStr, instanceToEditXMLStr );

        loadErrors = form.init();
        console.log( 'load errors', loadErrors );

        //controller for submission of data to drishti
        $( document ).on( 'click', 'button#submit-form:not(:disabled)', function( event ) {
            var jData, saveResult,
                $button = $( this );
            $( this ).btnBusyState( true );
            // without this weird timeout trick the button won't change until form.validateForm() is complete
            // something odd that seems to happen when adding things to DOM.
            setTimeout( function() {
                if ( typeof form !== 'undefined' ) {

                    if ( !form.validate() ) {
                        gui.alert( 'Form contains errors <br/>(please see fields marked in red)' );
                        $button.btnBusyState( false );
                        return;
                    } else {
                        jData = modelJSON.get( form );
                        delete jData.errors;
                        saveResult = formDataController.save( form.getInstanceID(), jData );
                        $button.btnBusyState( false );
                    }
                }
            }, 100 );
        } );

    } );
