var endpoints = {};
var userHandler = require('./handlers/userHandler');

var middleware = require('./middleware/middleware');

endpoints.ping = {
    url: '/v1/ping',
    method: 'get',
    handler: (req, res) => {
        res.status(200).send("pong");
    }
}

endpoints.register = {
    url: '/v1/user/register',
    method: 'post',
    middleware: [],
    handler: userHandler.register
}

endpoints.loginUser = {
    url: '/v1/user/login',
    method: 'post',
    middleware: [],
    handler: userHandler.login
}

module.exports = endpoints;