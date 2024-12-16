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

	async createDescription(description: TypeFormCreateDescriptionFields['description']) {
		return (await axios.post<IResponse>(`${API}/description`, { description })).data
	},
}
