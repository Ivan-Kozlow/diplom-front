import { Link, useNavigate } from 'react-router-dom'
import { FC, startTransition } from 'react'
import { Database, LogOut, UserPlus } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'

import { EnumUserRole } from '../services/auth.type'
import authService from '../services/auth.service'
import { useProfile } from '../hooks/useProfile'
import { QUERY_KEYS } from '../constants/api'

import { ROUTES } from '../main'
import { PUBLIC_PAGES } from '../config/pages'

export const Header: FC<{ forAdminPage?: boolean }> = ({ forAdminPage }) => {
	const navigate = useNavigate()
	const { user } = useProfile()
	const { mutate } = useMutation({
		mutationKey: [QUERY_KEYS.logout],
		mutationFn: authService.logout,
		onSuccess() {
			startTransition(() => {
				window.location.replace(PUBLIC_PAGES.LOGIN)
			})
		},
	})

	return (
		<header className='flex justify-between gap-5 p-3 min-h-7 sm:mb-14 mb-5 items-start min-w-full'>
			<div className='flex gap-2'>
				<button onClick={() => mutate()}>
					<LogOut className='sm:w-5 w-4' />
				</button>
				{forAdminPage && (
					<>
						<button onClick={() => navigate(ROUTES.main)}>
							<Database className='sm:w-5 w-4' />
						</button>
						<button onClick={() => navigate(ROUTES.register)}>
							<UserPlus className='sm:w-5 w-4' />
						</button>
					</>
				)}
			</div>
			<div className='flex flex-col gap-1 text-left'>
				<div>
					<span className='text-gray-300/70'>Имя -</span> {user.name}{' '}
					<span className='hover:text-white duration-75 underline' title='Роль'>
						{user.roles?.some((role) => role.toLowerCase() == EnumUserRole.ADMIN.toLowerCase()) ? (
							<Link
								to={ROUTES.adminPanel}
								className='sm:text-base text-gray-300/80 font-normal text-xs'
							>
								({EnumUserRole.ADMIN})
							</Link>
						) : (
							<>({user.roles})</>
						)}{' '}
					</span>
				</div>
				<div>
					<span className='text-gray-300/70'>Почта -</span> {user.email}
				</div>
			</div>
		</header>
	)
}
