import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface NewReview {
	content: string;
	rating: number;
	book_id: number;
}

export const getAllReviews = async () => {
	const reviews = await prisma.review.findMany();
	return reviews;
};

export const getSingleReview = async (id: number) => {
	const review = await prisma.review.findFirstOrThrow({
		where: { id },
	});
	return review;
};

export const createBook = async (newReview: NewReview) => {
	const review = await prisma.review.create({
		data: newReview,
	});
	return review;
};

export const getReviewsByBookId = async (book_id: number) => {
	const reviews = await prisma.review.findMany({ where: { book_id } });
	return reviews;
};
