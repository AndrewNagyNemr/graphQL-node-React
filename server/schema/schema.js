const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const books = [
  { id: "1", name: "book1", genre: "genre1", authorID: "1" },
  { id: "2", name: "book2", genre: "genre2", authorID: "1" },
  { id: "3", name: "book3", genre: "genre3", authorID: "3" },
];

const authors = [
  { id: "1", name: "Author1", age: "40" },
  { id: "2", name: "Author2", age: "40" },
  { id: "3", name: "Author3", age: "40" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorID });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorID: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db
        return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
