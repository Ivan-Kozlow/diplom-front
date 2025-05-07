import { AuthForm } from '../login/auth-form/AuthForm'

export default function RegisterPage() {
	return (
		<div className='max-h-screen flex items-center justify-center'>
			<div className='bg-slate-900/20 p-8 rounded-lg shadow-md'>
				<h2 className='font-semibold mb-4 text-3xl mb-7'>Регистрация</h2>
				<AuthForm isLogin={false} />
			</div>
		</div>
	)
}
