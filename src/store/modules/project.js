import {
  fetchListProject
} from '@/api/project'

const state = {
  listProject: null
}

const mutations = {
  SET_LISTPROJECT: (state, data) => {
    state.listProject = data
  }
}

const actions = {
  async getListProject({
    commit
  }, params) {
    const response = await fetchListProject(params)
    commit('SET_LISTPROJECT', response.results)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
