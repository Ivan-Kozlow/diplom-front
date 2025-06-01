import { CSSTransition } from 'react-transition-group'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { FC, useEffect, useLayoutEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { renderBookValues } from './utils'
import { formService } from '../services/form.service'
import { QUERY_KEYS } from '../constants/api'

import { Modal } from './modal'
import { defaultStyle, fadeDelayForShow, fadeTimeout, transitionStyles } from './fadeStyles'

import type { TypeFormDeleteDescriptionFields } from '../constants/types'

export const FormDeleteDescription: FC = () => {
	const [isShow, setIsShow] = useState(false)
	const [isShowModal, setIsShowModal] = useState(false)
	const { register, handleSubmit, formState, getValues, setFocus } =
		useForm<TypeFormDeleteDescriptionFields>()
	const { mutate, isPending, data } = useMutation({
		mutationKey: [QUERY_KEYS.updateDescription],
		mutationFn: (data: TypeFormDeleteDescriptionFields) => formService.deleteBook(data.id),
		retry: false,
		onError() {
			setIsShowModal(false)
			toast.error(`Книга с id "${getValues('id')}" не найдена`, {
				duration: 5000,
			})
		},
		onSuccess() {
			setIsShowModal(false)
			toast.success('Книга успешно удалена', { duration: 1400 })
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

	const onSubmit = handleSubmit((fields) => {
		const { id } = fields

		if (id.trim() === '') toast.error('Введите корректный id', { duration: 1400 })
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
										mutate({
											id: getValues('id'),
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
