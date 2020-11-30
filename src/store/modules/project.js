import requestServer from '@/api'

export const actions = {
  async getListProject ({ commit }, params) {
    try {
      const responseProject = await requestServer('/project/', 'GET', params)
      return responseProject
    } catch (error) {
      return error.response
    }
  },
  async createProject ({ commit }, data) {
    try {
      const response = await requestServer('/project/', 'POST', data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async updateProject ({ commit }, data) {
    try {
      const response = await requestServer(`/project/${data.id}`, 'PUT', data.body)
      return response
    } catch (error) {
      return error.response
    }
  },
  async deleteProject ({ commit }, id) {
    try {
      const response = await requestServer(`/project/${id}`, 'DELETE')
      return response
    } catch (error) {
      return error.response
    }
  },
}
