import Modal from 'react-modal';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

interface Props {
	isOpen: boolean;
	closeModal: () => void;
	title: string;
	children: React.ReactNode;
}

const AppModal = ({ isOpen, closeModal, title, children }: Props) => {
	return (
		<Modal
			ariaHideApp={false}
			isOpen={isOpen}
			onRequestClose={closeModal}
			style={{
				content: {
					top: '50%',
					left: '50%',
					right: 'auto',
					bottom: 'auto',
					marginRight: '-50%',
					transform: 'translate(-50%, -50%)',
					maxWidth: '400px',
					width: '100%',
				},
				overlay: {
					background: '#00000083',
				},
			}}
		>
			<Container>
				<div className="header">
					<h2>{title}</h2>

					<span onClick={closeModal} className="closeBtn">
						<IoClose size={25} />
					</span>
				</div>

				<div className="content">{children}</div>
			</Container>
		</Modal>
	);
};

const Container = styled.div`
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
		.closeBtn {
			cursor: pointer;
		}
	}
`;

export default AppModal;
