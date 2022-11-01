import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import GameBoard from '../views/GameBoard.vue'

const routerHistory = createWebHistory()
const routes = [
  { path: '/', component: Dashboard },
  { path: '/game/:id', component: GameBoard },
]

const router = createRouter({
  history: routerHistory,
  routes
})

export default router
