import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { IoAdd } from 'react-icons/io5';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';

// Adds messages only in a dev environment
loadDevMessages();
loadErrorMessages();

import './App.css';
import { IBook } from './utils/interfaces';
import Book from './components/Book';
import AddBook from './components/AddBook';

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

function App() {
	const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(true);
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
						<h1>Book Library</h1>
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
							/>
							{index + 1 !== data.books.length && (
								<div className="separator"></div>
							)}
						</>
					))}
				</div>
			</Container>

			<AddBook
				isOpen={isAddBookModalOpen}
				closeModal={closeAddBookModal}
				refetchBooks={refetch}
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
		max-width: 500px;

		.page-header {
			padding-bottom: 20px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	.separator {
		height: 1px;
		width: 90%;
		background: #e1e1e1;
		margin: 15px auto;
	}
`;

export default App;
