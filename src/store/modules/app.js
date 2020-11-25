
export const state = {
  barColor: '#16A75C, #A1D5AB',
  barImage: '',
  drawer: null,
}

export const mutations = {
  SET_BAR_IMAGE (state, payload) {
    state.barImage = payload
  },
  SET_DRAWER (state, payload) {
    state.drawer = payload
  },
}
