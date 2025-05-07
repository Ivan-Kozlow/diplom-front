import { Toaster } from 'react-hot-toast'
import { CookiesProvider } from 'react-cookie'
import { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 0 } } })

export const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<CookiesProvider>{children}</CookiesProvider>
				<Toaster position='top-center' />
			</QueryClientProvider>
		</>
	)
}
