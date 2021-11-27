import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store';
import ProjectView from '../views/ProjectView'
import LoginView from '../views/LoginView'

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
    component: ProjectView,
    beforeEnter: ifAuthenticated,
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
