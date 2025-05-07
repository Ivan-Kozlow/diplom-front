import { EnumUserRole, TProtectUserData } from '../services/auth.type'

export type TUserDataState = {
	id: number
	roles: EnumUserRole[]
	isLoggedIn: boolean
	isAdmin: boolean
}

export const transformUserToState = (user: TProtectUserData): TUserDataState | null => {
	return {
		...user,
		isLoggedIn: true,
		isAdmin: user.roles.includes(EnumUserRole.ADMIN),
	}
}
