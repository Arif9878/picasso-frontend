import requestServer from '@/api'

export const actions = {
    async getListEmergencyContact ({ commit }, idUser) {
        try {
            const response = await requestServer(`/user/data/emergency-contacts/${idUser}/lists/`, 'GET')
            return response
        } catch (error) {
            return error.response
        }
    },
    async createEmergencyContact ({ commit }, data) {
        try {
            const response = await requestServer('/user/data/emergency-contacts/', 'POST', data)
            return response
        } catch (error) {
            return error.response
        }
    },
    async updateEmergencyContact ({ commit }, data) {
        try {
            const response = await requestServer(`/user/data/emergency-contacts/${data.id}/`, 'PUT', data.body)
            return response
        } catch (error) {
            return error.response
        }
    },
    async deleteEmergencyContact ({ commit }, id) {
        try {
            const response = await requestServer(`/user/data/emergency-contacts/${id}/`, 'DELETE')
            return response
        } catch (error) {
            return error.response
        }
    },
}
