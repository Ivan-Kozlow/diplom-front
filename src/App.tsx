import './App.css'
import { useState } from 'react'

import { cn } from './utils/styles'

import { Header } from './components/Header'
import { FormUpdateDescription } from './components/FormUpdateDescription'
import { FormGetDescription } from './components/FormGetDescription'
import { FormCreateDescription } from './components/FormCreateDescription'

type TypeActiveForm = 'get' | 'create' | 'update'

function App() {
	const [activeForm, setActiveForm] = useState<TypeActiveForm>('get')

	const formComponents: Record<TypeActiveForm, React.FC> = {
		get: FormGetDescription,
		create: FormCreateDescription,
		update: FormUpdateDescription,
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
					{buttonComponent('Получить описание', 'get')}
					{buttonComponent('Создать описание', 'create')}
					{buttonComponent('Обновить описание', 'update')}
				</div>
				<FormComponent />
			</div>
		</div>
	)
}

export default App
