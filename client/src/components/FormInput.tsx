import { ChangeEvent, FocusEvent } from 'react';
import styled from 'styled-components';

interface Props {
	name: string;
	label: string;
	value: string;
	error?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

const FormInput = ({ name, label, value, error, onChange, onBlur }: Props) => {
	return (
		<Container>
			<label htmlFor={name}>{label}</label>
			<input
				type="text"
				name={name}
				id={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>

			{error && <span className="error">{error}</span>}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
	gap: 2px;

	input {
		border: 1.5px solid #d4d4d4;
		border-radius: 5px;
		padding: 10px;
		font-size: 16px;

		&:focus {
			border: 1.5px solid dodgerblue;
		}
	}

	.error {
		color: tomato;
		font-size: 15px;
	}
`;

export default FormInput;
