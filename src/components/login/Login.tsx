import { AuthForm } from './auth-form/AuthForm'

export function LoginPage() {
	return (
		<div className='max-h-screen flex items-center justify-center'>
			<div className='bg-slate-900/20 p-8 rounded-lg shadow-md'>
				<h2 className='font-semibold mb-4 text-3xl mb-7'>Вход</h2>
				<AuthForm isLogin />
			</div>
		</div>
	)
}
