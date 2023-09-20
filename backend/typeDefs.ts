const typeDefs = `#graphql
type Book {
    id: ID!
    title: String!
    author: Author!
    reviews: [Review!]
}

type Author {
    id: ID!
    name: String!
    books: [Book!]
}

type Review {
    id: ID!
    rating: Int!
    content: String!
    book: Book!
}

type Query {
    books: [Book]
    book(id: Int!): Book

    authors: [Author]
    author(id: Int!): Author

    reviews: [Review]
    review(id: Int!): Review
}

input AuthorInput {
    name: String!
}

input BookInput {
    author: AuthorInput!
    title: String!
}

input ReviewInput{
    content: String!
    rating: Int!
    book_id: Int!
}

type Mutation {
    createBook(book: BookInput!): Book!
    deleteBook(id: Int!): Book!

    createReview(review: ReviewInput!): Review!
}
`;

export default typeDefs;
