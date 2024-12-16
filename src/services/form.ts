import axios from 'axios'

import type { TypeFormCreateDescriptionFields, TypeFormGetDescriptionFields } from '../constants/types'

interface IResponse {
	id: string
	description: string
}

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const formService = {
	async getDescription(id: TypeFormGetDescriptionFields['id']) {
		return (await axios.get<IResponse>(`${API}/description/${id}`)).data
	},

	async createDescription({
		id,
		description,
	}: {
		id: TypeFormCreateDescriptionFields['id']
		description: TypeFormCreateDescriptionFields['description']
	}) {
		return (await axios.post<IResponse>(`${API}/description/${id}`, { description })).data
	},

	async updateDescription({
		id,
		description,
	}: {
		id: TypeFormGetDescriptionFields['id']
		description: string
	}) {
		return (await axios.patch<IResponse>(`${API}/description/${id}`, { description })).data
	},
}
