import { CSSTransition } from 'react-transition-group'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { FC, useLayoutEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { formService } from '../services/form'
import { QUERY_KEYS, errorCatch } from '../constants/api'

import { defaultStyle, fadeDelayForShow, fadeTimeout, transitionStyles } from './fadeStyles'

import type { TypeFormCreateDescriptionFields } from '../constants/types'

export const FormCreateDescription: FC = () => {
	const [isShow, setIsShow] = useState(false)
	const { register, handleSubmit, formState } = useForm<TypeFormCreateDescriptionFields>()
	const { mutate, error, data, isPending, isSuccess } = useMutation({
		mutationKey: [QUERY_KEYS.createDescription],
		mutationFn: (data: TypeFormCreateDescriptionFields) => formService.createDescription(data),
		retry: false,
	})

	useLayoutEffect(() => {
		setTimeout(() => {
			setIsShow(true)
		}, fadeDelayForShow)

		if (error)
			toast.error(errorCatch(error) || 'Ошибка при создании, возможно метка с таким id уже существует', {
				duration: 5000,
			})
		if (data?.description === undefined) return
		if (isSuccess) toast.success('Описание успешно создано', { duration: 1400 })
	}, [data?.description, error, isSuccess])

	const onSubmit = handleSubmit((fields) => {
		const { description, id } = fields
		if (description.trim() === '') toast.error('Введите описание', { duration: 1400 })
		else if (id.trim() === '') toast.error('Введите корректный id', { duration: 1400 })
		else mutate({ id, description })
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
							Создать
						</button>

						{data?.description && <p>{data.description}</p>}
					</form>
				</div>
			)}
		</CSSTransition>
	)
}
