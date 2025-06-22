import { instance } from '../constants/axios'

import type {
	TypeFormCreateDescriptionFields,
	TypeFormDeleteDescriptionFields,
	TypeFormUpdateDescriptionFields,
} from '../constants/types'

export interface IResponse {
	created_at: Date
	id: number
	uid: string
	book_name: string
	author: string
	year_created: string
	book_genre: string
	publisher: string
	recipient: string
	checkout_date: string
	updated_at: Date
}

const API = import.meta.env.VITE_API_URL || 'http://localhost:4200'

export const formService = {
	async getBook(id: TypeFormDeleteDescriptionFields['id']) {
		return (await instance.get<IResponse>(`${API}/description/${id}`)).data
	},

	async createBook({
		id,
		author,
		year_created,
		book_genre,
		publisher,
		book_name,
	}: TypeFormCreateDescriptionFields) {
		return (
			await instance.post<IResponse>(`${API}/description/${id}`, {
				author,
				year_created,
				book_genre,
				publisher,
				book_name,
			})
		).data
	},

	async updateBook({
		id,
		recipient,
		checkout_date,
		author,
		book_genre,
		book_name,
		year_created,
		publisher,
	}: TypeFormUpdateDescriptionFields) {
		return (
			await instance.patch<IResponse>(`${API}/description/${id}`, {
				recipient,
				checkout_date,
				author,
				book_genre,
				book_name,
				year_created,
				publisher,
			})
		).data
	},
	async deleteBook(id: TypeFormDeleteDescriptionFields['id']) {
		return (await instance.delete<Pick<IResponse, 'id'>>(`${API}/description/${id}`)).data
	},
}
