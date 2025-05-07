import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'

import { userService } from '../../services/user'
import { QUERY_KEYS } from '../../constants/api'

import { AdminTable } from './AdminTable'
import { Header } from '../Header'

export const AdminPanel: FC = () => {
	const { data: users } = useQuery({
		queryKey: [QUERY_KEYS.getAllUsers],
		queryFn: userService.getAll,
		refetchOnWindowFocus: false,
	})

	return (
		<div>
			<Header forAdminPage />
			<AdminTable users={users?.data || []} />
		</div>
	)
}
