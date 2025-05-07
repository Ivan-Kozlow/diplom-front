import { CSSTransition } from 'react-transition-group'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { FC, useEffect, useLayoutEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { formService } from '../services/form'
import { QUERY_KEYS } from '../constants/api'

import { Modal } from './modal'
import { defaultStyle, fadeDelayForShow, fadeTimeout, transitionStyles } from './fadeStyles'

import type { TypeFormUpdateDescriptionFields } from '../constants/types'

export const FormUpdateDescription: FC = () => {
	const [isShow, setIsShow] = useState(false)
	const [isShowModal, setIsShowModal] = useState(false)
	const { register, handleSubmit, formState, getValues, setFocus } =
		useForm<TypeFormUpdateDescriptionFields>()
	const { mutate, isPending, data } = useMutation({
		mutationKey: [QUERY_KEYS.updateDescription],
		mutationFn: (data: TypeFormUpdateDescriptionFields) => formService.updateDescription(data),
		retry: false,
		onError() {
			setIsShowModal(false)
			toast.error(`Метка с id "${getValues('id')}" не найдена`, {
				duration: 5000,
			})
		},
		onSuccess(data) {
			setIsShowModal(false)
			if (data?.description === undefined) return
			toast.success('Описание успешно обновлено', { duration: 1400 })
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
		const { description, id } = fields

		if (description.trim() === '') toast.error('Введите описание', { duration: 1400 })
		else if (id.trim() === '') toast.error('Введите корректный id', { duration: 1400 })
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
								placeholder='Введите id метки'
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
								placeholder='Введите описание для метки'
								{...register('description', { required: true })}
							/>
							{formState.errors.description && (
								<span className='text-red-400 text-sm'>Это поле обязательно</span>
							)}
						</div>
						<button
							className='disabled:bg-slate-200/15 disabled:text-gray-200/50 disabled:border-0 disabled:cursor-not-allowed'
							disabled={isPending}
						>
							Обновить
						</button>

						{data?.description && <p>{data.description}</p>}
					</form>

					<Modal
						show={isShowModal}
						text='Вы уверены что хотите обновить описание?'
						ButtonsRender={() => (
							<div className='flex gap-2'>
								<button
									autoFocus={isShowModal}
									className='bg-green-500'
									onClick={() =>
										mutate({
											id: getValues('id'),
											description: getValues('description'),
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
