import requestServer from '@/api'

export const actions = {
    async getUserOtherInformation ({ commit }, idUser) {
        try {
            const response = await requestServer(`/user/other/information/${idUser}/`, 'GET')
            return response
        } catch (error) {
            return error.response
        }
    },
    async updateUserEducation ({ commit }, data) {
        try {
            const response = await requestServer(`/user/other/information/${data.id}/`, 'PUT', data.body)
            return response
        } catch (error) {
            return error.response
        }
    },
}
