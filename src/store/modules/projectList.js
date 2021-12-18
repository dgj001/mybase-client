import http from "@/http";

const state = {
  list: [],
  isLoading: false,
  error: null,
};

const getters = {
  getList: state => state.list,
  getIsLoading: state => state.isLoading,
  getError: state => state.error,
};

const actions = {
  async fetch({ commit }) {
    commit('setIsLoading', true);
    commit('setError', null);
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
  create({ commit }, name) {    
    return new Promise((resolve, reject) => {
      commit('setIsLoading', true);
      commit('setError', null);
      http.post('/projects/', { name })
        .then((response) => {          
          const newProject = response.data.document;
          commit('setList', state.list.concat(newProject));
          resolve(newProject);
        })
        .catch((error) => {
          commit('setError', null);
          reject(error);
        })
        .finally(() => {
          commit('setIsLoading', false);
        })
    });
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};