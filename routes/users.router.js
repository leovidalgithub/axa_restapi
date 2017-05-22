let express         = require( 'express' ),
    usersRouter     = express.Router(),
    usersHandler    = require( './handlers/users.handler' );
    policiesHandler = require( './handlers/policies.handler' );

// USER GETPOINTS
usersRouter.get ( '/userById/:id',             usersHandler.userById );
usersRouter.get ( '/userByName/:name',         usersHandler.userByName );
usersRouter.get ( '/userByPolicyNumber/:id',   usersHandler.userByPolicyNumber );

// POLICIES GETPOINTS
usersRouter.get ( '/policiesByUserName/:name', policiesHandler.policiesByUserName );

module.exports = usersRouter;
