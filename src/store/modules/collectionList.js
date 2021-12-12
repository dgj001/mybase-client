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
        this.dispatch('collectionList/select', { first: true })
      })
    } catch (error) {
      commit('setError', error);
    } finally {
      commit('setIsLoading', false);
    }
  },
  async delete({ commit }, collectionId) {
    http.delete(`/collections/${collectionId}`)
      .then(() => {
        commit('setList', state.list.filter(col => col._id !== collectionId));
      })
      .catch(error => {
        commit('setError', error);
      });
  },
  async create({ commit }, params) {
    commit('setError', null);
    try {
      const response = await http.post('/collections', {
        projectId: params.projectId,
        name: params.collectionName
      });
      const collection = response.data.document;

      await http.post('/documents', {
        collectionId: collection._id,
        id: params.documentName
      });

      commit('setList', state.list.concat(collection));
    } catch (error) {
      commit('setError', error);
    }
  },
  select({ commit }, params) {
    if (params.collectionId) {
      commit('setSelectedId', params.collectionId);
    } else if (params.first) {
      commit('setSelectedId', state.list.length > 0 ? state.list[0]._id : null);
    } else if (params.last) {
      commit('setSelectedId', state.list.length > 0 ? state.list[state.list.length - 1]._id : null);
    }
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