const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        first: String,
        last: String
    },
    username: {
        type: String,
        required: [true, 'Username is required for registration.']
    },
    email: {
        type: String,
        validate: {
            validator: validateEmail,
            message: 'Invalid email email'
        },
        required: [true, 'Email is required for registration']
    },
    password: {
        type: String,
        validate: {
            validator: validatePassword,
            message: 'Password must be at least 6 characters long and include numbers and letters.'
        },
        required: [true, 'Password is required']
    },
    disliked_ingredients: [String],
    liked_ingredients: [String],
    favorites: {
        breakfast: [String],
        lunch: [String],
        dinner: [String]
    },
    date_created: Date,
    last_login: Date
}, { collection: 'users' });

userSchema.set('validateBeforeSave', false)

function validatePassword(password) {
    return /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
}

function validateEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;