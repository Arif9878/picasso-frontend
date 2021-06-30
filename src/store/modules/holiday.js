import requestServer from '@/api'

export const actions = {
    async getListHolidayDate ({ commit }, params) {
        try {
            const response = await requestServer('/holiday-date/', 'GET', params)
            return response
        } catch (error) {
            return error.response
        }
    },
    async createHolidayDate ({ commit }, data) {
        try {
            const response = await requestServer('/holiday-date/', 'POST', data)
            return response
        } catch (error) {
            return error.response
        }
    },
    async updateHolidayDate ({ commit }, data) {
        try {
            const response = await requestServer(`/holiday-date/${data.id}`, 'PUT', data.body)
            return response
        } catch (error) {
            return error.response
        }
    },
    async deleteHolidayDate ({ commit }, id) {
        try {
            const response = await requestServer(`/holiday-date/${id}`, 'DELETE')
            return response
        } catch (error) {
            return error.response
        }
    },
}
