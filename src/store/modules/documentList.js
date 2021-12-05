import http from "@/http";

const state = {
  documentList: [],
  isLoading: false,
  error: null,
  selectedId: null,
};

const getters = {
  getList: state => state.documentList,
  getIsLoading: state => state.isLoading,
  getError: state => state.error,
  getSelectedId: state => state.selectedId,
};

const actions = {
  async fetch({ commit }, params) {
    commit('setIsLoading', true);
    try {
      http.get(`/documents?collectionId=${params.collectionId}`).then(response => {
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
  async create({ commit }, params) {
    commit('setError', null);
    await http.post('/documents', params.document)
      .then((response) => {
        const newDoc = response.data.document;
        commit('setList', state.documentList.concat([ newDoc ]));
        if (params.select) {
          commit('setSelectedId', newDoc._id);
        }
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
  },
  selectDocument({ commit }, documentId) {
    commit('setSelectedId', documentId);
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