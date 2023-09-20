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
					top: '5%',
					left: '50%',
					right: 'auto',
					bottom: 'auto',
					marginRight: '-50%',
					transform: 'translate(-50%, 0)',
					maxWidth: '500px',
					width: '95%',
				},
				overlay: {
					background: '#000000c7',
					overflow: 'auto',
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
		margin-bottom: 0px;
		.closeBtn {
			cursor: pointer;
		}
	}
`;

export default AppModal;
