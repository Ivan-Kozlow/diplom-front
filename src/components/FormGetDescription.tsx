import { CSSTransition } from 'react-transition-group'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { FC, useLayoutEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { formService } from '../services/form'
import { QUERY_KEYS } from '../constants/api'

import { defaultStyle, fadeDelayForShow, fadeTimeout, transitionStyles } from './fadeStyles'

import type { TypeFormGetDescriptionFields } from '../constants/types'

export const FormGetDescription: FC = () => {
	const [isShow, setIsShow] = useState(false)
	const { register, handleSubmit, formState, getValues, setValue } = useForm<TypeFormGetDescriptionFields>()
	const isFirstRender = useRef(true)
	const { isError, data, isSuccess, refetch, isFetching } = useQuery({
		queryKey: [QUERY_KEYS.getDescription],
		queryFn: () => formService.getDescription(getValues('id')),
		enabled: false,
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		gcTime: 0,
	})

	useLayoutEffect(() => {
		setTimeout(() => {
			console.log('isShow', isShow)
			setIsShow(true)
		}, fadeDelayForShow)

		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}
		if (isFetching) return

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
	}, [data?.description, isError, isSuccess, getValues, setValue, isFetching])

	const onSubmit = handleSubmit((fields) => {
		if (fields.id.trim() === '') toast.error('Введите id', { duration: 1400 })
		else refetch()
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
								className='rounded-md h-8 p-4 h-12 w-full truncate'
								type='text'
								placeholder='Введите id метки'
								{...register('id', { required: true })}
							/>
							{formState.errors.id && (
								<span className='text-red-400 text-sm'>Это поле обязательно</span>
							)}
						</div>
						<button>Получить</button>

						{data?.description && isSuccess && !isFirstRender.current && !isError && (
							<p>{data.description}</p>
						)}
					</form>
				</div>
			)}
		</CSSTransition>
	)
}
