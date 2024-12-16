import './App.css'
import { useState } from 'react'

import { cn } from './utils/styles'

import { FormGetDescription } from './components/FormGetDescription'
import { FormCreateDescription } from './components/FormCreateDescription'

function App() {
	const [activeForm, setActiveForm] = useState<'get' | 'create'>('get')

	return (
		<div>
			<div className='flex gap-2 mb-7'>
				<button
					className={cn('bg-transparent', {
						'text-gray-100 bg-gray-700 drop-shadow-md': activeForm === 'get',
					})}
					onClick={() => setActiveForm('get')}
				>
					Получить данные
				</button>
				<button
					className={cn('bg-transparent', {
						'text-gray-100 bg-gray-700 drop-shadow-md': activeForm === 'create',
					})}
					onClick={() => setActiveForm('create')}
				>
					Создать описание
				</button>
			</div>

			{activeForm === 'get' ? <FormGetDescription /> : <FormCreateDescription />}
		</div>
	)
}

export default App
