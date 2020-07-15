import requestServer from '@/api'

export const actions = {
    async getListJabatan ({ commit }, params) {
        try {
            const response = await requestServer('/jabatan/list', 'GET', params)
            return response
        } catch (error) {
            return error.response
        }
    },
    async getListJabatanByDivisi ({ commit }, idDivisi) {
        try {
            const response = await requestServer(`/jabatan/list/by-satuan-kerja/${idDivisi}`, 'GET')
            return response
        } catch (error) {
            return error.response
        }
    },
    async createJabatan ({ commit }, data) {
        try {
            const response = await requestServer('/jabatan/create', 'POST', data)
            return response
        } catch (error) {
            return error.response
        }
    },
    async updateJabatan ({ commit }, data) {
        try {
            const response = await requestServer(`/jabatan/update/${data.id}`, 'PUT', data.body)
            return response
        } catch (error) {
            return error.response
        }
    },
    async deleteJabatan ({ commit }, id) {
        try {
            const response = await requestServer(`/jabatan/delete/${id}`, 'DELETE')
            return response
        } catch (error) {
            return error.response
        }
    },
}
