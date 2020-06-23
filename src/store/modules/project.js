import requestServer from '@/api'

export const actions = {
  async getListProject ({ commit }, params) {
    try {
      const response = await requestServer('/project/', 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  },
}
