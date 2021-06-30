
import requestServer from '@/api'

export const actions = {
    async getListDivisi ({ commit }, params) {
        try {
            const response = await requestServer('/satuan-kerja/', 'GET', params)
            return response
        } catch (error) {
            return error.response
        }
    },
    async getListDivisiOneUnit ({ commit }, params) {
        try {
            const response = await requestServer('/satuan-kerja/one-unit', 'GET')
            return response
        } catch (error) {
            return error.response
        }
    },
    async createDivisi ({ commit }, data) {
        try {
            const response = await requestServer('/satuan-kerja/', 'POST', data)
            return response
        } catch (error) {
            return error.response
        }
    },
    async updateDivisi ({ commit }, data) {
        try {
            const response = await requestServer(`/satuan-kerja/${data.id}`, 'PUT', data.body)
            return response
        } catch (error) {
            return error.response
        }
    },
    async deleteDivisi ({ commit }, id) {
        try {
            const response = await requestServer(`/satuan-kerja/${id}`, 'DELETE')
            return response
        } catch (error) {
            return error.response
        }
    },
}
