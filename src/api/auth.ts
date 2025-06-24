import { me, isAuth } from '@/store/authSignals'
import {
	AuthRequestType,
	AuthResponseType,
	UserCreateResponseType,
	UserUpdateResponseType,
} from '@/types/authTypes'
import { tryingToDo } from '@/store/commonSignals'
import { doAfterAuth, isTokenExpired, logOut, getUserLang } from '@/helpers/auth.helper'
import { apiRequest } from '@/helpers/api.helper'
import { ApiResponseType } from '@/types/response/apiResponse.type'
import { MeTypes } from '@/types/response/me.type'
import { reportError } from '@/helpers/app.helper'
import { getTeamById } from './team.api'
import { getMyNotifications } from './notification.api'

const LOGIN_URL = 'http://localhost:3000/login'
const ME_URL = 'http://localhost:3000/me'
const CREATE_USER_URL = 'http://localhost:3000/user'

export const getMe = async (token: string) => {
	tryingToDo.value = true
	logOut()

	if (isTokenExpired(token)) {
		reportError({ title: 'auth', error: { key: 'sessionExpired' } })
		tryingToDo.value = false
		throw new Error()
	}

	try {
		const response = await fetch(ME_URL, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		const data: ApiResponseType<MeTypes> = await response.json()

		if (!data.success) {
			reportError({ title: 'authError', error: data.error })
			throw new Error()
		} else {
			me.value = data.data
			isAuth.value = true
			getUserLang()
			doAfterAuth(token)
			getMyNotifications()
			me.value.teams?.length > 0 ? getTeamById(me.value.teams[0].teamId) : null
		}
	} catch (error) {
		reportError({ title: 'authError', message: error })
		throw error
	} finally {
		tryingToDo.value = false
	}
}

export const logIn = async (data: AuthRequestType) => {
	try {
		const response = await fetch(LOGIN_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		if (!response.ok) {
			const errorData = await response.json()
			if (response.status === 400) {
				return { error: errorData.error }
			}
			throw new Error(errorData.error || 'Ошибка авторизации')
		}

		const responseData: AuthResponseType = await response.json()

		if (responseData.token) {
			localStorage.setItem('authToken', responseData.token)
			await getMe(responseData.token)
			return isAuth ? { success: true } : null
		}
	} catch (error) {
		throw error
	}
}

export const createUser = async (data: AuthRequestType) => {
	try {
		const response = await fetch(CREATE_USER_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		const responseData: UserCreateResponseType = await response.json()

		if (!responseData.success) {
			responseData.error
				? reportError({ title: 'userCreateError', error: responseData.error })
				: null
			return responseData
		}

		if (responseData.success && responseData.token) {
			localStorage.setItem('authToken', responseData.token)
			await getMe(responseData.token)
			return isAuth ? { success: true } : null
		}
	} catch (error) {
		reportError({ title: 'userCreateError', message: error })
		return { success: false }
	}
}

export const updateMe = async (updateData: Partial<MeTypes>) => {
	const meId = me.value.id
	try {
		const response: UserUpdateResponseType = await apiRequest(`/user/${meId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updateData),
		})

		if (!response.success) {
			response.error ? reportError({ title: 'userUpdateError', error: response.error }) : null
			return response
		}

		if (response.success && response.data) {
			me.value = response.data
			return response
		}

		throw new Error('Не удалось обновить данные пользователя')
	} catch (error) {
		reportError({ title: 'userUpdateError', message: error })
		return { success: false }
	}
}
