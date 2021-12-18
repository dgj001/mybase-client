import http from "@/http";

const state = {
  finding: false
};

const getters = {
  getIsFinding: state => state.finding,
};

const actions = {
  findTarget({ commit }, params) {
    return new Promise((resolve, reject) => {
      commit('setIsFinding', true);

      http.post('/projects/find-available-target', params)
        .then((response) => {          
          resolve(response.data.target);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          commit('setIsFinding', false);
        });
    });
  }
};

const mutations = {
  setIsFinding(state, value) {
    state.finding = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};