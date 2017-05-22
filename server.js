let express     = require( 'express' ),
    app         = express(),
    server      = require( 'http' ).Server( app ),
	bodyParser  = require( 'body-parser' ),
	usersRouter = require( './routes/users.router' );

app.set( 'port', process.env.PORT || 3005 );

app.use( bodyParser.json( { limit: '50mb' } ));
app.use( bodyParser.urlencoded( { limit: '50mb', extended: true } ));

app.use( require( './config/setHeader' ) );
app.use( '/data' , usersRouter );

server.listen( app.get( 'port' ), function() {
	console.log( 'Axa Insurance REST API is now running on port ' + app.get( 'port' ) );
});
