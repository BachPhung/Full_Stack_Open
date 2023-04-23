const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
const config = require("./config");
const Book = require("./models/Book");
const Author = require("./models/Author");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

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

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

/*
  you can remove the placeholder query once your first own has been implemented 
*/

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("Connect to database successfully"));

Author.deleteMany({}).then(() => console.log("Clear authors data"));
Book.deleteMany({}).then(() => console.log("Clear books data"));
Author.insertMany(authors);

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  
  type Query {
    dummy: Int
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    findAuthor(name: String!): Author!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    dummy: () => 0,
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (_root, args) => {
      if (args.author && args.genre) {
        const authorId = Author.find({ name: args.author }).select("_id");
        return Book.find({ author: authorId, genres: args.genre }).populate(
          "author"
        );
      } else if (args.author) {
        const authorId = Author.find({ name: args.author }).select("_id");
        return Book.find({ author: authorId }).populate("author");
      } else if (args.genre) {
        return Book.find({ genres: args.genre }).populate("author");
      }
      return Book.find({}).populate("author");
    },
    allAuthors: () => {
      const booksAsAuthor = new Map();
      books.forEach((book) => {
        let amount = booksAsAuthor.get(book.author);
        if (amount) {
          booksAsAuthor.set(book.author, ++amount);
        } else {
          booksAsAuthor.set(book.author, 1);
        }
      });
      return authors.map((author) => ({
        name: author.name,
        bookCount: booksAsAuthor.get(author.name) ?? 0,
        born: author.born,
      }));
    },
    findAuthor: (_root, args) =>
      authors.find((author) => author.name === args.name),
    me: (_root, _args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (_root, args) => {
      try {
        let authorId = await Author.findOne({ name: args.author }).select(
          "_id"
        );
        if (!authorId) {
          const newAuthor = new Author({
            name: args.author,
          });
          const savedAuthor = await newAuthor.save();
          authorId = savedAuthor._id.valueOf();
        }
        const newBook = new Book({ ...args, author: authorId.valueOf() });
        await newBook.save();
        const addedBook = await Book.findOne({ title: args.title }).populate(
          "author"
        );
        return addedBook;
      } catch (error) {
        console.log("error: ", error);
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: JSON.stringify(args),
            error,
          },
        });
      }
    },
    editAuthor: (_root, args) => {
      const authorIdx = authors.findIndex(
        (author) => author.name === args.name
      );
      if (authorIdx >= 0) {
        authors[authorIdx].born = args.setBornTo;
        return authors[authorIdx];
      }
      return null;
    },
    createUser: async (_root, args) => {
      const user = new User({ username: args.username, friends: [] });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error: error.message,
          },
        });
      });
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username }).catch(
        (err) => console.log("error: ", err)
      );

      if (!user) {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return {
        value: jwt.sign(userForToken, config.JWT_SECRET),
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: config.PORT || 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id).populate(
        "friends"
      );
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
