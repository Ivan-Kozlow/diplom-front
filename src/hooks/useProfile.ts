import { useQuery } from '@tanstack/react-query'

import { userService } from '../services/user'
import { getUserId } from '../services/auth'
import { QUERY_KEYS } from '../constants/api'

import { transformUserToState } from './transformFromUserToState'

export function useProfile() {
	const { data, isFetching, isError } = useQuery({
		queryKey: [QUERY_KEYS.getUserByIdOrEmail],
		queryFn: () => userService.getProfileById(getUserId() || ''),
		retry: 1,
		staleTime: 1200000,
		refetchInterval: 1800000, // 30 minutes in milliseconds,
	})

	const profile = data?.data
	const userState = profile ? transformUserToState(profile) : null

	return {
		isFetching,
		isError,
		user: {
			...profile,
			...userState,
		},
	}
}
