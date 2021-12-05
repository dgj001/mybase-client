import http from "@/http";

const state = {
  list: [],
  isLoading: false,
  error: null,
  selectedId: null,
};

const getters = {
  getList: state => state.list,
  getIsLoading: state => state.isLoading,
  getError: state => state.error,
  getSelectedId: state => state.selectedId,
};

const actions = {
  async fetch({ commit }, projectId) {
    commit('setIsLoading', true);
    try {
      http.get(`/collections?projectId=${projectId}`).then(response => {
        const list = response.data.documents;
        commit('setList', list);
        const firstId = list && list.length ? list[0]._id : null;
        commit('setSelectedId', firstId);
      })
    } catch (error) {
      commit('setError', error);
    } finally {
      commit('setIsLoading', false);
    }
  },
  select({ commit }, collectionId) {
    commit('setSelectedId', collectionId);
  }
};

const mutations = {
  setList(state, value) {
    state.list = value;
  },
  setIsLoading(state, value) {
    state.isLoading = value;
  },
  setError(state, value) {
    state.error = value;
  },
  setSelectedId(state, value) {
    state.selectedId = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};