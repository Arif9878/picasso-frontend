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
}
