import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { RefreshCcw } from 'lucide-react'

import { ROUTES } from '../main'

export const ErrorPage: FC = () => {
	return (
		<div className='flex flex-col gap-2'>
			<p className='text-2xl text-red-500 font-bold mb-3'>Что-то пошло не так...</p>
			<p>Попробуйте вернуться на главную или перезагрузить приложение</p>
			<div className='flex justify-between gap-2'>
				<Link to={ROUTES.main} className='p-2'>
					На главную
				</Link>
				<a href={'/'} className='p-2'>
					<RefreshCcw width={20} height={20} />
				</a>
			</div>
		</div>
	)
}
