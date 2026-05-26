import { createRouter, createWebHistory } from 'vue-router'

import ClientesView from '../views/ClientesView.vue'

const routes = [
  { path: '/', redirect: '/clientes' },
  { path: '/clientes', component: ClientesView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router