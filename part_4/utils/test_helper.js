const User = require("../models/user")

const initialBlogs = [
    {
        title: 'Blog 1',
        author: 'Author 1',
        url: '#',
        likes: 1
    },
    {
        title: 'Blog 2',
        author: 'Author 2',
        url: '#',
        likes: 2
    }
]
const usersInDb = async () =>{
    const users = await User.find({})
    return users.map(u=>u.toJSON())
}
module.exports={
    initialBlogs,
    usersInDb
}