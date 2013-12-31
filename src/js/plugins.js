//copied from MartijnR/enketo
define( [ 'jquery' ], function( $ ) {

    $.fn.btnBusyState = function( busy ) {
        var $button, btnContent;
        return this.each( function() {
            $button = $( this );
            btnContent = $button.data( 'btnContent' );

            if ( busy && !btnContent ) {
                btnContent = $button.html();
                $button.data( 'btnContent', btnContent );
                $button
                    .empty()
                    .append( '<progress></progress>' )
                    .attr( 'disabled', true );
            } else if ( !busy && btnContent ) {
                $button.data( 'btnContent', null );
                $button
                    .empty()
                    .append( btnContent )
                    .removeAttr( 'disabled' );
            }
        } );
    };

} );
