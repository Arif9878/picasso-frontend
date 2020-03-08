import { fetchListJabatan } from '@/api/jabatan'

const state = {
  listJabatan: null
}

const mutations = {
  SET_LISTJABATAN: (state, data) => {
    state.listJabatan = data
  }
}

const actions = {
  async getListJab({ commit }, params) {
    const response = await fetchListJabatan(params)
    commit('SET_LISTJABATAN', response.results)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
