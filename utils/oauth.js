const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.getToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[0];
        req.token = bearerToken;
        verifyToken(req, res, next);
    }
    else {
        res.status(401).send("Invalid Token")
    }
}

function verifyToken(req, res, next) {
    jwt.verify(req.token, process.env.TOKEN_SECRET, function(err, _authData) {
        if (err){
            res.status(403).send(err)
        }else{
            next()
        }
      });
}
