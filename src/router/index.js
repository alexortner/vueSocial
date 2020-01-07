import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/auth/login.vue'
import Wall from '@/views/Wall.vue'
import News from '@/views/News.vue'

import firebase from 'firebase'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Login',
    component: Wall
  },
  {
    path: '/wall',
    name: 'Wall',
    component: Wall
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/members',
    name: 'Members',
    meta: {
        requiresAuth: true
      },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Members.vue')
    
  },
  {
    path: '/forum',
    name: 'Forum',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Forum.vue')
  },
  {
    path: '/photos',
    name: 'Photos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Photos.vue')
  },
  {
    path: '/booking',
    name: 'Booking',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Booking.vue')
  },
  {
    path: '/events',
    name: 'Events',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Events.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>{
  //check if route requires auth
  if(to.matched.some(rec=>rec.meta.requiresAuth)){
    // check auth state
    let user = firebase.auth().currentUser
    if(user){
      // user signed in, proceed to route
      next()
    } else {
      next({name:'Login'})

    }
  } else {
    next()
  }
})

export default router
