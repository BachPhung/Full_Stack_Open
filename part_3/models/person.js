const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const url = process.env.MONGODB_URI

console.log('connecting to', url)
const chechValidNumber = (phoneNumber) =>{
    const removeSpaceNumber = phoneNumber.replace( /\s/g, '')
    const numberParts = removeSpaceNumber.split('-')
    if(numberParts[0].length === 2 || numberParts[0].length === 3){
        if(numberParts[1].length > 5)
            return true
    }
    else return false
}
mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => { console.log("Connected to MongoDB") })
    .catch(err => console.log(err))

const PersonSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {validator: chechValidNumber, message: props=>`${props.value} is not a valid phone number`},
    }
})

PersonSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
})

module.exports = mongoose.model('Person', PersonSchema)