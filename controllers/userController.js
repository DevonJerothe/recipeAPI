const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()

const UserModel = require('../models/userModel')
const validate = require('../utils/validation')

exports.putRegister = async (req, res) => {
    const user = new UserModel(req.body);
    const modelState = validate.validateModel(user);
    if (!modelState.isValid) {
        console.log("validation error: ")
        return res.status(400).send(modelState.message);
    }

    //USERNAME CHECK
    let response;
    await UserModel.find(
        {
            $or: [{ email: new RegExp(`^${user.email}$`, 'i') },
            { username: new RegExp(`^${user.username}$`, 'i') }]
        },
        function (err, result) {
            if (err) {
                console.log("errorHIT")
                response = err;
            }
            if (result.length > 0) {
                console.log("multiFound")
                response = {
                    message: "Username or Email already exists"
                };
            }
        });
    if (response != null) {
        console.log("find error: " + response)
        return res.status(400).send(response);
    }

    bcrypt.hash(user.password, 8, function (err, hash) {
        console.log("Hash: " + hash);
        if (err) {
            res.status(500).send(err);
        }
        user.password = hash;
        console.log("new User pass: " + user.password);
        user.date_created = Date.now()
        user.save({ isNew: true });
        createToken(user._id, res, user);
    })
}

exports.putLogin = async (req, res) => {
    const login = req.body;
    await UserModel.findOne(
        { email: new RegExp(`^${login.email}$`, 'i') },
        function (err, result) {
            if (err) {
                return res.status(500).send(err);
            }
            if (result == null) {
                console.log("No User")
                return res.status(404).send({
                    message: "User not found"
                })
            }
            bcrypt.compare(login.password, result.password, function (err, pass) {
                if (err) {
                    return res.status(500).send(err)
                }
                if (!pass) {
                    return res.status(401).send({
                        message: "Invalid Password"
                    })
                }
                createToken(result._id, res, result)
            });
        });
}

exports.getLogout = async (req, res) => {

}

exports.getUserInfo = async (req, res) => {

}

function createToken(id, res, user) {
    jwt.sign({ userID: id }, process.env.TOKEN_SECRET, { expiresIn: '24h' }, function (err, token) {
        console.log(token)
        if (err) {
            return res.status(500).send({
                success: false,
                error: err
            });
        }
        user.last_login = Date.now();
        user.save();
        res.send({
            success: true,
            token: token,
            exp: '24h'

        })
    });
}

