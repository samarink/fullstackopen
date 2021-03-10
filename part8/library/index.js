const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY';

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
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
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.find({}).count(),
    authorCount: () => Author.find({}).count(),
    allBooks: async (_, args) => {
      let books = await Book.find({});
      books = args.genre
        ? books.filter((book) => book.genres.includes(args.genre))
        : books;

      return books;
    },
    allAuthors: () => Author.find({}),
    me: (_, __, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: (root) => {
      return Book.find({ author: root._id }).count();
    },
  },
  Book: {
    author: (root) => {
      return Author.findById(root.author);
    },
  },
  Mutation: {
    addBook: async (_, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('not authenticated');

      const { title, author, published, genres } = args;
      let authorObject = await Author.findOne({ name: author });

      if (!authorObject) {
        try {
          authorObject = await new Author({ name: author }).save();
        } catch (err) {
          throw new UserInputError(err.message, { invalidArgs: args });
        }
      }

      const book = new Book({
        title,
        author: authorObject._id,
        published,
        genres,
      });

      try {
        await book.save();
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args });
      }

      return book;
    },
    editAuthor: async (_, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('not authenticated');

      const author = await Author.findOne({ name: args.name });

      if (!author) return null;

      const setBornTo = Number(args.setBornTo);

      if (isNaN(setBornTo))
        throw new UserInputError('not valid number', { invalidArgs: args });
      author.born = setBornTo;

      try {
        author.save();
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args });
      }

      return author;
    },
    createUser: async (_, { username, favoriteGenre }) => {
      const user = new User({ username, favoriteGenre });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: { username, favoriteGenre },
        });
      });
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user || password !== 'secret')
        throw new UserInputError('wrong credentials');

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
