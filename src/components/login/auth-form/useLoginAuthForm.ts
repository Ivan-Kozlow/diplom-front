import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTransition } from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

import authService from '../../../services/auth.service'
import { errorCatch } from '../../../constants/api'

import type { ILoginFormData } from '../../../types/types'

export function useLoginAuthForm() {
	const { register, handleSubmit, reset } = useForm<ILoginFormData>()
	const navigate = useNavigate()
	const [isPending, startTransition] = useTransition()

	const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: ILoginFormData) => authService.main('login', data),
		onSuccess() {
			startTransition(() => {
				reset()
				navigate('/')
			})
		},
		onError(error) {
			if (axios.isAxiosError(error)) {
				toast.error(errorCatch(error.response?.data || 'Проблемы на сервере'))
			}
		},
	})

	const onSubmit: SubmitHandler<ILoginFormData> = (data) => {
		mutateLogin(data)
	}

	const isLoading = isPending || isLoginPending

	return {
		register,
		handleSubmit,
		onSubmit,
		isLoading,
	}
}
