import requestServer from '@/api'

export const actions = {
    async sendNotificationAll ({ commit }, data) {
        try {
            const response = await requestServer('/notification/send/all/', 'POST', data)
            return response
        } catch (error) {
            return error.response
        }
    },
    async sendNotificationGroup ({ commit }, data) {
        const { id, body } = data
        try {
            const response = await requestServer(`/notification/send/group/${id}`, 'POST', body)
            return response
        } catch (error) {
            return error.response
        }
    },
    async getListNotificationMessage ({ commit }, params) {
        try {
            const response = await requestServer('/notification-message/list', 'GET', params)
            return response
        } catch (error) {
            return error.response
        }
    },
    async detailNotificationMessage ({ commit }, id) {
        try {
            const response = await requestServer(`/notification-message/detail/${id}`, 'GET')
            return response
        } catch (error) {
            return error.response
        }
    },
    async deleteNotificationMessage ({ commit }, id) {
        try {
            const response = await requestServer(`/notification-message/delete/${id}`, 'DELETE')
            return response
        } catch (error) {
            return error.response
        }
    },
}
