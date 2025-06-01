import { CSSTransition } from 'react-transition-group'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { FC, useLayoutEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { renderBookValues } from './utils'
import { formService } from '../services/form.service'
import { QUERY_KEYS, errorCatch } from '../constants/api'

import { defaultStyle, fadeDelayForShow, fadeTimeout, transitionStyles } from './fadeStyles'
import dayjs from 'dayjs'

import type { TypeFormCreateDescriptionFields } from '../constants/types'
export const FormCreateDescription: FC = () => {
	const [isShow, setIsShow] = useState(false)
	const { register, handleSubmit, formState, getValues } = useForm<TypeFormCreateDescriptionFields>()
	const { mutate, error, data, isPending, isSuccess } = useMutation({
		mutationKey: [QUERY_KEYS.createDescription],
		mutationFn: (data: TypeFormCreateDescriptionFields) => formService.createBook(data),
		retry: false,
	})

	useLayoutEffect(() => {
		setTimeout(() => {
			setIsShow(true)
		}, fadeDelayForShow)

		if (error)
			toast.error(errorCatch(error) || 'Ошибка при создании, возможно книга с таким id уже существует', {
				duration: 5000,
			})
		if (isSuccess) toast.success('Книга успешно создана', { duration: 1400 })
	}, [data?.author, error, isSuccess])

	const onSubmit = handleSubmit((fields) => {
		const { book_name, book_genre, publisher, author, id, year_created } = fields
		if (author.trim() === '') toast.error('Введите автора', { duration: 1400 })
		else if (id.trim() === '') toast.error('Введите корректный id', { duration: 1400 })
		else if (book_name.trim() === '') toast.error('Введите название', { duration: 1400 })
		else if (book_genre.trim() === '') toast.error('Введите жанр', { duration: 1400 })
		else if (publisher.trim() === '') toast.error('Введите издателя', { duration: 1400 })
		else if (year_created.trim() === '') toast.error('Введите дату издания', { duration: 1400 })
		else
			mutate({
				id,
				author,
				book_name,
				book_genre,
				publisher,
				year_created: dayjs(year_created).toISOString(),
			})
	})
	const isValidDate = dayjs(getValues('year_created')).isValid()

	return (
		<CSSTransition in={isShow} timeout={fadeTimeout}>
			{(state) => (
				<div
					style={{
						...defaultStyle,
						...transitionStyles[state],
					}}
				>
					<form className='h-[134px] flex gap-3 flex-col max-w-[250px] mx-auto' onSubmit={onSubmit}>
						<div className='flex flex-col items-start gap-1'>
							<input
								autoFocus
								className='rounded-md h-8 p-4 h-12 w-full truncate'
								type='text'
								placeholder='Введите id книги'
								{...register('id', { required: true })}
							/>
							{formState.errors.id && (
								<span className='text-red-400 text-sm'>Это поле обязательно</span>
							)}
						</div>
						<div className='flex flex-col items-start gap-1'>
							<input
								className='rounded-md h-8 p-4 h-12 w-full truncate'
								type='text'
								placeholder='Введите автора'
								{...register('author', { required: true })}
							/>
							{formState.errors.author && (
								<span className='text-red-400 text-sm'>Это поле обязательно</span>
							)}
						</div>
						<div className='flex flex-col items-start gap-1'>
							<input
								className='rounded-md h-8 p-4 h-12 w-full truncate'
								type='text'
								placeholder='Введите жанр'
								{...register('book_genre', { required: true })}
							/>
							{formState.errors.book_genre && (
								<span className='text-red-400 text-sm'>Это поле обязательно</span>
							)}
						</div>
						<div className='flex flex-col items-start gap-1'>
							<input
								className='rounded-md h-8 p-4 h-12 w-full truncate'
								type='text'
								placeholder='Введите название'
								{...register('book_name', { required: true })}
							/>
							{formState.errors.book_name && (
								<span className='text-red-400 text-sm'>Это поле обязательно</span>
							)}
						</div>
						<div className='flex flex-col items-start gap-1'>
							<input
								className='rounded-md h-8 p-4 h-12 w-full truncate'
								type='text'
								placeholder='Введите издателя'
								{...register('publisher', { required: true })}
							/>
							{formState.errors.publisher && (
								<span className='text-red-400 text-sm'>Это поле обязательно</span>
							)}
						</div>
						<div className='flex flex-col items-start gap-1'>
							<input
								className='rounded-md h-8 p-4 h-12 w-full truncate'
								type='text'
								placeholder='Введите дату издания'
								{...register('year_created', { required: true })}
							/>
							{formState.errors.year_created ? (
								<span className='text-red-400 text-sm'>Это поле обязательно</span>
							) : null}
							{getValues('year_created') && !isValidDate ? (
								<span className='text-red-400 text-sm'>Дата не соответствует формату YYYY.MM.DD</span>
							) : null}
						</div>

						<button
							className='disabled:bg-slate-200/15 disabled:text-gray-200/50 disabled:border-0 disabled:cursor-not-allowed'
							disabled={isPending}
						>
							Создать
						</button>

						{data && renderBookValues(data)}
					</form>
				</div>
			)}
		</CSSTransition>
	)
}
