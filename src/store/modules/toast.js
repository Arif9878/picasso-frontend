export const mutations = {
    INFO_TOAST (state, message) {
        state.show = true
        state.color = 'info'
        state.message = message
    },
    SUCCESS_TOAST (state, message) {
        state.show = true
        state.color = 'success'
        state.message = message
    },
    WARNING_TOAST (state, message) {
        state.show = true
        state.color = 'warning'
        state.message = message
    },
    ERROR_TOAST (state, message) {
        state.show = true
        state.color = 'error'
        state.message = message
    },
    INACTIVE_TOAST (state) {
        state.show = false
    },
}

export const actions = {
    infoToast ({ commit }, message) {
        commit('INFO_TOAST', message)
    },
    successToast ({ commit }, message) {
        commit('SUCCESS_TOAST', message)
    },
    warningToast ({ commit }, message) {
        commit('WARNING_TOAST', message)
    },
    errorToast ({ commit }, message) {
        commit('ERROR_TOAST', message)
    },
    inactiveToast ({ commit }) {
        commit('INACTIVE_TOAST')
    },
}

export const getters = {
    show: state => state.show,
    color: state => state.color,
    message: state => state.message,
}

export const state = {
    show: false,
    color: '',
    message: '',
}
