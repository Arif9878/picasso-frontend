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
}
