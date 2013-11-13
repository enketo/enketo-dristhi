var $fakeInstance;

function setFakeInstance( formName ) {
    $fakeInstance = $( $.parseXML( mockForms[ formName ].xml_model ) );
}

function getFakeInstanceXML( includeTemplates ) {
    var $docRoot = $fakeInstance.find( 'instance>*:first' ),
        $dataClone = $docRoot.clone();
    if ( includeTemplates === false ) {
        $dataClone.find( '[template]' ).remove();
    }
    return $dataClone;
}
