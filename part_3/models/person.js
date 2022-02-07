const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(`mongodb+srv://BachPhung:${password}@cluster0.c7sqy.mongodb.net/phonebook?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => { console.log("Connected to MongoDB") })
    .catch(err => console.log(err))

const PersonSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    number: {
        type: String,
        require: true
    }
})

PersonSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
})

module.exports = mongoose.model('Person',noteSchema)