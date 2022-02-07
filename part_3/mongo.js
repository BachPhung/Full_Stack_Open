const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

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

const Person = mongoose.model("Person", PersonSchema)

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
mongoose.connect(`mongodb+srv://BachPhung:${password}@cluster0.c7sqy.mongodb.net/phonebook?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => { console.log("Connected to MongoDB") })
    .catch(err => console.log(err))
const newPerson = new Person({
    name: name,
    number: number
})
    (async () => {
       await newPerson.save().then(() => {
            console.log(`added ${name} number ${number} to phonebook`)
        }).catch(err => console.log(err))

        Person.find({}).then(persons => {
            console.log('phonebook:')
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
    })
    ()
