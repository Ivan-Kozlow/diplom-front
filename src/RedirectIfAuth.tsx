import { Navigate, Outlet } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { EnumTokens } from './services/auth'

import { ROUTES } from './main'

export const RedirectIfAuth = () => {
	const [cookies] = useCookies([EnumTokens.ACCESS_TOKEN])

	if (cookies.accessToken) return <Navigate to={ROUTES.main} replace />

	return <Outlet />
}
