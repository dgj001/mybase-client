import http from "@/http";

const state = {
  documentList: [],
  isLoading: false,
  error: null,
};

const getters = {
  getList: state => state.documentList,
  getIsLoading: state => state.isLoading,
  getError: state => state.error,
};

const actions = {
  async fetch({ commit }, projectId) {
    commit('setIsLoading', true);
    try {
      http.get(`/documents?projectId=${projectId}`).then(response => {
        const list = response.data.documents;
        commit('setList', list);
      })
    } catch (error) {
      commit('setError', error);
    } finally {
      commit('setIsLoading', false);
    }
  },
  async create({ commit }, document) {
    commit('setError', null);
    await http.post('/documents', document)
      .then((response) => {
        const newDoc = response.data.document;
        commit('setList', state.documentList.concat([ newDoc ]));
      })
      .catch(error => {
        commit('setError', error.message);
      });
  },
  async delete({ commit }, documentId) {
    http.delete(`/documents/${documentId}`)
      .then(() => {
        commit('setList', state.documentList.filter(doc => doc._id !== documentId));
      })
      .catch(error => {
        commit('setError', error);
      });
  }
};

const mutations = {
  setList(state, value) {
    state.documentList = value;
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