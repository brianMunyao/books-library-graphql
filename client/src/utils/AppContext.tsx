import { createContext } from 'react';

interface StoreValues {
	bookInfoModalID: number | null;
	openBookInfoModal: (id: number) => void;
	closeBookInfoModal: () => void;
}

export const initialValues: StoreValues = {
	bookInfoModalID: null,
	openBookInfoModal: () => null,
	closeBookInfoModal: () => null,
};

export const AppContext = createContext<StoreValues>(initialValues);
