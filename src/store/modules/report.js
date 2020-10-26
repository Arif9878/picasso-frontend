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
    async getListReportByUser ({ commit }, params) {
        try {
            const response = await requestServer('/monthly-report/', 'GET', params)
            return response
        } catch (error) {
            return error.response
        }
    },
    async printReport ({ commit }, query) {
        const {
            userId,
            params,
        } = query
        try {
            const response = await request({
                url: `/logbook/report-by-user/${userId}`,
                method: 'GET',
                params: params,
                responseType: 'blob',
            })
            return response
        } catch (error) {
            return error.response
        }
    },
    async exportExcelByDivisi ({ commit }, params) {
        try {
            const response = await request({
                url: '/export-excel/divisi/',
                method: 'GET',
                params: params,
                responseType: 'blob',
            })
            return response
        } catch (error) {
            return error.response
        }
    },
    async exportExcelByCategory ({ commit }, params) {
        try {
            const response = await request({
                url: '/export-excel/category/',
                method: 'GET',
                params: params,
                responseType: 'blob',
            })
            return response
        } catch (error) {
            return error.response
        }
    },
}
