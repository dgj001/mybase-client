import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth';
import collectionList from './modules/collectionList';
import collectionName from './modules/collectionName';
import documentList from './modules/documentList';
import documentName from './modules/documentName';
import fieldList from './modules/fieldList';
import project from './modules/project';
import projectList from './modules/projectList';
import projectName from './modules/projectName';
import user from './modules/user';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    collectionList,
    collectionName,
    documentList,
    documentName,
    fieldList,
    project,
    projectList,
    projectName,
    user,
  }
})
