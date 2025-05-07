import styles from './AuthForm.module.scss'
import clsx from 'clsx'

import { useRegisterAuthForm } from './useRegisterAuthForm'
import { useLoginAuthForm } from './useLoginAuthForm'

interface AuthFormProps {
	isLogin: boolean
}

export function AuthForm({ isLogin }: AuthFormProps) {
	const {
		handleSubmit: handleSubmitLogin,
		isLoading: isLoadingLogin,
		onSubmit: onSubmitLogin,
		register: regLogin,
	} = useLoginAuthForm()
	const {
		handleSubmit: handleSubmitRegister,
		isLoading: isLoadingRegister,
		onSubmit: onSubmitRegister,
		register: regRegister,
	} = useRegisterAuthForm()

	const isLoading = isLogin ? isLoadingLogin : isLoadingRegister

	return (
		<form
			onSubmit={isLogin ? handleSubmitLogin(onSubmitLogin) : handleSubmitRegister(onSubmitRegister)}
			className='max-w-sm mx-auto'
		>
			<div className='mb-4'>
				{!isLogin ? (
					<>
						<label className='text-gray-500 '>
							Имя
							<input
								type='text'
								placeholder='Введите имя: '
								{...(isLogin ? {} : regRegister('name', { required: true }))}
								className={clsx(
									styles['input-field'],
									'w-full p-2 border rounded focus:outline-none focus:border-white'
								)}
							/>
						</label>
						<label className='text-gray-500 '>
							Фамилия
							<input
								type='text'
								placeholder='Введите фамилию: '
								{...(isLogin ? {} : regRegister('last_name', { required: true }))}
								className={clsx(
									styles['input-field'],
									'w-full p-2 border rounded focus:outline-none focus:border-white'
								)}
							/>
						</label>
					</>
				) : null}
			</div>

			<div className='mb-4'>
				<label className='text-gray-500 '>
					Email
					<input
						type='email'
						placeholder='Введите email: '
						{...(isLogin
							? regLogin('email', { required: true })
							: regRegister('email', { required: true }))}
						className={clsx(
							styles['input-field'],
							'w-full p-2 border rounded focus:outline-none focus:border-white'
						)}
					/>
				</label>
			</div>

			<div className='mb-4'>
				<label className='text-gray-500 '>
					Пароль
					<input
						type='password'
						placeholder='Введите пароль: '
						{...(isLogin
							? regLogin('password', { required: true })
							: regRegister('password', { required: true }))}
						className={clsx(
							styles['input-field'],
							'mb-3 w-full p-2 border rounded focus:outline-none focus:border-white'
						)}
					/>
				</label>
			</div>

			<div className='mb-3'>
				<button
					type='submit'
					className={clsx(
						styles['btn-primary'],
						isLogin ? 'bg-blue-500' : 'bg-teal-500',
						isLoading ? 'opacity-75 cursor-not-allowed' : ''
					)}
					disabled={isLoading}
				>
					{isLoading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
				</button>
			</div>
		</form>
	)
}
