import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5dde87ae = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages/user/index" */))
const _da4b4670 = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _2f642714 = () => interopDefault(import('..\\pages\\auth\\register.vue' /* webpackChunkName: "pages/auth/register" */))
const _1ea83d14 = () => interopDefault(import('..\\pages\\auth\\register-user.vue' /* webpackChunkName: "pages/auth/register-user" */))
const _036902ef = () => interopDefault(import('..\\pages\\user\\home\\index.vue' /* webpackChunkName: "pages/user/home/index" */))
const _11e269ce = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/user",
    component: _5dde87ae,
    name: "user"
  }, {
    path: "/auth/login",
    component: _da4b4670,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _2f642714,
    name: "auth-register"
  }, {
    path: "/auth/register-user",
    component: _1ea83d14,
    name: "auth-register-user"
  }, {
    path: "/user/home",
    component: _036902ef,
    name: "user-home"
  }, {
    path: "/",
    component: _11e269ce,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
