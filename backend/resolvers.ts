import { PrismaClient } from '@prisma/client';
import {
	createAuthor,
	deleteAuthor,
	getAllAuthors,
	getSingleAuthor,
} from './src/services/author.service';
import {
	deleteBook,
	getAllBooks,
	getBooksByAuthorId,
	getSingleBook,
} from './src/services/book.service';
import {
	deleteBookReviews,
	getAllReviews,
	getReviewsByBookId,
	getSingleReview,
} from './src/services/review.service';

const prisma = new PrismaClient();

const resolvers = {
	Query: {
		books: async () => {
			const books = await getAllBooks();
			return books;
		},
		book: async (_: any, { id }: { id: number }) => {
			const book = await getSingleBook(id);
			return book;
		},

		authors: async () => {
			const authors = await getAllAuthors();
			return authors;
		},
		author: async (_: any, { id }: { id: number }) => {
			const author = await getSingleAuthor(id);
			return author;
		},

		reviews: async () => {
			const reviews = await getAllReviews();
			return reviews;
		},
		review: async (_: any, { id }: { id: number }) => {
			const review = await getSingleReview(id);
			return review;
		},
	},
	Book: {
		async reviews(parent: any) {
			const reviews = await getReviewsByBookId(parent.id);
			return reviews;
		},
		async author(parent: any) {
			const author = await getSingleAuthor(parent.author_id);
			return author;
		},
	},
	Author: {
		async books(parent: any) {
			const books = await getBooksByAuthorId(parent.id);
			return books;
		},
	},
	Review: {
		async book(parent: any) {
			const book = await getSingleBook(parent.book_id);
			return book;
		},
	},
	Mutation: {
		createBook: async (_: any, args: any) => {
			const author = await createAuthor(args.book.author.name);
			const newBook = await prisma.book.create({
				data: { title: args.book.title, author_id: author.id },
			});
			return { ...newBook, author };
		},
		deleteBook: async (_: any, args: any) => {
			await deleteBookReviews(args.id);

			const deletedBook = await deleteBook(args.id);
			await deleteAuthor(deletedBook.author_id);
			return deletedBook;
		},

		createReview: async (_: any, args: any) => {
			const review = await prisma.review.create({ data: args.review });
			return review;
		},
	},
};

export default resolvers;
