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
    const userCheck = await UserModel.find(
        {
            $or: [{email: new RegExp(`^${user["email"]}$`, 'i')},
                {username: new RegExp(`^${user["username"]}$`, 'i')}]
        });
    if(userCheck.length > 0){
        return res.status(400).send({
            message: "Username or Email already exists"
        })
    }

    bcrypt.hash(user.password, 8, function (err, hash) {
        console.log("Hash: " + hash);
        if (err) {
            return res.status(500).send(err);
        }
        user.password = hash;
        console.log("new User pass: " + user.password);
        user.date_created = Date.now()
        user.save();
        createToken(user._id, res, user);
    })
}

exports.putLogin = async (req, res) => {
    const login = req.body;
    const user = await UserModel.findOne({email: new RegExp(`^${login.email}$`, `i`)});
    if (user == null) {
        console.log("No User")
        return res.status(404).send({
            message: "User not found"
        })
    }
    const passCheck = bcrypt.compareSync(login.password, user.password);
    if (!passCheck) {
        return res.status(401).send({
            message: "Invalid Password"
        })
    }
    createToken(user, res)
}

exports.getLogout = async (req, res) => {

}

exports.getUserInfo = async (req, res) => {

}

function createToken(user, res) {
    jwt.sign({userID: user._id}, process.env.TOKEN_SECRET, {expiresIn: '24h'}, function (err, token) {
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

