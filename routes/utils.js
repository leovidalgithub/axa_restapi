
function getElementById( clients, clientId ) {
	return clients.find( function( _client ) {
        	return _client.id === clientId;
    });
}

function getElementByName( clients, name ) {
    return clients.find( function( _client ) {
            return _client.name === name;
    });
}

module.exports = {
	getElementById   : getElementById,
    getElementByName : getElementByName
};
