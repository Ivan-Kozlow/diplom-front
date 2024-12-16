import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { FC, useLayoutEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'

import { formService } from '../services/form'
import { QUERY_KEYS } from '../constants/api'

import type { TypeFormGetDescriptionFields } from '../constants/types'

export const FormGetDescription: FC = () => {
	const { register, handleSubmit, formState, getValues, setValue } = useForm<TypeFormGetDescriptionFields>()
	const isFirstRender = useRef(true)
	const { isError, data, isSuccess, refetch } = useQuery({
		queryKey: [QUERY_KEYS.getDescription],
		queryFn: () => formService.getDescription(getValues('id')),
		enabled: false,
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
	})

	useLayoutEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}

		if (isError) {
			toast.error(
				`Описание под таким id не найдено.\nМожете создать описание\nдля метки "${getValues('id')}"`,
				{ duration: 5000 }
			)
			setValue('id', '')
			return
		}
		if (data?.description === undefined) return
		if (isSuccess) toast.success('Данные успешно получены', { duration: 1400 })
	}, [data?.description, getValues, isError, isSuccess, setValue])

	const onSubmit = handleSubmit((fields) => {
		if (fields.id.trim() === '') toast.error('Введите id', { duration: 1400 })
		else refetch()
	})

	return (
		<>
			<form className='flex gap-3 flex-col max-w-[250px] mx-auto' onSubmit={onSubmit}>
				<div className='flex flex-col items-start gap-1'>
					<input
						className='rounded-md h-8 p-4 h-12 w-full truncate'
						type='text'
						placeholder='Введите id метки'
						{...register('id', { required: true })}
					/>
					{formState.errors.id && <span className='text-red-400 text-sm'>Это поле обязательно</span>}
				</div>
				<button>Получить</button>

				{data?.description && !isFirstRender.current && !isError && <p>{data.description}</p>}
			</form>
		</>
	)
}
