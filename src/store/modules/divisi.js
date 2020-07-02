import requestServer from '@/api'

export const actions = {
    async getListDivisi ({ commit }, params) {
        try {
            const response = await requestServer('/satuan-kerja/list', 'GET', params)
            return response
        } catch (error) {
            return error.response
        }
    },
    async createDivisi ({ commit }, data) {
        try {
            const response = await requestServer('/satuan-kerja/create', 'POST', data)
            return response
        } catch (error) {
            return error.response
        }
    },
    async updateDivisi ({ commit }, data) {
        try {
            const response = await requestServer(`/satuan-kerja/update/${data.id}`, 'PUT', data.body)
            return response
        } catch (error) {
            return error.response
        }
    },
    async deleteDivisi ({ commit }, id) {
        try {
            const response = await requestServer(`/satuan-kerja/delete/${id}`, 'DELETE')
            return response
        } catch (error) {
            return error.response
        }
    },
}
