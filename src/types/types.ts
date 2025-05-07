import type { EnumUserRole } from '../services/auth.type'

export interface IUser {
	id: number
	name: string
	last_name: string
	email: string
	verificationToken?: string
	roles: EnumUserRole[]
	updated_at: string
	created_at: string
}

export interface ILoginFormData {
	email: string
	password: string
}

export interface IRegisterFormData {
	name: string
	last_name: string
	email: string
	password: string
}

export interface IResponseGetBy {
	id: number
	email: string
	name: string
	last_name: string
	roles: EnumUserRole[]

	created_at: Date
	updated_at: Date
}

export interface IResponseUpdateUser {
	id: number
	email: string
	name: string
	last_name: string
	roles: EnumUserRole[]

	created_at: Date
	updated_at: Date
}
