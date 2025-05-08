import makeAnimated from 'react-select/animated'
import Select from 'react-select'
import toast from 'react-hot-toast'
import { Controller, useForm } from 'react-hook-form'
import { FC, useEffect, useState } from 'react'
import { ReplyIcon } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { userService } from '../../services/user'
import { EnumUserRole } from '../../services/auth.type'
import { useProfile } from '../../hooks/useProfile'
import { QUERY_KEYS, errorCatch } from '../../constants/api'

import dayjs from 'dayjs'
import { Modal } from '../modal'

export type TypeTableData = {
	id: number
	name: string
	email: string
	roles: EnumUserRole[]
	created_at: string
}

type UpdateUserData = Omit<TypeTableData, 'created_at'>
const animatedComponents = makeAnimated()
const getDefaultValues = (user: TypeTableData): UpdateUserData => ({
	email: user.email,
	name: user.name,
	id: user.id,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	roles: user.roles
		.map((role) => ({ value: role, label: role }))
		.sort((a, b) => (a.value === EnumUserRole.USER ? -1 : b.value === EnumUserRole.USER ? 1 : 0)) || {
		value: EnumUserRole.USER,
		label: 'USER',
	},
})

export const AdminTableRow: FC<{ user: TypeTableData }> = ({ user }) => {
	const [isShowModal, setIsShowModal] = useState(false)
	const {
		user: { id: myId },
	} = useProfile()
	const isMe = myId == user.id

	const queryClient = useQueryClient()
	const {
		register,
		handleSubmit,
		control,
		formState: { dirtyFields },
		getValues,
		reset,
	} = useForm<UpdateUserData>({
		mode: 'onChange',
		defaultValues: getDefaultValues(user),
	})

	const { mutate: updateUser } = useMutation({
		mutationKey: [QUERY_KEYS.updateProfile],
		mutationFn: (data: Partial<Omit<TypeTableData, 'createdAt'>>) =>
			userService.update(data, user.id.toString()),
		onSuccess: ({ data }) => {
			toast.success('Данные успешно обновлены')
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getAllUsers] })
			reset({
				...data,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				roles: data.roles.map((role) => ({ value: role, label: role })),
			})
		},
		onError: (err) => {
			toast.error(errorCatch(err) || 'Ошибка при обновлении пользователя')
		},
	})

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

	const onSubmit = async (data: UpdateUserData) => {
		const dataToSubmit = Object.keys(data).reduce((acc, key) => {
			if (dirtyFields[key as keyof UpdateUserData]) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				acc[key as keyof UpdateUserData] = data[key as keyof UpdateUserData]
			}
			return acc
		}, {} as UpdateUserData)

		if (dataToSubmit.roles) {
			const roles: EnumUserRole[] = dataToSubmit.roles
			dataToSubmit.roles = roles.length
				? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
				  // @ts-ignore
				  roles.map((role: { value: EnumUserRole }) => role.value)
				: [EnumUserRole.USER]
		}

		updateUser(dataToSubmit)
	}

	const { mutate: deleteUser } = useMutation({
		mutationKey: [QUERY_KEYS.updateProfile],
		mutationFn: userService.delete,
		onSuccess: () => {
			setIsShowModal(false)
			toast.success('Пользователь успешно удалён')
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getAllUsers] })
		},
		onError: (err) => {
			setIsShowModal(false)
			toast.error(errorCatch(err) || 'Ошибка при удалении пользователя')
		},
	})

	const formValues = getValues()
	const options = Object.values(EnumUserRole)
		.filter((role) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const currentValues = formValues.roles?.map((r: { value: EnumUserRole }) => r.value) || []
			return !currentValues.includes(role)
		})
		.map((role) => ({
			value: role,
			label: role,
		}))
	// const options1 = Object.values(EnumUserRole)
	// 	.filter((role) => {
	// 		const currentValues = getValues().roles?.map(() => (r: { value: EnumUserRole }) => r.value) || []
	// 		return !currentValues.includes(role)
	// 	})
	// 	.map((role) => ({
	// 		value: role,
	// 		label: role,
	// 	}))

	return (
		<tr>
			<td className='border px-3 py-2'>
				<p className='w-max max-w-12 bg-transparent border-none outline-none text-center truncate'>
					{user.id}
				</p>
			</td>
			<td className='border h-auto'>
				<input
					type='text'
					className='w-full bg-transparent border-none outline-none text-center'
					{...register('name')}
				/>
			</td>
			<td className='border'>
				<input
					type='email'
					className='w-full bg-transparent border-none outline-none text-center'
					{...register('email')}
				/>
			</td>
			<td className='border'>
				<Controller
					name='roles'
					control={control}
					render={({ field: { name, onChange, value, ref } }) => (
						<Select
							name={name}
							ref={ref}
							value={value}
							onChange={onChange}
							components={animatedComponents}
							isMulti
							placeholder='Роль'
							defaultValue={{ value: EnumUserRole.USER, label: EnumUserRole.USER }}
							options={options}
							className='w-full bg-transparent border-none outline-none text-white'
							styles={{
								multiValue: (provided) => ({
									...provided,
									background: 'rgba(255, 255, 255, 0.2)',
								}),
								indicatorsContainer: () => ({
									display: 'none',
								}),
								multiValueLabel: (provided) => ({
									...provided,
									color: 'white',
								}),
								control: (provided) => ({
									...provided,
									backgroundColor: 'transparent',
									boxShadow: 'none',
									border: 'none',
								}),
								menu: (provided) => ({
									...provided,
									backgroundColor: '#333',
									color: 'white',
									width: 'max-content',
								}),
								option: (provided, state) => ({
									...provided,
									color: 'white',
									background:
										state.isSelected || state.isFocused ? 'rgba(0, 0, 0, 0.4)' : 'transparent',
									'&:hover': {
										backgroundColor: `rgba(0, 0, 0, 0.4)`,
									},
									'&:focus': {
										background: 'red',
									},
								}),
								indicatorSeparator: () => ({
									display: 'none',
								}),
								dropdownIndicator: () => ({
									display: 'none',
								}),
								clearIndicator: () => ({
									display: 'none',
								}),
								multiValueRemove: (provided, state) => {
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									// @ts-ignore
									const value = state.data.value.toLowerCase() || state.data.value[0].toLowerCase()
									if (value === EnumUserRole.USER.toLowerCase()) {
										return { display: 'none' }
									}
									return {
										...provided,
										minWidth: 'fit-content',
									}
								},
							}}
						/>
					)}
				/>
			</td>
			<td className='border px-4 py-2'>{dayjs(user.created_at).format('DD.MM.YYYY')}</td>
			<td className='flex gap-2 px-4 py-2'>
				<button
					type='submit'
					className='bg-blue-500 p-2 rounded text-white disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors duration-200'
					disabled={!Object.values(dirtyFields).length}
					onClick={() => reset(getDefaultValues(user))}
				>
					<ReplyIcon />
				</button>
				<button
					type='submit'
					className='bg-blue-500 p-2 rounded text-white disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors duration-200'
					disabled={!Object.values(dirtyFields).length}
					onClick={handleSubmit((data) => onSubmit({ ...data, id: user.id }))}
				>
					Обновить
				</button>
				<button
					onClick={() => setIsShowModal(true)}
					type='button'
					className='bg-red-500 p-2 rounded text-white disabled:cursor-not-allowed disabled:bg-red-600/35 disabled:border-none disabled:text-gray-300'
					disabled={isMe}
					{...(isMe ? { title: 'Нельзя удалить самого себя' } : {})}
				>
					Удалить
				</button>
			</td>
			<Modal
				show={isShowModal}
				text={`Вы уверены что хотите удалить пользователя ${user.name}?`}
				ButtonsRender={() => (
					<div className='flex gap-4'>
						<button className='bg-green-500 text-white' onClick={() => setIsShowModal(false)}>
							Отменить
						</button>
						<button
							autoFocus={isShowModal}
							className='bg-red-600/85 text-white'
							onClick={() => deleteUser(user.id.toString())}
						>
							Удалить
						</button>
					</div>
				)}
			/>
		</tr>
	)
}
