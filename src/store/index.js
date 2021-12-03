import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth';
import documentList from './modules/documentList';
import fieldList from './modules/fieldList';
import projectList from './modules/projectList';
import user from './modules/user';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    documentList,
    fieldList,
    projectList,
    user,
  }
})
