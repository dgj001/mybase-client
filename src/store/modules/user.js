// import jwt from 'jsonwebtoken';
import http from "@/http";

const state = {
  user: null,
  error: null,
  isLoading: false,
};

const getters = {
  getUser: state => state.user,
  getIsLoading: state => state.isLoading,
  getError: state => state.error,
};

const actions = {
  async fetchUser({ commit }, forceReload) {
    if (state.user && !forceReload) {
      return;
    }
    
    commit('setUser', null);
    commit('setIsLoading', true);
    commit('setError', null);
      
    await http.get(`/users/me`)
      .then(response => {
        const user = response.data.document;
        commit('setUser', user);
      })
      .catch(err => {
        commit('setUser', null);
        commit('setError', err.response.data.message);
      })
      .finally(() => {
        commit('setIsLoading', false);
      });
  },
  async saveUser({ commit }, params) {
    commit('setIsLoading', true);
    commit('setError', null);
      
    await http.patch(`/users/updateMe`, params)
      .then(response => {
        const user = response.data.user;
        commit('setUser', user);
      })
      .catch(err => {
        commit('setUser', null);
        commit('setError', err.response.data.message);
      })
      .finally(() => {
        commit('setIsLoading', false);
      });
  },
  async changePassword({ commit }, params) {
    commit('setIsLoading', true);
    commit('setError', null);
      
    await http.patch(`/users/updateMyPassword`, params)
      .then(response => {
        const { user, token } = response.data;
        commit('setUser', user);
        commit('auth/setToken', token, { root: true });
      })
      .catch(err => {
        commit('setUser', null);
        commit('setError', err.response.data.message);
      })
      .finally(() => {
        commit('setIsLoading', false);
      });
  }
};

const mutations = {
  setUser(state, value) {
    state.user = value;
  },
  setIsLoading(state, value) {    
    state.isLoading = value;
  },
  setError(state, value) {    
    state.error = value;
  },
};

// function loadActive() {
//   const token = localStorage.getItem('token');
//   const decoded = jwt.decode(token);
//   return {
//     activeOrgId: decoded.activeOrgId,
//     activeRole: decoded.activeRole,
//     activeGroupIds: decoded.activeGroupIds,
//   };
// }

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};