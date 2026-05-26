import { createRouter, createWebHistory } from 'vue-router'

import ClientesView from '../views/ClientesView.vue'
import VeiculosView from '../views/VeiculosView.vue'

const routes = [
  { path: '/', redirect: '/clientes' },
  { path: '/clientes', component: ClientesView },
  { path: '/veiculos', component: VeiculosView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router