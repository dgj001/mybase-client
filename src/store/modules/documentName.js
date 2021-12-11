import http from "@/http";

const state = {
  available: false,
  error: null,
  checking: false,
};

const getters = {
  getIsAvailable: state => state.available,
  getError: state => state.error,
  getIsChecking: state => state.checking,
};

const actions = {
  reset({ commit }) {
    commit('setError', null);
    commit('setIsAvailable', false);
    commit('setIsChecking', false);
  },
  check({ commit }, params) {
    commit('setError', null);
    commit('setIsAvailable', false);
    commit('setIsChecking', true);
    http.post('documents/is-available', params)
      .then(result => {
        commit('setIsAvailable', result.data.isAvailable);
      })
      .catch(error => {
        commit('setError', error);
      })
      .finally(() => {
        commit('setIsChecking', false);
      });
  }
};

const mutations = {
  setError(state, value) {
    state.error = value;
  },
  setIsAvailable(state, value) {
    state.available = value;
  },
  setIsChecking(state, value) {
    state.checking = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};