import { instance } from '../constants/axios'

import type { TypeFormCreateDescriptionFields, TypeFormGetDescriptionFields } from '../constants/types'

interface IResponse {
	created_at: Date
	description: string
	id: number
	uid: string
}

const API = import.meta.env.VITE_API_URL || 'http://localhost:4200'

export const formService = {
	async getDescription(id: TypeFormGetDescriptionFields['id']) {
		return (await instance.get<IResponse>(`${API}/description/${id}`)).data
	},

	async createDescription({
		id,
		description,
	}: {
		id: TypeFormCreateDescriptionFields['id']
		description: TypeFormCreateDescriptionFields['description']
	}) {
		return (await instance.post<IResponse>(`${API}/description/${id}`, { description })).data
	},

	async updateDescription({
		id,
		description,
	}: {
		id: TypeFormGetDescriptionFields['id']
		description: string
	}) {
		return (await instance.patch<IResponse>(`${API}/description/${id}`, { description })).data
	},
}
