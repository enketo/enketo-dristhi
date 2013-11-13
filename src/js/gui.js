/**
 * @preserve Copyright 2012 Martijn van de Rijdt
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define( [ 'jquery', 'bootstrap' ], function( $ ) {


    /**
     * Shows a modal alert box with a message.
     *
     * @param {string} message
     * @param {string=} heading
     * @param {string=} level bootstrap css class
     * @param {number=} duration duration in secondsafter which dialog should self-destruct
     */
    function alert( message, heading, level, duration ) {
        "use strict";
        var cls, timer,
            $alert = $( '#dialog-alert' );

        heading = heading || 'Alert';
        level = level || 'error';
        cls = ( level === 'normal' ) ? '' : 'alert alert-block alert-' + level;

        //write content into alert dialog
        $alert.find( '.modal-header h3' ).text( heading );
        $alert.find( '.modal-body p' ).removeClass().addClass( cls ).html( message );

        $alert.modal( {
            keyboard: true,
            show: true
        } );

        $alert.on( 'hidden', function() {
            $alert.find( '.modal-header h3, .modal-body p' ).html( '' );
            clearInterval( timer );
        } );

        if ( typeof duration === 'number' ) {
            var left = duration.toString();
            $alert.find( '.self-destruct-timer' ).text( left );
            timer = setInterval( function() {
                left--;
                $alert.find( '.self-destruct-timer' ).text( left );
            }, 1000 );
            setTimeout( function() {
                clearInterval( timer );
                $alert.find( '.close' ).click();
            }, duration * 1000 );
        }
    };

    return {
        alert: alert
    };
} );
