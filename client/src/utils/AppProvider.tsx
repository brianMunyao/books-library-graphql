import { ReactNode, useState } from 'react';

import { AppContext } from './AppContext';

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const [bookInfoModalID, setBookInfoModalID] = useState<null | number>(null);

	const openBookInfoModal = (bookId: number) => setBookInfoModalID(bookId);
	const closeBookInfoModal = () => setBookInfoModalID(null);

	return (
		<AppContext.Provider
			value={{
				bookInfoModalID,
				openBookInfoModal,
				closeBookInfoModal,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
