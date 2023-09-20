import { IoStar, IoStarOutline } from 'react-icons/io5';
import styled from 'styled-components';

interface Props {
	value: number;
	onClick?: (val: number) => void;
}

const Rating = ({ value, onClick }: Props) => {
	const handleClick = (v: number) => {
		if (onClick) onClick(v);
	};

	return (
		<Container>
			{[1, 2, 3, 4, 5].map((v) =>
				v <= value ? (
					<IoStar key={v} onClick={() => handleClick(v)} />
				) : (
					<IoStarOutline key={v} onClick={() => handleClick(v)} />
				)
			)}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	gap: 2px;
	font-size: 19px;
	padding: 10px 0;
	color: #c2a60b;
`;

export default Rating;
