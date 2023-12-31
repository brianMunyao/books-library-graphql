import styled from 'styled-components';

import { IBook } from '../utils/interfaces';

interface Props {
	itemNo: number;
	book: IBook;
	openBook?: () => void;
}

const Book = ({ itemNo, book, openBook }: Props) => {
	return (
		<Container>
			<span className="no">{itemNo}.</span>
			<div className="title-con">
				<p
					className="title"
					onClick={() => {
						if (openBook) openBook();
					}}
				>
					{book.title}
				</p>

				<div className="bottom">
					<span className="author">by {book.author?.name}</span>

					<div className="reviews">
						{book?.reviews?.length} reviews
					</div>
				</div>
			</div>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	align-items: center;

	.no {
		width: 30px;
	}

	.title-con {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 5px;

		.title {
			font-size: 17px;

			&:hover {
				color: dodgerblue;
				cursor: pointer;
			}
		}

		.bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.author {
				font-style: italic;
				font-weight: 300;
			}
		}
	}
`;

export default Book;
