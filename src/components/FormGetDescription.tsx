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
			setIsShow(true)
		}, fadeDelayForShow)

		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}
		if (isFetching) return

		if (isError) {
			toast.error(`Метка с названием "${getValues('id')}" не найдена.`, {
				duration: 5000,
			})
			setValue('id', '')
			return
		}
		if (isSuccess) toast.success('Данные успешно получены', { duration: 1400 })
	}, [isError, isSuccess, getValues, setValue, isFetching])

	const onSubmit = handleSubmit((fields) => {
		if (fields.id.trim() === '') toast.error('Введите корректный id', { duration: 1400 })
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
						<button
							className='disabled:bg-slate-200/15 disabled:text-gray-200/50 disabled:border-0 disabled:cursor-not-allowed'
							disabled={isFetching}
						>
							Получить
						</button>
						{data?.description && !isFirstRender.current && !isError && (
							<p key={data?.id}>{data.description}</p>
						)}
					</form>
				</div>
			)}
		</CSSTransition>
	)
}
