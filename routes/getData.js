let request = require( 'request' );

function getAllUsers() {
    let url = 'http://www.mocky.io/v2/5808862710000087232b75ac';
    return getData( url );
}

function getAllPolicies() {
    let url = 'http://www.mocky.io/v2/580891a4100000e8242b75c5';
    return getData( url );
}

function getData( url ) {
    return new Promise( function( resolve, reject ) {
	    request.get( url, function( err, response, body ) {
	        if( err ) {
		        reject( err );
	        } else {
	            resolve( JSON.parse( body ) );
	        }
	    } );
    });
}

module.exports = {
    getAllUsers    : getAllUsers,
    getAllPolicies : getAllPolicies
};
