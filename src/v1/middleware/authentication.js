import jwtHelper from '../lib/jwt';

class AuthenticationMiddleware {
    execute(req, res, next) {
        const token = jwtHelper.tokenFromAuthHeader(req.headers['authorization']);

        if (!token) {
            res.send(400, "Missing authorization header");
        }

        // Check if api key is valid
        jwtHelper.verifyWithCallback(token, (err, result) => {

            // Check result
            if (err) {
                res.status(400).send({ error: true, response: "Invalid token" })
            } else {

                if (result) {
                    // if everything is good, save to request for use in other routes
                    req.decoded = result;
                    next();

                } else {
                    res.status(400).send({ error: true, response: "Invalid token" })
                }
            }
        });
    }
}

const authenticationMiddleware = new AuthenticationMiddleware();
export default authenticationMiddleware;