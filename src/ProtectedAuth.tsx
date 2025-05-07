import { Navigate, Outlet } from 'react-router-dom'
import toast from 'react-hot-toast'

import { EnumUserRole } from './services/auth.type'
import { useProfile } from './hooks/useProfile'

import { ROUTES } from './main'
import { PUBLIC_PAGES } from './config/pages'

export const ProtectedRoutes = ({ roles = [EnumUserRole.USER] }: { roles?: EnumUserRole[] }) => {
	const { user, isFetching } = useProfile()

	if (isFetching) return <div>Loading...</div>

	if (!user?.isLoggedIn) {
		setTimeout(() => toast('Требуется авторизация', { icon: 'ℹ️' }), 400)
		return <Navigate to={PUBLIC_PAGES.LOGIN} replace />
	}

	// Проверяем все требуемые роли
	const hasRequiredRole = roles.some((role) => {
		if (role === EnumUserRole.ADMIN) return user.roles?.includes(EnumUserRole.ADMIN)
		return true // Для USER и других ролей
	})
	if (!hasRequiredRole) {
		setTimeout(() => toast('Доступ запрещён', { icon: '⚠️' }), 400)
		return <Navigate to={ROUTES.main} replace />
	}

	return <Outlet />
}
