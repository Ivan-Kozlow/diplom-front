import './index.css'
import { createRoot } from 'react-dom/client'

import { Providers } from './components/Providers.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
	<Providers>
		<App />
	</Providers>
)
