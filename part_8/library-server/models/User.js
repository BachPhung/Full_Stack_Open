const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 6
    },
    favvouriteGenre:{
        type: [String],
    }
})

module.exports = mongoose.model('User', UserSchema);