import { CreateTeamResponseType, TeamType } from '@/types/response/team.type'
import { apiRequest } from '@/helpers/api.helper'
import { CreateTeamRequestType, InviteMemberRequestType } from '@/types/request/teamRequest.type'
import { ApiResponseType } from '@/types/response/apiResponse.type'
import { currentTeam } from '@/store/team.signals'
import { me } from '@/store/authSignals'
import { MemberScopeEnum } from '@/constants/team.constants'

export const createTeam = async (teamData: CreateTeamRequestType) => {
	try {
		const response: CreateTeamResponseType = await apiRequest('/team', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(teamData),
		})

		if (!response.success) {
			reportError({
				title: 'creationTeam',
				error: response.error,
			})
			return response
		} else {
			getTeamById(response.data)
			return response
		}
	} catch (error) {
		reportError({ title: 'creationTeam', error })
		return { success: false }
	}
}

export const getTeamById = async (teamId: string) => {
	const queryParams = new URLSearchParams({ teamId })
	const url = `/team?${queryParams.toString()}`

	try {
		const response: ApiResponseType<TeamType> = await apiRequest(url)

		if (!response.success) {
			reportError({
				title: 'getTeam',
				error: response.error,
			})
			return { success: false }
		} else {
			currentTeam.value = response.data
			return { success: true }
		}
	} catch (error) {
		reportError({ title: 'getTeam', error })
		return { success: false }
	}
}

export const sendTeamInvite = async (input: string, scope: MemberScopeEnum) => {
	const fromUserId = me.value.id
	const teamId = currentTeam.value?.id
	const fromUserName = me.value.username
	const teamName = currentTeam.value?.name

	const body: InviteMemberRequestType = {
		teamId,
		teamName,
		fromUserId,
		fromUserName,
		scope,
	}

	if (/^[\w-]{36}$/.test(input)) {
		body.toUserId = input
	} else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
		body.toUserEmail = input
	} else {
		body.toUserName = input
	}

	try {
		const response: ApiResponseType<void> = await apiRequest('/team/invite', {
			method: 'POST',
			body: JSON.stringify(body),
		})

		if (!response.success) {
			reportError({ title: 'sendTeamInvite', error: response.error })
		}

		return response
	} catch (error) {
		reportError({ title: 'sendTeamInvite', message: String(error) })
	}
}
