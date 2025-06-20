import { CSSTransition } from 'react-transition-group'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { FC, useEffect, useLayoutEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { renderBookValues } from './utils'
import { formService } from '../services/form.service'
import { useProfile } from '../hooks/useProfile'
import { QUERY_KEYS } from '../constants/api'

import { Modal } from './modal'
import { defaultStyle, fadeDelayForShow, fadeTimeout, transitionStyles } from './fadeStyles'
import dayjs from 'dayjs'

import type { TypeFormUpdateDescriptionFields } from '../constants/types'

export const FormUpdateDescription: FC = () => {
	const user = useProfile()
	const [isShow, setIsShow] = useState(false)
	const [isShowModal, setIsShowModal] = useState(false)
	const { register, handleSubmit, formState, getValues, setFocus } =
		useForm<TypeFormUpdateDescriptionFields>({ mode: 'onChange' })
	const { mutate, isPending, data } = useMutation({
		mutationKey: [QUERY_KEYS.updateDescription],
		mutationFn: (data: TypeFormUpdateDescriptionFields) => formService.updateBook(data),
		retry: false,
		onError() {
			setIsShowModal(false)
			toast.error(`Книга по id "${getValues('id')}" не найдена`, {
				duration: 5000,
			})
		},
		onSuccess() {
			setIsShowModal(false)
			toast.success('Книга успешно обновлена', { duration: 1400 })
		},
	})

	useLayoutEffect(() => {
		setFocus('id')
	}, [isShowModal])

	useEffect(() => {
		setTimeout(() => {
			setIsShow(true)
		}, fadeDelayForShow)

		const abortController = new AbortController()

		if (isShowModal) {
			document.addEventListener(
				'keydown',
				(e) => {
					if (e.key === 'Escape') setIsShowModal(false)
				},
				{ signal: abortController.signal }
			)
		}

		return () => {
			abortController.abort()
		}
	}, [isShowModal])

	const isValidDate = dayjs(getValues('checkout_date')).isValid()

	const onSubmit = handleSubmit((fields) => {
		const { id, checkout_date } = fields

		if (id.trim() === '') toast.error('Введите корректный id', { duration: 1400 })
		else if (checkout_date && !isValidDate)
			toast.error('Дата не корректна формату YYYY.MM.DD', { duration: 1400 })
		else setIsShowModal(true)
	})

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
						{user.user.isAdmin && (
							<>
								<div className='flex flex-col items-start gap-1'>
									<input
										className='rounded-md h-8 p-4 h-12 w-full truncate'
										type='text'
										placeholder='Введите автора'
										{...register('author')}
									/>
								</div>
								<div className='flex flex-col items-start gap-1'>
									<input
										className='rounded-md h-8 p-4 h-12 w-full truncate'
										type='text'
										placeholder='Введите жанр'
										{...register('book_genre')}
									/>
								</div>
								<div className='flex flex-col items-start gap-1'>
									<input
										className='rounded-md h-8 p-4 h-12 w-full truncate'
										type='text'
										placeholder='Введите название'
										{...register('book_name')}
									/>
								</div>
								<div className='flex flex-col items-start gap-1'>
									<input
										className='rounded-md h-8 p-4 h-12 w-full truncate'
										type='text'
										placeholder='Введите издателя'
										{...register('publisher')}
									/>
								</div>
								<div className='flex flex-col items-start gap-1'>
									<input
										className='rounded-md h-8 p-4 h-12 w-full truncate'
										type='text'
										placeholder='Введите дату издания'
										{...register('year_created')}
									/>
									{getValues('year_created') && !isValidDate ? (
										<span className='text-red-400 text-sm'>
											Дата не соответствует формату YYYY.MM.DD
										</span>
									) : null}
								</div>
							</>
						)}
						<div className='flex flex-col items-start gap-1'>
							<input
								className='rounded-md h-8 p-4 h-12 w-full truncate'
								type='text'
								placeholder='Введите получателя'
								{...register('recipient')}
							/>
						</div>
						<div className='flex flex-col items-start gap-1'>
							<input
								className='rounded-md h-8 p-4 h-12 w-full truncate'
								type='text'
								placeholder='Введите дату выдачи'
								{...register('checkout_date', {
									value: dayjs().format('YYYY.MM.DD'),
								})}
							/>
							{formState.errors.checkout_date && !isValidDate ? (
								<span className='text-red-400 text-sm'>
									Формат даты неверен - должно быть YYYY.MM.DD
								</span>
							) : null}
						</div>
						<button
							className='disabled:bg-slate-200/15 disabled:text-gray-200/50 disabled:border-0 disabled:cursor-not-allowed'
							disabled={isPending}
						>
							Обновить
						</button>

						{data && renderBookValues(data)}
					</form>

					<Modal
						show={isShowModal}
						text='Вы уверены что хотите обновить?'
						ButtonsRender={() => (
							<div className='flex gap-2'>
								<button
									autoFocus={isShowModal}
									className='bg-green-500'
									onClick={() =>
										getValues('checkout_date') && !isValidDate
											? toast.error('Дата не корректна формату YYYY.MM.DD', { duration: 1400 })
											: mutate({
													id: getValues('id'),
													recipient: getValues('recipient'),
													checkout_date: dayjs(getValues('checkout_date')).toISOString(),
													year_created: dayjs(getValues('year_created')).toISOString(),
													book_genre: getValues('book_genre'),
													publisher: getValues('publisher'),
													book_name: getValues('book_name'),
													author: getValues('author'),
											  })
									}
								>
									Обновить
								</button>
								<button className='bg-red-600' onClick={() => setIsShowModal(false)}>
									Отменить
								</button>
							</div>
						)}
					/>
				</div>
			)}
		</CSSTransition>
	)
}
