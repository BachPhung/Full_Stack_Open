const { ApolloServer, gql, UserInputError, AuthenticationError } = require("apollo-server");
const { v1: uuid } = require("uuid");
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require("./models/User");
const JWT_SECRET = 'SECRET_KEY'

let authors = [
  {
    name: "Robert Martin",
    // id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    // id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    // id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    // id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    // id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    // id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    // id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    // id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    // id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    // id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    // id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    // id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const MONGODB_URI = 'mongodb+srv://BachPhung:thutrang251@cluster0.c7sqy.mongodb.net/graphql-demo?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI).then(()=> console.log('Connect to database successful')).catch(err=>console.log(err))


Author.deleteMany({}).then(()=>console.log('Clean author data'));
Book.deleteMany({}).then(()=>console.log('Clean book data'));

Author.insertMany(authors).then(data=>console.log(data));


const resolvers = {
  Query: {
    bookCount: async() => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const authorId = await Author.find({name: args.author}).select("_id");
        return Book.find({author: authorId, genres: args.genre}).populate('author');
      }
      if (args.author) {
        const authorId = Author.find({name: args.author}).select('_id');
        const books = await Book.find({author: authorId}).populate('author')
        return books
      }
      if (args.genre) {
        return Book.find({genres: args.genre}).populate('author')
      }
      return await Book.find({}).populate('author');
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: async (root, args) =>{
      const authorId = await Author.findOne({name: args.name}).select('_id');
      if(!authorId){
        const newAuthor = new Author({name: args.name});
      }
      return Book.find({author}).countDocuments();
    }
  },
  Mutation: {
    addBook: async (_, args, {currentUser}) => {
      if(!currentUser){
        throw new AuthenticationError('not authenticated')
      }
      try{
        let authorId = await Author.findOne({name: args.author}).select("_id");
        if(!authorId){
          const newAuthor = new Author({
            name: args.name
          })
          await newAuthor.save();
          authorId = newAuthor._id;
        }
        const newBook = new Book({...args, author: authorId});
        await newBook.save();
        const addedBook = Book.find({title:args.title}).populate('author');
        return addedBook
      }
      catch(err){
        throw new UserInputError(err.message,{
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, {currentUser}) => {
      if(!currentUser){
        throw new AuthenticationError('not authenticated')
      }
      try{
        let updatedAuthor = await Author.findOneAndUpdate({name: args.name},{name: args.name, born: args.setBornTo}, {new: true});
        return updatedAuthor
      }
      catch(err){
        throw new UserInputError(err.message,{
          invalidArgs: args
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({username: args.username})
      return user.save()
      .catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return {value: jwt.sign(userForToken, JWT_SECRET)};
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.header.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id);
      return {currentUser}
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
