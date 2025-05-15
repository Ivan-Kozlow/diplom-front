import { axiosClassic } from '../constants/axios'

import { removeFromStorage, saveTokenStorage } from './auth'

import type { ILoginFormData, IUser } from '../types/types'

interface IAuthResponse {
	accessToken?: string
	user: IUser
}

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken',
}

class AuthService {
	async main(type: 'login' | 'register', data: ILoginFormData) {
		const response = await axiosClassic.post<IAuthResponse>(`/auth/${type}`, data, {})
		if (type === 'login' && response.data.accessToken) saveTokenStorage(response.data.accessToken)
		return response
	}

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>('/auth/access-token')
		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)
		return response
	}

	async getNewTokensByRefresh(refreshToken: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/access-token',
			{},
			{
				headers: {
					Cookie: `refreshToken=${refreshToken}`,
				},
			}
		)

		return response.data
	}

	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')
		if (response.data) removeFromStorage()
		return response
	}
}

export default new AuthService()
