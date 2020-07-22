import requestServer from '@/api'
import request from '@/utils/request'

export const actions = {
    async getListReport ({ commit }, params) {
        try {
            const response = await requestServer('/logbook/', 'GET', params)
            return response
        } catch (error) {
            return error.response
        }
    },
    async printReport ({ commit }, idUser) {
        try {
            const response = await request({
                url: `/logbook/report-by-user/${idUser}`,
                method: 'GET',
                responseType: 'blob',
            })
            return response
        } catch (error) {
            return error.response
        }
    },
}
