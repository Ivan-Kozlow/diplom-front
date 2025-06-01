import dayjs from 'dayjs'

import type { IResponse } from '../services/form.service'

export const renderBookValues = (value: IResponse) => {
	return (
		<div className='flex flex-col items-start'>
			<p>
				{value?.uid && (
					<>
						<span className='font-bold'>UID - </span> <span>{value?.uid}</span>
					</>
				)}
			</p>
			<p>
				{value?.book_name && (
					<>
						<span className='font-bold'>Название - </span> <span>{value?.book_name}</span>
					</>
				)}
			</p>
			<p>
				{value?.recipient && (
					<>
						<span className='font-bold'>Получатель - </span> <span>{value?.recipient}</span>
					</>
				)}
			</p>
			<p>
				{value?.publisher && (
					<>
						<span className='font-bold'>Издатель - </span> <span>{value?.publisher}</span>
					</>
				)}
			</p>
			<p>
				{value?.checkout_date && (
					<>
						<span className='font-bold'>Дата выдачи - </span>{' '}
						<span>{dayjs(value?.checkout_date).format('DD.MM.YYYY')}</span>
					</>
				)}
			</p>
			<p>
				{value?.book_genre && (
					<>
						<span className='font-bold'>Жанр - </span> <span>{value?.book_genre}</span>
					</>
				)}
			</p>
			<p>
				{value?.author && (
					<>
						<span className='font-bold'>Автор - </span> <span>{value?.author}</span>
					</>
				)}
			</p>
			<p>
				{value?.year_created && (
					<>
						<span className='font-bold'>Дата создания - </span>{' '}
						<span>{dayjs(value.year_created).format('DD.MM.YYYY')}</span>
					</>
				)}
			</p>
		</div>
	)
}
