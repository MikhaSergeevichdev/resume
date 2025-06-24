import { users } from '@/store/usersSignals'
import { apiRequest } from '@/helpers/api.helper'
import { ApiResponseType } from '@/types/response/apiResponse.type'
import { reportError } from '@/helpers/app.helper'
import { newAvatar } from '@/store/usersSignals'

export const getUsers = async () => {
	try {
		const response = await fetch('http://localhost:3000/users')
		if (!response.ok) {
			throw new Error(`Ошибка HTTP: ${response.status}`)
		}
		const data = await response.json()
		users.value = data
	} catch (error) {
		console.error('Ошибка загрузки пользователей:', error)
	}
}

export const uploadAvatar = async (formData: FormData) => {
	const response: ApiResponseType<{ avatarId: string }> = await apiRequest(
		'/avatar',
		{
			method: 'POST',
			body: formData,
		},
		false
	)

	if (!response.success) {
		response.error ? reportError({ title: 'uploadAvatar', error: response.error }) : null
	} else if (response.success && response.data?.avatarId) {
		newAvatar.value = response.data.avatarId
	} else {
		reportError({ title: 'uploadAvatar' })
	}
	return response
}
