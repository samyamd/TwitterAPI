const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = mongoose.Schema({
    id:Number,
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
        default: "samyamdw"
    },
    image: {
        type: String,
        default: 'user.png'
    },
    password: {
        type: String,
        required: [true,"Password field can not be empty."]
    }
},{ timestamps: true });

userSchema.plugin(AutoIncrement, {inc_field: 'id'});

const users = mongoose.model('User',userSchema)
module.exports = users