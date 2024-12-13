import axios from 'axios'

import type { TypeFormFields } from '../App'

interface IResponse {
	id: string
	description: string
}

export const formService = {
	async getForm(id: TypeFormFields['id']) {
		return (await axios.post<IResponse>(import.meta.env.API_URL || 'http://localhost:3001', { id })).data
	},
}
