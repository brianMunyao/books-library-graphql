import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const resolvers = {
	Query: {
		books: async () => {
			const res = await prisma.book.findMany();
			return res;
		},
		// game: (_: any, args: { id: string }) =>
		// 	_db.games.find((g) => g.id === args.id),

		authors: async () => {
			const res = await prisma.author.findMany();
			return res;
		},
		// author: (_: any, args: { id: string }) =>
		// 	_db.authors.find((a) => a.id === args.id),

		reviews: async () => {
			const res = await prisma.review.findMany();
			return res;
		},
		// review: (_: any, args: { id: string }) =>
		// 	_db.reviews.find((r) => r.id === args.id),
	},
	// Game: {
	// 	reviews(parent: any) {
	// 		return _db.reviews.filter((r) => r.game_id === parent.id);
	// 	},
	// },
	// Author: {
	// 	reviews(parent: any) {
	// 		return _db.reviews.filter((r) => r.author_id === parent.id);
	// 	},
	// },
	// Review: {
	// 	author(parent: any) {
	// 		return _db.authors.find((a) => a.id === parent.author_id);
	// 	},
	// 	game(parent: any) {
	// 		return _db.games.find((g) => g.id === parent.game_id);
	// 	},
	// },
	Mutation: {
		createBook: async (_: any, args: any) => {
			const newBook = await prisma.book.create({ data: args.book });
			return newBook;
		},
		deleteBook: async (_: any, args: any) => {
			const book = await prisma.book.delete({ where: { id: args.id } });
			return book;
		},
	},
};

export default resolvers;
