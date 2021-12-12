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
        commit('setList', state.list.concat([ newDoc ]));
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
        commit('setList', state.list.filter(doc => doc._id !== documentId));
      })
      .catch(error => {
        commit('setError', error);
      });
  },
  select({ commit }, documentId) {
    if (documentId !== null) {
      commit('setSelectedId', documentId);
    } else if (state.list.length > 0) {
      commit('setSelectedId', state.list[0]._id);
    } else {
      commit('setSelectedId', null);
    }
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