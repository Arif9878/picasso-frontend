import requestServer from '@/api'

export const actions = {
    async getListJabatan ({ commit }, params) {
        try {
            const response = await requestServer('/jabatan/', 'GET', params)
            return response
        } catch (error) {
            return error.response
        }
    },
    async createJabatan ({ commit }, data) {
        try {
            const response = await requestServer('/jabatan/', 'POST', data)
            return response
        } catch (error) {
            return error.response
        }
    },
    async updateJabatan ({ commit }, data) {
        try {
            const response = await requestServer(`/jabatan/${data.id}`, 'PUT', data.body)
            return response
        } catch (error) {
            return error.response
        }
    },
    async deleteJabatan ({ commit }, id) {
        try {
            const response = await requestServer(`/jabatan/${id}`, 'DELETE')
            return response
        } catch (error) {
            return error.response
        }
    },
}
