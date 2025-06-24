import { apiRequest } from '@/helpers/api.helper'
import { ApiResponseType } from '@/types/response/apiResponse.type'
import { reportError } from '@/helpers/app.helper'
import { getFormatedDate } from '@/helpers/calendar.helper'
import { me } from '@/store/authSignals'
import { currentDate, selectedDate } from '@/store/calendarSignals'
import { UserTasksResponseType } from '@/types/response/userTasksRespons.type'
import { userTasks } from '@/store/tasks.signals'
import {
	UserTaskPayloadType,
	UpdateUserTaskPayloadType,
	DeleteUserTaskRequestType,
	ArchiveUserTaskRequestType,
	ChangeUserTaskStatusRequestType,
} from '@/types/request/userTaskRequest.type'

export const createUserTask = async (newTaskData: UserTaskPayloadType) => {
	try {
		const response: ApiResponseType<void> = await apiRequest('/user-task', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newTaskData),
		})

		if (!response.success) {
			reportError({
				title: 'creationTask',
				error: response.error,
			})
			return { success: false }
		} else {
			getUserTasks()
			return response
		}
	} catch (error) {
		reportError({ title: 'creationTask', error })
		return { success: false }
	}
}

export const updateUserTask = async (updatedTaskData: UpdateUserTaskPayloadType) => {
	try {
		const response: ApiResponseType<void> = await apiRequest('/user-task', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updatedTaskData),
		})

		if (!response.success) {
			reportError({
				title: 'updateTask',
				error: response.error,
			})
			return { success: false }
		} else {
			getUserTasks()
			return response
		}
	} catch (error) {
		reportError({ title: 'updateTask', error })
		return { success: false }
	}
}

export const deleteUserTask = async (params: DeleteUserTaskRequestType) => {
	const { taskId, type, userId } = params
	if (!userId || !taskId || type == null) {
		reportError({
			title: 'deleteTask',
			error: { key: 'missingReqParam' },
		})
		return
	}
	const queryParams = new URLSearchParams({
		userId,
		taskId,
		type: String(params.type),
	})
	const url = `/user-task?${queryParams.toString()}`

	try {
		const response: ApiResponseType<void> = await apiRequest(url, {
			method: 'DELETE',
		})

		if (response.success) {
			getUserTasks()
			return response
		} else {
			reportError({
				title: 'deleteTask',
				error: response.error,
			})
			return { success: false }
		}
	} catch (error) {
		reportError({ title: 'deleteTask', error })
		return { success: false }
	}
}

export const getUserTasks = async () => {
	const userId = me.value.id
	const date = getFormatedDate()
	const dayOfWeek =
		selectedDate.value.dayOfWeek !== null
			? String(selectedDate.value.dayOfWeek)
			: String(currentDate.value.dayOfWeek)
	if (!userId || !date || !dayOfWeek) {
		reportError({
			title: 'getTasks',
			error: { key: 'missingReqParam' },
		})
		return
	}

	const params = {
		userId,
		date,
		dayOfWeek,
	}

	const queryParams = new URLSearchParams(params)

	const url = `/user-tasks?${queryParams.toString()}`

	try {
		const response: ApiResponseType<UserTasksResponseType> = await apiRequest(url)

		if (response.success) {
			userTasks.value = response.data
		} else {
			reportError({
				title: 'getTasks',
				error: response.error,
			})
		}
	} catch (error) {
		reportError({ title: 'getTasks', message: error })
	}
}

export const archiveUserTask = async (params: ArchiveUserTaskRequestType) => {
	const { taskId, type, userId } = params
	if (!userId || !taskId || type == null) {
		reportError({
			title: 'archiveTask',
			error: { key: 'missingReqParam' },
		})
		return
	}
	const queryParams = new URLSearchParams({
		userId,
		taskId,
		type: String(type),
	})
	const url = `/user-task/archive?${queryParams.toString()}`
	try {
		const response: ApiResponseType<void> = await apiRequest(url, {
			method: 'PATCH',
		})

		if (response.success) {
			getUserTasks()
			return response
		} else {
			reportError({
				title: 'archiveTask',
				error: response.error,
			})
			return { success: false }
		}
	} catch (error) {
		reportError({ title: 'archiveTask', error })
		return { success: false }
	}
}

export const changeUserTaskStatus = async (params: ChangeUserTaskStatusRequestType) => {
	const { taskId, type, userId, newStatus } = params

	if (!userId || !taskId || type == null || newStatus == null) {
		reportError({
			title: 'changeTaskStatus',
			error: { key: 'missingReqParam' },
		})
		return
	}

	try {
		const response: ApiResponseType<void> = await apiRequest('/user-task/status', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userId, taskId, type, newStatus }),
		})

		if (response.success) {
			getUserTasks()
			return response
		} else {
			reportError({
				title: 'changeTaskStatus',
				error: response.error,
			})
			return { success: false }
		}
	} catch (error) {
		reportError({ title: 'changeTaskStatus', error })
		return { success: false }
	}
}
