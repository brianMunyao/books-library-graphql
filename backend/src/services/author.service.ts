import { PrismaClient } from '@prisma/client';

import { IBook } from './book.service';

const { author: Author } = new PrismaClient();

export interface IAuthor {
	id: number;
	name: string;
	books: IBook[];
}

export const getAllAuthors = async () => {
	const authors = await Author.findMany();

	return authors;
};

export const getSingleAuthor = async (id: number) => {
	const author = await Author.findFirstOrThrow({
		where: { id },
	});

	return author;
};

export const createAuthor = async (name: string) => {
	const newAuthor = await Author.create({
		data: { name },
	});

	return newAuthor;
};

export const deleteAuthor = async (id: number) => {
	const author = await Author.delete({ where: { id } });
	return author;
};
