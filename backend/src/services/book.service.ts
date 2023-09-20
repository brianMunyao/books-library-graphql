import { PrismaClient } from '@prisma/client';

const { book: Book } = new PrismaClient();

export interface IBook {
	id: number;
	title: string;
	author_id: number;
}

export interface INewBook {
	title: string;
	author_id: number;
}

export const getAllBooks = async () => {
	const books = await Book.findMany();
	return books;
};

export const getSingleBook = async (id: number) => {
	const book = await Book.findUnique({
		where: { id },
	});
	return book;
};

export const createBook = async (newBook: INewBook) => {
	const book = await Book.create({
		data: newBook,
	});

	return book;
};

export const getBooksByAuthorId = async (author_id: number) => {
	const books = await Book.findMany({ where: { author_id } });
	return books;
};

export const deleteBook = async (id: number) => {
	const book = await Book.delete({ where: { id } });
	return book;
};
