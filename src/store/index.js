import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth';
import collectionList from './modules/collectionList';
import collectionName from './modules/collectionName';
import documentList from './modules/documentList';
import fieldList from './modules/fieldList';
import projectList from './modules/projectList';
import user from './modules/user';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    collectionList,
    collectionName,
    documentList,
    fieldList,
    projectList,
    user,
  }
})
