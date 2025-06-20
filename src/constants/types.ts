interface IBase {
	id: string
}

export type TypeFormGetDescriptionFields = IBase
export type TypeFormDeleteDescriptionFields = IBase

export type TypeFormCreateDescriptionFields = {
	book_name: string
	author: string
	year_created: string
	book_genre: string
	publisher: string
} & IBase

export type TypeFormUpdateDescriptionFields = {
	id: TypeFormGetDescriptionFields['id']
	recipient?: string
	checkout_date?: string
} & Partial<TypeFormCreateDescriptionFields>
