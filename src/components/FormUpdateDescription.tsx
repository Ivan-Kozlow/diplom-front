import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { FC, useEffect, useLayoutEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { formService } from '../services/form'
import { QUERY_KEYS } from '../constants/api'

import { Modal } from './modal'

import type { TypeFormUpdateDescriptionFields } from '../constants/types'
export const FormUpdateDescription: FC = () => {
	const [isShowModal, setIsShowModal] = useState(false)
	const { register, handleSubmit, formState, getValues, setFocus } =
		useForm<TypeFormUpdateDescriptionFields>()
	const { mutate, data } = useMutation({
		mutationKey: [QUERY_KEYS.updateDescription],
		mutationFn: (data: TypeFormUpdateDescriptionFields) => formService.updateDescription(data),
		retry: false,
		onError() {
			toast.error(`Метка с id "${getValues('id')}" не найдена`, {
				duration: 5000,
			})
		},
		onSuccess() {
			setIsShowModal(false)
			if (data?.description === undefined) return
			toast.success('Описание успешно создано', { duration: 1400 })
		},
	})

	useLayoutEffect(() => {
		setFocus('id')
	}, [isShowModal])

	useEffect(() => {
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
		else if (id.trim() === '') toast.error('Введите id', { duration: 1400 })
		else setIsShowModal(true)
	})

	return (
		<>
			<form className='flex gap-3 flex-col max-w-[250px] mx-auto' onSubmit={onSubmit}>
				<div className='flex flex-col items-start gap-1'>
					<input
						autoFocus
						className='rounded-md h-8 p-4 h-12 w-full truncate'
						type='text'
						placeholder='Введите id метки'
						{...register('id', { required: true })}
					/>
					{formState.errors.id && <span className='text-red-400 text-sm'>Это поле обязательно</span>}
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
				<button>Обновить</button>

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
							onClick={() => mutate({ id: getValues('id'), description: getValues('description') })}
						>
							Обновить
						</button>
						<button className='bg-red-600' onClick={() => setIsShowModal(false)}>
							Отменить
						</button>
					</div>
				)}
			/>
		</>
	)
}
