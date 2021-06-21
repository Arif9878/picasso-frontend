import requestServer from '@/api'
import {
    resetRouter,
} from '@/router'

import {
    getToken,
    getRefreshToken,
    setToken,
    setRefreshToken,
    removeToken,
} from '@/utils/cookies'

export const state = {
    token: getToken(),
    refreshToken: getRefreshToken(),
    detailUser: '',
    avatar: '',
    introduction: '',
    menuItems: [],
    roles: [],
    routes: [],
    addRoutes: [],
}

export const getters = {
  roles: (state, getters) => {
      return state.roles
  },
  detailUser: (state, getters) => {
      return state.detailUser
  },
  menuItems: (state, getters) => {
      return state.menuItems
  },
}

export const mutations = {
    SET_DETAIL_USER: (state, detailUser) => {
        state.detailUser = detailUser
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
        state.refreshToken = refreshToken
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_MENU_ITEM: (state, menuItems) => {
        state.menuItems = menuItems
    },
}

export const actions = {
    login ({ commit }, data) {
        return new Promise((resolve, reject) => {
            requestServer('auth/admin/login/', 'POST', data).then((response) => {
                const {
                    // eslint-disable-next-line camelcase
                    auth_token,
                    // eslint-disable-next-line camelcase
                    refresh_token,
                } = response
                commit('SET_TOKEN', auth_token)
                commit('SET_REFRESH_TOKEN', refresh_token)
                // eslint-disable-next-line no-undef
                setToken(auth_token)
                setRefreshToken(refresh_token)
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    loginSocialOauth ({ commit }, data) {
        return new Promise((resolve, reject) => {
            requestServer('/social/google-oauth2/', 'POST', data).then((response) => {
                const {
                    // eslint-disable-next-line camelcase
                    auth_token,
                    // eslint-disable-next-line camelcase
                    refresh_token,
                } = response
                commit('SET_TOKEN', auth_token)
                commit('SET_REFRESH_TOKEN', refresh_token)
                // eslint-disable-next-line no-undef
                setToken(auth_token)
                setRefreshToken(refresh_token)
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    getInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        requestServer('/user/info', 'GET').then((response) => {
            const data = {
                roles: ['admin'],
            }
            const {
                roles,
            } = data

            commit('SET_DETAIL_USER', response.data)
            commit('SET_ROLES', roles)
            resolve(data)
        }).catch((error) => {
            reject(error)
        })
      })
    },
    async getListMenuUser ({ commit }, params) {
      return new Promise((resolve, reject) => {
        requestServer('/menu/user/list/', 'GET').then((response) => {
            commit('SET_MENU_ITEM', response)
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
      })
    },
    async getListUser ({ commit }, params) {
        try {
            const response = await requestServer('/user/', 'GET', params)
            return response
        } catch (error) {
            return error.response
        }
    },
    async createUser ({ commit }, data) {
        try {
            const response = await requestServer('/user/', 'POST', data)
            return response
        } catch (error) {
            return error.response
        }
    },
    async detailUser ({ commit }, id) {
        try {
            const response = await requestServer(`/user/${id}/`, 'GET')
            return response
        } catch (error) {
            return error.response
        }
    },
    async updateUser ({ commit }, data) {
        try {
            const response = await requestServer(`/user/${data.id}/`, 'PUT', data.body)
            return response
        } catch (error) {
            return error.response
        }
    },
    async changePasswordUser ({ commit }, data) {
        try {
            const response = await requestServer(`/user/change-password/${data.id}`, 'POST', data.body)
            return response
        } catch (error) {
            return error.response
        }
    },
    async deleteUser ({ commit }, id) {
        try {
            const response = await requestServer(`/user/${id}/`, 'DELETE')
            return response
        } catch (error) {
            return error.response
        }
    },
    resetToken ({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            // logout(state.token).then(() => {
            commit('SET_TOKEN', '')
            commit('SET_REFRESH_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resetRouter()
            resolve()
        })
    },
    logout ({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            // logout(state.token).then(() => {
            commit('SET_TOKEN', '')
            commit('SET_REFRESH_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resetRouter()
            resolve()
        })
    },
    async updatePhotoProfile ({ commit }, data) {
        const headers = { 'Content-Type': 'multipart/form-data' }
        try {
            const response = await requestServer('/user/photo/profile/', 'PUT', data, headers)
            return response
        } catch (error) {
            return error.response
        }
    },
    async identityNumberType ({ commit }, id) {
        try {
            const response = await requestServer('/user/identity-number/type/', 'GET')
            return response
        } catch (error) {
            return error.response
        }
    },
}
