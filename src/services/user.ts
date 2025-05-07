import type { TypeTableData } from '../components/admin/AdminTableRow'
import { instance } from '../constants/axios'

import type { IResponseGetBy, IResponseUpdateUser, IUser } from '../types/types'

const BASE_URL = '/users'

export const userService = {
	async update(user: Partial<Omit<TypeTableData, 'createdAt'>>, userId: string) {
		return instance.patch<IResponseUpdateUser>(`${BASE_URL}/update/${userId}`, user)
	},

	async getProfileById(id: string) {
		return instance.get<IResponseGetBy>(`${BASE_URL}/profile/${id}`)
	},

	async getProfileByEmail(email: string) {
		return instance.get<IResponseGetBy>(`${BASE_URL}/profile/${email}`)
	},

	async getAll() {
		return instance.get<IUser[]>(`${BASE_URL}/list`)
	},

	async delete(userId: string) {
		return instance.post<IUser[]>(`${BASE_URL}/delete/${userId}`)
	},
}
