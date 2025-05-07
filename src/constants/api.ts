export const QUERY_KEYS = {
	getDescription: 'description',
	createDescription: 'createDescription',
	updateDescription: 'updateDescription',
	deleteDescription: 'deleteDescription',

	register: 'register',
	login: 'login',
	logout: 'logout',
	'access-token': 'access-token',

	getUserByIdOrEmail: 'getUserByIdOrEmail',
	getAllUsers: 'getAllUsers',
	updateProfile: 'updateProfile',
}

export const getContentType = () => ({
	'Content-Type': 'application/json',
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorCatch = (error: any): string => {
	if (!error) return 'Произошла неизвестная ошибка.'
	if (typeof error === 'string') return error
	if (typeof error === 'object') {
		const message =
			error.response?.data?.message ||
			error?.code ||
			error.data?.message ||
			error.data?.retMsg ||
			error.message ||
			error.error ||
			error.toString()
		if (Array.isArray(message)) return message[0]
		if (typeof message === 'object') return JSON.stringify(message)
		return String(message)
	}

	return String(error)
}
