import http from "@/http";

const state = {
};

const getters = {
};

const actions = {
  findTarget(_, params) {
    return new Promise((resolve, reject) => {
      http.post('/projects/find-available-target', params)
        .then((response) => {          
          resolve(response.data.target);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }
};

const mutations = {
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};