import http from "@/http";

const state = {
  project: null,
  isLoading: false,
  error: null,
};

const getters = {
  getProject: state => state.project,
  getIsLoading: state => state.isLoading,
  getError: state => state.error,
};

const actions = {
  fetch({ commit }, projectId) {
    commit('setIsLoading', true);
    http.get(`/projects/${projectId}`).then(response => {
      const project = response.data.document;
      commit('setProject', project);
    })
    .catch(error => {
      commit('setError', error);
    })
    .finally(() => {
      commit('setIsLoading', false);
    });
  },
};

const mutations = {
  setProject(state, value) {
    state.project = value;
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