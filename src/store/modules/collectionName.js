import http from "@/http";

const state = {
  checking: false,
};

const getters = {
  getIsChecking: state => state.checking,
};

const actions = {
  check({ commit }, params) {
    return new Promise((resolve, reject) => {
      commit('setIsChecking', true);

      return http.post('collections/is-available', params)
        .then(result => {
          resolve(result.data.isAvailable);
        })
        .catch(error => {
          reject(error);
        })
        .finally(() => {
          commit('setIsChecking', false);
        });
    });
  }
};

const mutations = {
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