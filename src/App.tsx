import './App.css'
import { useForm } from 'react-hook-form'

import { formService } from './services/form'

import type { TypeGetFormFields } from './types/form'

function App() {
	const { register, handleSubmit, formState } = useForm<TypeGetFormFields>()

	const onSubmit = handleSubmit((data) => {
		formService.getDescription(data.id)
	})

	return (
		<form className='flex gap-5 flex-col' onSubmit={onSubmit}>
			<div className='flex flex-col items-start gap-1'>
				<input className='rounded-md h-8 p-2' type='text' {...register('id', { required: true })} />
				{formState.errors.id && <span className='text-red-400 text-sm'>Это поле обязательно</span>}
			</div>
			<button>Получить данные</button>
		</form>
	)
}

export default App
