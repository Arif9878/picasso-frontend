import requestServer from '@/api'

export const actions = {
    async getListTupoksiJabatan ({ commit }, params) {
        try {
            const response = await requestServer('/tupoksi-jabatan/list', 'GET', params)
            return response
        } catch (error) {
            return error.response
        }
    },
    async createTupoksiJabatan ({ commit }, data) {
        try {
            const response = await requestServer('/tupoksi-jabatan/create', 'POST', data)
            return response
        } catch (error) {
            return error.response
        }
    },
    async updateTupoksiJabatan ({ commit }, data) {
        try {
            const response = await requestServer(`/tupoksi-jabatan/update/${data.id}`, 'PUT', data.body)
            return response
        } catch (error) {
            return error.response
        }
    },
    async deleteTupoksiJabatan ({ commit }, id) {
        try {
            const response = await requestServer(`/tupoksi-jabatan/delete/${id}`, 'DELETE')
            return response
        } catch (error) {
            return error.response
        }
    },
}
