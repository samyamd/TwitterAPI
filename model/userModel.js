const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"Name field is required."]
    },
    email:{
        type:String,
        required:[true,"Email field is required."],
        unique: [true,"Email is already taken. Please try another one."]
    },
    username: {
        type: String,
        unique: [true,"Username is already taken. Please try another one."],
        required: [true,"Username field is required."]
    },
    // phone: {
    //     type: String,
    //     required: [true,"Phone Number field is required."]
    // },
    image: {
        type: String,
        default: 'user.png'
    },
    password: {
        type: String,
        required: [true,"Password field can not be empty."]
    },
    created_at: {
        type: Date,
        default: new Date().toISOString()
    }
})

const users = mongoose.model('User',userSchema)
module.exports = users