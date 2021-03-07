const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');

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
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
    addBook: async (_, args) => {
      const { title, author, published, genres } = args;
      let authorObject = await Author.findOne({ name: author });

      if (!authorObject) {
        authorObject = await new Author({ name: author }).save();
      }

      const newBook = new Book({
        title,
        author: authorObject._id,
        published,
        genres,
      });

      return newBook.save();
    },
    editAuthor: async (_, args) => {
      const author = await Author.findOne({ name: args.name });

      if (!author) return null;

      author.born = Number(args.setBornTo);

      return author.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
