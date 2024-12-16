import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { FC, useLayoutEffect } from 'react'
import { useMutation } from '@tanstack/react-query'

import { formService } from '../services/form'
import { QUERY_KEYS } from '../constants/api'

import type { TypeFormCreateDescriptionFields } from '../constants/types'

export const FormCreateDescription: FC = () => {
	const { register, handleSubmit, formState } = useForm<TypeFormCreateDescriptionFields>()
	const { mutate, isError, data, isSuccess } = useMutation({
		mutationKey: [QUERY_KEYS.createDescription],
		mutationFn: (data: TypeFormCreateDescriptionFields) => formService.createDescription(data),
		retry: false,
	})

	useLayoutEffect(() => {
		if (isError)
			toast.error('Ошибка при создании, возможно метка с таким id уже существует', { duration: 5000 })
		if (data?.description === undefined) return
		if (isSuccess) toast.success('Описание успешно создано', { duration: 1400 })
	}, [data?.description, isError, isSuccess])

	const onSubmit = handleSubmit((fields) => {
		const { description, id } = fields
		if (description.trim() === '') toast.error('Введите описание', { duration: 1400 })
		else if (id.trim() === '') toast.error('Введите id', { duration: 1400 })
		else mutate({ id, description })
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
				<button>Создать</button>

				{data?.description && <p>{data.description}</p>}
			</form>
		</>
	)
}
