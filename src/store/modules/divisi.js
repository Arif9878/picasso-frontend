import fetchListDivisi from '@/api/divisi'

const state = {
  listDivisi: null
}

const mutations = {
  SET_LISTDIVISI: (state, data) => {
    // console.log(data)
    state.listDivisi = data
  }
}

const actions = {
  async getListDiv({ commit }, params) {
    // console.log(params)
    const response = await fetchListDivisi()
    // console.log(response)
    commit('SET_LISTDIVISI', response.data.items)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

