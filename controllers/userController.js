const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel')
const validate = require('../utils/validation')

exports.postRegister = async (req, res) => {
    const user = new UserModel(req.body);

    const modelState = validate.validateModel(user);
    if(!modelState.isValid){
        res.status(500).send(modelState.message);
        return;
    }

    res.send(user);
}

exports.putLogin = async (req, res) => {
    //get userInfo
    let userID = "FAKE ID"
    createToken(userID)
}

exports.getLogout = async (req, res) => {

}

exports.getUserInfo = async (req, res) => {

}

function createToken(user) {
    jwt.sign({ userID: user._id }, process.env.TOKEN_SECRET, { algorithm: 'RS256', expiresIn: '24h'}, function (err, token) {
        if(err){
            return err
        }
        return token
    });
}