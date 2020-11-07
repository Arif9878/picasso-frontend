import requestServer from '@/api'

export const actions = {
    async getListHolidayDate ({ commit }, params) {
        try {
            const response = await requestServer('/holiday-date/list', 'GET', params)
            return response
        } catch (error) {
            return error.response
        }
    },
    async createHolidayDate ({ commit }, data) {
        try {
            const response = await requestServer('/holiday-date/create', 'POST', data)
            return response
        } catch (error) {
            return error.response
        }
    },
    async updateHolidayDate ({ commit }, data) {
        try {
            const response = await requestServer(`/holiday-date/update/${data.id}`, 'PUT', data.body)
            return response
        } catch (error) {
            return error.response
        }
    },
    async deleteHolidayDate ({ commit }, id) {
        try {
            const response = await requestServer(`/holiday-date/delete/${id}`, 'DELETE')
            return response
        } catch (error) {
            return error.response
        }
    },
}
