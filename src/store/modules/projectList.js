import http from "@/http";

const state = {
  projectList: [],
  isLoading: false,
  error: null,
};

const getters = {
  getList: state => state.projectList,
  getIsLoading: state => state.isLoading,
  getError: state => state.error,
};

const actions = {
  async fetch({ commit }) {
    commit('setIsLoading', true);
    try {
      http.get('/projects').then(response => {
        const list = response.data.documents;
        commit('setList', list);
      })
    } catch (error) {
      commit('setError', error);
    } finally {
      commit('setIsLoading', false);
    }
  },
};

const mutations = {
  setList(state, value) {
    state.projectList = value;
  },
  setIsLoading(state, value) {
    state.isLoading = value;
  },
  setError(state, value) {
    state.error = value;
  },  
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};