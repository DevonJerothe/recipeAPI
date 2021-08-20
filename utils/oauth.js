
require('dotenv').config()

exports.getToken = (req, res) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[0];
        req.token = bearerToken;
        next();
    }
    else {
        res.status(403).send("Invalid Token")
    }
}

exports.verifyToken = (req, res) => {
    jwt.verify(req.token, process.env.TOKEN_SECRET, function(err, _authData) {
        if (err){
            res.status(403).send(err)
        }else{
            next()
        }
      });
}