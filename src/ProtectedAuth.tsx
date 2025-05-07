import type { TUserDataState } from './hooks/transformFromUserToState'
import { Navigate, Outlet } from 'react-router-dom'
import toast from 'react-hot-toast'

import { EnumUserRole } from './services/auth.type'
import { useProfile } from './hooks/useProfile'

import { PUBLIC_PAGES } from './config/pages'

type RoleCheckFunction = (user: TUserDataState) => boolean

const roleChecks: Partial<Record<EnumUserRole, RoleCheckFunction>> = {
	[EnumUserRole.ADMIN]: (user: TUserDataState) => user.isAdmin,
}

type TRoles = EnumUserRole[] | EnumUserRole

export const ProtectedRoutes = ({ roles = EnumUserRole.USER }: { roles?: TRoles }) => {
	const { user, isFetching } = useProfile()
	if (isFetching) return <div>Loading...</div>

	if (!user.isLoggedIn) {
		setTimeout(() => {
			toast('Вы не авторизованы', { icon: 'ℹ️' })
		}, 400)
		return <Navigate to={PUBLIC_PAGES.LOGIN} />
	}
	const rolesArray = Array.isArray(roles) ? roles : [roles]
	if (!user?.isLoggedIn) return <Navigate to={PUBLIC_PAGES.LOGIN} replace />

	for (const role of rolesArray) {
		const checkRole = roleChecks[role]
		if (checkRole && !checkRole(user as TUserDataState)) {
			return <Navigate to={PUBLIC_PAGES.LOGIN} replace />
		}
	}

	return <Outlet />
}
