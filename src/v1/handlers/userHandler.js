var userHandler = {};
var sha1 = require('sha1');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var User = require('../models/user'); 

userHandler.register = async function(req, res){
    User.exists(req.body.username).then((exists) => {
        if(exists){
            res.status(400).send({
                status: 400,
                message: "Bad request"
            });
        }else{
            var salt = crypto.randomBytes(20).toString('hex');
            var token = crypto.randomBytes(20).toString('hex');
            var userModel = {
                username: req.body.username,
                password: sha1(req.body.password + salt),
                salt: salt,
                isVerified: false
            };
    
            User.create(userModel).then(() => {
                res.status(200).send({
                    username: user.username,
                    token: token
                });
            }).catch((err) => {
                res.status(500).send({
                    message: "Server error",
                });
            }); 
        }
    }).catch(() => {
        res.status(500).send({
            status: 500,
            message: "Server error"
        });
    }); 
}

userHandler.verifyPassword = (password1, password2, salt) => {
    return password1 == sha1(password2 + salt) ? true : false;
};

userHandler.createToken = (user) => {
    return jwt.sign(user, process.env.SECRET, {
        expiresInMinutes: process.env.EXPIRE
    });
}

userHandler.validToken = (token, callback) => {
    return Promise((resolve, reject) => {
        // Check that key is okay
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, process.env.SECRET, (err, result) => {
                resolve((result ? true : false))
            });
        } else {
            reject("Missing token");
        }
    }); 
};

userHandler.login = function(req, res) {

    User.exists(req.body.username).then((exists) => {
        if(exists){
            res.status(400).send({
                status: 400,
                message: "Bad request"
            });
        }else{
            User.getByUsername(req.body.username).then(() =>{
                // Check that password matches
                if (userHandler.verifyPassword(result.password, req.body.password, result.salt)) {
                    res.status(200).send({
                        id: result.id,
                        username: result.username,
                        token: userHandler.createToken(result)
                    });
                }else{
                    res.status(400).send({
                        status: 400,
                        message: "Bad request"
                    });
                }
            }); 
        }
    }).catch(() => {
        res.status(500).send({
            status: 500,
            message: "Server error"
        });
    }); 
}

module.exports = userHandler;
