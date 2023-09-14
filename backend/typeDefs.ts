const typeDefs = `#graphql
type Book {
    id: ID!
    title: String!
    # platform: [String!]!
    # reviews: [Review!]
}

type Author {
    id: ID!
    name: String!
    # reviews: [Review!]
}

type Review {
    id: ID!
    rating: Int!
    content: String!
    # author: Author!
    # game: Game!
}

type Query {
    books: [Book]
    # game(id: ID!): Game

    authors: [Author]
    # author(id: ID!): Author

    reviews: [Review]
    # review(id: ID!): Review
}

input BookInput {
    title: String!
}

type Mutation {
    createBook(book: BookInput!): Book!

    deleteBook(id: Int!): Book!
}
`;

export default typeDefs;
