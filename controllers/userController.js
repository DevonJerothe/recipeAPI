const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel')

exports.postRegister = async (req, res) => {

}

exports.postLogin = async (req, res) => {
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