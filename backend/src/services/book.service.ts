import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
	const books = await prisma.book.findMany();
	return books;
};

export const getSingleBook = async (id: number) => {
	const book = await prisma.book.findFirstOrThrow({
		where: { id },
	});
	return book;
};

export const createBook = async (newBook: INewBook) => {
	const book = await prisma.book.create({
		data: newBook,
	});

	return book;
};

export const getBooksByAuthorId = async (author_id: number) => {
	const books = await prisma.book.findMany({ where: { author_id } });
	return books;
};
