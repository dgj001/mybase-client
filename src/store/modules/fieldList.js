import http from "@/http";

const state = {
  fieldList: null,
  isLoading: false,
  error: null,
};

const getters = {
  getList: state => state.fieldList,
  getIsLoading: state => state.isLoading,
  getError: state => state.error,
};

const actions = {
  async fetch({ commit }, params) {
    commit('setIsLoading', true);
    try {
      const url = `/fields?projectId=${params.projectId}&documentId=${params.documentId}`;
      http.get(url).then(response => {
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