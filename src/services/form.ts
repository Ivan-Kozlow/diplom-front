import axios from 'axios'

import type { TypeCreateFormFields, TypeGetFormFields } from '../types/form'

interface IResponse {
	id: string
	description: string
}

const API = import.meta.env.API_URL || 'http://localhost:3001'

export const formService = {
	async getDescription(id: TypeGetFormFields['id']) {
		return (await axios.post<IResponse>(`${API}/description/${id}`)).data
	},

	async createDescription(id: TypeGetFormFields['id'], description: TypeCreateFormFields['description']) {
		return (await axios.post<IResponse>(`${API}/description/${id}`, { description })).data
	},

	async updateDescription(id: TypeGetFormFields['id'], description: TypeCreateFormFields['description']) {
		return (await axios.put<IResponse>(`${API}/description/${id}`, { description })).data
	},
}
