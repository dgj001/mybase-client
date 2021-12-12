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
  select({ commit }, params) {
    if (params.documentId) {
      commit('setSelectedId', params.documentId);
    } else if (params.first) {
      commit('setSelectedId', state.list.length > 0 ? state.list[0]._id : null);
    } else if (params.last) {
      commit('setSelectedId', state.list.length > 0 ? state.list[state.list.length - 1]._id : null);
    }
  },
  clear({ commit }) {
    commit('setList', []);
    commit('setSelectedId', null);
  },
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