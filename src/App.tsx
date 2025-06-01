import './App.css'
import { useState } from 'react'

import { cn } from './utils/styles'
import { useProfile } from './hooks/useProfile'

import { Header } from './components/Header'
import { FormUpdateDescription } from './components/FormUpdateDescription'
import { FormGetDescription } from './components/FormGetDescription'
import { FormDeleteDescription } from './components/FormDeleteDescription'
import { FormCreateDescription } from './components/FormCreateDescription'

type TypeActiveForm = 'get' | 'create' | 'update' | 'delete'

function App() {
	const [activeForm, setActiveForm] = useState<TypeActiveForm>('get')
	const user = useProfile()

	const formComponents: Record<TypeActiveForm, React.FC> = {
		get: FormGetDescription,
		create: FormCreateDescription,
		update: FormUpdateDescription,
		delete: FormDeleteDescription,
	}
	const FormComponent = formComponents[activeForm]

	const buttonComponent = (text: string, activeButton: TypeActiveForm) => (
		<button
			className={cn('bg-transparent p-2 sm:p-3', {
				'text-gray-100 bg-gray-700 drop-shadow-md': activeForm === activeButton,
			})}
			onClick={() => setActiveForm(activeButton)}
		>
			{text}
		</button>
	)

	return (
		<div>
			<Header />
			<div>
				<div className='flex gap-2 mb-7'>
					{buttonComponent('Получить книгу', 'get')}
					{user && user.user?.isAdmin && buttonComponent('Создать книгу', 'create')}
					{buttonComponent('Обновить книгу', 'update')}
					{user && user.user?.isAdmin && buttonComponent('Удалить книгу', 'delete')}
				</div>
				<FormComponent />
			</div>
		</div>
	)
}

export default App
