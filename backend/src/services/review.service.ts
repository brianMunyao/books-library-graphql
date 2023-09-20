import { PrismaClient } from '@prisma/client';

const { review: Review } = new PrismaClient();

export interface NewReview {
	content: string;
	rating: number;
	book_id: number;
}

export const getAllReviews = async () => {
	const reviews = await Review.findMany();
	return reviews;
};

export const getSingleReview = async (id: number) => {
	const review = await Review.findFirstOrThrow({
		where: { id },
	});
	return review;
};

export const createBook = async (newReview: NewReview) => {
	const review = await Review.create({
		data: newReview,
	});
	return review;
};

export const getReviewsByBookId = async (book_id: number) => {
	const reviews = await Review.findMany({ where: { book_id } });
	return reviews;
};

export const deleteBookReviews = async (book_id: number) => {
	const reviews = await Review.deleteMany({ where: { book_id } });
	return reviews;
};
