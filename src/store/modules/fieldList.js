import http from "@/http";

const state = {
  list: null,
  isLoading: false,
  error: null,
};

const getters = {
  getList: state => state.list,
  getIsLoading: state => state.isLoading,
  getError: state => state.error,
};

const actions = {
  async fetch({ commit }, params) {
    commit('setIsLoading', true);
    try {
      const url = `/fields?documentId=${params.documentId}`;
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
  async create({ commit }, params) {
    commit('setError', null);
    await http.post('/fields', params.field)
      .then((response) => {
        const newField = response.data.document;
        commit('setList', state.list.concat([ newField ]));
      })
      .catch(error => {
        commit('setError', error.message);
      });
  },
  async delete({ commit }, fieldId) {
    commit('setError', null);
    await http.delete(`/fields/${fieldId}`)
      .then(() => {
        commit('setList', state.list.filter(f => f._id !== fieldId));
      })
      .catch(error => {
        commit('setError', error.message);
      });
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};