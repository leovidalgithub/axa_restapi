let getData  = require( '../getData' ),
    utils    = require( '../utils' );

// REST API - RETURNS LIST OF POLICIES LINKED TO USER-NAME (ADMIN ROLE IS REQUIRED)
function policiesByUserName( req, res ) {
    let myPromises = [];
    myPromises.push( getData.getAllUsers(), getData.getAllPolicies() );
    Promise.all( myPromises )
        .then( function( data ) {
            policyDelivery( data );
        })
        .catch( function( err ) {
           res.status( 401 ).json( { success : false, msg: 'Some error occurs while getting data', policies : null } );
        });

    function policyDelivery( data ) {
        let clientName  = req.params.name;
        let allClients  = data[ 0 ].clients;
        let allPolicies = data[ 1 ].policies;

        let client      = utils.getElementByName( allClients, clientName );
        if( !client ) {
            res.status( 200 ).json( { success : true, msg: 'Client not found', policies : null } );
        } else {
            if( client.role !== 'admin' ) {
                res.status( 200 ).json( { success : true, msg: 'Role permissions: Access denied', policies : null } );
            } else {
                let clientId = client.id;
                let policies = allPolicies.filter( function( _policy ) {
                    return _policy.clientId === clientId;
                });
                if( !policies.length ) {
                    res.status( 200 ).json( { success : true, msg: 'Policies not found for client: ' + clientName, policies : null } );
                } else {
                    res.status( 200 ).json( { success : true, msg: 'Policies for client: ' + clientName, policies : policies } );
                }                
            }
        }
    }
}

module.exports = {
    policiesByUserName : policiesByUserName
};
