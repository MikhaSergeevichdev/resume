import { me } from '@/store/authSignals'
import { reportError } from '@/helpers/app.helper'
import { ApiResponseType } from '@/types/response/apiResponse.type'
import { NotificationType } from '@/types/response/notification.type'
import { notifications } from '@/store/authSignals'
import { apiRequest } from '@/helpers/api.helper'

export const getMyNotifications = async () => {
	const userId = me.value.id
	const url = `/notifications?userId=${userId}`

	try {
		const response: ApiResponseType<NotificationType[]> = await apiRequest(url)
		if (response.success && response.data) {
			notifications.value = response.data
		} else {
			reportError({ title: 'getUserNotifications', error: response.error })
		}
	} catch (error) {
		reportError({ title: 'getUserNotifications', message: String(error) })
	}
}
