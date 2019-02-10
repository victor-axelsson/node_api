var middleware = {};
var sha1 = require('sha1');
var userHandler = require('../handlers/userHandler');

/** 
 * @author Victor Axelsson
 * Api key was provided
 */
middleware.validToken = (req, res, next) => {

    // Token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // Check if api key is valid
    userHandler.validToken(token, (err, result) => {

        // Check result
        if (err) {
            console.log("result was an error ");
            res.send(500, "Server error: ", +err);
        } else {

            if (result) {
                // if everything is good, save to request for use in other routes
                req.decoded = result;
                next();

            } else {
                res.send(400, "Bad request, you must provide a valid token");
            }
        }
    });
}

module.exports = middleware;
