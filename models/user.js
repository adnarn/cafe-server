// const mongoose = require('../config/dbConfig');

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
//     role: { type: String, enum: ['admin', 'customer'], default: "customer" }
// });

// const UserModel = mongoose.model('User', userSchema);
// module.exports =  UserModel


const mongoose = require('../config/dbConfig');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true 

    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'customer'], 
        default: 'customer' 
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
