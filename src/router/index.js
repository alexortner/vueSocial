import Vue from 'vue'
import VueRouter from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import NavbarBack from '@/components/NavbarBack.vue'

import Login from '@/components/auth/login.vue'
import Wall from '@/views/Wall.vue'
import News from '@/views/News.vue'
import Forum from '@/views/Forum.vue'
import ForumViewPost from '@/views/forum/ForumViewPost.vue'



import firebase from 'firebase'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    components: {
      default: Login,
      navigation: Navbar
    }
  },
  {
    path: '/',
    name: 'Login',
    components: {
      default: Wall,
      navigation: Navbar
    }
  },
  {
    path: '/wall',
    name: 'Wall',
    components: {
      default: Wall,
      navigation: Navbar
    }
  },
  {
    path: '/news',
    name: 'News',
    components: {
      default: News,
      navigation: Navbar
    }
  },
  {
    path: '/members',
    name: 'Members',
    meta: {
        requiresAuth: true
      },
    components: {
      default: () => import(/* webpackChunkName: "members" */ '../views/Members.vue') , 
      navigation: Navbar
    }    
  },
  {
    path: '/forum',
    name: 'Forum',
    meta: {
        requiresAuth: true
      },
    components: {
      default: () => import(/* webpackChunkName: "forum" */ '../views/Forum.vue') , 
      navigation: Navbar
    }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/Forum.vue')
  },
  { 
    path: '/forum/:postid', 
    name: 'ForumViewPost',
    meta: {
        requiresAuth: true
      },
    components: {
      default: () => import(/* webpackChunkName: "forum" */ '../views/forum/ForumViewPost.vue'),
      navigation: NavbarBack
    }
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
    path: '/photos2',
    name: 'Photos2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Photos2.vue')
  },
  {
    path: '/photos3',
    name: 'Photos3',
    meta: {
        requiresAuth: true
      },
    components: {
      default: () => import(/* webpackChunkName: "forum" */ '@/views/Photos3.vue'),
      navigation: Navbar
    }
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
  {
    path: '/simpleeditor',
    name: 'SimpleEditor',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/SimpleEditor.vue')
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
