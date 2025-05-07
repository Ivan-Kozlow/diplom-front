type TypeLocalStorageKeys = 'userId' | 'accessToken'

export const LocalStorageService = {
	setItem<T>(key: TypeLocalStorageKeys, value: T) {
		localStorage.setItem(key, JSON.stringify(value))
	},
	getItem<T>(key: TypeLocalStorageKeys): T | null {
		const data = localStorage.getItem(key)
		return data ? JSON.parse(data) : null
	},
	removeItem(key: TypeLocalStorageKeys) {
		localStorage.removeItem(key)
	},
}
