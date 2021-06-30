import requestServer from '@/api'

export const actions = {
    async sendNotification ({ commit }, body) {
        try {
            const response = await requestServer('/notification/message/', 'POST', body)
            return response
        } catch (error) {
            return error.response
        }
    },
    async getListNotificationMessage ({ commit }, params) {
        try {
            const response = await requestServer('/notification/message/', 'GET', params)
            return response
        } catch (error) {
            return error.response
        }
    },
    async detailNotificationMessage ({ commit }, id) {
        try {
            const response = await requestServer(`/notification/message/${id}`, 'GET')
            return response
        } catch (error) {
            return error.response
        }
    },
    async deleteNotificationMessage ({ commit }, id) {
        try {
            const response = await requestServer(`/notification/message/${id}`, 'DELETE')
            return response
        } catch (error) {
            return error.response
        }
    },
}
