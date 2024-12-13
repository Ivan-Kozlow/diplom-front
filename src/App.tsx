import './App.css'
import { useForm } from 'react-hook-form'

import { formService } from './services/form'

export type TypeFormFields = {
	id: string
}

function App() {
	const { register, handleSubmit, formState } = useForm<TypeFormFields>()

	const onSubmit = handleSubmit((data) => {
		formService.getForm(data.id)
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
