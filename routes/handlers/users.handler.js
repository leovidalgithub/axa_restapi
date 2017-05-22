let getData = require( '../getData' ),
    utils   = require( '../utils' );

// REST API - RETURNS USER DATA BY USER-ID (ADMIN OR USER ROLE IS REQUIRED)
function userById( req, res ) {
    getData.getAllUsers()
        .then( function( users ) {
            userDelivery( users );
        })
        .catch( function( err ) {
           res.status( 401 ).json( { success : false, msg: 'Some error occurs while getting data', client : null } )
        });

    function userDelivery( users ) {
    	let clientId = req.params.id;

        let client = utils.getElementById( users.clients, clientId );
        if( !client ) {
        	res.status( 200 ).json( { success : true, msg: 'Client not found', client : null } );
        } else {
        	if( client.role === 'admin' || client.role === 'user' ) {
        		res.status( 200 ).json( { success : true, msg: 'User data', client : client } );
        	} else {
        		res.status( 200 ).json( { success : true, msg: 'Role permissions: Access denied', client : null } );
        	}
        }
    }    
}

// REST API - RETURNS USER DATA BY USER-NAME (ADMIN OR USER ROLE IS REQUIRED)
function userByName( req, res ) {
    getData.getAllUsers()
        .then( function( users ) {
            userDelivery( users );
        })
        .catch( function( err ) {
           res.status( 401 ).json( { success : false, msg: 'Some error occurs while getting data', client : null } );
        });

    function userDelivery( users ) {       
        let name    = req.params.name;
        let clients = users.clients;
        let client  = utils.getElementByName( clients, name );
        if( !client ) {
            res.status( 200 ).json( { success : true, msg: 'Client not found', client : null } );
        } else {
            if( client.role === 'admin' || client.role === 'user' ) {
                res.status( 200 ).json( { success : true, msg: 'User data', client : client } );
            } else {
                res.status( 200 ).json( { success : true, msg: 'Role permissions: Access denied', client : null } );
            }
        }
    }
}

// REST API - RETURNS USER DATA BY POLICY-ID (ADMIN ROLE IS REQUIRED)
function userByPolicyNumber( req, res ) {
    let myPromises = [];
    myPromises.push( getData.getAllUsers(), getData.getAllPolicies() );
    Promise.all( myPromises )
        .then( function( data ) {
            userDelivery( data );
        })
        .catch( function( err ) {
           res.status( 401 ).json( { success : false, msg: 'Some error occurs while getting data', user : null } );
        });

    function userDelivery( data ) {
        let policyId    = req.params.id;
        let allClients  = data[ 0 ].clients;
        let allPolicies = data[ 1 ].policies;

        let policy = utils.getElementById( allPolicies, policyId );

        if( !policy ) {
            res.status( 200 ).json( { success : true, msg: 'Policy not found', user : null } );
        } else {
            let clientId = policy.clientId;
     
            let client = utils.getElementById( allClients, clientId );
            if( !client ) {
                res.status( 200 ).json( { success : true, msg: 'Not client founf for Policy number: ' + policyId, user : null } );
            } else {
                if( client.role !== 'admin' ) {
                    res.status( 200 ).json( { success : true, msg: 'Role permissions: Access denied', user : null } );
                } else {
                    res.status( 200 ).json( { success : true, msg: 'User data for Policy number: ' + policyId, user : client } );
                }
            }
        }
    }
}

module.exports = {
    userById           : userById,
    userByName         : userByName,
    userByPolicyNumber : userByPolicyNumber
};
