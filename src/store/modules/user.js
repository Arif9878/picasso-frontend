import requestServer from '@/api'
import {
    resetRouter,
} from '@/router'

import {
    getToken,
    setToken,
    removeToken,
} from '@/utils/cookies'

export const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    routes: [],
    addRoutes: [],
}

export const getters = {
  roles: (state, getters) => {
      return state.roles
  },
}

export const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
}

export const actions = {
    login ({ commit }, data) {
        return new Promise((resolve, reject) => {
            requestServer('auth/login/', 'POST', data).then((response) => {
                const {
                    // eslint-disable-next-line camelcase
                    auth_token,
                } = response
                commit('SET_TOKEN', auth_token)
                // eslint-disable-next-line no-undef
                setToken(auth_token)
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
                } = response
                commit('SET_TOKEN', auth_token)
                // eslint-disable-next-line no-undef
                setToken(auth_token)
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    getInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
          const data = {
              roles: ['admin'],
          }
          const {
              roles,
          } = data

          commit('SET_ROLES', roles)
          resolve(data)
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
    logout ({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            // logout(state.token).then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resetRouter()
            resolve()
        })
    },
}
