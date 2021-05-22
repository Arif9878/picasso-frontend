import requestServer from '@/api'

const headers = { 'Content-Type': 'multipart/form-data' }

export const actions = {
    async getListUserEducation ({ commit }, idUser) {
        try {
            const response = await requestServer(`/user/data/educations/${idUser}/lists/`, 'GET')
            return response
        } catch (error) {
            return error.response
        }
    },
    async createUserEducation ({ commit }, data) {
        try {
            const response = await requestServer('/user/data/educations/', 'POST', data, headers)
            return response
        } catch (error) {
            return error.response
        }
    },
    async updateUserEducation ({ commit }, data) {
        try {
            const response = await requestServer(`/user/data/educations/${data.id}/`, 'PUT', data.body, headers)
            return response
        } catch (error) {
            return error.response
        }
    },
    async deleteUserEducation ({ commit }, id) {
        try {
            const response = await requestServer(`/user/data/educations/${id}/`, 'DELETE')
            return response
        } catch (error) {
            return error.response
        }
    },
}
