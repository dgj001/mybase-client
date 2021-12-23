import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store';
import ProjectListView from '../views/ProjectListView'
import ProjectView from '../views/ProjectView'
import LoginView from '../views/LoginView'

import Database from '../components/project/cascade/Database';

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters['auth/getIsAuthenticated']) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters['auth/getIsAuthenticated']) {
    next();
    return;
  } 
  next('/login');
};

const routes = [
  { 
    path: '/', 
    redirect: '/projects',
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectListView,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/projects/:id',
    name: 'project',
    component: ProjectView,
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: '/projects/:id?',
        redirect: '/projects/:id/cascade',
      },
      {
        path: '/projects/:id/cascade',
        component: Database,
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: ifNotAuthenticated,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
