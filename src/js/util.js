define( [], function() {
    function getAllQueryParams() {
        var val, processedVal,
            query = window.location.search.substring( 1 ),
            vars = query.split( "&" ),
            params = {};
        for ( var i = 0; i < vars.length; i++ ) {
            var pair = vars[ i ].split( "=" );
            if ( pair[ 0 ].length > 0 ) {
                val = decodeURIComponent( pair[ 1 ] );
                processedVal = ( val === 'true' ) ? true : ( val === 'false' ) ? false : val;
                params[ pair[ 0 ] ] = processedVal;
            }
        }
        return params;
    };
    return {
        getAllQueryParams: getAllQueryParams
    }
} );
