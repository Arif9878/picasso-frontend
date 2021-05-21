import requestServer from '@/api'

const headers = { 'Content-Type': 'multipart/form-data' }

export const actions = {
    async getListUserFiles ({ commit }, idUser) {
        try {
            const response = await requestServer(`/user/data/files/${idUser}/lists/`, 'GET')
            return response
        } catch (error) {
            return error.response
        }
    },
    async createUserFiles ({ commit }, data) {
        try {
            const response = await requestServer('/user/data/files/', 'POST', data, headers)
            return response
        } catch (error) {
            return error.response
        }
    },
    async updateUserFiles ({ commit }, data) {
        try {
            const response = await requestServer(`/user/data/files/${data.id}/`, 'PUT', data.body, headers)
            return response
        } catch (error) {
            return error.response
        }
    },
    async deleteUserFiles ({ commit }, id) {
        try {
            const response = await requestServer(`/user/data/files/${id}/`, 'DELETE')
            return response
        } catch (error) {
            return error.response
        }
    },
}
