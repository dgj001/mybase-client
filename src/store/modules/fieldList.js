import http from "@/http";

const state = {
  fieldList: [],
  isLoading: false,
  error: null,
};

const getters = {
  getList: state => state.fieldList,
  getIsLoading: state => state.isLoading,
  getError: state => state.error,
};

const actions = {
  async fetch({ commit }, projectId) {
    commit('setIsLoading', true);
    try {
      http.get(`/fields?projectId=${projectId}`).then(response => {
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
    state.fieldList = value;
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