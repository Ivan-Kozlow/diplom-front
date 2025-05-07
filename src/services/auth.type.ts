export enum EnumUserRole {
	USER = 'USER',
	ADMIN = 'ADMIN',
}

export interface ITokenInside {
	id: number
	roles: EnumUserRole[]
	iat: number
	exp: number
}

export type TProtectUserData = Omit<ITokenInside, 'iat' | 'exp'>
