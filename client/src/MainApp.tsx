import { useContext, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { IoAdd } from 'react-icons/io5';

import { IBook } from './utils/interfaces';
import Book from './components/Book';
import AddBook from './components/AddBook';
import BookInfoModal from './components/BookInfoModal';
import { AppContext } from './utils/AppContext';
import Separator from './components/Separator';

const GET_BOOKS = gql`
	query GetBooks {
		books {
			id
			title
			author {
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

function MainApp() {
	const { bookInfoModalID, closeBookInfoModal, openBookInfoModal } =
		useContext(AppContext);

	const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
	const openAddBookModal = () => setIsAddBookModalOpen(true);
	const closeAddBookModal = () => setIsAddBookModalOpen(false);

	const { refetch, loading, error, data } = useQuery(GET_BOOKS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return (
		<>
			<Container>
				<div className="inner">
					<div className="page-header">
						<h1>📚 Book Library</h1>
						{bookInfoModalID}
						<button onClick={openAddBookModal}>
							<IoAdd /> Add Book
						</button>
					</div>
					{data.books.map((book: IBook, index: number) => (
						<>
							<Book
								key={book.id}
								itemNo={index + 1}
								book={book}
								openBook={() => {
									openBookInfoModal(Number(book.id));
								}}
							/>
							{index + 1 !== data.books.length && (
								<Separator key={index + 1} />
							)}
						</>
					))}

					{data.books.length === 0 && (
						<p className="empty">No Books Added</p>
					)}
				</div>
			</Container>

			<AddBook
				isOpen={isAddBookModalOpen}
				closeModal={closeAddBookModal}
				refetchBooks={refetch}
			/>

			<BookInfoModal
				isOpen={bookInfoModalID !== null}
				closeModal={() => {
					refetch();
					closeBookInfoModal();
				}}
			/>
		</>
	);
}

const Container = styled.div`
	min-height: 100vh;
	padding: 80px 20px;
	.inner {
		border: 0.5px solid #e3e3e3;
		padding: 20px;
		border-radius: 10px;
		margin: auto;
		max-width: 550px;

		.page-header {
			padding-bottom: 20px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
`;

export default MainApp;
