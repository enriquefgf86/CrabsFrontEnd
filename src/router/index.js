import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import GameSelectedView from '../views/GameSelectedView.vue'
import ScoreView from '../views/ScoreView.vue'
import GraphicComponent from '../components/GraphicComponent.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },

  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/scorePoll',
    name: 'ScoreView',
    component:ScoreView
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/game/selected/:gameCrabId',
    name: 'GameSelectedView',
    props:true,
    component: GameSelectedView,
    
  },
  {
    path: '/game/selected/statistic/:staticCrabId',
    name: 'GraphicComponent',
    props:true,
    component: GraphicComponent,
    
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
