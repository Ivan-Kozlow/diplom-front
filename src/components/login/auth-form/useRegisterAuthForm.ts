import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTransition } from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

import authService from '../../../services/auth.service'
import { errorCatch } from '../../../constants/api'

import type { IRegisterFormData } from '../../../types/types'

export function useRegisterAuthForm() {
	const { register, handleSubmit, reset } = useForm<IRegisterFormData>()
	const navigate = useNavigate()
	const [isPending, startTransition] = useTransition()

	const { mutate: mutateRegister, isPending: isRegisterPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IRegisterFormData) => authService.main('register', data),
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

	const onSubmit: SubmitHandler<IRegisterFormData> = (data) => {
		mutateRegister(data)
	}

	const isLoading = isPending || isRegisterPending

	return {
		register,
		handleSubmit,
		onSubmit,
		isLoading,
	}
}
