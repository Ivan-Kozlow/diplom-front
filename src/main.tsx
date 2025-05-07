import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import { EnumUserRole } from './services/auth.type.ts'

import { ProtectedRoutes } from './ProtectedAuth.tsx'
import { PUBLIC_PAGES } from './config/pages.ts'
import RegisterPage from './components/register/Register.tsx'
import { Providers } from './components/Providers.tsx'
import { LoginPage } from './components/login/Login.tsx'
import { ErrorPage } from './components/ErrorPage.tsx'
import { AdminPanel } from './components/admin/AdminPanel.tsx'
import App from './App.tsx'

export const ROUTES = { main: '/', auth: '/auth', adminPanel: '/admin-panel', register: '/register' }

export const router = createBrowserRouter([
	{
		element: <ProtectedRoutes roles={EnumUserRole.ADMIN} />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: ROUTES.adminPanel,
				element: <AdminPanel />,
			},
			{
				path: ROUTES.register,
				element: <RegisterPage />,
			},
		],
	},
	{
		element: <ProtectedRoutes />,
		children: [
			{
				path: ROUTES.main,
				element: <App />,
			},
		],
	},
	{
		path: PUBLIC_PAGES.LOGIN,
		element: <LoginPage />,
	},
	{
		path: '*',
		element: <ProtectedRoutes />,
	},
])

createRoot(document.getElementById('root')!).render(
	<Providers>
		<RouterProvider router={router} />
	</Providers>
)
