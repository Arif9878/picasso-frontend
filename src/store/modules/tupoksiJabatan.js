import requestServer from '@/api'

export const actions = {
    async getListTupoksiJabatan ({ commit }, params) {
        try {
            const response = await requestServer('/tupoksi-jabatan/', 'GET', params)
            return response
        } catch (error) {
            return error.response
        }
    },
    async createTupoksiJabatan ({ commit }, data) {
        try {
            const response = await requestServer('/tupoksi-jabatan/', 'POST', data)
            return response
        } catch (error) {
            return error.response
        }
    },
    async updateTupoksiJabatan ({ commit }, data) {
        try {
            const response = await requestServer(`/tupoksi-jabatan/${data.id}`, 'PUT', data.body)
            return response
        } catch (error) {
            return error.response
        }
    },
    async deleteTupoksiJabatan ({ commit }, id) {
        try {
            const response = await requestServer(`/tupoksi-jabatan/${id}`, 'DELETE')
            return response
        } catch (error) {
            return error.response
        }
    },
}
