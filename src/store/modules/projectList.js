import http from "@/http";

const state = {
  fetched: false,
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
  async fetch({ commit }, reload) {
    if (state.fetched && !reload) {
      return; // use cached
    }
    commit('setIsLoading', true);
    commit('setError', null);
    try {
      http.get('/projects').then(response => {
        const list = response.data.documents;
        commit('setList', list);
      });
      state.fetched = true;
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
  },
  select({ commit }, params) {
    if (params.projectId) {
      commit('setSelectedId', params.projectId);
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