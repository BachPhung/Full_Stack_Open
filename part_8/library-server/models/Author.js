const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength:4
    },
    born:{
        type: Number
    }
})

module.exports = mongoose.model('Author', AuthorSchema);