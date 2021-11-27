import http from "@/http";

const state = {
  token: localStorage.getItem('token') || null,
  loggingIn: false,
  error: null,
};

const getters = {
  getIsAuthenticated: state => {
    return state.token !== null;
  },
  getIsLoggingIn: state => state.loggingIn,
  getError: state => state.error,
  getToken: state => state.token,
};

const actions = {
  async login({ commit }, params) {
    commit('setIsLoggingIn', true);
    commit('setError', null);
    commit('setToken', null);
    
    return new Promise((resolve, reject) => {
      http.post('/users/login', params)
        .then(response => {
          commit('setToken', response.data.token);
          const { user } = response.data;
          commit('user/setUser', user, { root: true });
          resolve(true);
        })
        .catch(err => {
          commit('setError', err.response.data.message);
          reject(err);
        })
        .finally(() => {
          commit('setIsLoggingIn', false);
        });        
      });
  },
  logout({ commit }) {
    commit('setToken', null);
  },
  clear({ commit } ) {
    commit('setIsLoggingIn', false);
    commit('setError', null);
  }
};

const mutations = {
  setToken(state, value) {
    if (value) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }
    state.token = value;
  },
  setIsLoggingIn(state, value) {
    state.loggingIn = value;
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