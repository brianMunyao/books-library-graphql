export interface IBook {
	id: number;
	title: string;
	author_id: number;
	author?: IAuthor;
	reviews?: IReview[];
}

export interface IAuthor {
	id: number;
	name: string;
}

export interface IReview {
	id: number;
	rating: number;
	content: string;
}
