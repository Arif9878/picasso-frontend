import requestServer from '@/api'

export const actions = {
    async getListMenuType ({ commit }, params) {
        try {
            const response = await requestServer('/menu-type/', 'GET', params)
            return response
        } catch (error) {
            return error.response
        }
    },
    async createMenuType ({ commit }, data) {
        try {
          const response = await requestServer('/menu-type/', 'POST', data)
          return response
        } catch (error) {
          return error.response
        }
    },
    async updateMenuType ({ commit }, data) {
        try {
          const response = await requestServer(`/menu-type/${data.id}/`, 'PUT', data.body)
          return response
        } catch (error) {
          return error.response
        }
    },
    async getListMenu ({ commit }, params) {
        try {
            const response = await requestServer('/menu/', 'GET', params)
            return response
        } catch (error) {
            return error.response
        }
    },
    async createMenu ({ commit }, data) {
        try {
          const response = await requestServer('/menu/', 'POST', data)
          return response
        } catch (error) {
          return error.response
        }
    },
    async deleteMenu ({ commit }, id) {
        try {
          const response = await requestServer(`/menu/${id}/`, 'DELETE')
          return response
        } catch (error) {
          return error.response
        }
    },
}
