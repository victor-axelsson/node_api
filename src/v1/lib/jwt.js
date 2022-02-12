import jwt from 'jsonwebtoken';

const config = {
    jwt: {
        secret: process.env.JWT_SECRET,
        exp: process.env.JWT_EXP,
        algorithm: process.env.JWT_ALGORITHM
    }
}

class Jwt {
    /**
     * Takes the authorization header and returns the token without the JWT prefix.
     * @param {String} authorization
     */
    tokenFromAuthHeader(authorization) {
        if (!authorization || authorization.trim().length == 0) {
            return null;
        }

        return authorization.trim().substr(4);
    }

    /**
     * Sync verifies the given token
     * @param {String} token
     * @param {Boolean} ignoreExpiration
     */
    verify(token, ignoreExpiration = false) {
        return jwt.verify(token, config.jwt.secret, { ignoreExpiration });
    }

    /**
     * Async verifies the given token
     * @param {String} token
     * @param {Function} callback
     */
    verifyWithCallback(token, callback) {
        return jwt.verify(token, config.jwt.secret, callback);
    }

    /**
     * Create a signed JWT token from payload
     * @param {Object} payload
     */
    sign(payload) {
        return jwt.sign({ ...payload }, config.jwt.secret, {
            expiresIn: config.jwt.exp,
            algorithm: config.jwt.algorithm
        });
    }
}

const jwtSingleton = new Jwt();
export default jwtSingleton;
