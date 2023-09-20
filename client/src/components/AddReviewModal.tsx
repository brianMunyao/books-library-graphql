import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import AppModal from './AppModal';
import FormInput from './FormInput';
import Rating from './Rating';

interface FormValues {
	content: string;
	rating: number;
}

interface Props {
	isOpen: boolean;
	closeModal: () => void;
	submitReview: (formValues: FormValues) => void;
}

const AddReviewModal = ({ isOpen, closeModal, submitReview }: Props) => {
	const formik = useFormik({
		initialValues: {
			content: '',
			rating: 0,
		},
		validationSchema: Yup.object({
			content: Yup.string().required('Field required'),
			rating: Yup.number()
				.min(1, 'Rating required')
				.required('Field required'),
		}),
		onSubmit: (values) => submitReview(values),
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<AppModal
				isOpen={isOpen}
				closeModal={closeModal}
				title="Add Book Review"
			>
				<Container>
					<FormInput
						label="Review"
						name="content"
						value={formik.values.content}
						error={formik.errors.content}
						touched={formik.touched.content}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>

					<div className="star-con">
						<label htmlFor="rating">Rating</label>
						<Rating
							value={formik.values.rating}
							onClick={(_rating) =>
								formik.setFieldValue('rating', _rating)
							}
						/>
						{formik.errors.rating && formik.touched.rating && (
							<span className="error">
								{formik.errors.rating}
							</span>
						)}
					</div>

					<button onClick={formik.submitForm} type="submit">
						Submit
					</button>
				</Container>
			</AppModal>
		</form>
	);
};

const Container = styled.div`
	.star-con {
		padding-bottom: 10px;
	}
`;

export default AddReviewModal;
