import { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';

import AppModal from './AppModal';
import AddReviewModal from './AddReviewModal';
import { IReview } from '../utils/interfaces';
import Rating from './Rating';
import Separator from './Separator';
import { IoCreate, IoTrash } from 'react-icons/io5';

interface Props {
	isOpen: boolean;
	closeModal: () => void;
	bookID: number | null;
}

const BOOK_INFO = gql`
	query GetBookInfo($bookID: ID!) {
		book(id: $bookID) {
			id
			title
			author {
				id
				name
			}
			reviews {
				id
				content
				rating
			}
		}
	}
`;

const CREATE_REVIEW = gql`
	mutation CreateReview($review: ReviewInput!) {
		createReview(review: $review) {
			id
			content
			rating
		}
	}
`;

const DELETE_BOOK = gql`
	mutation DeleteBook($bookID: Int!) {
		deleteBook(id: $bookID) {
			id
		}
	}
`;

const BookInfoModal = ({ isOpen, closeModal, bookID }: Props) => {
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

	const openReviewModal = () => setIsReviewModalOpen(true);
	const closeReviewModal = () => setIsReviewModalOpen(false);

	const { data, loading, error, refetch } = useQuery(BOOK_INFO, {
		variables: { bookID },
	});

	const [createReview, { error: error1 }] = useMutation(CREATE_REVIEW);
	const [deleteBook] = useMutation(DELETE_BOOK);

	if (isOpen) {
		if (loading) return 'Submitting...';
		if (error) return `Submission error! ${error.message}`;

		if (error1) return `Submission error! ${error1.message}`;

		return (
			<AppModal
				isOpen={isOpen}
				closeModal={closeModal}
				title={data.book.title}
			>
				<Container>
					<p className="author">by {data.book.author.name}</p>
					<h3>Reviews</h3>
					<div className="reviews">
						{data.book.reviews.map(
							(review: IReview, index: number) => (
								<>
									<div className="review" key={review.id}>
										<span>{index + 1}.</span>
										<div className="review-info">
											<p>{review.content}</p>
											<Rating value={review.rating} />
										</div>
									</div>
									{index + 1 !== data.book.reviews.length && (
										<Separator key={index + 1} />
									)}
								</>
							)
						)}

						{data.book.reviews.length === 0 && (
							<p className="empty">No reviews added</p>
						)}
					</div>

					<div className="btns">
						<button onClick={openReviewModal}>
							<IoCreate />
							Review Book
						</button>
						<button
							className="danger-btn"
							onClick={() => {
								deleteBook({
									variables: { bookID: Number(bookID) },
								}).finally(() => {
									closeModal();
								});
							}}
						>
							<IoTrash /> Delete Book
						</button>
					</div>
				</Container>
				<AddReviewModal
					isOpen={isReviewModalOpen}
					closeModal={closeReviewModal}
					submitReview={(review) => {
						createReview({
							variables: {
								review: {
									...review,
									book_id: Number(bookID),
								},
							},
						}).then(() => {
							refetch();
							closeReviewModal();
						});
					}}
				/>
			</AppModal>
		);
	}
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;

	.author {
		margin: 5px 0 10px;
		font-style: italic;
		font-weight: 300;
	}
	.reviews {
		max-height: 250px;
		overflow: auto;
		padding: 0 10px;

		.review {
			display: grid;
			grid-template-columns: 18px 1fr;
			gap: 10px;
		}
	}

	.btns {
		display: flex;
		gap: 10px;

		button {
		}
	}
`;

export default BookInfoModal;
