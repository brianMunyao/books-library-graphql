import * as Yup from 'yup';
import { useFormik } from 'formik';
import { gql, useMutation } from '@apollo/client';

import AppModal from './AppModal';
import FormInput from './FormInput';

interface Props {
	isOpen: boolean;
	closeModal: () => void;
	refetchBooks?: () => void;
}

const CREATE_BOOK = gql`
	mutation CreateBook($book: BookInput!) {
		createBook(book: $book) {
			id
			title
			author {
				id
				name
			}
		}
	}
`;

const AddBook = ({ isOpen, closeModal, refetchBooks }: Props) => {
	const [createBook, { loading, error }] = useMutation(CREATE_BOOK);

	const formik = useFormik({
		initialValues: {
			bookTitle: '',
			author: '',
		},
		validationSchema: Yup.object({
			bookTitle: Yup.string().required('Field is required'),
			author: Yup.string().required('Field is required'),
		}),
		onSubmit: ({ bookTitle, author }) => {
			createBook({
				variables: {
					book: { title: bookTitle, author: { name: author } },
				},
			}).then(() => {
				closeModal();
				refetchBooks && refetchBooks();
			});
		},
	});

	if (loading) return 'Submitting...';
	if (error) return `Submission error! ${error.message}`;

	return (
		<form onSubmit={formik.handleSubmit}>
			<AppModal isOpen={isOpen} closeModal={closeModal} title="Add Book">
				{JSON.stringify(formik.errors)}
				<FormInput
					label="Book Title"
					name="bookTitle"
					value={formik.values.bookTitle}
					error={formik.errors.bookTitle}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				<FormInput
					label="Author"
					name="author"
					value={formik.values.author}
					error={formik.errors.author}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>

				<button onClick={formik.submitForm} type="submit">
					Submit
				</button>
			</AppModal>
		</form>
	);
};

export default AddBook;
