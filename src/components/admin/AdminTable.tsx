import type { FC } from 'react'
import type { EnumUserRole } from '../../services/auth.type'
import { AdminTableRow } from './AdminTableRow'

type TypeProps = {
	id: number
	name: string
	email: string
	roles: EnumUserRole[]
	created_at: string
}

export const AdminTable: FC<{ users: TypeProps[] }> = ({ users }) => {
	return (
		<table className='table-auto w-full'>
			<thead>
				<tr>
					<th className='px-4 py-2'>ID</th>
					<th className='px-4 py-2'>Имя</th>
					<th className='px-4 py-2'>Почта</th>
					<th className='px-4 py-2'>Роль</th>
					<th className='px-4 py-2'>Дата создания</th>
					<th className='px-4 py-2'></th>
				</tr>
			</thead>
			<tbody>
				{users
					.sort((a, d) => a.id - d.id)
					.map((user) => (
						<AdminTableRow key={user.id} user={user} />
					))}
			</tbody>
		</table>
	)
}
