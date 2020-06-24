import requestServer from '@/api'

export const actions = {
    async getListReport ({ commit }, params) {
        try {
            const response = await requestServer('/logbook/', 'GET', params)
            return response
        } catch (error) {
            return error.response
        }
    },
}
