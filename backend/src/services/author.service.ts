import { PrismaClient } from '@prisma/client';

import { IBook } from './book.service';

const prisma = new PrismaClient();

export interface Author {
	id: number;
	name: string;
	books: IBook[];
}

export const getAllAuthors = async () => {
	const authors = await prisma.author.findMany();

	return authors;
};

export const getSingleAuthor = async (id: number) => {
	const author = await prisma.author.findFirstOrThrow({
		where: { id },
	});

	return author;
};

export const createAuthor = async (name: string) => {
	const newAuthor = await prisma.author.create({
		data: { name },
	});

	return newAuthor;
};
