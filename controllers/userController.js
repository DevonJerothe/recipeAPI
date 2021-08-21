const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel')
const validate = require('../utils/validation')

exports.postRegister = async (req, res) => {
    const user = new UserModel(req.body);

    const modelState = validate.validateModel(user);
    if(!modelState.isValid){
        res.status(400).send(modelState.message);
        return;
    }  

    //ADD USERNAME CHECK

    bcrypt.hash(user.password, 8, function(err, hash){
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        console.log(hash)
        user.password = hash;
    })

    user.save({isNew: true});
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